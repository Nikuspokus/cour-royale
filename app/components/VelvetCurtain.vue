<template>
  <div class="fixed inset-0 z-[200] pointer-events-none flex">
    <!-- Left Curtain -->
    <div 
      ref="leftCurtain"
      class="h-full w-1/2 bg-[#0a1a3a] shadow-[5px_0_30px_rgba(0,0,0,0.5)] transform -translate-x-full transition-transform duration-[500ms] ease-[cubic-bezier(0.7,0,0.3,1)] overflow-hidden relative border-r border-primary/20"
    >
      <!-- Fleur-de-lys pattern overlay -->
      <div class="absolute inset-0 opacity-[0.1]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cpath fill='%23D4AF37' d='M50 20c0 0-10 15-15 25s-5 15 0 20c5-5 10-10 15-15s10 10 15 15c5-5 5-10 0-20s-15-25-15-25zM50 70c0 0-5 2-5 5s2 5 5 5s5-2 5-5s-5-5-5-5z'/%3E%3C/svg%3E&quot;); background-size: 80px;"></div>
      
      <!-- Subtle velvet sheen -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      <!-- Subtle grain for texture -->
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
    </div>
    
    <!-- Right Curtain -->
    <div 
      ref="rightCurtain"
      class="h-full w-1/2 bg-[#0a1a3a] shadow-[-5px_0_30px_rgba(0,0,0,0.5)] transform translate-x-full transition-transform duration-[500ms] ease-[cubic-bezier(0.7,0,0.3,1)] overflow-hidden relative border-l border-primary/20"
    >
      <!-- Fleur-de-lys pattern overlay -->
      <div class="absolute inset-0 opacity-[0.1]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 100 100'%3E%3Cpath fill='%23D4AF37' d='M50 20c0 0-10 15-15 25s-5 15 0 20c5-5 10-10 15-15s10 10 15 15c5-5 5-10 0-20s-15-25-15-25zM50 70c0 0-5 2-5 5s2 5 5 5s5-2 5-5s-5-5-5-5z'/%3E%3C/svg%3E&quot;); background-size: 80px;"></div>
      
      <!-- Subtle velvet sheen -->
      <div class="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent"></div>
      
      <!-- Subtle grain for texture -->
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
    </div>
  </div>
</template>

<script setup>
const leftCurtain = ref(null)
const rightCurtain = ref(null)

// Function to trigger the animation
const triggerTransition = () => {
  return new Promise((resolve) => {
    if (!leftCurtain.value || !rightCurtain.value) return resolve()
    
    // Close
    leftCurtain.value.style.transform = 'translateX(0)'
    rightCurtain.value.style.transform = 'translateX(0)'
    
    // Wait for close, then resolve (to allow page change)
    setTimeout(() => {
      resolve()
      // Open
      setTimeout(() => {
        leftCurtain.value.style.transform = 'translateX(-100%)'
        rightCurtain.value.style.transform = 'translateX(100%)'
      }, 150)
    }, 450)
  })
}

// Expose the trigger to parent components or use it globally
defineExpose({ triggerTransition })

// Listen to route changes to auto-trigger? 
// Or let specific links trigger it for "immersive" travel.
</script>

<style scoped>
/* No extra styles needed beyond Tailwind */
</style>
