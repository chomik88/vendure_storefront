<template>
  <v-app>
    <MainNavigation/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import MainNavigation from '@/components/MainNavigation.vue'

export default Vue.extend({
  name: 'App',
  components: {MainNavigation},
  setup() {
    return {
    }
  }
});
</script>
