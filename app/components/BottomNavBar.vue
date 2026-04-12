<template>
  <nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-[#fbf9f4]/90 dark:bg-stone-950/90 backdrop-blur-md border-t-2 border-primary/20 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
    <!-- Decorative Gold Thread -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-primary"></div>

    <NuxtLink v-for="item in navItems" :key="item.path" :to="item.path" class="relative group">
      <div 
        class="flex flex-col items-center justify-center p-3 transition-all duration-300"
        :class="[route.path === item.path ? 'text-primary' : 'text-stone-400 dark:text-stone-600']"
      >
        <div 
          v-if="route.path === item.path"
          class="absolute inset-0 bg-primary/10 rounded-full scale-110 active:duration-75 ring-1 ring-primary/30"
        ></div>
        
        <span class="material-symbols-outlined" :style="route.path === item.path ? 'font-variation-settings: \'FILL\' 1' : ''">
          {{ item.icon }}
        </span>
        <span class="font-label text-[10px] uppercase tracking-widest mt-1">{{ item.label }}</span>
      </div>
    </NuxtLink>
  </nav>
</template>

<script setup>
const route = useRoute()

const navItems = [
  { label: 'Le Grand Hall', path: '/hall', icon: 'fort' },
  { label: 'Sceaux', path: '/messages', icon: 'history_edu' },
  { label: 'Bal', path: '/salle-de-bal', icon: 'theater_comedy' },
  { label: 'Gazette', path: '/gazette', icon: 'newspaper' },
  { label: 'Moi', path: '/profile', icon: 'gavel' }
]
</script>
