import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/GameMenu.vue'
import GameScene from './views/GameScene'
import Draw from './views/Draw'
import AIWin from './views/AIWin'
import HumanWin from './views/HumanWin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Home
    },
    {
      path: '/game',
      name: 'game',
      component: GameScene
    },
    {
      path: '/draw',
      name: 'draw',
      component: Draw
    },
    {
      path: '/ai-win',
      name: 'ai-win',
      component: AIWin
    },
    {
      path: '/human-win',
      name: 'human-win',
      component: HumanWin
    },
  ]
})
