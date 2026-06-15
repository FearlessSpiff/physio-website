<script setup lang="ts">
const scrollToCourses = () => {
  document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' })
}
const scrollToAbout = () => {
  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Animated background orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-[120px] animate-float" />
      <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] animate-float-delay" />
      <div class="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-700/10 rounded-full blur-[80px] animate-float-slow" />
      <!-- Grid overlay -->
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px); background-size: 60px 60px;"
      />
    </div>

    <div class="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/15 border border-violet-500/30 text-violet-300 text-sm font-medium mb-8">
          <span class="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Physiotherapy · Yoga · Pilates
        </div>

        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
          Heal.<br />
          <span class="text-gradient">Move.</span><br />
          Thrive.
        </h1>

        <p class="text-violet-200/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
          A physiotherapy practice that goes beyond the clinic — combining expert clinical care with yoga and Pilates courses designed to restore, strengthen, and sustain your body for life.
        </p>

        <div class="flex flex-wrap gap-4">
          <button @click="scrollToCourses" class="btn-primary text-base px-8 py-4">
            View Courses
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button @click="scrollToAbout" class="btn-outline text-base px-8 py-4">
            Our Approach
          </button>
        </div>

        <!-- Stats -->
        <div class="mt-16 flex flex-wrap gap-8">
          <div v-for="stat in [['12+', 'Years Experience'], ['200+', 'Patients Treated'], ['60+', 'Courses Held']]" :key="stat[0]">
            <div class="font-display text-3xl font-bold text-gradient">{{ stat[0] }}</div>
            <div class="text-violet-300/50 text-sm mt-1">{{ stat[1] }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-violet-400/40 text-xs">
      <span>Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-violet-400/40 to-transparent" />
    </div>
  </section>
</template>
