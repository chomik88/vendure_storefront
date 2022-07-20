<template>
  <v-app>
    <!--    <MainNavigation :refresh="refresh" @cartBadgeUpdated="clearRefresh"/>-->
    <MainNavigation/>
    <v-main>
      <!--      <router-view @onUpdateCartTotals="updateCartBadge"/>-->
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
// import {ref} from '@vue/composition-api';
import MainNavigation from '@/components/MainNavigation.vue'

export default Vue.extend({
  name: 'App',
  components: {MainNavigation},
  setup() {
    // const refresh = ref(false);
    // const updateCartBadge = () => {
    //   refresh.value = true;
    // }
    // const clearRefresh = () => {
    //   refresh.value = false;
    // }
    return {
      // refresh,
      // updateCartBadge,
      // clearRefresh
    }
  }
});
</script>
