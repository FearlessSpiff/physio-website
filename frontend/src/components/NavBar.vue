<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const scrollTo = (href: string) => {
  mobileOpen.value = false
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass border-b border-brand-500/30 py-2' : 'py-4'"
  >
    <nav class="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <a href="#home" @click.prevent="scrollTo('#home')" class="flex items-center group">
        <img
          src="/logo.png"
          alt="Physio-Lisa.ch"
          class="h-12 w-auto transition-opacity duration-200 group-hover:opacity-80"
        />
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-1">
        <li v-for="link in navLinks" :key="link.href">
          <a
            :href="link.href"
            @click.prevent="scrollTo(link.href)"
            class="px-4 py-2 text-slate-300/80 hover:text-white text-sm font-medium rounded-lg hover:bg-teal-500/15 transition-all duration-200"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a href="#contact" @click.prevent="scrollTo('#contact')" class="hidden md:inline-flex btn-primary text-sm py-2 px-5">
        Book a Course
      </a>

      <!-- Mobile toggle -->
      <button
        class="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="md:hidden glass border-t border-brand-500/30 px-6 py-4">
        <ul class="flex flex-col gap-1">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              @click.prevent="scrollTo(link.href)"
              class="block px-4 py-3 text-slate-300/80 hover:text-white text-sm font-medium rounded-lg hover:bg-teal-500/15 transition-all duration-200"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="mt-2">
            <a href="#contact" @click.prevent="scrollTo('#contact')" class="btn-primary w-full justify-center text-sm">
              Book a Course
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
