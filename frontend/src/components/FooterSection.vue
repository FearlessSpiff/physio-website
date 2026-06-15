<template>
  <footer class="bg-brand-800 border-t border-brand-500/30 py-12">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid md:grid-cols-3 gap-10 mb-10">

        <!-- Brand -->
        <div>
          <img src="/logo.png" alt="Physio-Lisa.ch" class="h-16 w-auto mb-4" />
          <p class="text-slate-400 text-sm leading-relaxed">
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
                class="text-slate-400 hover:text-teal-300 text-sm transition-colors"
              >
                {{ link[1] }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-medium text-sm mb-4">Contact</h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li>hello@physio-lisa.ch</li>
            <li>+41 44 000 00 00</li>
            <li>Switzerland</li>
          </ul>
        </div>

      </div>

      <div class="border-t border-brand-500/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-slate-500 text-xs">
          &copy; {{ new Date().getFullYear() }} Physio-Lisa.ch. All rights reserved.
        </p>
        <p class="text-slate-600 text-xs">
          Built with Vue 3 &amp; PocketBase
        </p>
      </div>
    </div>
  </footer>
</template>
