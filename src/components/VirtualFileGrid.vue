<template>
  <div style="height:520px;">
    <virtual-scroller :items="items" class="grid grid-cols-4 gap-4" item-height="260" >
      <template #default="{ item }">
        <FileCard :file="item" @open="open" />
      </template>
    </virtual-scroller>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import FileCard from './FileCard.vue'
import { RecycleScroller as VirtualScroller } from 'vue-virtual-scroller'
const props = defineProps({ items: { type: Array, required: true } })
function open(f){ /* bubble event up if needed */ }
</script>
