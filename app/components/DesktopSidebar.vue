<template>
  <aside class="fixed top-0 left-0 h-full w-72 bg-surface border-r border-primary/10 flex flex-col z-40 py-8 px-6">
    <div class="mb-12">
      <div class="flex items-center gap-3 px-2">
        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'opsz' 32">toys_fan</span>
        <h1 class="text-xl font-serif italic text-primary tracking-tighter uppercase font-black">COUR ROYALE</h1>
      </div>
    </div>

    <nav class="flex-1 space-y-2">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group"
        :class="[route.path === item.path ? 'bg-primary/10 text-primary shadow-sm' : 'text-outline hover:bg-primary/5 hover:text-primary']"
      >
        <span class="material-symbols-outlined transition-all" :class="[route.path === item.path ? 'scale-110' : '']" :style="route.path === item.path ? 'font-variation-settings: \'FILL\' 1' : ''">
          {{ item.icon }}
        </span>
        <span class="font-label text-xs uppercase tracking-widest font-semibold">{{ item.label }}</span>
        
        <div v-if="route.path === item.path" class="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(115,92,0,0.5)]"></div>
      </NuxtLink>
    </nav>

    <div class="mt-auto border-t border-primary/5 pt-8 px-2">
      <!-- Authenticated User -->
      <div v-if="userStore.firebaseUser" class="space-y-6">
        <div class="flex items-center gap-4">
          <CameoAvatar :src="userStore.user.avatar" size="sm" class="ring-2 ring-primary/20" />
          <div class="flex-1 min-w-0">
            <p class="font-headline text-sm font-bold leading-tight select-none">{{ userStore.user.name }}</p>
            <p class="font-label text-[10px] uppercase tracking-widest text-primary mt-0.5 leading-none">{{ userStore.currentRank.title }}</p>
          </div>
        </div>
        
        <button @click="userStore.logout" class="w-full py-3 border border-red-900/10 text-red-900 font-label text-[10px] uppercase tracking-[0.4em] hover:bg-red-50 transition-colors rounded-xl flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-sm">logout</span>
          Quitter
        </button>
      </div>

      <!-- Guest / Login -->
      <div v-else class="space-y-4">
        <button 
          @click="userStore.login" 
          class="w-full py-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 group overflow-hidden relative"
        >
          <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span class="material-symbols-outlined text-sm relative z-10">lock_open</span>
          <span class="font-label text-xs uppercase tracking-[0.2em] font-bold relative z-10">Rejoindre la Cour</span>
        </button>
        <p class="text-[9px] font-label text-center text-outline/40 uppercase tracking-widest">Via Google Identity</p>
      </div>
      
      <p class="mt-8 font-label text-[9px] uppercase tracking-[0.2em] text-outline/30 text-center italic">
        Fait le {{ new Date().toLocaleDateString() }} • Versailles
      </p>
    </div>
  </aside>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
const userStore = useUserStore()
const route = useRoute()

const navItems = [
  { label: 'Le Grand Hall', path: '/hall', icon: 'fort' },
  { label: 'Plis Scellés', path: '/messages', icon: 'history_edu' },
  { label: 'Salle de Bal', path: '/salle-de-bal', icon: 'theater_comedy' },
  { label: 'Le Boudoir', path: '/boudoir', icon: 'lock' },
  { label: 'La Gazette', path: '/gazette', icon: 'newspaper' },
  { label: 'Mon Profil', path: '/profile', icon: 'gavel' }
]
</script>
