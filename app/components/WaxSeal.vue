<template>
  <button 
    class="relative group cursor-pointer active:scale-95 transition-all duration-300 flex items-center gap-3 bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full border border-primary-container/30 shadow-2xl backdrop-blur-sm overflow-hidden"
    @click="$emit('click')"
  >
    <!-- Wax Seal Prepend (Miniature) -->
    <div class="relative w-8 h-8 flex items-center justify-center -ml-2 drop-shadow-md">
      <img src="/assets/wax-seal-stamp-nobg.png" alt="Seal" class="w-full h-full object-contain" />
    </div>

    <!-- Button Text -->
    <span class="font-label font-bold text-[10px] uppercase tracking-[0.3em] text-primary-container transition-colors group-hover:text-primary">
      <slot>Sceller & Publier</slot>
    </span>

    <!-- Elegance Shine Overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>
