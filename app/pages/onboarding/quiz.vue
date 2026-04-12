<template>
  <div class="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
    <!-- Decorative Accents -->
    <div class="absolute top-10 left-10 opacity-10 pointer-events-none">
      <span class="material-symbols-outlined text-9xl">filter_vintage</span>
    </div>
    <div class="absolute bottom-10 right-10 opacity-10 pointer-events-none transform rotate-180">
      <span class="material-symbols-outlined text-9xl">filter_vintage</span>
    </div>

    <!-- Onboarding Step Header -->
    <div class="text-center mb-12 anim-fade-in">
      <span class="font-label text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-2 block">Interrogatoire de la Cour</span>
      <h2 class="font-headline italic text-4xl md:text-5xl text-primary leading-tight">L'Examen du Duc de Saint-Simon</h2>
      <div class="flex items-center justify-center gap-4 mt-6">
        <div class="h-[1px] w-12 bg-primary/20"></div>
        <span class="material-symbols-outlined text-sm text-primary">gavel</span>
        <div class="h-[1px] w-12 bg-primary/20"></div>
      </div>
    </div>

    <!-- Progress Tracker with Crown -->
    <div class="w-full max-w-md mb-16 relative">
      <div class="h-[1px] w-full bg-primary/10"></div>
      <div 
        class="absolute top-0 left-0 h-[1px] bg-stone-900 transition-all duration-1000" 
        :style="{ width: `${(currentStep / steps.length) * 100}%` }"
      ></div>
      <div 
        class="absolute -top-6 transition-all duration-1000" 
        :style="{ left: `${(currentStep / steps.length) * 100}%`, transform: 'translateX(-50%)' }"
      >
        <span class="material-symbols-outlined text-stone-900 text-xl" style="font-variation-settings: 'FILL' 1">shield</span>
      </div>
    </div>

    <!-- Quiz Content Canvas -->
    <div class="w-full max-w-lg bg-surface-container-lowest p-10 rounded-sm border border-primary/10 shadow-2xl relative vellum-texture">
      <!-- Portrait of DSS (Cameo Avatar) -->
      <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-stone-900 overflow-hidden shadow-2xl z-20">
        <img src="/assets/dss-cameo.png" class="w-full h-full object-cover" />
      </div>

      <Transition name="fade-slide" mode="out-in">
        <div :key="currentStep" class="space-y-8 pt-8 text-center">
          <div class="space-y-4">
            <p class="font-label text-[10px] text-stone-400 tracking-widest uppercase italic">
              Épreuve {{ currentStep + 1 }}
            </p>
            <h3 class="font-headline text-2xl text-stone-900 leading-snug">
              {{ steps[currentStep].question }}
            </h3>
          </div>

          <div class="space-y-3">
            <button 
              v-for="(option, idx) in steps[currentStep].options" 
              :key="idx"
              @click="selectOption(idx)"
              class="w-full text-center p-5 border-b border-primary/10 hover:bg-stone-50 transition-all group"
              :class="{ 'bg-stone-100 font-bold': selectedOption === idx }"
            >
              <span class="font-body text-lg group-hover:text-stone-900 transition-colors">
                {{ option }}
              </span>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Sceller / Action Button -->
    <div class="mt-16 flex flex-col items-center gap-6 anim-fade-in" style="animation-delay: 0.3s">
      <WaxSeal @click="nextStep">
        {{ currentStep === steps.length - 1 ? 'Soumettre au Duc' : 'Continuer' }}
      </WaxSeal>
      <p class="font-label text-[9px] uppercase tracking-[0.4em] text-primary/40 italic">
        "L'insolence sera punie, la dignité récompensée."
      </p>
    </div>

    <!-- Gold Dust Particles Overlay (Canvas or Static) -->
    <div v-if="showSuccess" class="fixed inset-0 z-50 pointer-events-none bg-stone-950/90 flex flex-col items-center justify-center anim-fade-in">
      <div class="text-center space-y-6">
        <div class="relative inline-block">
          <div class="black-wax-seal mx-auto flex items-center justify-center">DSS</div>
          <div class="smoke-effect"></div>
        </div>
        <h2 class="font-headline text-5xl text-primary italic">Accepté par Mépris</h2>
        <p class="font-label tracking-widest text-primary-container uppercase">Le Duc vous octroie 100 Influence (avec condescendance)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const currentStep = ref(0)
const selectedOption = ref(null)
const showSuccess = ref(false)

const steps = [
  {
    question: "Un noble de rang inférieur vous adresse la parole sans y être invité. Votre réaction ?",
    options: [
      "L'ignorer superbement et appeler mon valet.",
      "Lui rappeler sèchement l'ordre des préséances.",
      "L'écouter avec une moue de profond dégoût."
    ]
  },
  {
    question: "La Gazette du Duc publie une rumeur sur votre famille. Que faites-vous ?",
    options: [
      "Acheter le silence du Duc avec des Louis d'Or.",
      "Dénoncer un rival pour détourner l'attention.",
      "Savourer le scandale, l'infamie est une parure."
    ]
  },
  {
    question: "L'étiquette exige que vous portiez le noir pour le deuil d'un Prince. Vous préférez...",
    options: [
      "Le velours noir le plus profond, sans fioriture.",
      "Une soie sombre moirée pour attirer les regards.",
      "Le deuil est une comédie, je porterai du pourpre."
    ]
  }
]

const selectOption = (idx) => {
  selectedOption.value = idx
}

const nextStep = () => {
  if (selectedOption.value === null) return

  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    selectedOption.value = null
  } else {
    finishQuiz()
  }
}

const finishQuiz = () => {
  showSuccess.value = true
  setTimeout(() => {
    router.push('/hall')
  }, 2500)
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
