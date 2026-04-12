<template>
  <div class="pb-32 px-6">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h2 class="font-headline text-2xl italic text-on-surface">Plis Scellés</h2>
        <p class="font-label text-[10px] tracking-widest text-primary uppercase">Correspondances Privées</p>
      </div>
      <span class="material-symbols-outlined text-primary">mark_as_unread</span>
    </div>

    <div class="space-y-6 max-w-2xl mx-auto">
      <NuxtLink 
        v-for="letter in letters" 
        :key="letter.id" 
        :to="`/messages/${letter.id}`"
        class="block relative group cursor-pointer anim-fade-in-up"
        :style="{ animationDelay: `${letter.id * 0.1}s` }"
      >
        <div 
          class="parchment-texture p-6 rounded-sm border border-primary/10 letter-float transition-all group-hover:-translate-y-1 group-hover:shadow-xl"
          :class="[letter.unread ? 'border-l-4 border-l-tertiary' : '']"
        >
          <div class="flex gap-4 items-center">
            <CameoAvatar :src="letter.avatar" size="md" class="flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-headline font-bold text-lg text-stone-800">{{ letter.from }}</h3>
                <span class="text-[10px] font-label text-stone-400 uppercase tracking-widest">{{ letter.time }}</span>
              </div>
              <p class="font-cursive text-xl text-stone-600 line-clamp-1">
                {{ letter.snippet }}
              </p>
            </div>
            <div v-if="letter.unread" class="w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(181,36,36,0.4)]"></div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- New Message FAB -->
    <button class="fixed bottom-28 right-6 z-50 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
      <span class="material-symbols-outlined text-3xl">edit_note</span>
    </button>
  </div>
</template>

<script setup>
const letters = [
  { id: 1, from: "Duchesse de Bourgogne", snippet: "Mon cher ami, seriez-vous disponible pour une promenade à l'orangerie demain après midi ? J'ai des nouvelles de la plus haute importance concernant...", time: "14:32", unread: true, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt6CSk4BgGZ0J5jhq8GTlBUaful6sndQ4yf-pHlSsFrcVXH0k_58D7PsYbFghc4aYqfwfFsot1SyioxJ-Ed0DoDdv84BKswD4fs4CPGJGY6uJGzSqYFIXUd6_6du0jGby8Itsm-IT12iyCrhB0m9KHLCgJhkCWGgoaO_-jKKcfE70Ch6sr07cYI-LVk8y77INsU5Om7FDu9s1_GeuQ00BiTJHgr9f7dx7HekPfhPvyI1EJvMqKHANPvv68pvVO2SjtHcvREc62jA" },
  { id: 2, from: "L'Observatrice", snippet: "Votre influence a augmenté suite à votre proclamation de ce matin. La Cour observe avec intérêt vos prises de positions...", time: "Hier", unread: false, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgXoNEC8-jqNsIgW1Bt9e0hY12GSjIlkm80Vva3b6RAq3tb_eGAceQ2SVp8170r39-RaMd03J_8a7_eIk700c_ru857-QKqKwPvugwvC6coBC-xLnuvq29PiPm1UetyI2CU-DOsqTdhEt7uzYeg0DmS4oM74AGCdZfPrSZ3aRgLN0tq4wZhfh4Ld6N3FwB3eIEeZFN53oxEvs2APnFbUAkoxYhIJ8z72W_4UkI202MLFTuUs_BoM4toYjC8uHBDwa5Hl_jdtY6hA" },
  { id: 3, from: "Comte de St-Germain", snippet: "Il semblerait que le sceau ait été brisé prématurément. Je vous conseille la plus grande discrétion lors du prochain bal masqué...", time: "2 jrs", unread: false, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPDZnJB3ABJn_fnikZrejZTYZk1m0-qKlObzgFs3KnhkMderDSAlDc1dlKpidx_bkSvUtDCVTlqJkh0S-enDseLka7YYXyXkht0sqazw0hEYcuz_P46TbM1-4OhJwdhULJTGWo9h4KZAguCGTfD8DmAw-TOpjEGZJT-0GQUYjan5QiP33aOFZCab9yevDE_lZ2DU-fSlHuPJlRC7Dv1cghdlvUhcHlXz5-wk6PiuMmhYLkomS3tV-emzff6sx2NZ4YesoXXA0L-A" }
]
</script>
