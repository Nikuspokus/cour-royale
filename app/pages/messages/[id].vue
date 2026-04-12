<template>
  <div class="messages-thread min-h-screen bg-royal-ink">
    <!-- Message Thread Heading -->
    <header class="pt-8 pb-6 px-6 text-center space-y-2 sticky top-0 z-10 bg-royal-ink/90 backdrop-blur-sm shadow-lg">
      <div class="flex justify-between items-center max-w-2xl mx-auto">
        <NuxtLink to="/messages" class="text-white/60 hover:text-white transition-colors">
          <span class="material-symbols-outlined">arrow_back</span>
        </NuxtLink>
        <div class="flex-1 text-center">
          <span class="font-label text-[10px] uppercase tracking-[0.3em] text-primary-container/80">Correspondance Privée</span>
          <h2 class="font-headline text-3xl text-surface italic text-white/90">Comtesse de V.</h2>
        </div>
        <div class="w-8"></div> <!-- Spacer -->
      </div>
    </header>

    <main class="pt-8 pb-48 px-6 max-w-2xl mx-auto space-y-12">
      <!-- The Conversation History -->
      <div class="space-y-10">
        <!-- Received Letter -->
        <div v-for="(msg, index) in thread" :key="index" 
             :class="[msg.sent ? 'flex flex-col items-end ml-auto max-w-[85%] transform rotate-1' : 'flex flex-col items-start max-w-[85%] transform -rotate-1 anim-fade-in-up']"
             :style="{ animationDelay: `${index * 0.1}s` }">
          <div :class="[
            'parchment-texture p-8 letter-float rounded-sm relative',
            msg.sent ? 'bg-surface border-r-4 border-tertiary/20 text-right' : 'bg-[#fdfcf8] border-l-4 border-primary/20'
          ]">
            <p class="font-cursive text-2xl text-stone-800 leading-relaxed">
              {{ msg.text }}
            </p>
            <div :class="['mt-4 flex justify-between items-center', msg.sent ? 'flex-row-reverse' : '']">
              <span class="font-label text-[10px] uppercase tracking-widest text-stone-400">{{ msg.time }}</span>
              <span v-if="!msg.sent" class="material-symbols-outlined text-primary/30 text-sm">drafts</span>
              <span v-else class="material-symbols-outlined text-tertiary/40 text-sm">history_edu</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Message Composition Area (Nightstand feel) -->
    <div class="fixed bottom-0 md:bottom-0 left-0 lg:left-72 right-0 px-6 pb-24 md:pb-8 flex justify-center z-20 pointer-events-none">
      <div class="w-full max-w-2xl bg-royal-ink/90 backdrop-blur-md p-4 rounded-xl border border-outline-variant/10 pointer-events-auto shadow-2xl">
        <div class="relative flex items-center justify-between gap-6">
          <div class="flex-grow bg-[#fdfcf8] parchment-texture rounded-sm p-4 shadow-inner border border-primary/10">
            <textarea 
              v-model="newMessage"
              class="w-full bg-transparent border-none focus:ring-0 font-cursive text-xl text-stone-800 placeholder-stone-400 resize-none min-h-[60px]" 
              placeholder="Écrivez votre pli..."
            ></textarea>
          </div>
          <!-- Wax Seal Send Button (New Style) -->
          <WaxSeal @click="sendPli">
            Sceller
          </WaxSeal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mockData from '~/data/mock_data.json'

const newMessage = ref('')

// Default to comtesse-v for the demo
const thread = ref([...mockData.threads['comtesse-v']])

const sendPli = () => {
  if (!newMessage.value.trim()) return
  thread.value.push({
    sent: true,
    text: newMessage.value,
    time: "À l'instant"
  })
  newMessage.value = ''
}

// Hide layout components when in this page if needed, 
// but since we added the plum-velvet bg locally, it should be fine.
// We might want to tell the layout to hide TopAppBar/Sidebar if we want full immersion.
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.messages-thread {
  /* Ensure it fills the space correctly in the layout */
  margin-top: -5rem; /* Offset the default layout padding if necessary */
  padding-top: 5rem;
}

@media (min-width: 1024px) {
  .messages-thread {
    margin-top: 0;
    padding-top: 0;
  }
}
</style>
