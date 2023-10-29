import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import useAuthUser from 'src/composables/UseAuthUser'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  // analizar se o usuário está logado antes de entrar na rota
  Router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser()

    // Verifica se o hash da URL contém 'type=recovery' e se o nome da rota não é 'reset-password'
    if (to.hash.includes('type=recovery') && to.name !== 'reset-password') {
      // Obtém o token de acesso do hash da URL
      const accessToken = to.hash.split('&')[0]
      const token = accessToken.replace('#access_token=', '')
      // Redireciona o usuário para a página de redefinição de senha com o token de acesso
      return { name: 'reset-password', query: { token } }
    }

    if (
      !isLoggedIn() &&
      to.meta.requiresAuth &&
      !Object.keys(to.query).includes('fromEmail')
    ) {
      return { name: 'login' }
    }
  })

  return Router
})
