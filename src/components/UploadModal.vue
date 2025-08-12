<template>
  <div v-if="ui.uploadModal" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="close"></div>

    <div class="relative z-60 bg-white rounded-xl p-6 w-full max-w-2xl">
      <h3 class="text-lg font-semibold mb-3">Dosya Yükle</h3>

      <div class="border-2 border-dashed rounded-lg p-6 text-center" @drop.prevent="onDrop" @dragover.prevent>
        <input ref="input" type="file" multiple class="hidden" @change="onFile" />
        <button class="btn bg-brand-500 text-white" @click="trigger">Dosya Seç</button>
        <p class="text-xs text-gray-400 mt-3">Veya dosyaları buraya sürükleyip bırak.</p>

        <div v-if="queue.length" class="mt-4 space-y-2">
          <div v-for="(q, idx) in queue" :key="idx" class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="text-sm truncate">{{ q.name }}</div>
              <div class="text-xs text-gray-400">{{ q.size }}</div>
            </div>
            <div class="w-48">
              <div class="bg-gray-200 h-2 rounded">
                <div :style="{ width: q.progress + '%' }" class="h-2 rounded bg-brand-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button class="btn border" @click="close">Kapat</button>
        <button class="btn bg-brand-500 text-white" @click="startUpload" :disabled="!queue.length">Yükle</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUiStore } from '../store/ui'
import { useFilesStore } from '../store/files'

const ui = useUiStore()
const filesStore = useFilesStore()
const input = ref(null)
const queue = reactive([])

function trigger() { input.value.click() }
function onFile(e) {
  const list = Array.from(e.target.files || [])
  addFiles(list)
}
function onDrop(e) {
  const list = Array.from(e.dataTransfer.files || [])
  addFiles(list)
}
function addFiles(list) {
  list.forEach(f => queue.push({ name: f.name, file: f, size: `${Math.max(1, Math.round(f.size/1024))} KB`, progress: 0 }))
}

function close() {
  queue.splice(0)
  ui.closeUpload()
}

async function startUpload() {
  // upload one by one
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]
    await filesStore.upload(item.file, (p) => {
      item.progress = p
    })
    item.progress = 100
  }
  queue.splice(0)
  ui.closeUpload()
}
</script>
