<template>
  <div class="relative cursor-pointer group select-none" @click="$emit('click')">
    <!-- WAX SEAL CONTAINER -->
    <div 
      ref="sealRef" 
      class="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center transition-all duration-500 hover:scale-110"
    >
      
      <!-- LEFT PART -->
      <div 
        ref="leftPart" 
        class="absolute left-0 top-0 w-1/2 h-full overflow-hidden origin-right"
      >
        <div class="wax-image-half left-half"></div>
      </div>

      <!-- RIGHT PART -->
      <div 
        ref="rightPart" 
        class="absolute right-0 top-0 w-1/2 h-full overflow-hidden origin-left"
      >
        <div class="wax-image-half right-half"></div>
      </div>
    </div>

    <!-- LABEL: DECACHETER (Moved OUTSIDE the blend container to avoid darkening) -->
    <div class="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
      <span class="font-headline font-bold text-[11px] md:text-sm uppercase tracking-[0.8em] text-amber-950/80 drop-shadow-sm">
        Décacheter
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['click', 'crack'])

const sealRef = ref(null)
const leftPart = ref(null)
const rightPart = ref(null)

const breakSeal = () => {
  const tl = gsap.timeline({
    onComplete: () => emit('crack')
  })

  // 1. Sudden Snap (Stress before crack)
  tl.to(sealRef.value, { scale: 0.9, duration: 0.2, ease: 'power4.in' })
    .to(sealRef.value, { scale: 1.15, duration: 0.05, ease: 'back.out' })
    
  // 2. Realistic Split & Drop
  tl.to(leftPart.value, { 
    x: -120, 
    y: 40,
    rotation: -25, 
    opacity: 0, 
    duration: 1.5, 
    ease: 'power2.inOut' 
  }, 'break')
    .to(rightPart.value, { 
      x: 120, 
      y: 50,
      rotation: 15, 
      opacity: 0, 
      duration: 1.4, 
      ease: 'power2.inOut' 
    }, 'break')
    .to(sealRef.value, { 
      y: 200, 
      opacity: 0, 
      duration: 2, 
      ease: 'power3.in' 
    }, 'break')
}

defineExpose({ breakSeal })
</script>

<style scoped>
.wax-image-half {
  width: 200%;
  height: 100%;
  background-image: url('/assets/wax-seal-stamp-nobg.png');
  background-size: contain;
  background-repeat: no-repeat;
  /* Transparent asset: no mix-blend-mode needed! */
}

.left-half {
  background-position: left center;
  /* Straight jagged break only, no outer sculpting */
  clip-path: polygon(0% 0%, 100% 0%, 90% 20%, 100% 50%, 85% 80%, 100% 100%, 0% 100%);
}

.right-half {
  width: 200%;
  height: 100%;
  transform: translateX(-50%);
  background-position: right center;
  /* Straight jagged break only */
  clip-path: polygon(10% 20%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 15% 80%, 0% 50%);
}
</style>
