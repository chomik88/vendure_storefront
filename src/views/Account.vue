<template>
  <v-container>
    <v-row>
      <v-col>
        <ApolloQuery :query="require('../graphql/activeCustomer.gql')">
          <template v-slot="{ result: { loading, error, data } }">
            <div v-if="loading">Loading...</div>
            <v-row v-else-if="data">
              <h1 class="mt-3">Customer account</h1>
              <v-tabs v-model="tab" class="mt-3">
                <v-tab key="details">Account details</v-tab>
                <v-tab key="orders">Your orders</v-tab>
                <v-tab key="addresses">Your addresses</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab" class="mt-3">
                <v-tab-item key="details">
                  <div class="d-flex flex-column">
                    <strong>Full name:</strong>
                    <p>{{ data.activeCustomer.firstName }} {{ data.activeCustomer.lastName }}</p>
                  </div>
                  <div class="d-flex flex-column">
                    <strong>Phone number:</strong>
                    <p>{{ data.activeCustomer.phoneNumber }} </p>
                  </div>
                  <div class="d-flex flex-column">
                    <strong>E-mail address:</strong>
                    <p>{{ data.activeCustomer.emailAddress }} </p>
                  </div>
                </v-tab-item>
                <v-tab-item key="orders">
                  {{ data.activeCustomer.orders }}
                </v-tab-item>
                <v-tab-item key="addresses">
                  {{ data.activeCustomer.addresses }}
                </v-tab-item>
              </v-tabs-items>
            </v-row>
            <div v-else>You are not logged in</div>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref} from '@vue/composition-api'

export default {
  name: "Account",
  setup() {
    const tab = ref(null);
    return {
      tab
    }
  }
}
</script>

<style scoped>

</style>