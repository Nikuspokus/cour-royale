<template>
  <div class="pt-8 pb-32 px-6">
    <div class="mb-8">
      <h2 class="font-headline text-2xl italic text-on-surface mb-2">Le Forum Royal</h2>
      <p class="font-label text-[10px] tracking-widest text-primary uppercase">Débats & Proclamations de la Cour</p>
    </div>

    <!-- Active Debates -->
    <div class="space-y-6">
      <article v-for="debate in debates" :key="debate.id" class="bg-surface-container-low p-6 rounded-2xl border border-primary/10 hover:shadow-lg transition-all cursor-pointer">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-3">
             <div class="bg-primary/10 p-2 rounded-lg">
               <span class="material-symbols-outlined text-primary">{{ debate.icon }}</span>
             </div>
             <div>
               <p class="font-label text-[9px] text-primary uppercase tracking-widest">{{ debate.category }}</p>
               <h3 class="font-headline font-bold text-lg text-on-surface">{{ debate.title }}</h3>
             </div>
          </div>
        </div>
        
        <p class="font-body text-sm text-outline mb-6 line-clamp-2">
          {{ debate.snippet }}
        </p>

        <div class="flex justify-between items-center">
          <div class="flex -space-x-2">
            <CameoAvatar v-for="p in debate.participants" :key="p" :src="p" size="sm" class="ring-2 ring-surface" />
          </div>
          <p class="text-[10px] font-label text-primary uppercase tracking-widest">
            {{ debate.replies }} Réponses • {{ debate.lastMove }}
          </p>
        </div>
      </article>
    </div>

    <!-- Floating Action Button: Proclaim -->
    <button class="fixed bottom-28 right-6 z-50 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform">
      <span class="material-symbols-outlined text-3xl">campaign</span>
    </button>
  </div>
</template>

<script setup>
const debates = [
  {
    id: 1,
    category: "Étiquette",
    title: "Le port de la Perruque en 2026",
    icon: "gavel",
    snippet: "Doit-on maintenir la tradition ou accepter les nouveaux styles numériques ? La question divise le conseil...",
    replies: 156,
    lastMove: "2 min",
    participants: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPDZnJB3ABJn_fnikZrejZTYZk1m0-qKlObzgFs3KnhkMderDSAlDc1dlKpidx_bkSvUtDCVTlqJkh0S-enDseLka7YYXyXkht0sqazw0hEYcuz_P46TbM1-4OhJwdhULJTGWo9h4KZAguCGTfD8DmAw-TOpjEGZJT-0GQUYjan5QiP33aOFZCab9yevDE_lZ2DU-fSlHuPJlRC7Dv1cghdlvUhcHlXz5-wk6PiuMmhYLkomS3tV-emzff6sx2NZ4YesoXXA0L-A",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBt6CSk4BgGZ0J5jhq8GTlBUaful6sndQ4yf-pHlSsFrcVXH0k_58D7PsYbFghc4aYqfwfFsot1SyioxJ-Ed0DoDdv84BKswD4fs4CPGJGY6uJGzSqYFIXUd6_6du0jGby8Itsm-IT12iyCrhB0m9KHLCgJhkCWGgoaO_-jKKcfE70Ch6sr07cYI-LVk8y77INsU5Om7FDu9s1_GeuQ00BiTJHgr9f7dx7HekPfhPvyI1EJvMqKHANPvv68pvVO2SjtHcvREc62jA"
    ]
  },
  {
    id: 2,
    category: "Intrigue",
    title: "Les Jardins Secrets du Roi",
    icon: "psychology",
    snippet: "Certains murmures évoquent des zones cachées dans l'application accessibles uniquement aux Ducs...",
    replies: 42,
    lastMove: "1h",
    participants: [
       "https://lh3.googleusercontent.com/aida-public/AB6AXuCgXoNEC8-jqNsIgW1Bt9e0hY12GSjIlkm80Vva3b6RAq3tb_eGAceQ2SVp8170r39-RaMd03J_8a7_eIk700c_ru857-QKqKwPvugwvC6coBC-xLnuvq29PiPm1UetyI2CU-DOsqTdhEt7uzYeg0DmS4oM74AGCdZfPrSZ3aRgLN0tq4wZhfh4Ld6N3FwB3eIEeZFN53oxEvs2APnFbUAkoxYhIJ8z72W_4UkI202MLFTuUs_BoM4toYjC8uHBDwa5Hl_jdtY6hA"
    ]
  }
]
</script>
