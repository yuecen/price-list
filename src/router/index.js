import Vue from 'vue'
import Router from 'vue-router'
import PriceList from '@/components/PriceList'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PriceList',
      component: PriceList
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    }
  ]
})
