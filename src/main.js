import Vue from "vue"
import App from "./App"
import router from "./router"
import store from "./store"
import Vant from 'vant'
import 'vant/lib/index.css'
import "./styles/index.scss"
import 'amfe-flexible'

Vue.use(Vant);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//开启js热更新
if (module.hot) {
  module.hot.accept();
}