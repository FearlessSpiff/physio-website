<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pb } from '@/pocketbase'
import type { SiteSettings } from '@/types'

const settings = ref<SiteSettings | null>(null)

onMounted(async () => {
  try {
    settings.value = await pb.collection('site_settings').getFirstListItem<SiteSettings>('')
  } catch {
    // PocketBase not running or no record yet — placeholder shown
  }
})

const photoUrl = () => {
  if (!settings.value?.about_photo) return null
  return pb.getFileUrl(settings.value, settings.value.about_photo, { thumb: '400x500' })
}
</script>

<template>
  <section id="about" class="py-24 bg-dark-900 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-violet-800/10 rounded-full blur-[120px]" />
    </div>

    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="grid md:grid-cols-2 gap-16 items-center">

        <!-- Image side -->
        <div class="relative order-2 md:order-1">
          <div class="glass-card p-2 glow-violet">
            <div class="aspect-[4/5] rounded-xl bg-gradient-to-br from-violet-900/40 to-dark-800 flex items-center justify-center overflow-hidden">
              <img
                v-if="photoUrl()"
                :src="photoUrl()!"
                :alt="settings?.about_name || 'About photo'"
                class="w-full h-full object-cover"
              />
              <!-- Placeholder shown when no photo is uploaded yet -->
              <div v-else class="text-center p-8">
                <div class="w-24 h-24 rounded-full bg-violet-600/30 border-2 border-violet-500/50 mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-12 h-12 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p class="text-violet-300/40 text-sm">Upload your photo via the admin panel</p>
              </div>
            </div>
          </div>
          <!-- Decorative badge -->
          <div class="absolute -bottom-4 -right-4 glass-card px-5 py-3">
            <div class="text-violet-300 text-xs font-medium">Certified Expert</div>
            <div class="text-white font-bold text-sm mt-0.5">
              {{ settings?.about_credential || 'MSc. Physiotherapy' }}
            </div>
          </div>
        </div>

        <!-- Text side -->
        <div class="order-1 md:order-2">
          <div class="text-violet-400 text-sm font-medium uppercase tracking-widest mb-3">About Us</div>
          <h2 class="section-heading mb-6">
            Whole-Body Care,<br />
            <span class="text-gradient">Inside &amp; Out</span>
          </h2>

          <div class="space-y-4 text-violet-200/60 leading-relaxed">
            <p>
              We are a physiotherapy practice with a difference. Alongside clinical treatment, we offer structured yoga and Pilates courses that empower you to take an active role in your own recovery and long-term wellbeing.
            </p>
            <p>
              Whether you're recovering from injury, managing chronic pain, or simply looking to move better — our integrated approach combines hands-on physiotherapy with the proven benefits of mindful movement.
            </p>
            <p>
              All courses are led by our certified physiotherapist and are designed to complement your treatment plan or stand alone as a preventive practice.
            </p>
          </div>

          <div class="mt-8 grid grid-cols-2 gap-4">
            <div
              v-for="feature in [
                { icon: '🩺', label: 'Clinical Physio', desc: 'Expert assessment and hands-on treatment' },
                { icon: '🧘', label: 'Yoga Courses', desc: 'Therapeutic and restorative classes' },
                { icon: '🏋️', label: 'Pilates', desc: 'Core strength and postural correction' },
                { icon: '👥', label: 'Small Groups', desc: 'Personal attention in every session' },
              ]"
              :key="feature.label"
              class="glass-card p-4"
            >
              <div class="text-2xl mb-2">{{ feature.icon }}</div>
              <div class="text-white font-medium text-sm">{{ feature.label }}</div>
              <div class="text-violet-300/50 text-xs mt-1">{{ feature.desc }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
