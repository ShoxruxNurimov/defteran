<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
    <Topbar />
    <div class="max-w-7xl mx-auto grid grid-cols-12 gap-6">
      <div class="col-span-3">
        <Sidebar />
      </div>

      <div class="col-span-9 space-y-6">
        <Mainbar />

        <section class="bg-transparent bg-white p-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-md font-semibold">Muhasebe Belgeleri</h2>
              <p class="text-sm text-gray-500">Muhasebe tarafından gönderilen belgeler</p>
            </div>
            <div class="flex gap-2 items-center">
              <!-- placeholder actions -->
            </div>
          </div>

          <div class="mt-4 grid grid-cols-5 gap-4">
            <FileCard v-for="f in muhasebe" :key="f.id" :file="f" @open="openPreview" />
          </div>
        </section>

        <section class="bg-transparent bg-white p-4">
          <h2 class="text-md font-semibold mb-3">İşletme Belgeleri</h2>
          <FileList :files="isletme" @delete="onDelete" @download="onDownload" @rename="onRename" />
        </section>

        <section class="bg-transparent bg-white p-4">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-md font-semibold">Tüm Dosyalar</h2>
            <div class="flex items-center gap-2">
              <div class="text-sm text-gray-500">{{ files.filteredFiles().length }} sonuç</div>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-5 gap-4">
            <FileCard v-for="f in muhasebe" :key="f.id" :file="f" @open="openPreview" />
          </div>

          <div v-if="files.viewMode === 'grid'">
            <virtual-scroller :items="files.filteredFiles()" item-height="260">
              <template #default="{ item }">
                <FileCard :file="item" @open="openPreview" @menu="onMenu" />
              </template>
            </virtual-scroller>
          </div>

          <div v-else>
            <FileList :files="files.filteredFiles()" @delete="onDelete" @download="onDownload" @rename="onRename" />
          </div>
        </section>
      </div>
    </div>

    <UploadModal />
    <PreviewModal />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
import Mainbar from '../components/Mainbar.vue'
import FileCard from '../components/FileCard.vue'
import FileList from '../components/FileList.vue'
import UploadModal from '../components/UploadModal.vue'
import PreviewModal from '../components/PreviewModal.vue'
import { RecycleScroller as VirtualScroller } from 'vue-virtual-scroller'
import { useFilesStore } from '../store/files'
import { useUiStore } from '../store/ui'

const files = useFilesStore()
const ui = useUiStore()

onMounted(() => {
  files.load()
})

const muhasebe = computed(() => files.files.filter(f => f.category === 'Muhasebe'))
const isletme = computed(() => files.files.filter(f => f.category === 'Isletme'))

function onDelete(id) {
  if (confirm('Dosyayı silmek istediğinize emin misiniz?')) files.remove(id)
}
function onDownload(f) {
  alert(`"${f.name}" indiriliyor (mock).`)
}
function onRename(f) {
  const yeni = prompt('Yeni ad girin', f.name)
  if (yeni) files.rename(f.id, yeni)
}
function openPreview(f) {
  ui.openPreview(f)
}
function onMenu(f) {
  // context menu placeholder
  console.log('menu', f)
}
</script>

<style>
/* virtual scroller grid fix */
.vue-recycle-scroller__item-wrapper { display: contents; }
</style>
