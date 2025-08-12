<template>
  <header class="bg-gray-50 border-gray-200 flex items-center px-6 h-16">
    <!-- Sol kısım: Logo + Başlık -->
    <div class="flex items-center gap-6 cursor-pointer">
      <img src="/logo.png" alt="Defteran" class="h-7" />
    </div>
    
    <!-- Orta kısım: Döviz kurları -->
    <div class="hidden md:flex items-center gap-4 text-sm ml-auto mr-6">
      <h1 class="text-sm font-medium text-gray-900 mr-60">Dosya Yöneticisi</h1>
      <div class="flex items-center gap-1 text-gray-700">
        <span>$ 36,5141</span>
        <span class="text-red-500 cursor-pointer">⭮</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="flex items-center gap-1 text-gray-700">
        <span>€ 39,9502</span>
        <span class="text-green-500 cursor-pointer">⭮</span>
      </div>
      <span class="text-gray-300">•</span>
      <div class="flex items-center gap-1 text-gray-700">
        <span>£ 47,3134</span>
        <span class="text-green-500 cursor-pointer">⭮</span>
      </div>
    </div>

    <!-- Sağ kısım: İkonlar + Buton -->
    <div class="flex items-center gap-4">
      <BellIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
      <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 cursor-pointer" />
      <button
        class="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-600"
      >
        + Oluştur
      </button>
    </div>
  </header>
</template>

<script>
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export default {
  name: "Topbar",
  components: { BellIcon, MagnifyingGlassIcon },
};
</script>
