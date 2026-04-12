<template>
  <div 
    class="relative inline-block transition-all duration-300 group rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]"
    :class="[sizeClasses]"
  >
    <!-- The Outer Golden Border (follows the shape) -->
    <div class="absolute -inset-[2px] bg-gradient-to-tr from-primary-container via-primary-container/40 to-primary-container rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-lg"></div>
    
    <!-- The Inner Silhouette Container -->
    <div class="relative h-full w-full overflow-hidden rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-surface-container-high border-[1px] border-black/10">
      <img 
        :src="src" 
        class="w-full h-full object-cover object-center oil-painting-filter transition-transform duration-700 group-hover:scale-110" 
        alt="Noble Silhouette"
      />
      <!-- Glassy Overlay for realism -->
      <div class="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md' // sm, md, lg
  }
})

const sizeClasses = computed(() => {
  return {
    'w-12 h-16': props.size === 'md',
    'w-10 h-12': props.size === 'sm',
    'w-24 h-32': props.size === 'lg'
  }
})
</script>
