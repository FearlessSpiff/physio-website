<script setup lang="ts">
import { reactive, ref } from 'vue'
import { pb } from '@/pocketbase'
import type { ContactForm } from '@/types'

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

const submit = async () => {
  if (status.value === 'loading') return
  status.value = 'loading'
  errorMsg.value = ''

  try {
    await pb.collection('contact_messages').create({ ...form })
    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch {
    status.value = 'error'
    errorMsg.value = 'Something went wrong. Please try again or contact us directly.'
  }
}
</script>

<template>
  <section id="contact" class="py-24 bg-dark-950 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 right-1/3 w-96 h-96 bg-violet-900/10 rounded-full blur-[120px]" />
    </div>

    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="text-center mb-14">
        <div class="text-violet-400 text-sm font-medium uppercase tracking-widest mb-3">Get in Touch</div>
        <h2 class="section-heading">Start Your Journey</h2>
        <p class="section-subheading">Book a treatment, register for a course, or just say hello</p>
      </div>

      <div class="grid md:grid-cols-5 gap-12 items-start">

        <!-- Info panel -->
        <div class="md:col-span-2 space-y-6">
          <div
            v-for="item in [
              { icon: '📧', label: 'Email', value: 'hello@physioflow.ch' },
              { icon: '📞', label: 'Phone', value: '+41 44 000 00 00' },
              { icon: '📍', label: 'Based in', value: 'Switzerland' },
            ]"
            :key="item.label"
            class="glass-card p-5 flex items-start gap-4"
          >
            <div class="text-2xl">{{ item.icon }}</div>
            <div>
              <div class="text-violet-300/50 text-xs font-medium uppercase tracking-wide">{{ item.label }}</div>
              <div class="text-white font-medium mt-1">{{ item.value }}</div>
            </div>
          </div>

          <div class="glass-card p-5">
            <div class="text-violet-300/50 text-xs font-medium uppercase tracking-wide mb-3">Response time</div>
            <p class="text-violet-200/70 text-sm leading-relaxed">
              We typically respond within 24 hours on business days. For urgent enquiries, please call directly.
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="md:col-span-3">
          <div class="glass-card p-8">
            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
            >
              <div v-if="status === 'success'" class="text-center py-8">
                <div class="text-5xl mb-4">✅</div>
                <h3 class="text-white font-semibold text-xl mb-2">Message sent!</h3>
                <p class="text-violet-300/60">We'll be in touch within 24 hours.</p>
                <button @click="status = 'idle'" class="btn-outline mt-6 text-sm">Send another</button>
              </div>
            </Transition>

            <form v-if="status !== 'success'" @submit.prevent="submit" class="space-y-5" novalidate>
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-violet-300/70 mb-2">Name *</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Your name"
                    class="input-field"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-violet-300/70 mb-2">Email *</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="input-field"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-violet-300/70 mb-2">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="e.g. Yoga course registration, Physiotherapy appointment"
                  class="input-field"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-violet-300/70 mb-2">Message *</label>
                <textarea
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Tell us which course or treatment interests you, or ask any questions..."
                  class="input-field resize-none"
                />
              </div>

              <div v-if="status === 'error'" class="text-red-400 text-sm bg-red-900/20 border border-red-800/40 rounded-xl p-3">
                {{ errorMsg }}
              </div>

              <button
                type="submit"
                :disabled="status === 'loading'"
                class="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="status === 'loading'" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ status === 'loading' ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
