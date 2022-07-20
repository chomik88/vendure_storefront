<template>
  <v-container>
    <v-row>
      <v-col>
        <router-link to="/shop" class="mb-4 d-inline-block">Back</router-link>
        <ApolloQuery :query="require('../graphql/product.gql')" :variables="{id}"
                     @result="setInitialSelectValue($event)">
          <template v-slot="{ result: { loading, error, data } }">
            <div v-if="loading">Loading...</div>
            <v-row v-else-if="data">
              <v-col cols="5" v-if="currentVariant">
                <v-img
                    :src="currentVariant.assets.length > 0 ? currentVariant.assets[0].source : data.product.assets[0].source"
                    :alt="data.product.assets[0].name">
                </v-img>

              </v-col>
              <v-col cols="7">
                <h3>{{ data.product.name }}</h3>
                <p>{{ data.product.description }}</p>
                <form v-if="data.product.variants">
                  <div v-if="data.product.variants.length > 1">
                    <v-select :items="data.product.variants" item-text="name" item-value="sku"
                              label="Choose product variant" v-model="currentVariantSku"
                              @change="setCurrentVariant(currentVariantSku)">
                    </v-select>
                  </div>
                  <div class="d-flex justify-space-between">
                    <p>SKU: {{ currentVariant.sku }}</p>
                    <p>Stock: {{ currentVariant.stockLevel }}</p>
                  </div>
                  <div class="mb-3">
                    <span>Price: <strong>{{ currentVariant.priceWithTax / 100 }} {{
                        currentVariant.currencyCode
                      }}</strong>
                    </span>

                  </div>
                  <div class="d-flex justify-space-between align-center">
                    <div class="d-flex">
                      <v-text-field
                          label="Quantity"
                          v-model="quantity"
                          type="number"
                          outlined
                          min="1"
                          hide-details
                          class="quantity-input"
                      ></v-text-field>
                    </div>
                  </div>
                </form>
              </v-col>
            </v-row>
            <div v-else>No result :(</div>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref} from "vue";
import {updateCartTotalQuantity} from "@/utils/updateCartTotalQuantity.js";
import router from '../router';
export default {
  name: "ProductDetails",
  setup(props, context) {
    const route = router.currentRoute;
    const id = route.params.id;
    const variants = ref([]);
    const currentVariant = ref(null);
    const currentVariantSku = ref(null);
    const quantity = ref(1);
    const setInitialSelectValue = ({data}) => {
      variants.value = data.product.variants;
      currentVariant.value = data.product.variants[0];
      currentVariantSku.value = data.product.variants[0].sku;
    }

    const setCurrentVariant = (sku) => {
      const filteredVariant = variants.value.filter(variant => variant.sku === sku);
      currentVariant.value = filteredVariant[0]
    }

    // const {mutate: addToCart} = (useMutation(addItemToOrder, {
    //   variables: {
    //     productVariantId: currentVariant.value.id,
    //     quantity: quantity.value
    //   }
    // }))

    const onUpdateCartTotals = () => {
      context.emit('onUpdateCartTotals')
    }

    return {
      id,
      currentVariant,
      currentVariantSku,
      quantity,
      setInitialSelectValue,
      setCurrentVariant,
      updateCartTotalQuantity,
      onUpdateCartTotals
    }
  }
}
</script>

<style scoped>
.quantity-input {
  width: auto;
}
</style>