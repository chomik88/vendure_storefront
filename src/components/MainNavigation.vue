<template>
  <div>
    <v-app-bar
        color="teal darken-2"
        dark
    >
      <v-app-bar-nav-icon @click="openAppDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="mr-4" @click="toggleAccountClick">
        mdi-account
      </v-icon>
      <v-badge
          :content="totalQuantity"
          :value="totalQuantity"
          color="green"
          overlap
      >
        <router-link to="/cart">
          <v-icon>
            mdi-cart
          </v-icon>
        </router-link>
      </v-badge>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list
          nav
          dense
      >
        <v-list-item-group
            v-model="group"
            active-class="teal--text text--darken--2"
        >
          <router-link to="/">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/shop">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cart</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Shop
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {ref} from "vue";
import router from "../router";

export default {
  setup() {
    const drawer = ref(false);
    const group = ref(null);
    const totalQuantity = ref('0');
    const openAppDrawer = () => {
      return drawer.value = true
    }
    const toggleAccountClick = () => {
      const token = localStorage.getItem('apollo-token')
      if (token) {
        router.push({path: '/account'})
      } else {
        router.push({path: '/login'})
      }
    }
    return {
      drawer,
      group,
      totalQuantity,
      openAppDrawer,
      toggleAccountClick,
    }
  }
}
</script>

<style scoped>
.v-application a {
  color: #272727;
  text-decoration: unset;
}
</style>