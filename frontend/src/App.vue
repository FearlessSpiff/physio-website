<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import CoursesSection from './components/CoursesSection.vue'
import GallerySection from './components/GallerySection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-dark-950">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <GallerySection />
      <ContactSection />
    </main>
    <FooterSection />
  </div>
</template>
