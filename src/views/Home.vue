<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-3">Main page</h1>
        <ProductList/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import ProductList from '@/components/ProductList.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    ProductList,
  },
})
</script>
