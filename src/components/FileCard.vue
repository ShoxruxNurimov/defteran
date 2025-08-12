<template>
  <div class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition cursor-pointer" @click="$emit('open', file)">
    <div class="h-36 flex items-center justify-center bg-gray-50 rounded-md mb-3 relative">
      <div v-if="thumb" class="absolute inset-0">
        <img :src="thumb" class="object-cover w-full h-full rounded-md" />
      </div>
      <div v-else class="text-gray-400 text-xs">{{ ext }}</div>
    </div>

    <div class="text-sm font-medium truncate" :title="file.name">{{ file.name }}</div>
    <div class="text-xs text-gray-400 mt-1">{{ file.size }}</div>

    <div class="mt-2 flex justify-between items-center">
      <span class="text-xs text-gray-400">{{ file.date }}</span>
      <div class="flex items-center gap-2">
        <button @click.stop="$emit('menu', file)" class="text-gray-400 text-sm">•••</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ file: { type: Object, required: true }, thumb: { type: String, default: null } })
const ext = props.file.type ? props.file.type.toUpperCase() : 'FILE'
</script>
