import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Vue, {provide} from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from './plugins/vuetify'
import store from "./store";
import { createProvider } from './vue-apollo'
import {DefaultApolloClient} from "@vue/apollo-composable";

Vue.config.productionTip = false;

const apolloProvider = createProvider();
new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  setup(){
    provide(DefaultApolloClient, apolloProvider.defaultClient)
  },
  render: (h) => h(App),
}).$mount("#app");
