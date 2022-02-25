<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mt-3 mb-3">Cart</h1>
        <ApolloQuery :query="require('../graphql/activeOrder.gql')">
          <template v-slot="{ result: { loading, error, data } }">
            <div v-if="loading">Loading...</div>
            <v-row v-else-if="data">
              <v-col>
                <v-card class="pa-4">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th class="text-left">
                          Product name
                        </th>
                        <th class="text-left">
                          Price
                        </th>
                        <th class="text-left">
                          Quantity
                        </th>
                        <th class="text-left">
                          Value
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in data.activeOrder.lines" :key="item.id">
                        <td class="pt-2 pb-2">{{ item.productVariant.name }}</td>
                        <td class="pt-2 pb-2">
                          {{ item.unitPriceWithTax / 100 }} {{ data.activeOrder.currencyCode }}
                        </td>
                        <td class="pt-2 pb-2">
                          <ApolloMutation :mutation="require('../graphql/adjustOrderLine.gql')"
                                          :variables="{orderLineId: item.id, quantity: Number(item.quantity)}">
                            <template v-slot="{mutate}">
                              <v-text-field
                                  label="Quantity"
                                  v-model="item.quantity"
                                  type="number"
                                  outlined
                                  min="1"
                                  max="100"
                                  hide-details
                                  class="quantity-input"
                                  @change="mutate"
                              ></v-text-field>
                            </template>
                          </ApolloMutation>
                        </td>
                        <td class="pt-2 pb-2">
                          {{ item.unitPriceWithTax * item.quantity / 100 }} {{ data.activeOrder.currencyCode }}
                        </td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
                <pre>
                  {{ data }}
                </pre>
              </v-col>
            </v-row>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Cart",
}
</script>

<style scoped>

</style>