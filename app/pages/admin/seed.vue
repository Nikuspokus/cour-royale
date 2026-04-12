<template>
  <div class="min-h-screen bg-background p-12 font-serif">
    <div class="max-w-2xl mx-auto vellum-texture p-8 rounded-xl shadow-2xl border border-primary/20">
      <h1 class="text-3xl italic mb-8 text-primary">Initialisation des Archives Royales</h1>
      
      <div v-if="!status" class="space-y-6">
        <p class="text-stone-600 leading-relaxed">
          Ce portail permet de transférer les données de simulation vers le Cloud Firebase Firestore. 
          Une fois exécuté, les Proclamations et la Gazette seront accessibles à tous les nobles du royaume en temps réel.
        </p>
        <button 
          @click="startSeeding" 
          class="px-8 py-3 bg-primary text-white rounded-full font-label text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform"
        >
          Lancer le Transferat des Archives
        </button>
      </div>

      <div v-else class="space-y-4">
        <div v-for="(msg, i) in log" :key="i" class="text-xs font-mono py-1 border-b border-primary/5 flex gap-2">
          <span class="text-primary opacity-50">[{{ i }}]</span>
          <span>{{ msg }}</span>
        </div>
        
        <div v-if="status === 'done'" class="pt-8 text-center">
          <p class="text-green-800 font-bold mb-4">✨ Le Palais est prêt !</p>
          <NuxtLink to="/hall" class="text-primary underline font-label text-xs uppercase tracking-widest">Retourner au Grand Hall</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFirestore } from 'vuefire'
import { collection, doc, setDoc, addDoc, getDocs, query, limit } from 'firebase/firestore'
import mockData from '~/data/mock_data.json'

const db = useFirestore()
const status = ref(null)
const log = ref([])

const addLog = (msg) => log.value.push(msg)

const startSeeding = async () => {
  status.value = 'loading'
  addLog('Démarrage du transfert...')

  try {
    // 1. Seed Articles (Gazette)
    addLog('Traitement de la Gazette...')
    for (const article of mockData.gazetteArticles) {
      const articleRef = doc(db, 'articles', article.id)
      await setDoc(articleRef, {
        ...article,
        timestamp: new Date().toISOString()
      }, { merge: true })
      addLog(`Article "${article.title}" archivé.`)
    }

    // 2. Seed Proclamations (Grand Hall)
    addLog('Traitement des Proclamations...')
    // Check if posts already exist to avoid duplicates
    const postsSnap = await getDocs(query(collection(db, 'proclamations'), limit(1)))
    if (postsSnap.empty) {
      for (const post of mockData.posts) {
        await addDoc(collection(db, 'proclamations'), {
          ...post,
          timestamp: new Date().toISOString(),
          likedBy: []
        })
        addLog(`Proclamation de ${post.author} publiée.`)
      }
    } else {
      addLog('Le Grand Hall contient déjà des archives, saut de la publication.')
    }

    status.value = 'done'
    addLog('Transfert terminé avec succès !')
  } catch (err) {
    addLog(`ERREUR: ${err.message}`)
    console.error(err)
  }
}

definePageMeta({
  layout: false
})
</script>
