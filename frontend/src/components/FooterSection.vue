<template>
  <footer class="bg-dark-900 border-t border-violet-900/30 py-12">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-10 mb-10">

        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span class="font-display font-bold text-lg text-white">PhysioFlow</span>
          </div>
          <p class="text-violet-300/50 text-sm leading-relaxed">
            Combining clinical physiotherapy with the healing power of yoga and Pilates.
          </p>
        </div>

        <!-- Quick links -->
        <div>
          <h4 class="text-white font-medium text-sm mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in [['#about', 'About'], ['#courses', 'Courses'], ['#gallery', 'Gallery'], ['#contact', 'Contact']]" :key="link[0]">
              <a
                :href="link[0]"
                class="text-violet-300/50 hover:text-violet-300 text-sm transition-colors"
              >
                {{ link[1] }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-medium text-sm mb-4">Contact</h4>
          <ul class="space-y-2 text-sm text-violet-300/50">
            <li>hello@physioflow.ch</li>
            <li>+41 44 000 00 00</li>
            <li>Switzerland</li>
          </ul>
        </div>

      </div>

      <div class="border-t border-violet-900/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-violet-300/30 text-xs">
          &copy; {{ new Date().getFullYear() }} PhysioFlow. All rights reserved.
        </p>
        <p class="text-violet-300/20 text-xs">
          Built with Vue 3 &amp; PocketBase
        </p>
      </div>
    </div>
  </footer>
</template>
