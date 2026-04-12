<template>
  <div class="login-page min-h-screen bg-royal-ink flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <!-- Background Texture & Ambience -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent"></div>
      <!-- Subtle Pattern -->
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-30"></div>
    </div>

    <!-- Central Card -->
    <div class="max-w-md w-full parchment-texture p-12 shadow-3xl relative z-10 border-4 border-double border-primary/20 text-center space-y-10 anim-fade-in-up">
      
      <!-- Crown Icon / Logo Area -->
      <div class="flex justify-center mb-8">
        <div class="w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center">
          <span class="material-symbols-outlined text-5xl text-primary" style="font-variation-settings: 'FILL' 1;">temp_preferences_custom</span>
        </div>
      </div>

      <div class="space-y-4">
        <h1 class="font-headline italic text-5xl text-stone-900 tracking-tighter">Entrez dans le Secret du Roi</h1>
        <p class="font-body text-stone-600 italic text-lg leading-relaxed">
          "L'histoire ne se souvient que de ceux qui osent approcher la Couronne."
        </p>
      </div>

      <!-- Auth Action -->
      <div class="pt-8 border-t border-primary/10">
        <button 
          @click="loginWithGoogle"
          class="w-full flex items-center justify-center gap-4 bg-royal-ink text-primary-container px-8 py-4 rounded-none hover:bg-stone-900 transition-all group active:scale-95 shadow-xl border border-primary/20"
        >
          <img src="https://www.google.com/favicon.ico" class="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
          <span class="font-label text-xs uppercase tracking-[0.4em]">S'authentifier avec Google</span>
        </button>
        
        <p class="mt-8 font-label text-[10px] uppercase tracking-widest text-stone-400">
          Versailles, le 11 Avril 1789
        </p>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute bottom-0 left-0 p-12 opacity-10 hidden md:block">
      <span class="material-symbols-outlined text-9xl text-white">history_edu</span>
    </div>
  </div>
</template>

<script setup>
const loginWithGoogle = () => {
  // Simulation de connexion réussie
  navigateTo('/hall')
}

definePageMeta({
  layout: false // Full screen experience
})
</script>

<style scoped>
.login-page {
  /* Subtle vignette */
  box-shadow: inset 0 0 300px rgba(0,0,0,0.9);
}
</style>
