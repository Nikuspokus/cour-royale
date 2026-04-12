<template>
  <div class="salle-de-bal min-h-screen bg-surface-container-low pb-32">
    <!-- Immersive Header -->
    <header class="h-64 relative flex items-end justify-center pb-8 overflow-hidden group">
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuASJLsfC3nGYnh6S4UgdPJEPh5mYPFjn8ZWBSu3xaPb0wAZhQKSciQFS6qVvzf6D8xQCP2EhsoIhDmmUATqlazpzAwgfGdHDiKEZgvA3rwbm3GQ3SoJTiS8mXhF4s8dpdQ629r3jDzErUSRnPrVeKjKdenrd1VE3hwTGM833WMAAALyPs4lx--SiVhGrgqZK4G5PvG_AHT6ltI9ZSIiiXUtDZTEtEggB5ae2zltR9OZgRxCuOvRrtM0T6AiXTIKJWSKnHI6n1dIYw" 
        class="absolute inset-0 w-full h-full object-cover filter brightness-[0.5] contrast-[1.1] group-hover:scale-105 transition-transform duration-[10s]" 
      />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#fbf9f4_95%)] opacity-80"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
      <div class="absolute inset-0 bg-secondary/10 mix-blend-overlay"></div>
      
      <div class="relative text-center space-y-2 anim-fade-in">
        <span class="font-label text-[10px] uppercase tracking-[0.4em] text-primary/60">Échanges Immédiats</span>
        <h2 class="font-headline text-5xl text-on-surface italic tracking-tight">La Salle de Bal</h2>
        <div class="flex items-center justify-center gap-2 text-primary">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span class="font-label text-[9px] uppercase tracking-widest opacity-80">124 Courtisans sont présents</span>
        </div>
      </div>
    </header>

    <!-- Chat Stream -->
    <main class="max-w-2xl mx-auto px-6 py-12 space-y-10">
      <div v-for="(msg, index) in messages" :key="index" class="flex gap-4 items-start anim-fade-in-up" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="relative flex-shrink-0 group cursor-pointer">
          <CameoAvatar :src="msg.avatar" size="sm" :class="{ 'ring-2 ring-primary ring-offset-2': msg.isNoble }" />
          <div v-if="msg.isNoble" class="absolute -top-1 -right-1 bg-primary p-0.5 rounded-full shadow-lg">
            <span class="material-symbols-outlined text-[8px] text-white" style="font-variation-settings: 'FILL' 1">grade</span>
          </div>
        </div>
        
        <div class="flex-1 space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-headline italic text-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer">
              {{ msg.author }}
            </span>
            <span class="font-label text-[8px] uppercase tracking-widest opacity-40">{{ msg.time }}</span>
          </div>
          <div 
            class="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-primary/5 shadow-sm relative vellum-texture"
            :class="{ 'bg-primary-container/10 border-primary/20': msg.isNoble }"
          >
            <p class="font-body text-base text-stone-800 leading-relaxed">
              {{ msg.text }}
            </p>
            <!-- Whisper Action for nobles -->
            <button class="absolute -bottom-2 -right-2 bg-white shadow-md border border-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span class="material-symbols-outlined text-[10px] text-primary">record_voice_over</span>
              <span class="font-label text-[8px] uppercase tracking-tighter">Chuchoter</span>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Sticky Composition Bar -->
    <div class="fixed bottom-24 left-0 right-0 lg:left-72 px-6 flex justify-center z-30 pointer-events-none">
      <div class="w-full max-w-2xl pointer-events-auto">
        <div class="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-2xl border border-primary/10 flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">sentiment_very_satisfied</span>
          </div>
          <input 
            type="text" 
            placeholder="Chuchotez votre pensée au Grand Hall..."
            class="flex-1 bg-transparent border-none focus:ring-0 font-body text-lg italic"
          />
          <button class="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg">
            <span class="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = [
  {
    author: "Comtesse de Rohan",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAteoh51AZoOSGJb_HYHHqDQLw7rC32QXQymt_cn1tICusLxZRgzFbnM41-VbkwjeO7GUrOrBpxWWDqKxf4f47Fkly_sVhbe_dn7wfPItL2fVuw0XUNY4SohgViuQWaNJww6nWgLUU7SygIOMP3sVHoIAuijV3wCheiL4TAiTLL7m9Uqaq5f93fdMAl-iTpdR98YPHKZjipYOx31WEJ8zeb5cxu3Uxs0MfJsx5JhrxxNR-WSCP0GpUah-ypm7eQIduAYJ4Q0e4IZQ",
    text: "Le Duc d'Orléans semble bien préoccupé par l'arrivée du navire venu d'Orient. On dit qu'il contient des épices interdites...",
    time: "À l'instant",
    isNoble: true
  },
  {
    author: "Vicomte de Valmont",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn1vVZOfHCZ2PzoyCRdK5LzWWEf619JqxW5_AY3dbb6n9On1Q45gf1XOwcw7nSC2YgCNfzmTS-H67N4Go0aplIPK5NwqEqV4vIgzgpWcZkK66yIdhS7w6sL_FhmqBPurZpjSHL1dLMTs4E1yjDVZxJ8cyTDBFzp8JOe6C_PwMQ-ZFJ5ms6P0Gr1hvawXxaxnmyTRxMK9AmkS-664JXZJdprSdFGOt77K77YA1ctmwHV2T9c_NJlCzBIwO79qdknJsUcFcp7a2vCA",
    text: "Une rumeur n'est qu'un mensonge qui a eu la chance de survivre à une soirée de bal.",
    time: "2 min",
    isNoble: false
  },
  {
    author: "La Duchesse du Berry",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt6CSk4BgGZ0J5jhq8GTlBUaful6sndQ4yf-pHlSsFrcVXH0k_58D7PsYbFghc4aYqfwfFsot1SyioxJ-Ed0DoDdv84BKswD4fs4CPGJGY6uJGzSqYFIXUd6_6du0jGby8Itsm-IT12iyCrhB0m9KHLCgJhkCWGgoaO_-jKKcfE70Ch6sr07cYI-LVk8y77INsU5Om7FDu9s1_GeuQ00BiTJHgr9f7dx7HekPfhPvyI1EJvMqKHANPvv68pvVO2SjtHcvREc62jA",
    text: "Quelqu'un a-t-il vu l'Observatrice ce soir ? Ses récents articles dans la Gazette font trembler les antichambres.",
    time: "5 min",
    isNoble: true
  }
]

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.salle-de-bal {
  /* Offset for potential sidebar in layout */
}
</style>
