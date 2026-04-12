<template>
  <div class="pb-32 px-6 max-w-5xl mx-auto overflow-hidden">
    <!-- Imperial Noble Header -->
    <div class="relative h-56 md:h-72 mb-20 group anim-header">
      <!-- Velvet Banner with Gold Ornaments -->
      <div class="absolute inset-0 velvet-texture rounded-3xl overflow-hidden shadow-2xl border-b-4 border-primary/30">
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        
        <!-- Subtle Royal Pattern -->
        <div class="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <span class="material-symbols-outlined text-[300px] rotate-12">toys_fan</span>
        </div>

        <!-- NEW: Dust Motes / Sparkles -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div v-for="i in 15" :key="i" 
               class="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
               :style="{ 
                 top: Math.random() * 100 + '%', 
                 left: Math.random() * 100 + '%', 
                 animationDelay: Math.random() * 5 + 's',
                 animationDuration: (2 + Math.random() * 3) + 's'
               }">
          </div>
        </div>
      </div>

      <!-- Overlapping Imperial Cameo -->
      <div class="absolute -bottom-14 left-1/2 md:left-16 -translate-x-1/2 md:translate-x-0 anim-cameo">
        <div class="relative p-1.5 bg-gradient-to-tr from-primary via-white to-primary rounded-full shadow-2xl imperial-shadow">
          <CameoAvatar 
            :src="userStore.user.avatar" 
            size="lg"
            class="scale-110 md:scale-125 border-4 border-background"
          />
          <div class="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-background">
            <span class="material-symbols-outlined text-xs">verified</span>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-12 gap-12 pt-4">
      <!-- LEFT COLUMN: Identity & Stats -->
      <div class="lg:col-span-12 xl:col-span-7 space-y-12">
        <div class="text-center md:text-left space-y-4 anim-intro">
          <div v-if="!isEditing" class="group cursor-pointer block" @click="isEditing = true">
            <h2 
              class="font-headline font-black italic tracking-tighter text-on-surface flex flex-wrap items-center gap-4 leading-tight break-words"
              :class="userStore.user.name.length > 20 ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'"
            >
              {{ userStore.user.name }}
              <span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-40 transition-opacity">edit</span>
            </h2>
            <p class="font-label text-xs md:text-sm tracking-[0.4em] text-primary uppercase mt-2">{{ userStore.currentRank.title }}</p>
          </div>
          
          <div v-else class="max-w-md space-y-4 anim-fade-in relative">
            <!-- WAX SEAL TARGET AREA -->
            <div ref="sealRef" class="absolute -right-8 -bottom-8 w-24 h-24 pointer-events-none opacity-0 z-50">
              <img src="/assets/wax-seal-stamp.png" class="w-full h-full object-contain drop-shadow-2xl" />
            </div>

            <textarea 
              v-model="editForm.name"
              rows="2"
              class="w-full bg-transparent border-b-2 border-primary/20 font-headline italic focus:border-primary focus:ring-0 transition-colors leading-tight break-words resize-none overflow-hidden"
              :class="editForm.name.length > 20 ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'"
              placeholder="Votre Nom"
            ></textarea>
            <div class="flex gap-2">
              <button 
                @click="saveProfile" 
                :disabled="isSaving"
                class="relative px-6 py-2 bg-primary text-white rounded-full font-label text-[10px] uppercase tracking-widest shadow-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
              >
                <div class="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform"></div>
                {{ isSaving ? 'Scellage...' : 'Sceller l\'Identité' }}
              </button>
              <button @click="isEditing = false" :disabled="isSaving" class="px-6 py-2 border border-primary/20 rounded-full font-label text-[10px] uppercase tracking-widest">Annuler</button>
            </div>
          </div>
          
          <!-- Stats Row (Official Seals) -->
          <div class="flex flex-wrap justify-center md:justify-start gap-10 md:gap-12 mt-12 anim-stats">
            <div class="text-center group cursor-pointer relative pt-2 min-w-[80px]">
              <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/20"></div>
              <p class="text-4xl md:text-5xl font-headline italic font-black text-primary drop-shadow-sm">{{ userStore.user.reputation || 0 }}</p>
              <p class="text-[10px] font-label uppercase tracking-[0.3em] opacity-50 font-bold">Réputation</p>
            </div>
            
            <div class="hidden sm:block h-16 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent self-center"></div>
            
            <div class="text-center group cursor-pointer relative pt-2 min-w-[80px]">
              <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/20"></div>
              <p class="text-4xl md:text-5xl font-headline italic font-black text-tertiary drop-shadow-sm">{{ formatInfluence(userStore.user.influence) }}</p>
              <p class="text-[10px] font-label uppercase tracking-[0.3em] opacity-50 font-bold">Influence</p>
            </div>

            <div class="hidden sm:block h-16 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent self-center"></div>

            <div class="text-center group cursor-pointer relative pt-2 min-w-[80px]">
              <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/20"></div>
              <div class="flex flex-col items-center">
                <p class="text-4xl md:text-5xl font-headline italic font-black text-amber-600 drop-shadow-sm">{{ userStore.currentRank.level }}</p>
                <p class="text-[10px] font-label uppercase tracking-[0.3em] opacity-50 font-bold">Niveau</p>
              </div>
            </div>
          </div>

          <!-- Level Progression & Ranks Navigation -->
          <div v-if="userStore.nextRank" class="mt-12 flex flex-col md:flex-row md:items-center gap-10 md:gap-14 anim-fade-in" style="animation-delay: 0.8s">
            <!-- The Bar -->
            <div class="flex-1 max-w-sm space-y-3">
              <div class="flex justify-between items-end">
                <p class="font-label text-[9px] uppercase tracking-widest text-primary/60">Vers le rang de <span class="text-primary font-bold">{{ userStore.nextRank.title }}</span></p>
                <p class="font-headline italic text-sm text-primary/80">{{ userStore.progression }}%</p>
              </div>
              <div class="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden p-[1px] border border-primary/5">
                <div 
                  class="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(115,92,0,0.3)]" 
                  :style="{ width: `${userStore.progression}%` }"
                ></div>
              </div>
            </div>

            <!-- The 'Sexy Minimalist' Button -->
            <NuxtLink to="/profile/ranks" 
              class="px-8 py-3 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 text-center group relative overflow-hidden font-label text-[10px] uppercase tracking-[0.2em] font-black h-fit shrink-0 border-2 border-transparent"
              style="background-image: linear-gradient(#fbf9f4, #fbf9f4), linear-gradient(to top right, #d4af37, #fcfaf2, #d4af37); background-origin: border-box; background-clip: padding-box, border-box;"
            >
              <span class="relative z-10 text-primary">Consulter les Rangs Nobles</span>
              
              <!-- Shimmer Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
            </NuxtLink>
          </div>
        </div>

        <!-- NOBLE BIOGRAPHY -->
        <section class="royal-section parchment-texture p-8 md:p-12 rounded-sm shadow-xl relative overflow-hidden group border-b-2 border-primary/10">
          <div class="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:rotate-6 transition-transform">
            <span class="material-symbols-outlined text-7xl text-primary">history_edu</span>
          </div>
          <h3 class="font-headline italic text-2xl text-stone-900 border-b border-primary/5 pb-4 mb-6">Archives de la Lignée</h3>
          <p class="font-body text-xl text-stone-700 leading-relaxed italic">
            "Noble de naissance ou par le mérite, votre histoire s'écrit dans les couloirs de Versailles. Vos ancêtres ont foulé ce sol avant vous, et votre trace sera indélébile."
          </p>
        </section>

        <!-- NEW: GALERIE DES HONNEURS (MEDALS Cabinet) -->
        <section class="royal-section bg-surface-container-low vellum-texture p-8 md:p-12 rounded-3xl border-4 border-double border-primary/30 shadow-2xl relative overflow-hidden">
          <!-- Royal Watermark (Filigrane) -->
          <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span class="material-symbols-outlined text-[300px] text-tertiary">toys_fan</span>
          </div>
          
          <div class="flex items-center justify-between mb-12 relative z-10 border-b border-primary/10 pb-6">
            <h3 class="font-headline italic text-3xl text-on-surface">Galerie des Honneurs</h3>
            <div class="px-4 py-1 bg-primary/5 border border-primary/20 rounded-full">
              <p class="font-label text-[10px] uppercase tracking-widest text-primary font-black">
                {{ userStore.user.unlockedAchievements?.length || 0 }} / {{ allAchievements.length }}
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-4 md:grid-cols-5 gap-y-12 gap-x-8 relative z-10">
            <div v-for="medal in allAchievements" :key="medal.id" 
                 class="group relative flex flex-col items-center gap-3 transition-all duration-500">
              
              <!-- THE MEDAL SEAL (High Contrast) -->
              <div class="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500"
                   :class="isUnlocked(medal.id) ? 'scale-100 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'opacity-20 grayscale scale-90 group-hover:opacity-30'">
                
                <!-- Radiant glow for unlocked -->
                <div v-if="isUnlocked(medal.id)" 
                     class="absolute inset-0 rounded-full bg-amber-500/10 animate-pulse blur-xl"></div>
                
                <!-- Rotating ornate star for unlocked -->
                <div v-if="isUnlocked(medal.id)" 
                     class="absolute -inset-1 rounded-full border border-primary-container/30 animate-spin-slow opacity-40"></div>
                
                <!-- Medal Core -->
                <div class="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all duration-300 ring-4 ring-black/20"
                     :class="isUnlocked(medal.id) 
                        ? 'bg-gradient-to-tr from-[#8a6d3b] via-[#d4af37] to-[#fcfaf2] border-primary-container shadow-[0_10px_20px_rgba(0,0,0,0.5)]' 
                        : 'bg-stone-800 border-stone-700'">
                   
                   <span class="material-symbols-outlined text-2xl md:text-4xl transition-all"
                         :class="isUnlocked(medal.id) ? 'text-amber-900 drop-shadow-md' : 'text-stone-600'">
                     {{ medal.icon }}
                   </span>
                </div>

                <!-- Shine Overlay -->
                <div v-if="isUnlocked(medal.id)" class="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none rounded-full"></div>
              </div>

              <span class="font-label text-[8px] md:text-[9px] uppercase tracking-widest text-center transition-colors leading-tight"
                    :class="isUnlocked(medal.id) ? 'text-stone-800 font-black' : 'text-stone-400'">
                {{ medal.name }}
              </span>

              <!-- TOOLTIP (Royal Style) -->
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-royal-ink text-white p-5 rounded-sm shadow-2xl opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible transition-all duration-300 pointer-events-none z-[100] border border-primary-container/20">
                <div class="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
                   <div class="w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_white]" v-if="isUnlocked(medal.id)"></div>
                   <p class="font-headline italic text-primary-container text-xl leading-none">{{ medal.name }}</p>
                </div>
                <p class="font-body text-xs leading-relaxed mb-4 text-stone-300" :class="!isUnlocked(medal.id) ? 'italic opacity-60' : ''">{{ medal.description }}</p>
                
                <!-- REWARDS -->
                <div v-if="medal.rewardReputation || medal.rewardInfluence" 
                     class="mb-4 p-3 rounded-sm bg-primary/5 border border-primary/20 flex gap-4">
                  <div v-if="medal.rewardReputation" class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-xs text-amber-500">verified</span>
                    <span class="font-label text-xs font-bold text-amber-200">+{{ medal.rewardReputation }}</span>
                  </div>
                  <div v-if="medal.rewardInfluence" class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-xs text-primary-container">diamond</span>
                    <span class="font-label text-xs font-bold text-primary-container">+{{ medal.rewardInfluence }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-2 py-2 px-3 rounded-sm bg-primary/5 border border-primary/10">
                  <span class="material-symbols-outlined text-xs" :class="isUnlocked(medal.id) ? 'text-primary' : 'text-stone-400'">
                    {{ isUnlocked(medal.id) ? 'verified' : 'lock' }}
                  </span>
                  <span class="font-label text-[9px] uppercase tracking-widest" :class="isUnlocked(medal.id) ? 'text-primary font-bold' : 'text-stone-400'">
                    {{ isUnlocked(medal.id) ? 'Honneur Scellé' : 'Mérite à Conquérir' }}
                  </span>
                </div>

                <!-- Tooltip Arrow -->
                <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-3 h-3 bg-royal-ink rotate-45 border-r border-b border-primary-container/20"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- RIGHT COLUMN: Preferences & Navigation -->
      <div class="lg:col-span-12 xl:col-span-5 space-y-8">
        <!-- Preferences Card -->
        <div class="royal-section bg-surface-container-low p-8 rounded-2xl border border-primary/10 vellum-texture shadow-xl">
          <h3 class="font-headline italic text-xl text-on-surface mb-8">Service du Palais</h3>
          
          <div class="space-y-8">
            <label class="flex items-center justify-between cursor-pointer group">
              <div class="space-y-1">
                <p class="font-headline text-lg italic">Effet Grain de Film</p>
                <p class="font-label text-[9px] uppercase tracking-widest text-outline">Immersion visuelle</p>
              </div>
              <input type="checkbox" v-model="userStore.user.preferences.grainEffect" class="hidden peer">
              <div class="w-12 h-6 bg-stone-200 rounded-full peer-checked:bg-primary relative transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>

            <label class="flex items-center justify-between cursor-pointer group">
              <div class="space-y-1">
                <p class="font-headline text-lg italic">Notifications</p>
                <p class="font-label text-[9px] uppercase tracking-widest text-outline">Courriers scellés</p>
              </div>
              <input type="checkbox" v-model="userStore.user.preferences.notifications" class="hidden peer">
              <div class="w-12 h-6 bg-stone-200 rounded-full peer-checked:bg-primary relative transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          <!-- Discrete Logout at the bottom of settings -->
          <div class="mt-12 pt-8 border-t border-primary/10">
            <button @click="logout" class="w-full p-4 border border-red-900/10 text-red-900/40 hover:text-red-900 hover:bg-red-50/50 font-label text-[9px] uppercase tracking-[0.4em] transition-all rounded-xl flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">logout</span>
              Partir en Exil
            </button>
          </div>
        </div>

        </div>
      </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import achievementsData from '~/data/achievements.json'
import gsap from 'gsap'

const userStore = useUserStore()
const isEditing = ref(false)
const isSaving = ref(false)
const sealRef = ref(null)

const allAchievements = ref(achievementsData)

const editForm = ref({
  name: userStore.user.name
})

const isUnlocked = (id) => {
  return userStore.user.unlockedAchievements?.includes(id)
}

// GSAP INTRO ANIMATIONS
onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from('.anim-header', { y: -50, opacity: 0, duration: 1 })
    .from('.anim-cameo', { scale: 0, rotation: -20, duration: 0.8 }, '-=0.4')
    .from('.anim-intro h2, .anim-intro p', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
    .from('.anim-stats', { y: 20, opacity: 0, duration: 0.6 }, '-=0.2')
    .from('.royal-section', { 
      y: 100, 
      opacity: 0, 
      rotationX: 30, 
      transformOrigin: 'top center',
      stagger: 0.15, 
      duration: 1 
    }, '-=0.3')
})

