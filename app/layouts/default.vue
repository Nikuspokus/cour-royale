<template>
  <div class="relative min-h-screen bg-background overflow-x-hidden">
    <!-- Desktop Navigation -->
    <DesktopSidebar v-if="showSidebar" class="hidden md:flex" />

    <div :class="[
      'transition-all duration-500 ease-in-out min-h-screen flex flex-col',
      showSidebar ? 'md:pl-72' : ''
    ]">
      <!-- Mobile/Tablet Header -->
      <TopAppBar :class="[showSidebar ? 'md:hidden' : '']" />
      
      <main :class="['flex-1 flex flex-col', isFullPage ? '' : '']">
        <slot />
      </main>

      <BottomNavBar v-if="showNav" class="md:hidden" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

// Show sidebar on all pages except index and onboarding
const showSidebar = computed(() => !['index', 'onboarding-debutantes'].includes(route.name))

// Show bottom nav on mobile for main pages
const showNav = computed(() => !['index', 'onboarding-debutantes'].includes(route.name))

// Check if page should be full-viewport (like landing)
const isFullPage = computed(() => route.path === '/')
</script>

