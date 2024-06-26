import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Sermon from '@/views/sermon/Sermons.vue'
import Users from '@/views/users/Users.vue'
import Profile from '@/views/users/Profile.vue'
import Payments from '@/views/payments/Payments.vue'
import PaymentInfo from '@/views/payments/PaymentInfo.vue'
import Programs from '@/views/program/Programs.vue'
import AddProgram from '@/views/program/AddProgram.vue'
import Locations from '@/views/location/Locations.vue'
import LoginView from '@/views/LoginView.vue'
import AudioDetails from '@/views/sermon/AudioDetails.vue'
import LocationDetails from '@/views/location/LocationDetails.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'home', component: LoginView },
    {
      path: '/overview',
      name: 'overview',
      component: HomeView,
      meta: { title: 'Overview - VOOTV Admin' }
    },
    {
      path: '/sermon',
      name: 'sermon',
      component: Sermon,
      meta: { title: 'Sermon - VOOTV Admin' }
    },
    { path: '/users', name: 'users', component: Users, meta: { title: 'Users - VOOTV Admin' } },
    {
      path: '/users/:id',
      component: Profile,
      name: 'profile',
      meta: { title: 'Profile - VOOTV Admin' }
    },
    {
      path: '/payments',
      name: 'payments',
      component: Payments,
      meta: { title: 'Partners - VOOTV Admin' }
    },
    {
      path: '/payments/:id',
      name: 'payment',
      component: PaymentInfo,
      meta: { title: 'Partners Info - VOOTV Admin' }
    },
    {
      path: '/programs',
      name: 'programs',
      component: Programs,
      meta: { title: 'Programs - VOOTV Admin' }
    },
    {
      path: '/programs/add-program',
      name: 'add-program',
      component: AddProgram,
      meta: { title: 'Add Program - VOOTV Admin' }
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
      meta: { title: 'Locations - VOOTV Admin' }
    },
    {
      path: '/location/:id',
      name: 'Location Details',
      component: LocationDetails,
      meta: { title: 'Location Details - VOOTV Admin' }
    },
    {
      path: '/audios/:id',
      name: 'audio',
      component: AudioDetails,
      meta: { title: 'Audio - VOOTV Admin' }
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) ?? 'Admin Dashboard'
})

export default router
