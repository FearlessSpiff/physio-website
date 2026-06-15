<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { pb } from '@/pocketbase'
import type { GalleryImage } from '@/types'

const images = ref<GalleryImage[]>([])
const loading = ref(true)
const selected = ref<GalleryImage | null>(null)

onMounted(async () => {
  try {
    images.value = await pb.collection('gallery').getFullList<GalleryImage>({
      sort: 'display_order,created',
    })
  } catch {
    // silently fail — show empty state
  } finally {
    loading.value = false
  }
})

const getUrl = (img: GalleryImage, thumb = false) =>
  pb.getFileUrl(img, img.image, thumb ? { thumb: '600x400' } : { thumb: '1200x0' })

const openLightbox = (img: GalleryImage) => {
  selected.value = img
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selected.value = null
  document.body.style.overflow = ''
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLightbox()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="gallery" class="py-24 bg-dark-900 relative overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px]" />
    </div>

    <div class="max-w-6xl mx-auto px-6 relative">
      <div class="text-center mb-14">
        <div class="text-violet-400 text-sm font-medium uppercase tracking-widest mb-3">Gallery</div>
        <h2 class="section-heading">Inside Our Courses</h2>
        <p class="section-subheading">A look at our hands-on training environment</p>
      </div>

      <!-- Loading skeleton -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i" class="aspect-[4/3] glass-card animate-pulse" />
      </div>

      <!-- Empty state -->
      <div v-else-if="images.length === 0" class="text-center py-16">
        <div class="text-5xl mb-4">🖼️</div>
        <h3 class="text-white font-medium text-lg mb-2">No images yet</h3>
        <p class="text-violet-300/50 text-sm">
          Upload photos via the PocketBase admin panel at
          <code class="text-violet-400">http://127.0.0.1:8090/_/</code>
          under the <code class="text-violet-400">gallery</code> collection.
        </p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="img in images"
          :key="img.id"
          class="group relative aspect-[4/3] rounded-xl overflow-hidden glass-card focus:outline-none focus:ring-2 focus:ring-violet-500"
          @click="openLightbox(img)"
        >
          <img
            :src="getUrl(img, true)"
            :alt="img.title || 'Gallery image'"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p v-if="img.title" class="text-white font-medium text-sm">{{ img.title }}</p>
            <p v-if="img.description" class="text-violet-200/60 text-xs mt-0.5">{{ img.description }}</p>
          </div>
          <div class="absolute top-3 right-3 w-8 h-8 rounded-lg bg-dark-950/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selected"
        class="fixed inset-0 z-50 bg-dark-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        @click.self="closeLightbox"
      >
        <button
          class="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-violet-300 hover:text-white transition-colors"
          @click="closeLightbox"
          aria-label="Close"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div class="max-w-4xl w-full">
          <img
            :src="getUrl(selected)"
            :alt="selected.title || 'Gallery image'"
            class="w-full max-h-[80vh] object-contain rounded-2xl"
          />
          <div v-if="selected.title" class="mt-4 text-center">
            <p class="text-white font-medium">{{ selected.title }}</p>
            <p v-if="selected.description" class="text-violet-300/60 text-sm mt-1">{{ selected.description }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>
