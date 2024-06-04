import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelpView from '../views/HelpView.vue'
import StatsView from '../views/StatsView.vue'
import MembersView from '../views/MembersView.vue'
import ArchiveView from '../views/ArchiveView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView
  },
  {
    path: '/members',
    name: 'members',
    component: MembersView
  },
  {
    path: '/archive',
    name: 'Archive',
    component: ArchiveView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
