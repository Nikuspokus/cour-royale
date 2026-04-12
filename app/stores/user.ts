import { defineStore } from 'pinia'
import { computed, watch, ref } from 'vue'
import { useCurrentUser, useFirebaseAuth, useFirestore, useDocument, useCollection } from 'vuefire'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { doc, setDoc, updateDoc, increment, collection, query, where, getDocs, getDoc, limit } from 'firebase/firestore'
import mockData from '~/data/mock_data.json'
import achievementsData from '~/data/achievements.json'

export const useUserStore = defineStore('user', () => {
  const auth = useFirebaseAuth()
  const db = useFirestore()
  const firebaseUser = useCurrentUser()

  // Bind the noble profile to Firestore when authenticated
  const userProfileDoc = computed(() =>
    firebaseUser.value ? doc(db, 'nobles', firebaseUser.value.uid) : null
  )

  const firestoreUser = useDocument(userProfileDoc)

  // Combined user data (Firestore + Fallback to anonymous noble)
  const user = computed(() => {
    const defaults = {
      name: 'Noble de Versailles',
      avatar: '/assets/noble-avatar-default.png',
      reputation: 0,
      influence: 0,
      stats: { postsCount: 0, likesGiven: 0, likesReceived: 0, logons: 0 },
      unlockedAchievements: [] as string[],
      preferences: { grainEffect: true, notifications: true }
    }

    // If we have Firestore data, merge it with defaults to avoid "undefined" sub-properties
    if (firestoreUser.value) {
      return {
        ...defaults,
        ...firestoreUser.value,
        stats: {
          ...defaults.stats,
          ...(firestoreUser.value.stats || {})
        },
        unlockedAchievements: firestoreUser.value.unlockedAchievements || [],
        preferences: {
          ...defaults.preferences,
          ...(firestoreUser.value.preferences || {})
        }
      }
    }

    return defaults
  })

  const ranks = mockData.nobleRanks as any[]

  const currentRank = computed(() => {
    if (!ranks || ranks.length === 0) return { title: 'Noble', level: 0, requirement: 0 }

    return ranks.reduce((best, rank) => {
      if (user.value.influence >= rank.requirement) {
        return rank
      }
      return best
    }, ranks[0])
  })

  // PROACTIVE CLEANUP: Check if user has a real name and fix it immediately
  watch(firestoreUser, async (activeProfile) => {
    if (activeProfile && firebaseUser.value) {
      const docRef = userProfileDoc.value
      if (!docRef) return

      // 1. ANONYMIZATION CHECK
      const realName = firebaseUser.value.displayName
      if (realName && activeProfile.name === realName) {
        console.log("Nom réel détecté. Déclenchement de l'anonymisation...")
        const nobleName = await generateUniqueNobleName()
        await updateDoc(docRef, {
          name: nobleName,
          avatar: '/assets/noble-avatar-default.png'
        })
      }

      // 2. ACHIEVEMENT BOOTSTRAP (Retroactive & Reward Check)
      const hasBrevet = activeProfile.unlockedAchievements?.includes('brevet_noblesse')
      const statsAreZero = (activeProfile.reputation || 0) === 0 && (activeProfile.influence || 0) === 0
      
      if (!hasBrevet || (hasBrevet && statsAreZero && activeProfile.name !== 'Noble de Versailles')) {
        console.log("[Store] Attribution ou Régularisation du Brevet de Noblesse...")
        const brevet = achievementsData.find(a => a.id === 'brevet_noblesse')
        
        const updates: any = {
           unlockedAchievements: Array.from(new Set([...(activeProfile.unlockedAchievements || []), 'brevet_noblesse']))
        }
        
        if (brevet && statsAreZero) {
          updates.reputation = increment(brevet.rewardReputation || 10)
          updates.influence = increment(brevet.rewardInfluence || 100)
        }
        
        await updateDoc(docRef, updates)
      }

      // 3. STATS BOOTSTRAP
      if (!activeProfile.stats) {
        await updateDoc(docRef, {
          stats: { postsCount: 0, likesGiven: 0, likesReceived: 0, logons: 1 }
        })
      }
    }
  }, { immediate: true })

  const nextRank = computed(() => {
    if (!currentRank.value) return null
    const currentIndex = ranks.findIndex(r => r.level === currentRank.value.level)
    return ranks[currentIndex + 1] || null
  })

  const progression = computed(() => {
    if (!nextRank.value) return 100
    const currentLevelMin = currentRank.value.requirement
    const nextLevelMin = nextRank.value.requirement
    const range = nextLevelMin - currentLevelMin
    const progress = user.value.influence - currentLevelMin
    return Math.min(Math.round((progress / range) * 100), 100)
  })

  const activeNoblesQuery = computed(() => {
    // Nobles active in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    return query(collection(db, 'nobles'), where('lastOnline', '>', fiveMinutesAgo), limit(20))
  })

  const onlineNobles = useCollection(activeNoblesQuery)
  const onlineCount = computed(() => onlineNobles.value.length || 1)

  const activeAvatars = computed(() => {
    return onlineNobles.value.slice(0, 3).map(n => n.avatar)
  })

  // Heartbeat to keep user marked as online
  let heartbeatInterval: any = null

  watch(firebaseUser, (newUser) => {
    if (newUser) {
      startHeartbeat()
    } else {
      stopHeartbeat()
    }
  }, { immediate: true })

  function startHeartbeat() {
    stopHeartbeat()
    updatePresence()
    heartbeatInterval = setInterval(updatePresence, 60000)
  }

  function stopHeartbeat() {
    if (heartbeatInterval) clearInterval(heartbeatInterval)
  }

  async function updatePresence() {
    if (!userProfileDoc.value) return
    await updateDoc(userProfileDoc.value, {
      lastOnline: new Date().toISOString()
    })
  }

  async function generateUniqueNobleName() {
    const titles = ['Le Comte', 'Le Baron', 'Le Marquis', 'Le Chevalier', 'Le Vicomte', 'La Comtesse', 'La Baronne', 'La Marquise', 'La Duchesse', 'La Vicomtesse']
    const names = ['de Rohan', 'de Polignac', 'de Noailles', 'de Broglie', 'de Talleyrand', 'de Chateaubriand', 'de Montespan', 'de Maintenon', 'de Pompadour', 'de la Fayette', 'de Condé', 'de Conti', 'de Lamballe', 'de Guéméné']

    let isUnique = false
    let finalName = ''

    while (!isUnique) {
      const title = titles[Math.floor(Math.random() * titles.length)]
      const name = names[Math.floor(Math.random() * names.length)]
      finalName = `${title} ${name}`

      const noblesRef = collection(db, 'nobles')
      const q = query(noblesRef, where('name', '==', finalName))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        isUnique = true
      } else {
        finalName += ` ${Math.floor(Math.random() * 100)}`
        isUnique = true
      }
    }

    return finalName
  }

  async function login() {
    if (!auth) return
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const userDoc = doc(db, 'nobles', result.user.uid)

      const userSnap = await getDoc(userDoc)

      if (!userSnap.exists()) {
        const nobleName = await generateUniqueNobleName()
        const brevet = achievementsData.find(a => a.id === 'brevet_noblesse')

        await setDoc(userDoc, {
          uid: result.user.uid,
          name: nobleName,
          avatar: '/assets/noble-avatar-default.png',
          reputation: brevet?.rewardReputation || 10,
          influence: brevet?.rewardInfluence || 100,
          stats: { postsCount: 0, likesGiven: 0, likesReceived: 0, logons: 1 },
          unlockedAchievements: ['brevet_noblesse'],
          preferences: { grainEffect: true, notifications: true },
          joinedAt: new Date().toISOString(),
          lastOnline: new Date().toISOString()
        })
      } else {
        // Increment logons
        const data = userSnap.data()
        const currentLogons = (data.stats?.logons || 0) + 1
        await updateDoc(userDoc, {
          'stats.logons': currentLogons
        })
        
        if (currentLogons >= 5) await unlockAchievement('habitue_palais')

        // RETROACTIVE CLEANUP: If existing user still has their real name
        if (data.name === result.user.displayName) {
          const nobleName = await generateUniqueNobleName()
          await updateDoc(userDoc, {
            name: nobleName,
            avatar: '/assets/noble-avatar-default.png'
          })
        }
      }
    } catch (error) {
      console.error("Échec de la connexion royale:", error)
    }
  }

  async function updateProfile(updates: any) {
    const docRef = userProfileDoc.value
    console.log("[Store] Tentative de updateProfile (v2) avec:", updates)

    if (!docRef) {
      console.error("[Store] Erreur: Authentification requise pour modifier le profil.")
      throw new Error('NO_PROFILE')
    }

    // Uniqueness check for name updates (Non-blocking if it hangs)
    if (updates.name && updates.name !== user.value.name) {
      console.log("[Store] Vérification de l'unicité (3s timeout)...")
      try {
        const noblesRef = collection(db, 'nobles')
        const q = query(noblesRef, where('name', '==', updates.name))

        const querySnapshot = await Promise.race([
          getDocs(q),
          new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT')), 3000))
        ]) as any

        if (querySnapshot && !querySnapshot.empty) {
          throw new Error('NAME_TAKEN')
        }
      } catch (error: any) {
        if (error.message === 'NAME_TAKEN') throw error
        console.warn("[Store] Uniqueness check ignored:", error.message)
      }
    }

    console.log("[Store] Exécution du scellement (setDoc, 20s timeout)...")
    try {
      // Use setDoc with merge for better robustness across SDK states
      await Promise.race([
        setDoc(docRef, updates, { merge: true }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_DOC')), 20000))
      ])
      console.log("[Store] Scellement réussi !")
      
      // Unlock achievement for customizing profile
      if (updates.name) await unlockAchievement('maitre_etiquette')
      
    } catch (err: any) {
      if (err.code === 'permission-denied') {
        console.error("[Store] PERMISSION_DENIED: Vérifiez vos règles Firestore.")
        throw new Error('PERMISSION_DENIED')
      }
      console.error("[Store] Échec fatale de scellement:", err)
      throw err
    }
  }

  async function unlockAchievement(achievementId: string) {
    if (!userProfileDoc.value) return
    const unlocked = user.value.unlockedAchievements || []
    if (unlocked.includes(achievementId)) return

    // Find achievement details for rewards
    const achievement = achievementsData.find(a => a.id === achievementId)
    
    console.log(`[Store] Haut fait débloqué: ${achievementId}`)
    
    const updates: any = {
      unlockedAchievements: [...unlocked, achievementId]
    }

    // Award Reputation and Influence if defined
    if (achievement) {
      if (achievement.rewardReputation) {
        updates.reputation = increment(achievement.rewardReputation)
      }
      if (achievement.rewardInfluence) {
        updates.influence = increment(achievement.rewardInfluence)
      }
    }

    await updateDoc(userProfileDoc.value, updates)

    // Check for mastery (if all others are unlocked)
    if (unlocked.length + 1 === achievementsData.length - 1) {
      await unlockAchievement('soleil_versailles')
    }
  }

  async function incrementStat(statName: string, amount = 1) {
    if (!userProfileDoc.value) return
    const fieldPath = `stats.${statName}`
    await updateDoc(userProfileDoc.value, {
      [fieldPath]: increment(amount)
    })

    // Immediate check (using local estimated value)
    const newVal = (user.value.stats[statName] || 0) + amount
    if (statName === 'postsCount') {
      if (newVal >= 5) await unlockAchievement('plume_bronze')
      if (newVal >= 25) await unlockAchievement('plume_argent')
      if (newVal >= 50) await unlockAchievement('plume_or')
      if (newVal >= 100) await unlockAchievement('voix_versailles')
    }
    if (statName === 'likesGiven') {
      if (newVal >= 10) await unlockAchievement('mecene_discret')
      if (newVal >= 50) await unlockAchievement('grand_philanthrope')
    }
    if (statName === 'likesReceived') {
      if (newVal >= 10) await unlockAchievement('favori_cour')
      if (newVal >= 100) await unlockAchievement('idole_salons')
      if (newVal >= 500) await unlockAchievement('legende_vivante')
    }
  }

  async function addInfluence(points: number) {
    if (!userProfileDoc.value) return
    await updateDoc(userProfileDoc.value, {
      influence: increment(points)
    })
    
    // Check for rank achievement
    if ((user.value.influence + points) >= 50000) { // Approx threshold for highest ranks in mock
       await unlockAchievement('pilier_empire')
    }
  }

  async function addReputation(points: number) {
    if (!userProfileDoc.value) return
    await updateDoc(userProfileDoc.value, {
      reputation: increment(points)
    })
    if ((user.value.reputation + points) >= 1000) {
      await unlockAchievement('arbitre_gout')
    }
  }

  async function logout() {
    if (!auth) return
    stopHeartbeat()
    await signOut(auth)
    navigateTo('/')
  }

  return {
    user,
    firebaseUser,
    currentRank,
    nextRank,
    progression,
    onlineCount,
    activeAvatars,
    login,
    logout,
    updateProfile,
    addInfluence,
    addReputation,
    incrementStat,
    unlockAchievement
  }
})
