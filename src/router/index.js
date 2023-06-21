import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/login/Login.vue');
const Loggedinlayout = () => import('@/views/loggedinlayout/Loggedinlayout.vue');

const NaoEncontrado = () => import('@/views/paginas-de-erro/NaoEncontrado.vue');
const NaoAutorizado = () => import('@/views/paginas-de-erro/NaoAutorizado.vue');

const Estabelecimentos = () => import('@/views/estabelecimentos/Estabelecimentos.vue');
const EstabelecimentoEditar = () => import('@/views/estabelecimentos/EstabelecimentoEditar.vue');
const EstabelecimentoIncluir = () => import('@/views/estabelecimentos/EstabelecimentoIncluir.vue');
const EstabelecimentoDetalhe = () => import('@/views/estabelecimentos/EstabelecimentoDetalhe.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from) => {
        if (window.localStorage.getItem("token") !== null) {
          if(to.fullPath.includes("?")) {
            return { path: to.fullPath.replace("login?from=/", "")}
          }
          else {
            return { path: '/home' }
          }
        }
      },
      alias: ['']
    },
    {
      path: '',
      component: Loggedinlayout,
      children: [
        {
          path: '/naoautorizado',
          name: 'NaoAutorizado',
          component: NaoAutorizado
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'NaoEncontrado',
          component: NaoEncontrado
        },
        {
          path: '/estabelecimentos',
          name: 'Estabelecimentos',
          component: Estabelecimentos,
          meta: {
            acessoEscritorio: true,
            acessoGerente: true
          }
        },
        {
          path: '/estabelecimentos/incluir',
          name: 'EstabelecimentoIncluir',
          component: EstabelecimentoIncluir,
          meta: {
            acessoEscritorio: true,
            acessoGerente: true,
          }
        },
        {
          path: '/estabelecimentos/editar/:id',
          name: 'EstabelecimentoEditar',
          component: EstabelecimentoEditar,
          meta: {
            acessoEscritorio: true,
            acessoGerente: true,
          }
        },
        {
          path: '/estabelecimentos/detalhe/:id',
          name: 'EstabelecimentoDetalhe',
          component: EstabelecimentoDetalhe,
          meta: {
            acessoEscritorio: true,
            acessoGerente: true
          }
        },
      ],
      meta: {
        requiresAuth: true
      },
    },

  ],
});

export default router;