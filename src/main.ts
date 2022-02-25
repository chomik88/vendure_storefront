import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueCompositionAPI from "@vue/composition-api";
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI);

new Vue({
    router,
    vuetify,
    apolloProvider: createProvider(),
    render: h => h(App)
}).$mount('#app')
