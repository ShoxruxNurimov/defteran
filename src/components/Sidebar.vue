<template>
  <aside class="w-64 bg-gray-50 flex flex-col">
    <!-- Kullanıcı Bilgisi -->
    <div class="flex items-center p-4 rounded-2xl bg-white">
      <img
        src="/user.jpeg"
        alt="User"
        class="w-10 h-10 rounded-full"
      />
      <div class="ml-3">
        <p class="text-sm font-semibold">Tayfun Akdemir</p>
        <p class="text-xs text-gray-500">Defteran Ltd.</p>
      </div>
    </div>

    <!-- Menü -->
    <nav class="flex-1 overflow-y-auto">
      <ul class="p-2 space-y-1">
        <SidebarItem :icon="HomeIcon" label="Anasayfa" to="/" />
        <SidebarItem :icon="UsersIcon" label="Cariler" to="/cariler" />
        <SidebarItem :icon="ShoppingCartIcon" label="Satışlar" to="/satislar" />
        <SidebarItem :icon="BanknotesIcon" label="Finans" to="/finans" />
        <SidebarItem :icon="ChartPieIcon" label="Raporlar" to="/raporlar" />
        <SidebarItem :icon="CubeIcon" label="Ürün ve Hizmetler" to="/urunler" />
        <SidebarItem :icon="UsersIcon" label="Çalışanlar" to="/calisanlar" />
        <SidebarItem :icon="DocumentTextIcon" label="Teklifler" to="/teklifler" />

        <!-- Kurum Faturaları (badge ile) -->
        <li>
          <RouterLink
            to="/kurum-faturalari"
            class="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <DocumentDuplicateIcon class="w-5 h-5 text-gray-500" />
            <span class="ml-3 flex-1">Kurum Faturaları</span>
            <span
              class="ml-auto bg-orange-500 text-white text-xs px-2 rounded-full"
            >
              2
            </span>
          </RouterLink>
        </li>

        <SidebarItem
          :icon="FolderIcon"
          label="Dosya Yöneticisi"
          to="/file-manager"
        />

        <!-- Entegrasyonlar başlığı -->
        <p class="px-3 mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
          Entegrasyonlar
        </p>
        <SidebarItem :icon="CreditCardIcon" label="Sanal POS" to="/sanal-pos" />
        <SidebarItem
          :icon="ChatBubbleOvalLeftIcon"
          label="Kısa Mesaj"
          to="/kisa-mesaj"
        />
        <SidebarItem
          :icon="DocumentDuplicateIcon"
          label="E-Fatura"
          to="/efatura"
        />
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  ChartPieIcon,
  CubeIcon,
  DocumentTextIcon,
  FolderIcon,
  CreditCardIcon,
  ChatBubbleOvalLeftIcon,
  DocumentDuplicateIcon
} from '@heroicons/vue/24/outline'
import SidebarItem from './SidebarItem.vue'
</script>
