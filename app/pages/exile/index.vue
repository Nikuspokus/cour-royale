<template>
  <div class="min-h-screen bg-stone-900 text-stone-400 flex flex-col items-center justify-center px-8 relative overflow-hidden">
    <!-- Restrictive atmosphere Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
    
    <!-- Background Icon -->
    <span class="material-symbols-outlined text-[30rem] absolute opacity-5 pointer-events-none">gavel</span>

    <!-- Content -->
    <div class="relative z-10 text-center max-w-sm">
      <div class="w-24 h-24 rounded-full border-2 border-stone-800 p-2 mx-auto mb-8 shadow-2xl relative grayscale">
        <CameoAvatar 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUzVRNWnlyF-RhP7h0j44V5c9_3kW_oN5RDuSYKgUMIeA4N2It6lX9uliw9CeYg8_7ZmDspo7XHSe_V-9QGc1F2OkWuOPDe9CxuU4tin-i6sjXFq4L9oOnNtPg3iLg2GY9Su40nGb-UkdB9DD_l2ahnvmY3IKTXB5_YHXZuapcnGrSImvJEzvSUDZqemsqENQ-NVL4FTL8R4n6UFMWbyT9hsvaRuIAkMbtaUGmL3VHCHHj8JwvRmeGVihZ5PWjKwmEuiztQINzGA" 
          size="md"
        />
        <div class="absolute inset-0 bg-stone-900/40 rounded-full flex items-center justify-center">
           <span class="material-symbols-outlined text-white opacity-40">lock</span>
        </div>
      </div>

      <h2 class="font-headline italic text-4xl text-stone-200 mb-4 tracking-tighter">L'Oubli Sec</h2>
      <p class="font-body text-lg italic text-stone-500 mb-8 leading-relaxed">
        "Pour avoir manqué aux devoirs de l'étiquette, votre voix est désormais muette entre ces murs."
      </p>

      <div class="space-y-4">
        <div class="bg-black/40 p-6 rounded-2xl border border-stone-800">
          <p class="text-[10px] font-label uppercase tracking-widest text-stone-600 mb-2">Pénitence Requise</p>
          <p class="text-xs italic text-stone-400">Écrivez 5 lettres de courtoisie pour recouvrer votre standing.</p>
        </div>

        <button class="w-full py-4 rounded-full border-2 border-stone-700 text-stone-400 font-label text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
          Solliciter le Pardon
        </button>
      </div>

      <NuxtLink to="/hall" class="block mt-12 text-[9px] font-label uppercase tracking-widest text-stone-700 hover:text-stone-500">
        Retourner au Hall (Mode Spectateur)
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false // Custom journey requires specific atmosphere
})
</script>
