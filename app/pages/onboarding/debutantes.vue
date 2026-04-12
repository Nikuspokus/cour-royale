<template>
  <div class="min-h-screen bg-background flex flex-col p-8 items-center pt-20">
    <!-- Progress Indicator -->
    <div class="w-full max-w-xs flex gap-2 mb-12">
      <div v-for="i in 3" :key="i" :class="['h-1.5 flex-1 rounded-full', i <= currentStep ? 'bg-primary' : 'bg-primary/20']"></div>
    </div>

    <!-- Step Content -->
    <div class="flex-1 w-full max-w-sm text-center flex flex-col items-center">
      <div v-if="currentStep === 1" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span class="material-symbols-outlined text-6xl text-primary-container mb-6">theater_comedy</span>
        <h2 class="font-headline italic text-3xl text-primary mb-4 tracking-tight">Apprenez l'Étiquette</h2>
        <p class="font-body text-lg text-primary/70 leading-relaxed italic mb-8">
          "À la Cour, un mot mal placé vaut mille disgrâces. Maîtrisez l'art de la conversation pour gagner vos premiers points de réputation."
        </p>
      </div>

      <div v-if="currentStep === 2" class="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <span class="material-symbols-outlined text-6xl text-primary-container mb-6">diversity_3</span>
        <h2 class="font-headline italic text-3xl text-primary mb-4 tracking-tight">Le Cercle des Élus</h2>
        <p class="font-body text-lg text-primary/70 leading-relaxed italic mb-8">
          "Rejoignez les cercles d'influence. Comtes et Marquis attendent vos proclamations dans le Grand Hall."
        </p>
      </div>

      <div v-if="currentStep === 3" class="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center w-full">
        <div class="mb-8">
          <CameoAvatar 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUzVRNWnlyF-RhP7h0j44V5c9_3kW_oN5RDuSYKgUMIeA4N2It6lX9uliw9CeYg8_7ZmDspo7XHSe_V-9QGc1F2OkWuOPDe9CxuU4tin-i6sjXFq4L9oOnNtPg3iLg2GY9Su40nGb-UkdB9DD_l2ahnvmY3IKTXB5_YHXZuapcnGrSImvJEzvSUDZqemsqENQ-NVL4FTL8R4n6UFMWbyT9hsvaRuIAkMbtaUGmL3VHCHHj8JwvRmeGVihZ5PWjKwmEuiztQINzGA" 
            size="lg"
            class="mx-auto"
          />
        </div>
        <h2 class="font-headline italic text-3xl text-primary mb-4 tracking-tight">Prêt pour le Bal ?</h2>
        <p class="font-body text-lg text-primary/70 leading-relaxed italic mb-12">
          "Votre nom a été inscrit au registre. Entrez dans la lumière, l'Observatrice vous regarde."
        </p>
      </div>

      <!-- Navigation -->
      <button 
        @click="next" 
        class="w-full py-4 bg-tertiary text-white rounded-full font-label text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
      >
        <span>{{ currentStep < 3 ? 'Continuer' : 'Entrer au Palais' }}</span>
        <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const currentStep = ref(1)
const router = useRouter()

const next = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  } else {
    router.push('/hall')
  }
}
</script>
