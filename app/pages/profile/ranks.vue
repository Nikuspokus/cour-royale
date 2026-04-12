<template>
  <div class="min-h-screen parchment-texture pb-32 px-6 pt-12">
    <div class="mb-8 flex items-center gap-4">
      <NuxtLink to="/profile" class="text-primary hover:scale-110 transition-transform">
        <span class="material-symbols-outlined">arrow_back</span>
      </NuxtLink>
      <div>
        <h2 class="font-headline text-2xl italic text-on-surface leading-tight">Tableau des Rangs</h2>
        <p class="font-label text-[10px] tracking-widest text-primary uppercase">Hiérarchie de la Cour Royale</p>
      </div>
    </div>

    <!-- Hierarchy List -->
    <div class="space-y-4">
      <div v-for="rank in nobleRanks" :key="rank.level" 
        class="p-6 rounded-2xl border transition-all"
        :class="[
          rank.level === userStore.currentRank.level 
            ? 'bg-primary-container/10 border-primary shadow-lg ring-1 ring-primary/20 scale-[1.02]' 
            : rank.level < userStore.currentRank.level 
              ? 'bg-surface-container-low border-primary/5 opacity-60' 
              : 'bg-surface-container-low border-primary/5 opacity-30 grayscale'
        ]"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-4">
            <div :class="[
              'w-12 h-12 rounded-full flex items-center justify-center shadow-inner', 
              rank.level === userStore.currentRank.level ? 'bg-primary text-white' : 'bg-surface-container-high text-outline'
            ]">
              <span class="material-symbols-outlined">{{ rank.icon }}</span>
            </div>
            <div>
              <p :class="['font-headline text-lg italic', rank.level === userStore.currentRank.level ? 'text-primary' : 'text-on-surface']">
                {{ rank.title }}
              </p>
              <p class="text-[9px] font-label uppercase tracking-[0.2em] opacity-60">
                Requis: {{ formatInfluence(rank.requirement) }} Influence
              </p>
            </div>
          </div>
          <div v-if="rank.level === userStore.currentRank.level" class="bg-primary px-3 py-1 rounded-full animate-pulse">
            <span class="text-[8px] font-label uppercase tracking-widest text-white font-bold">Votre Actuel</span>
          </div>
          <div v-else-if="rank.level < userStore.currentRank.level" class="text-primary opacity-40">
            <span class="material-symbols-outlined text-sm">verified</span>
          </div>
        </div>
        
        <!-- Progress Bar (Only for current rank to next) -->
        <div v-if="rank.level === userStore.currentRank.level && userStore.nextRank" class="mt-4 anim-fade-in">
           <div class="flex justify-between text-[9px] font-label uppercase tracking-widest mb-1 opacity-60">
             <span>Progression vers {{ userStore.nextRank.title }}</span>
             <span>{{ userStore.progression }}%</span>
           </div>
           <div class="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
             <div 
               class="h-full bg-primary transition-all duration-1000" 
               :style="{ width: `${userStore.progression}%` }"
             ></div>
           </div>
        </div>
      </div>
    </div>

    <!-- Armorial Section Link -->
    <div class="mt-12 p-8 bg-surface-container-highest rounded-[2rem] text-center border-2 border-dashed border-primary/20">
      <span class="material-symbols-outlined text-4xl text-primary mb-4">shield</span>
      <h3 class="font-headline italic text-xl text-on-surface mb-2">L'Armorial des Familles</h3>
      <p class="font-body text-sm text-outline mb-6 italic">Consultez les blasons et les alliances des lignées prestigieuses.</p>
      <button class="px-8 py-3 bg-primary text-white rounded-full font-label text-[10px] tracking-[0.3em] uppercase shadow-xl active:scale-95 transition-all">
        Ouvrir le Registre
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import mockData from '~/data/mock_data.json'

const userStore = useUserStore()
const nobleRanks = ref([...mockData.nobleRanks].reverse()) // Show highest first

const formatInfluence = (val) => {
  return val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val
}

definePageMeta({
  layout: 'default'
})
</script>
