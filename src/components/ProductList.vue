<template>
  <div>
    <ApolloQuery :query="require('../graphql/products.gql')"
                 :variables="{options:{take: itemsPerPage, skip: (page - 1) * itemsPerPage}}">
      <template v-slot="{ result: { loading, error, data } }">
        <div v-if="loading">Loading...</div>
        <v-row v-else-if="data">
          <v-col cols="4" v-for="product in data.products.items" :key="product.id">
            <router-link :to="`/products/${product.id}`">
              <v-img :src="product.assets[0].source" :alt="product.assets[0].name" max-height="150">
              </v-img>
              <h3>{{ product.name }}</h3>
              <p v-if="product.variants.length === 1">Price: <strong>{{ product.variants[0].price }}</strong></p>
              <p v-else>Show details</p>
            </router-link>
          </v-col>
          <v-col v-if="data.products.totalItems">
            <v-pagination
                v-model="page"
                class="my-4"
                :length="Math.ceil(data.products.totalItems / itemsPerPage)"
            ></v-pagination>
          </v-col>
        </v-row>
        <div v-else>No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import {ref} from "@vue/composition-api";

export default {
  name: "ProductList",
  setup() {
    const itemsPerPage = 12;
    const page = ref(1);

    return {
      page,
      itemsPerPage
    }
  }
}
</script>

<style scoped>

</style>