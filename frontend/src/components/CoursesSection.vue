<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/pocketbase'
import type { Course } from '@/types'

const courses = ref<Course[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const today = new Date().toISOString().split('T')[0]
    courses.value = await pb.collection('courses').getFullList<Course>({
      filter: `is_active = true && date >= "${today}"`,
      sort: 'date',
    })
  } catch {
    error.value = 'Could not load courses. Make sure PocketBase is running.'
  } finally {
    loading.value = false
  }
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-CH', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const spotsLeft = (course: Course) =>
  Math.max(0, course.max_participants - course.current_participants)

const scrollToContact = () =>
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <section id="courses" class="py-24 bg-dark-950 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px]" />
    </div>

    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="text-center mb-14">
        <div class="text-violet-400 text-sm font-medium uppercase tracking-widest mb-3">Upcoming</div>
        <h2 class="section-heading">Course Dates &amp; Locations</h2>
        <p class="section-subheading">Yoga and Pilates courses open for registration</p>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="glass-card p-6 animate-pulse">
          <div class="h-4 bg-violet-800/40 rounded w-1/3 mb-4" />
          <div class="h-6 bg-violet-800/40 rounded w-3/4 mb-3" />
          <div class="h-4 bg-violet-800/40 rounded w-full mb-2" />
          <div class="h-4 bg-violet-800/40 rounded w-2/3" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-violet-400/50 text-5xl mb-4">⚠️</div>
        <p class="text-violet-300/60">{{ error }}</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="courses.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">📅</div>
        <h3 class="text-white font-medium text-lg mb-2">No upcoming courses yet</h3>
        <p class="text-violet-300/50">Add yoga and Pilates courses via the PocketBase admin panel at <code class="text-violet-400">http://127.0.0.1:8090/_/</code></p>
      </div>

      <!-- Course cards -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="course in courses"
          :key="course.id"
          class="glass-card p-6 flex flex-col hover:border-violet-600/60 transition-all duration-300 hover:glow-violet group"
        >
          <!-- Date badge -->
          <div class="inline-flex items-center gap-2 text-xs font-medium text-violet-300 bg-violet-600/15 rounded-lg px-3 py-1.5 mb-4 self-start">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(course.date) }}
          </div>

          <h3 class="text-white font-semibold text-lg mb-2 group-hover:text-violet-200 transition-colors">
            {{ course.title }}
          </h3>

          <p class="text-violet-300/50 text-sm leading-relaxed mb-4 flex-1">
            {{ course.description }}
          </p>

          <div class="space-y-2 mb-5">
            <div class="flex items-center gap-2 text-sm text-violet-300/60">
              <svg class="w-4 h-4 text-violet-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ course.location }}
              <span v-if="course.address" class="truncate">— {{ course.address }}</span>
            </div>
            <div v-if="course.time" class="flex items-center gap-2 text-sm text-violet-300/60">
              <svg class="w-4 h-4 text-violet-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ course.time }}
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-violet-900/40">
            <div>
              <div class="text-2xl font-bold text-white">
                {{ course.currency }} {{ course.price.toLocaleString() }}
              </div>
              <div class="text-xs text-violet-400/50 mt-0.5">
                {{ spotsLeft(course) }} spot{{ spotsLeft(course) !== 1 ? 's' : '' }} remaining
              </div>
            </div>
            <a href="#contact" @click.prevent="scrollToContact" class="btn-primary text-sm py-2 px-4">
              Register
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
