<template>
  <li>
    <RouterLink
      :to="to"
      class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-200"
    >
      <component :is="icon" class="w-5 h-5 mr-3 text-gray-500" />
      <span>{{ label }}</span>
    </RouterLink>
  </li>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    icon: { type: [Object, Function], required: true },
    label: { type: String, required: true },
    to: { type: String, required: true }
  }
}
</script>
