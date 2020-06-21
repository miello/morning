import Vue from 'vue'
import App from './App.vue'
import Gen from './components/GenerateFile.vue'

Vue.config.productionTip = false

const routes = {
  '/': App,
  '/gen': Gen
}

new Vue({
  data() {
    return {
      currentRoute: window.location.pathname
    }
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute]
    }
  },
  render(h) {
    return h(this.ViewComponent)
  }
}).$mount('#app')
