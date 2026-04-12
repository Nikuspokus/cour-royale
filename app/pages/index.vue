<template>
  <div class="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-10 pb-20 overflow-hidden bg-[#fbf9f4]">
    <!-- Background Accents -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center">
      <span class="material-symbols-outlined text-[40rem] lg:text-[60rem] text-amber-900/20">flare</span>
    </div>

    <!-- THE BALANCED CENTER WRAPPER -->
    <div class="relative z-10 flex flex-col items-center justify-center">
      
      <!-- Typography: Invitation Text -->
      <div class="text-center mb-10 md:mb-8 anim-fade-in-up">
        <h2 class="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-royal-ink mb-2 tracking-tighter drop-shadow-sm">Votre Excellence</h2>
        <p class="font-headline font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-royal-ink/70 italic tracking-wide">est Mandée...</p>
      </div>

      <!-- Envelope (Block Version) -->
      <div 
        ref="envelopeRef" 
        class="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[520px] aspect-[4/3] bg-[#f7f5ef] rounded-sm shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] vellum-texture border border-primary/20 flex items-center justify-center transition-all duration-700 perspective-1000 opacity-100"
      >
        
        <!-- Interior Glow -->
        <div class="absolute inset-4 md:inset-6 border border-dashed border-primary/30 rounded-sm opacity-60"></div>
        
        <!-- Content -->
        <div class="z-0 px-8 py-10 text-center flex flex-col items-center">
          <span class="material-symbols-outlined text-primary/30 text-7xl md:text-8xl mb-6">history_edu</span>
          <p class="font-label uppercase tracking-[0.4em] text-[10px] md:text-xs text-primary/60 font-black">Grand Bal de l'Éclipse</p>
          <div class="h-[1px] w-24 bg-primary/20 my-4"></div>
          <p class="font-body text-[9px] md:text-[11px] text-primary/40 uppercase tracking-[0.2em]">Palais de Versailles • XVIIe Siècle</p>
        </div>

        <!-- Envelope Flap -->
        <div 
          ref="flapRef" 
          class="absolute top-0 left-0 w-full h-[55%] bg-[#f7f3e9] clip-path-polygon-[0_0,100%_0,50%_100%] origin-top border-b border-primary/10 shadow-md z-20"
          style="backface-visibility: hidden;"
        >
          <div class="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent"></div>
        </div>
        
        <!-- ROYAL WAX SEAL -->
        <div class="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <RoyalWaxSeal 
            ref="sealRef"
            @click="handleUnseal" 
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-14 md:mt-16 text-center anim-fade-in" style="animation-delay: 0.6s">
        <p class="font-body text-royal-ink font-medium italic text-lg sm:text-xl md:text-2xl max-w-[320px] md:max-w-[450px] mx-auto leading-relaxed">
          La Cour de Versailles sollicite l'honneur de votre présence au Grand Salon.
        </p>
        <div class="flex justify-center gap-8 mt-10 opacity-20">
          <span class="material-symbols-outlined text-base md:text-xl">star</span>
          <span class="material-symbols-outlined text-base md:text-xl">flare</span>
          <span class="material-symbols-outlined text-base md:text-xl">star</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import RoyalWaxSeal from '~/components/RoyalWaxSeal.vue'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const envelopeRef = ref(null)
const flapRef = ref(null)
const sealRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  tl.from('.anim-fade-in-up', { y: 40, opacity: 0, duration: 1.2 })
    .from(envelopeRef.value, { 
      scale: 0.95, 
      duration: 1.5 
    }, '-=0.8')
    .from('.anim-fade-in', { opacity: 0, stagger: 0.2, duration: 1 }, '-=1')
})

const handleUnseal = () => {
  if (!sealRef.value) return

  // 1. Break the seal
  sealRef.value.breakSeal()

  // 2. Open the envelope flap
  gsap.to(flapRef.value, {
    rotationX: -160,
    duration: 1.5,
    delay: 0.4,
    ease: 'power2.inOut',
    boxShadow: '0 -20px 40px rgba(0,0,0,0.1)'
  })

  // 3. Zoom into the envelope and transition
  gsap.to(envelopeRef.value, {
    scale: 1.5,
    y: 100,
    opacity: 0,
    duration: 1.2,
    delay: 1.8, // Original delay
    ease: 'power3.in',
    onComplete: () => {
      router.push('/onboarding/quiz')
    }
  })
}
</script>

<style scoped>
.clip-path-polygon-\[0_0\,100\%_0\,50\%_100\%\] {
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
