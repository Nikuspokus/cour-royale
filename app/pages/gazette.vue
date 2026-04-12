<template>
  <div class="gazette-page min-h-screen bg-background pb-32">
    <!-- Lady Whistledown Style Newspaper -->
    <main class="px-8 md:px-12 max-w-4xl mx-auto parchment-texture min-h-screen shadow-2xl relative z-10 pt-16">
      
      <!-- Newspaper Header (Masthead) -->
      <header class="text-center mb-16 border-b-8 border-double border-primary/20 pb-12 relative">
        <!-- AI Trigger: The DSS Cameo -->
        <div class="absolute top-0 right-0 z-50 group w-20 h-20 md:w-24 md:h-24">
          <button 
            @click="generateGossip" 
            :disabled="isGenerating"
            class="w-full h-full rounded-full overflow-hidden border-4 border-stone-800 shadow-xl hover:border-primary transition-all duration-700 hover:scale-110 disabled:grayscale disabled:opacity-50 cursor-pointer flex items-center justify-center bg-stone-900"
            title="Invoquer le Duc de Saint-Simon"
          >
            <img src="/assets/dss-cameo.png" class="w-full h-full object-cover pointer-events-none" :class="{'animate-pulse': isGenerating}" />
            <div v-if="isGenerating" class="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span class="material-symbols-outlined text-white animate-spin">history_edu</span>
            </div>
          </button>
          <div v-if="isGenerating" class="absolute top-full right-0 mt-4 bg-stone-900 text-white p-3 shadow-xl rounded-sm border border-primary/20 min-w-[200px] anim-fade-in z-[60]">
            <p class="font-typewriter text-[10px] uppercase tracking-widest">Le Duc consigne vos fautes...</p>
          </div>
        </div>

        <div class="flex justify-center mb-6 anim-fade-in">
          <span class="material-symbols-outlined text-primary text-6xl" style="font-variation-settings: 'FILL' 1;">history_edu</span>
        </div>
        <h2 class="font-headline italic text-4xl md:text-6xl text-stone-900 mb-6 tracking-tighter">La Chronique du Duc</h2>
        
        <div class="flex justify-between items-center border-y-2 border-primary/10 py-4 px-6 font-label text-xs md:text-sm uppercase tracking-[0.4em] text-stone-500">
          <span>Versailles, le {{ currentDate }}</span>
          <span class="font-headline font-bold text-primary tracking-widest hidden md:inline">MÉMOIRE N° MDCCLXXIV</span>
          <span>Prix: Royal</span>
        </div>
      </header>

      <!-- Main Column Content (DSS style) -->
      <div class="space-y-16">
        
        <!-- Opening Quote -->
        <section class="max-w-2xl mx-auto text-center space-y-6">
          <p class="font-body text-xl md:text-2xl italic text-on-surface leading-snug">
            "Rien n'est plus cruel qu'un rang qui vacille sous le poids d'un secret mal gardé. L'étiquette est la seule loi qui vaille en ce bas monde."
          </p>
          <div class="flex items-center justify-center gap-4 text-primary/30">
            <span class="material-symbols-outlined text-xs">gavel</span>
            <div class="h-[1px] w-16 bg-primary/20"></div>
            <span class="material-symbols-outlined text-xs">gavel</span>
          </div>
        </section>

        <!-- Empty State -->
        <section v-if="!leadArticle && !isGenerating" class="py-20 text-center space-y-8 anim-fade-in">
          <div class="max-w-md mx-auto space-y-4">
            <span class="material-symbols-outlined text-6xl text-stone-300">drafts</span>
            <h3 class="font-headline text-3xl text-stone-800 italic">Le silence règne à la Cour...</h3>
            <p class="font-body text-lg text-stone-500">
              Le Duc de Saint-Simon n'a pour l'instant consigné aucun mémoire. 
              Peut-être les nobles sont-ils trop prudents, ou les secrets trop bien gardés ?
            </p>
            <p class="font-label text-xs uppercase tracking-widest text-primary pt-4">
              Faites du bruit dans le Grand Hall pour attirer son attention.
            </p>
          </div>
        </section>

        <!-- The Big Secret Section (Lead Article) -->
        <article v-if="leadArticle" class="bg-surface-container-low p-8 md:p-12 rounded-sm border border-primary/10 shadow-sm relative overflow-hidden group anim-fade-in-up">
          <div class="absolute -top-4 -left-4 text-primary/10 material-symbols-outlined text-8xl">format_quote</div>
          
          <div class="relative z-10 space-y-8">
            <div class="space-y-2">
              <span class="font-label text-xs font-semibold text-tertiary uppercase tracking-[0.2em]">{{ leadArticle.category || 'Mémoire Secrète' }}</span>
              <NuxtLink :to="`/gazette/${leadArticle.id}`">
                <h3 class="font-headline text-2xl md:text-4xl text-stone-800 tracking-tight leading-tight group-hover:text-primary transition-colors duration-500 cursor-pointer">
                  {{ leadArticle.title }}
                </h3>
              </NuxtLink>
            </div>

            <div class="aspect-video rounded-sm overflow-hidden border border-primary/10 shadow-inner group-hover:shadow-2xl transition-all duration-1000">
              <img 
                :src="leadArticle.image" 
                class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 sepia-[0.1] contrast-[1.05]" 
                :alt="leadArticle.title"
              />
            </div>

            <p class="font-typewriter text-base md:text-lg text-stone-700 leading-relaxed bg-white/40 p-6 md:p-8 rounded shadow-inner border-l-4 border-stone-900 italic">
              "{{ leadArticle.content }}"
            </p>

            <div class="flex justify-between items-center pt-8 border-t border-primary/5">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <div class="black-wax-seal">DSS</div>
                  <div class="smoke-effect"></div>
                </div>
                <div>
                  <p class="font-label text-[10px] uppercase text-stone-400">Attesté par</p>
                  <p class="font-headline font-bold text-stone-800">Le Duc de Saint-Simon</p>
                </div>
              </div>
              <NuxtLink :to="`/gazette/${leadArticle.id}`" class="font-label text-xs text-primary font-bold hover:underline tracking-widest uppercase">Ouvrir le mémoire</NuxtLink>
            </div>
          </div>
        </article>

        <!-- Closing Note -->
        <footer class="mt-24 pt-12 border-t-2 border-primary/20 text-center space-y-4">
          <p class="font-cursive text-3xl text-primary">Consigné pour l'éternité,</p>
          <p class="font-headline text-4xl font-black text-stone-800 tracking-widest uppercase italic">DSS</p>
        </footer>

      </div>
    </main>
  </div>
</template>

<script setup>
import { useCourtStore } from '~/stores/court'
import { useUserStore } from '~/stores/user'

const courtStore = useCourtStore()
const userStore = useUserStore()

const currentDate = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date('1774-10-14'))

const leadArticle = computed(() => {
  if (!courtStore.articles || courtStore.articles.length === 0) return null
  return [...courtStore.articles].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
})

const isGenerating = ref(false)

const generateGossip = async () => {
  isGenerating.value = true
  try {
    await courtStore.triggerWhistledown()
  } catch (e) {
    if (e.message === "insuffisance_de_potins") {
      alert("Le Duc bâille... Il n'y a pas assez de potins croustillants (au moins 3) au Grand Hall pour justifier son précieux temps.")
    } else {
      alert("Le Duc est indisposé (Erreur API), revenez plus tard.")
    }
  } finally {
    isGenerating.value = false
  }
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.parchment-texture {
  background-color: #fbf9f4;
  position: relative;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .parchment-texture {
    border-left: none;
    border-right: none;
  }
}
</style>
