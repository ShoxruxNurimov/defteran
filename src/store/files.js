import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listFiles, uploadFileMock, deleteFileMock, renameFileMock } from '../api/mockFilesService'

export const useFilesStore = defineStore('files', () => {
  const files = ref([])
  const viewMode = ref('grid') // grid | list
  const filter = ref('')
  const category = ref(null)
  const selection = ref(new Set())
  const loading = ref(false)

  async function load() {
    loading.value = true
    const r = await listFiles()
    files.value = r.data
    loading.value = false
  }

  function setView(m) { viewMode.value = m }
  function setFilter(q) { filter.value = q }
  function setCategory(c) { category.value = c }

  function filteredFiles() {
    let list = files.value.slice()
    if (category.value) list = list.filter(f => f.category === category.value)
    if (filter.value && filter.value.trim()) {
      const q = filter.value.toLowerCase()
      list = list.filter(f => f.name.toLowerCase().includes(q))
    }
    return list
  }

  async function upload(file, onProgress) {
    const res = await uploadFileMock(file, onProgress)
    files.value.unshift(res.data)
    return res.data
  }

  async function remove(id) {
    await deleteFileMock(id)
    files.value = files.value.filter(f => f.id !== id)
    selection.value.delete(id)
  }

  async function rename(id, newName) {
    const res = await renameFileMock(id, newName)
    const idx = files.value.findIndex(x => x.id === id)
    if (idx !== -1) files.value[idx] = res.data
  }

  function toggleSelect(id) {
    if (selection.value.has(id)) selection.value.delete(id)
    else selection.value.add(id)
  }

  function clearSelection() { selection.value = new Set() }

  function selectAll() {
    files.value.forEach(f => selection.value.add(f.id))
  }

  return { files, viewMode, filter, category, selection, loading, load, setView, setFilter, setCategory, filteredFiles, upload, remove, rename, toggleSelect, clearSelection, selectAll }
})