// Update local form when store name changes (anonymization sync)
watch(() => userStore.user.name, (newName) => {
  if (!isSaving.value && !isEditing.value) {
    editForm.value.name = newName
  }
})

const saveProfile = async () => {
  if (isSaving.value) return
  
  const originalName = userStore.user.name
  const newName = editForm.value.name
  
  if (newName === originalName) {
    isEditing.value = false
    return
  }

  try {
    isSaving.value = true
    
    // WAX SEAL ANIMATION
    if (sealRef.value) {
      gsap.to(sealRef.value, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotation: -15, 
        duration: 0.4, 
        ease: 'back.out(2)' 
      })
    }

    await userStore.updateProfile({ name: newName })
    
    // Impact effect
    if (sealRef.value) {
      gsap.to(sealRef.value, { 
        scale: 1.2, 
        opacity: 0, 
        duration: 0.6, 
        delay: 0.5,
        ease: 'power2.in' 
      })
    }

    isEditing.value = false
  } catch (error) {
    console.error("[Profile] Erreur interceptée:", error)
    if (error.message === 'NAME_TAKEN') {
      alert("Ce nom est déjà porté par un autre membre de la Cour.")
    } else {
      alert("Le scellement de votre nom a rencontré un obstacle.")
    }
  } finally {
    isSaving.value = false
  }
}

const formatInfluence = (val) => {
  return val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val
}

const logout = async () => {
  if (confirm('Souhaitez-vous vraiment quitter Versailles ?')) {
    await userStore.logout()
  }
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.royal-section {
  perspective: 1000px;
}

.animate-spin-slow {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.imperial-shadow {
  filter: drop-shadow(0 0 20px rgba(var(--primary-rgb), 0.3));
}
</style>
