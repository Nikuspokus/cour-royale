<template>
  <div class="royal-container pb-32">
    <!-- Dashboard Header -->
    <header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
      <div class="space-y-2">
        <span class="font-label text-xs tracking-[0.4em] text-primary uppercase">Tableau de Bord</span>
        <h2 class="font-headline italic text-4xl text-on-surface">Le Grand Hall</h2>
      </div>
      <div class="flex items-center gap-4 bg-surface-container-low px-6 py-2 rounded-full border border-primary/10 shadow-sm">
        <div class="flex -space-x-3">
          <CameoAvatar v-for="(avatar, idx) in userStore.activeAvatars" :key="idx" :src="avatar" size="sm" class="ring-2 ring-surface shadow-md" />
        </div>
        <span class="font-label text-[9px] uppercase tracking-widest text-primary/80">{{ userStore.onlineCount }} {{ userStore.onlineCount > 1 ? 'Nobles' : 'Noble' }} en séance</span>
      </div>
    </header>

    <!-- Bento Dashboard Grid -->
    <div class="grid lg:grid-cols-12 gap-8 px-4">
      
      <!-- MAIN COLUMN: Actions & Major Feed -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- PROCLAMATION HUB (Post Area) -->
        <section class="parchment-texture p-10 rounded-sm shadow-2xl relative overflow-hidden group border-b-2 border-primary/20">
          <div class="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform">
            <span class="material-symbols-outlined text-8xl text-primary">history_edu</span>
          </div>
          <div class="relative z-10 space-y-6">
            <div class="flex items-center gap-6">
              <CameoAvatar :src="userStore.user.avatar" size="sm" />
              <h3 class="font-headline italic text-2xl text-stone-900 border-b border-primary/10">Rédiger une Proclamation...</h3>
            </div>
            <textarea 
              v-model="newProclamation"
              class="w-full bg-transparent border-none focus:ring-0 font-body text-xl italic text-stone-900 placeholder-stone-400 min-h-[120px] resize-none leading-relaxed"
              placeholder="Quelle nouvelle souhaitez-vous porter à la connaissance de la Cour ?"
            ></textarea>
            <div class="flex justify-between items-center pt-6">
              <div class="flex gap-6">
                <button class="text-primary hover:scale-125 transition-transform"><span class="material-symbols-outlined text-2xl">image</span></button>
                <button class="text-primary hover:scale-125 transition-transform"><span class="material-symbols-outlined text-2xl">attach_file</span></button>
              </div>
              <WaxSeal @click="postProclamation" :class="{ 'opacity-50 cursor-not-allowed': isPublishing }">
                {{ isPublishing ? 'Scellage...' : 'Sceller & Publier' }}
              </WaxSeal>
            </div>
          </div>
        </section>

        <!-- COURT LEDGER (Compact Feed) -->
        <section class="space-y-6">
          <div class="flex items-center gap-4">
            <h3 class="font-headline text-2xl italic text-on-surface">Le Registre de la Cour</h3>
            <div class="flex-1 h-[1px] bg-primary/10"></div>
          </div>

          <div class="space-y-4">
            <div v-for="post in courtStore.posts" :key="post.id" class="bg-surface-container-low p-6 rounded-xl border border-primary/5 hover:border-primary/20 transition-all group">
              <div class="flex gap-4 items-start">
                <CameoAvatar :src="post.avatar" size="sm" class="flex-shrink-0" />
                <div class="flex-1 space-y-2">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-headline font-bold text-lg text-stone-800">{{ post.author }}</h4>
                      <p class="font-label text-[9px] uppercase tracking-widest text-primary">{{ post.role }}</p>
                    </div>
                    <span class="font-label text-[9px] uppercase text-stone-400">{{ post.time }}</span>
                  </div>
                  <p class="font-body text-base text-stone-600 leading-relaxed italic">
                    "{{ post.content }}"
                  </p>
                  <div class="flex gap-6 pt-2">
                    <button 
                      @click="courtStore.toggleLike(post.id)"
                      class="flex items-center gap-1 text-[10px] uppercase font-label transition-colors"
                      :class="courtStore.isLiked(post.id) ? 'text-primary' : 'text-stone-400 hover:text-primary'"
                    >
                      <span class="material-symbols-outlined text-sm" :style="courtStore.isLiked(post.id) ? 'font-variation-settings: \'FILL\' 1' : ''">favorite</span> 
                      {{ post.likes }}
                    </button>
                    <button class="flex items-center gap-1 text-[10px] uppercase font-label text-stone-400 hover:text-outline transition-colors">
                      <span class="material-symbols-outlined text-sm">chat_bubble</span> {{ post.comments }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- SIDEBAR COLUMN: Trends & Spotlight -->
      <aside class="lg:col-span-4 space-y-8">
        
        <!-- GAZETTE SPOTLIGHT -->
        <NuxtLink v-if="latestArticle" :to="`/gazette/${latestArticle.id}`" class="block bg-royal-ink p-8 rounded-sm shadow-2xl relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-tertiary/20 to-transparent"></div>
          <div class="relative z-10 space-y-4">
            <span class="font-label text-[9px] uppercase tracking-[0.3em] text-primary-container">Dernier Scandale</span>
            <h3 class="font-headline italic text-2xl text-white group-hover:text-primary-container transition-colors">{{ latestArticle.title }}</h3>
            <p class="font-typewriter text-xs text-white/60 leading-relaxed line-clamp-3">
              {{ latestArticle.snippet }}
            </p>
            <div class="pt-2 flex items-center gap-2 text-primary-container">
              <span class="font-label text-[10px] uppercase tracking-widest">Lire la Gazette</span>
              <span class="material-symbols-outlined text-sm">trending_flat</span>
            </div>
          </div>
        </NuxtLink>

        <!-- TRENDS: Reputation Pulse -->
        <section class="bg-surface-container p-6 rounded-2xl border border-primary/10 shadow-inner">
          <h3 class="font-headline italic text-xl text-on-surface mb-6 border-b border-primary/10 pb-2">Pouls de la Cour</h3>
          <div class="space-y-6">
            <div v-for="trend in trends" :key="trend.id" class="flex items-center gap-4">
              <div class="w-2 h-2 rounded-full" :class="trend.up ? 'bg-green-500' : 'bg-red-500'"></div>
              <div class="flex-1">
                <p class="font-label text-[10px] uppercase tracking-widest text-stone-600">{{ trend.label }}</p>
                <p class="font-headline text-sm italic">{{ trend.headline }}</p>
              </div>
              <span class="material-symbols-outlined text-sm opacity-30">{{ trend.up ? 'trending_up' : 'trending_down' }}</span>
            </div>
          </div>
        </section>

        <!-- NOTABLE NOBLES -->
        <section class="space-y-4">
          <h3 class="font-headline text-xl italic text-on-surface">Membres Prééminents</h3>
          <div class="flex flex-wrap gap-4">
            <div v-for="i in 6" :key="i" class="group cursor-pointer">
              <CameoAvatar :src="`https://picsum.photos/seed/${i+200}/100/100`" size="sm" class="group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </section>

      </aside>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'
import { useCourtStore } from '~/stores/court'
import mockData from '~/data/mock_data.json'

const userStore = useUserStore()
const courtStore = useCourtStore()

const isPublishing = ref(false)
const newProclamation = ref('')
const trends = ref([...mockData.trends])
const latestArticle = computed(() => courtStore.articles[0])

const postProclamation = async () => {
  if (!newProclamation.value.trim() || isPublishing.value) return
  
  isPublishing.value = true
  
  // Simulate a delay for dramatic effect
  await new Promise(resolve => setTimeout(resolve, 800))

  courtStore.addPost({
    author: userStore.user.name,
    role: userStore.currentRank.title,
    time: "À l'instant",
    avatar: userStore.user.avatar,
    content: newProclamation.value
  })
  
  // Gagner de l'influence pour avoir pris la parole
  userStore.addInfluence(150)
  
  newProclamation.value = ''
  isPublishing.value = false
}

definePageMeta({
  layout: 'default'
})
</script>
