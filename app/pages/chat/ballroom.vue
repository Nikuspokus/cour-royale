<template>
  <div class="h-[calc(100vh-140px)] flex flex-col bg-[#1b1c19] text-white">
    <!-- Ballroom Header -->
    <div class="p-6 border-b border-primary/20 bg-black/40 backdrop-blur-md">
      <h2 class="font-headline text-2xl italic flex items-center gap-3">
        <span class="material-symbols-outlined text-primary-container">theater_comedy</span>
        La Salle de Bal
      </h2>
      <p class="text-xs font-label uppercase tracking-widest text-primary-container/60">Échanges Publics & Murmures</p>
    </div>

    <!-- Chat Messages -->
    <div class="flex-1 overflow-y-auto p-6 space-y-6 royal-scroll-hide">
      <div v-for="msg in messages" :key="msg.id" :class="['flex gap-4', msg.own ? 'flex-row-reverse' : '']">
        <CameoAvatar :src="msg.avatar" size="sm" class="flex-shrink-0" />
        <div :class="['max-w-[70%] space-y-1', msg.own ? 'text-right' : '']">
          <p class="text-[10px] font-label uppercase tracking-tighter text-primary-container opacity-60">{{ msg.author }}</p>
          <div :class="[
            'p-4 rounded-2xl text-sm font-body leading-relaxed',
            msg.own ? 'bg-primary text-white rounded-tr-none' : 'bg-surface-container-highest text-on-background rounded-tl-none'
          ]">
            {{ msg.text }}
          </div>
          <p class="text-[9px] opacity-40 italic">{{ msg.time }}</p>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-4 bg-black/20 border-t border-primary/10">
      <div class="flex items-center gap-3 bg-surface-container-low/10 rounded-full px-6 py-2 border border-primary/20">
        <input 
          type="text" 
          placeholder="Murmurer un secret..." 
          class="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-white/30"
        />
        <button class="text-primary-container">
          <span class="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = [
  { id: 1, author: "Comtesse de V.", text: "Le Baron semble bien distrait ce soir, ne trouvez-vous pas ?", time: "22:14", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBt6CSk4BgGZ0J5jhq8GTlBUaful6sndQ4yf-pHlSsFrcVXH0k_58D7PsYbFghc4aYqfwfFsot1SyioxJ-Ed0DoDdv84BKswD4fs4CPGJGY6uJGzSqYFIXUd6_6du0jGby8Itsm-IT12iyCrhB0m9KHLCgJhkCWGgoaO_-jKKcfE70Ch6sr07cYI-LVk8y77INsU5Om7FDu9s1_GeuQ00BiTJHgr9f7dx7HekPfhPvyI1EJvMqKHANPvv68pvVO2SjtHcvREc62jA" },
  { id: 2, author: "Moi", text: "Certaines rumeurs disent qu'il a perdu son domaine au jeu.", time: "22:15", own: true, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUzVRNWnlyF-RhP7h0j44V5c9_3kW_oN5RDuSYKgUMIeA4N2It6lX9uliw9CeYg8_7ZmDspo7XHSe_V-9QGc1F2OkWuOPDe9CxuU4tin-i6sjXFq4L9oOnNtPg3iLg2GY9Su40nGb-UkdB9DD_l2ahnvmY3IKTXB5_YHXZuapcnGrSImvJEzvSUDZqemsqENQ-NVL4FTL8R4n6UFMWbyT9hsvaRuIAkMbtaUGmL3VHCHHj8JwvRmeGVihZ5PWjKwmEuiztQINzGA" },
  { id: 3, author: "Marquis L.", text: "Restons prudents, les murs des jardins ont des oreilles.", time: "22:17", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPDZnJB3ABJn_fnikZrejZTYZk1m0-qKlObzgFs3KnhkMderDSAlDc1dlKpidx_bkSvUtDCVTlqJkh0S-enDseLka7YYXyXkht0sqazw0hEYcuz_P46TbM1-4OhJwdhULJTGWo9h4KZAguCGTfD8DmAw-TOpjEGZJT-0GQUYjan5QiP33aOFZCab9yevDE_lZ2DU-fSlHuPJlRC7Dv1cghdlvUhcHlXz5-wk6PiuMmhYLkomS3tV-emzff6sx2NZ4YesoXXA0L-A" }
]
</script>
