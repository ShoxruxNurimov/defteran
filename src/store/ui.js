import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const uploadModal = ref(false)
  const previewModal = ref({ open: false, file: null })
  const dark = ref(false)

  function openUpload() { uploadModal.value = true }
  function closeUpload() { uploadModal.value = false }

  function openPreview(file) { previewModal.value = { open: true, file } }
  function closePreview() { previewModal.value = { open: false, file: null } }

  function toggleDark() { dark.value = !dark.value }

  return { uploadModal, previewModal, dark, openUpload, closeUpload, openPreview, closePreview, toggleDark }
})
