<template>
  <div v-if="ui.previewModal.open" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/60" @click="close"></div>

    <div class="relative z-60 w-[90%] h-[90%] bg-white rounded-xl overflow-auto p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="font-medium">{{ ui.previewModal.file?.name }}</div>
        <div>
          <button class="btn border" @click="close">Kapat</button>
        </div>
      </div>

      <div v-if="isPdf" class="h-full">
        <canvas ref="canvas" class="w-full h-full bg-gray-100 rounded"></canvas>
      </div>
      <div v-else class="p-6">
        <p class="text-sm">Önizleme mevcut değil. İndirerek açabilirsiniz.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { useUiStore } from '../store/ui'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${(getDocument.version||'2.16.105')}/pdf.worker.min.js`

const ui = useUiStore()
const canvas = ref(null)

const isPdf = computed(() => {
  const f = ui.previewModal.file
  if (!f) return false
  return (f.type && f.type.toLowerCase() === 'pdf') || (f.name && f.name.toLowerCase().endsWith('.pdf'))
})

watch(() => ui.previewModal, (nv) => {
  if (nv.open && isPdf.value) renderPdf(nv.file)
})

async function renderPdf(file) {
  try {
    // For real backend we'd fetch blob; here we simulate by creating blob from empty pdf or using file if uploaded
    // If file has a URL/thumbnail, use it.
    // We'll try to fetch a sample pdf from public if network allowed; fallback to empty canvas
    const pdfSrc = file.url || null
    if (!pdfSrc) return
    const loadingTask = getDocument(pdfSrc)
    const pdf = await loadingTask.promise
    const page = await pdf.getPage(1)
    const viewport = page.getViewport({ scale: 1.2 })
    const ctx = canvas.value.getContext('2d')
    canvas.value.height = viewport.height
    canvas.value.width = viewport.width
    const renderContext = { canvasContext: ctx, viewport }
    await page.render(renderContext).promise
  } catch (e) {
    console.error('pdf render hata', e)
  }
}

function close() { ui.closePreview() }
</script>
