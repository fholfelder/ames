import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import EmojiExerciseView from '@/views/EmojiExerciseView.vue'
import RectangleExerciseView from '@/views/RectangleExerciseView.vue'
import { useCookies } from '@vueuse/integrations/useCookies'

const exerciseRoutes = [
  {
    path: '/emoji-exercise',
    name: 'EmojiExercise',
    component: EmojiExerciseView,
  },
  {
    path: '/rectangle-exercise',
    name: 'RectangleExercise',
    component: RectangleExerciseView,
  },
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: {},
  },
  ...exerciseRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.path === '/exercise') {
    const cookies = useCookies(['latestSolution'])

    const solutionKey = 'latestSolution'

    if (exerciseRoutes.length === 0) throw new Error('No routes existing!')

    let randomRoute = exerciseRoutes[0]

    do {
      const randomIndex = Math.floor(Math.random() * exerciseRoutes.length)
      randomRoute = exerciseRoutes[randomIndex]!
    } while (randomRoute.name === cookies.get(solutionKey))

    cookies.set(solutionKey, randomRoute.name)
    next(randomRoute.path)
  } else {
    next()
  }
})

export default router
