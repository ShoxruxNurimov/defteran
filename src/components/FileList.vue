<template>
  <div class="bg-white rounded-xl shadow-sm overflow-hidden">
    <div class="p-4 border-b flex items-center justify-between">
      <div class="flex items-center gap-2">
        <input type="checkbox" @change="toggleAll" :checked="allSelected" />
        <div class="text-sm font-medium">Dosya</div>
      </div>

      <div class="text-sm text-gray-500">İşlemler</div>
    </div>

    <div>
      <div v-for="f in files" :key="f.id" class="p-4 hover:bg-gray-50 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <input type="checkbox" :checked="isSelected(f.id)" @change="toggle(f.id)" />
          <div class="min-w-0">
            <div class="font-medium truncate">{{ f.name }}</div>
            <div class="text-xs text-gray-400">{{ f.date }} • {{ f.size }}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button @click="$emit('download', f)" class="text-sm">İndir</button>
          <button @click="$emit('rename', f)" class="text-sm">Yeniden Adlandır</button>
          <button @click="$emit('delete', f.id)" class="text-sm text-red-500">Sil</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFilesStore } from '../store/files'
const props = defineProps({ files: { type: Array, required: true } })
const filesStore = useFilesStore()

const allSelected = computed(() => {
  return props.files.length && props.files.every(f => filesStore.selection.has(f.id))
})

function toggleAll(e) {
  if (e.target.checked) {
    props.files.forEach(f => filesStore.selection.add(f.id))
  } else {
    props.files.forEach(f => filesStore.selection.delete(f.id))
  }
}

function toggle(id) { filesStore.toggleSelect(id) }
function isSelected(id) { return filesStore.selection.has(id) }
</script>
