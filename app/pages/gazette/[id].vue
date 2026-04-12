<template>
  <div class="gazette-detail min-h-screen bg-background pb-32">
    <div v-if="article" class="max-w-3xl mx-auto px-6">
      <!-- Back Link -->
      <NuxtLink to="/gazette" class="inline-flex items-center gap-2 group mb-12 text-stone-500 hover:text-primary transition-colors">
        <span class="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
        <span class="font-label text-[10px] uppercase tracking-[0.4em]">Retour à l'Édition</span>
      </NuxtLink>

      <!-- Article Header -->
      <header class="space-y-8 mb-16 text-center">
        <div class="space-y-4">
          <span class="font-label text-xs font-semibold text-tertiary uppercase tracking-[0.5em] block">{{ article.category }}</span>
          <h1 class="font-headline text-5xl md:text-7xl text-stone-900 tracking-tight leading-[1.1] italic">
            {{ article.title }}
          </h1>
        </div>
        
        <div class="flex items-center justify-center gap-6 py-6 border-y border-primary/10 font-label text-[9px] uppercase tracking-[0.3em] text-stone-400">
          <span>PAR: {{ article.author }}</span>
          <div class="w-1 h-1 bg-primary/20 rounded-full"></div>
          <span>{{ article.time }}</span>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="aspect-[16/9] mb-16 rounded-sm overflow-hidden shadow-2xl ring-1 ring-primary/20 transform rotate-[0.5deg]">
        <img :src="article.image" class="w-full h-full object-cover grayscale opacity-90 sepia-[0.3]" />
      </div>

      <!-- Article Content -->
      <div class="parchment-texture p-10 md:p-16 shadow-inner relative">
        <div class="absolute top-0 left-10 w-[1px] h-full bg-primary/10"></div>
        <div class="prose prose-stone max-w-none">
          <p class="font-typewriter text-xl md:text-2xl text-stone-800 leading-[1.8] lowercase first-letter:text-6xl first-letter:font-headline first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary first-letter:uppercase">
            {{ article.content }}
          </p>
        </div>

        <div class="mt-20 pt-12 border-t border-primary/20 flex flex-col items-center gap-6">
          <p class="font-cursive text-3xl text-primary">Lady Whistledown</p>
          <div class="flex gap-6">
            <button class="flex items-center gap-2 font-label text-[10px] uppercase text-stone-400 hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-sm">favorite</span> J'aime
            </button>
            <button class="flex items-center gap-2 font-label text-[10px] uppercase text-stone-400 hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-sm">share</span> Partager le pli
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <span class="material-symbols-outlined text-9xl text-stone-200">sentiment_very_dissatisfied</span>
      <h2 class="font-headline text-3xl text-stone-400 italic">Cet article semble s'être égaré dans les couloirs...</h2>
      <NuxtLink to="/gazette" class="px-8 py-3 bg-primary text-white rounded-full font-label text-xs uppercase tracking-widest">Retour au journal</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useCourtStore } from '~/stores/court'

const route = useRoute()
const courtStore = useCourtStore()
const article = computed(() => courtStore.getArticle(route.params.id))

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.parchment-texture {
  background-color: #fbf9f4;
}

@media (min-width: 1024px) {
  .prose p {
    column-count: 1; /* Keeping it readable for single column focus */
  }
}
</style>
