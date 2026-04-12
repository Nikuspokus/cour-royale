<template>
  <div class="min-h-screen relative selection:bg-primary-container selection:text-on-background">
    <!-- Global Noise/Grain Overlay -->
    <div class="fixed inset-0 grain-overlay opacity-[0.01] z-[100] pointer-events-none"></div>
    
    <VelvetCurtain ref="curtain" />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const curtain = ref(null)
const router = useRouter()

// Global navigation guard for immersive transitions
router.beforeEach(async (to, from) => {
  if (to.path !== from.path) {
    if (curtain.value && curtain.value.triggerTransition) {
      await curtain.value.triggerTransition()
    }
  }
  return true
})
</script>

<style>
@import "~/assets/css/main.css";

/* Only basic noise, no native page transition to let the curtains work */
.page-enter-active, .page-leave-active {
  transition: none;
}
</style>
