<template>
  <div class="club-detail min-h-screen bg-royal-ink flex flex-col">
    <div v-if="club" class="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 pb-32">
      <!-- Header -->
      <header class="mb-12 flex items-center justify-between border-b border-white/10 pb-8">
        <NuxtLink to="/boudoir" class="text-primary-container hover:scale-110 transition-transform">
          <span class="material-symbols-outlined">arrow_back</span>
        </NuxtLink>
        <div class="text-center flex-1">
          <h1 class="font-headline text-4xl text-white italic tracking-tight">{{ club.name }}</h1>
          <p class="font-label text-[10px] uppercase tracking-[0.4em] text-primary-container/60 mt-2">Cercle Restreint</p>
        </div>
        <div class="w-10"></div> <!-- Spacer -->
      </header>

      <!-- Message History -->
      <div class="flex-1 space-y-10 overflow-y-auto mb-12 scrollbar-none">
        <div 
          v-for="(msg, idx) in club.messages" 
          :key="idx"
          class="flex flex-col anim-fade-in-up"
          :style="{ animationDelay: `${idx * 0.1}s` }"
        >
          <div class="flex items-center gap-3 mb-2">
            <CameoAvatar size="sm" :src="`https://picsum.photos/seed/${idx + 50}/100/100`" />
            <div>
              <span class="font-headline text-sm italic text-primary-container">{{ msg.author }}</span>
              <span class="font-label text-[8px] uppercase tracking-widest text-white/20 ml-3">{{ msg.time }}</span>
            </div>
          </div>
          <div class="pl-12">
            <p class="font-body text-xl text-stone-300 leading-relaxed italic bg-white/5 p-6 rounded-sm border-l-2 border-primary-container/30">
              "{{ msg.text }}"
            </p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="mt-auto relative">
        <div class="absolute inset-0 bg-primary-container/5 blur-xl -z-10"></div>
        <div class="bg-white/5 backdrop-blur-md p-6 border border-white/10 rounded-sm">
          <textarea 
            v-model="newMessage"
            placeholder="Écrivez votre secret..."
            class="w-full bg-transparent border-none focus:ring-0 text-white font-body text-xl italic placeholder-white/20 min-h-[100px] resize-none"
            @keydown.enter.prevent="sendMessage"
          ></textarea>
          <div class="flex justify-end pt-4">
            <button 
              @click="sendMessage"
              class="px-8 py-3 bg-primary-container text-royal-ink rounded-full font-label text-[10px] uppercase tracking-[0.4em] font-bold active:scale-95 transition-all shadow-2xl"
            >
              Soumettre au Cercle
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Access Denied -->
    <div v-else class="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
      <span class="material-symbols-outlined text-9xl text-white/10">lock</span>
      <h2 class="font-headline text-3xl text-white italic opacity-40">Ce cercle vous est fermé.</h2>
      <NuxtLink to="/boudoir" class="text-primary-container font-label text-xs uppercase tracking-widest hover:underline">Retourner au Boudoir</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useCourtStore } from '~/stores/court'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const courtStore = useCourtStore()
const userStore = useUserStore()

const club = computed(() => courtStore.getClub(route.params.id))
const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim() || !club.value) return
  
  // Add to local state (for simulation)
  club.value.messages.push({
    author: userStore.user.name,
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  
  newMessage.value = ''
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
