<template>
  <div class="flex items-center justify-between px-6 py-4 bg-white rounded-2xl">
    <!-- Sol taraf: Başlık + açıklama -->
    <div class="flex items-center gap-3">
      <!-- İkon -->
      <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
        <FolderIcon class="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 class="text-base font-medium text-gray-900">Dosya Yöneticisi</h2>
        <p class="text-sm text-gray-500">Dosyalarınızı görüntüleyin ve düzenleyin</p>
      </div>
    </div>

    <!-- Sağ taraf: Arama + Yeni butonu -->
    <div class="flex items-center gap-3">
      <!-- Arama -->
      <div class="relative">
        <MagnifyingGlassIcon class="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Dosyalarda ara..."
          class="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- Yeni butonu -->
      <div class="relative" @mouseleave="menuOpen = false">
        <button
          @click="menuOpen = !menuOpen"
          class="flex items-center gap-2 border border-green-500 text-green-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-50"
        >
          <PlusIcon class="w-4 h-4" />
          Yeni
          <ChevronDownIcon class="w-4 h-4" />
        </button>

        <!-- Dropdown -->
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
        >
          <button
            class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
          >
            <FolderIcon class="w-4 h-4 text-gray-500" /> Yeni Klasör
          </button>
          <button
            class="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
          >
            <ArrowUpTrayIcon class="w-4 h-4 text-gray-500" /> Yeni Dosya
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
  FolderIcon,
  ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "Mainbar",
  components: {
    MagnifyingGlassIcon,
    PlusIcon,
    ChevronDownIcon,
    FolderIcon,
    ArrowUpTrayIcon,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
};
</script>
