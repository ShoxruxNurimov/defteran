import { createRouter, createWebHistory } from 'vue-router'
import FileManagerView from '../views/FileManagerView.vue'

const routes = [
  { path: '/', name: 'home', component: FileManagerView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
