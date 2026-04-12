<template>
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-12 py-4 transition-all duration-500',
      isHome ? 'bg-transparent border-none' : 'bg-[#fbf9f4]/80 dark:bg-[#1b1c19]/80 backdrop-blur-md border-b border-primary/15'
    ]"
  >

    <div class="flex items-center gap-3">
      <span class="material-symbols-outlined text-primary dark:text-primary-container" style="font-variation-settings: 'opsz' 24">toys_fan</span>
      <h1 class="text-2xl font-serif italic text-primary dark:text-primary-container tracking-tighter uppercase font-black">COUR ROYALE</h1>
    </div>
    
    <div v-if="!isHome && userStore.firebaseUser" class="flex items-center gap-4 anim-fade-in" style="animation-delay: 0.2s">
      <!-- Rank Summary (Mini) -->
      <div class="hidden sm:flex flex-col items-end">
        <span class="font-label text-[9px] uppercase tracking-[0.2em] text-primary/60 mb-0.5">{{ userStore.currentRank.title }}</span>
        <div class="w-24 h-1 bg-primary/10 rounded-full overflow-hidden">
          <div 
            class="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(115,92,0,0.5)]" 
            :style="{ width: `${userStore.progression}%` }"
          ></div>
        </div>
      </div>
      
      <div class="relative group">
        <CameoAvatar :src="userStore.user.avatar" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const userStore = useUserStore()

const isHome = computed(() => route.path === '/')
</script>
