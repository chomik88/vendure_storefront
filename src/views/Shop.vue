<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-3">Shop</h1>
        <ProductList/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductList from "@/components/ProductList.vue";

export default {
  name: "Shop",
  components: {
    ProductList,
  },
}
</script>

<style scoped>

</style>