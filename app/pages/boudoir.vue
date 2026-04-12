<template>
  <div class="boudoir min-h-screen bg-royal-ink pb-32">
    <!-- Intimate Header -->
    <header class="h-80 relative flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-royal-ink opacity-60 z-10"></div>
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE77JO2HinL1L33_Uppqkl8-O_ZdxZA_A-diUwKJ5yyDxe3X5wr7dw7Z6SwGixjybnR-5K8zViR0brNAhwW8JrGIqghZdfuN_m-Rxy95ZPSMdB0OBc6GYGtpoYxlKvOLAER2lK3V3H_7kLLCzDCe9EdHD0_ucAYpmjbhIm6WJwLaE-tk5BhJ1fsv51n0GFjYycSMkRyN5Lv4DQBnCLzC6iHyitCrmhQaePxK7QZW69P7DMBGjX4MHyg4zfkk0qhSKRjccZaEn7bg" 
        class="absolute inset-0 w-full h-full object-cover filter blur-[2px] opacity-20 scale-110" 
      />
      
      <div class="relative z-20 text-center space-y-6 px-6 anim-fade-in w-full max-w-2xl">
        <div class="space-y-2">
          <span class="font-label text-xs uppercase tracking-[0.5em] text-primary-container/60">Espace de Haute Confidentialité</span>
          <h2 class="font-headline text-7xl text-white italic tracking-tight">Le Boudoir</h2>
        </div>

        <!-- Imperial Status Card -->
        <div v-if="userStore.firebaseUser" class="bg-stone-950/40 backdrop-blur-md p-8 rounded-sm border border-white/10 shadow-2xl space-y-4">
          <div class="flex justify-between items-end">
            <div class="text-left">
              <p class="font-label text-[10px] uppercase tracking-widest text-primary-container/60 mb-1">Votre Élévation</p>
              <h4 class="font-headline text-2xl text-white italic">{{ userStore.currentRank.title }}</h4>
            </div>
            <div class="text-right">
              <p class="font-label text-[10px] uppercase tracking-widest text-primary-container/60 mb-1">Influence accumulée</p>
              <p class="font-headline text-xl text-primary-container">{{ userStore.user.influence }} pts</p>
            </div>
          </div>
          
          <!-- Prestige Progress Bar -->
          <div class="space-y-2">
            <div class="flex justify-between items-center text-[9px] font-label uppercase tracking-widest text-white/40">
              <span v-if="userStore.nextRank">Vers le rang de {{ userStore.nextRank.title }}</span>
              <span v-else>Apogée atteint</span>
              <span>{{ userStore.progression }}%</span>
            </div>
            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
              <div 
                class="h-full bg-gradient-to-r from-primary-container/60 to-primary-container transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                :style="{ width: `${userStore.progression}%` }"
              ></div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4 text-primary-container/40 pt-4">
          <span class="material-symbols-outlined text-sm">lock</span>
          <p class="font-body italic text-lg opacity-80">Rien de ce qui est dit ici ne passera les grilles.</p>
          <span class="material-symbols-outlined text-sm">lock</span>
        </div>
      </div>
    </header>

    <!-- Influence Guide: Education -->
    <section class="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
      <div class="bg-stone-900/80 backdrop-blur-lg border border-primary-container/10 p-10 rounded-sm shadow-inner grid md:grid-cols-3 gap-8">
        <div class="space-y-3">
          <span class="material-symbols-outlined text-primary-container opacity-50">edit_note</span>
          <h5 class="font-headline text-white italic text-lg">Plume Royale</h5>
          <p class="text-xs text-stone-400 leading-relaxed font-body">Chaque proclamation dans la Gazette élève votre voix et vous rapporte des points d'influence.</p>
        </div>
        <div class="space-y-3">
          <span class="material-symbols-outlined text-primary-container opacity-50">favorite</span>
          <h5 class="font-headline text-white italic text-lg">Grâce de la Cour</h5>
          <p class="text-xs text-stone-400 leading-relaxed font-body">Susciter l'admiration de vos pairs (faveurs reçues) est le chemin le plus court vers les rangs supérieurs.</p>
        </div>
        <div class="space-y-3">
          <span class="material-symbols-outlined text-primary-container opacity-50">military_tech</span>
          <h5 class="font-headline text-white italic text-lg">Hauts Faits</h5>
          <p class="text-xs text-stone-400 leading-relaxed font-body">L'assiduité au Palais et le respect de l'Étiquette vous octroient des brevets de noblesse immédiats.</p>
        </div>
      </div>
    </section>

    <!-- Main Content: Discussion Groups -->
    <main class="max-w-4xl mx-auto px-6 py-20 space-y-16">
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Exclusive Club Card -->
        <div 
          v-for="(club, idx) in courtStore.clubs" 
          :key="idx"
          @click="enterClub(club)"
          class="bg-white/[0.03] backdrop-blur-sm p-10 mt-6 rounded-none border-l-4 shadow-2xl relative group hover:bg-white/[0.05] transition-all cursor-pointer anim-fade-in-up"
          :class="[isAllowed(club) ? 'border-primary-container' : 'border-stone-700 opacity-50 grayscale']"
          :style="{ animationDelay: `${idx * 0.2}s` }"
        >
          <div v-if="!isAllowed(club)" class="absolute inset-0 z-20 flex items-center justify-center bg-stone-950/40 backdrop-blur-[2px]">
            <div class="text-center space-y-2">
              <span class="material-symbols-outlined text-primary-container text-4xl">lock</span>
              <p class="font-label text-[10px] uppercase tracking-widest text-primary-container">Rang Insuffisant</p>
            </div>
          </div>

          <div class="flex justify-between items-start mb-8">
            <div class="w-12 h-12 bg-primary-container/10 flex items-center justify-center text-primary-container">
              <span class="material-symbols-outlined text-3xl">{{ club.icon }}</span>
            </div>
            <span class="font-label text-[10px] uppercase tracking-[0.4em] text-primary-container/40">Niveau {{ club.minLevel }} Requis</span>
          </div>
          <h3 class="font-headline text-4xl text-white italic mb-4 tracking-tight group-hover:text-primary-container transition-colors">{{ club.name }}</h3>
          <p class="font-body text-stone-300/70 leading-relaxed mb-10 italic text-xl">
            "{{ club.description }}"
          </p>
          <div class="flex -space-x-4 overflow-hidden pt-6 border-t border-white/5 opacity-80">
            <CameoAvatar v-for="i in 3" :key="i" :src="`https://picsum.photos/seed/${idx + i}/100/100`" size="sm" class="ring-2 ring-[#050510]" />
          </div>
        </div>
      </div>

      <!-- Private Note FAB Style -->
      <div class="mt-20 flex flex-col items-center">
        <button class="flex flex-col items-center gap-6 group active:scale-95 transition-transform">
          <div class="w-24 h-24 rounded-full bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:bg-primary-container/20 transition-colors shadow-2xl">
            <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1">edit_square</span>
          </div>
          <span class="font-label text-xs uppercase tracking-[0.4em] text-primary-container">Ouvrir un Cercle Privé</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useCourtStore } from '~/stores/court'
import { useUserStore } from '~/stores/user'

const courtStore = useCourtStore()
const userStore = useUserStore()

const isAllowed = (club) => {
  return userStore.currentRank.level >= club.minLevel
}

const enterClub = (club) => {
  if (isAllowed(club)) {
    navigateTo(`/boudoir/${club.id}`)
  } else {
    // Dramatic notification could be added here
    alert(`Votre rang de ${userStore.currentRank.title} ne vous permet pas encore d'entrer au ${club.name}. Gagnez de l'influence pour être admis.`)
  }
}

definePageMeta({
  layout: 'default'
})
</script>
