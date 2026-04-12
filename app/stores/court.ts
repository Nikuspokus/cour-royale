import { defineStore } from 'pinia'
import { useFirestore, useCollection } from 'vuefire'
import { collection, doc, addDoc, updateDoc, arrayUnion, arrayRemove, query, orderBy, limit } from 'firebase/firestore'
import { useUserStore } from './user'
import mockData from '~/data/mock_data.json'

export const useCourtStore = defineStore('court', () => {
  const db = useFirestore()
  const userStore = useUserStore()

  // State for DSS Automation
  const lastDssTrigger = ref(0)
  const messagesCountSinceLastDss = ref(0)
  const isDssProcessing = ref(false)

  // Real-time collection for proclamations
  const postsQuery = query(collection(db, 'proclamations'), orderBy('timestamp', 'desc'), limit(50))
  const posts = useCollection(postsQuery)

  // Real-time collection for articles (Gazette)
  const articles = useCollection(collection(db, 'articles'))
  
  // Static/Mock clubs for now (could be migrated later)
  const clubs = ref([...mockData.clubs])

  async function toggleLike(postId: string) {
    if (!userStore.firebaseUser) return
    
    const postRef = doc(db, 'proclamations', postId)
    const userId = userStore.firebaseUser.uid
    const post = posts.value.find(p => p.id === postId)
    
    if (!post) return

    const isCurrentlyLiked = post.likedBy?.includes(userId)

    if (!isCurrentlyLiked) {
      await updateDoc(postRef, {
        likes: (post.likes || 0) + 1,
        likedBy: arrayUnion(userId)
      })
    } else {
      await updateDoc(postRef, {
        likes: Math.max(0, (post.likes || 1) - 1),
        likedBy: arrayRemove(userId)
      })
    }
  }

  function isLiked(postId: string) {
    const userId = userStore.firebaseUser?.uid
    if (!userId) return false
    const post = posts.value.find(p => p.id === postId)
    return post?.likedBy?.includes(userId) || false
  }

  async function addPost(newPost: any) {
    if (!userStore.firebaseUser) return
    
    await addDoc(collection(db, 'proclamations'), {
      ...newPost,
      authorId: userStore.firebaseUser.uid,
      authorAvatar: userStore.user.avatar,
      authorRank: userStore.currentRank.title,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      likedBy: []
    })
    
    // Reward the noble for their proclamation
    await userStore.addInfluence(10)
    await userStore.incrementStat('postsCount', 1)

    // DSS LOGIC: Check if it's time to trigger a new scandal
    messagesCountSinceLastDss.value++
    checkDssTrigger()
  }

  async function checkDssTrigger() {
    if (isDssProcessing.value) return

    const now = Date.now()
    const tenMinutes = 10 * 60 * 1000
    
    // CONDITIONS: At least 2 new messages AND 10 mins since last chronicle
    const timeCondition = (now - lastDssTrigger.value) > tenMinutes
    const volumeCondition = messagesCountSinceLastDss.value >= 2

    if (timeCondition && volumeCondition) {
      console.log("[Store] Conditions réunies pour le Duc. Déclenchement...");
      isDssProcessing.value = true
      try {
        await triggerWhistledown()
        lastDssTrigger.value = now
        messagesCountSinceLastDss.value = 0
      } catch (err) {
        console.error("[Store] Le Duc a eu un empêchement:", err)
      } finally {
        isDssProcessing.value = false
      }
    } else if (!timeCondition) {
      console.log(`[Store] Le Duc se repose. Prochaine chronique possible dans ${Math.round((tenMinutes - (now - lastDssTrigger.value)) / 1000)}s`)
    }
  }

  function getArticle(id: string) {
    return articles.value.find(a => a.id === id)
  }

  function getClub(id: string) {
    return clubs.value.find(c => c.id === id)
  }

  async function triggerWhistledown() {
    if (posts.value.length < 3) {
      throw new Error("insuffisance_de_potins")
    }

    try {
      const response = await fetch('/api/whistledown/gossip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proclamations: posts.value.slice(0, 15).map(p => ({
            author: p.author || 'Un Noble',
            content: p.content,
            rank: p.authorRank || 'Inconnu'
          }))
        })
      })

      if (!response.ok) throw new Error('Échec API Whistledown')

      const gossip = await response.json()
      if (!gossip) return

      // Publish to Firestore articles collection with the new DSS brand
      await addDoc(collection(db, 'articles'), {
        id: `dss-${Date.now()}`,
        title: gossip.title,
        excerpt: gossip.content.substring(0, 150) + '...',
        content: gossip.content,
        author: 'Le Duc DSS',
        authorAvatar: '/assets/dss-cameo.png',
        image: '/assets/gazette-lead.png', // Festive ball at Versailles
        category: 'Chronique du Duc',
        readTime: '3 min',
        scandalLevel: gossip.scandalLevel,
        targetNoble: gossip.targetNoble || null,
        isAIGenerated: true,
        timestamp: new Date().toISOString()
      })

      return gossip
    } catch (err) {
      console.error("Le Duc est mécontent:", err)
      throw err
    }
  }

  return {
    posts,
    articles,
    clubs,
    toggleLike,
    isLiked,
    addPost,
    getArticle,
    getClub,
    triggerWhistledown
  }
})
