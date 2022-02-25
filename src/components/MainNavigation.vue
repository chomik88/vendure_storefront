<template>
  <div>
    <v-app-bar
        color="teal darken-2"
        dark
    >
      <v-app-bar-nav-icon @click="toggleAppDrawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon class="mr-4" @click="toggleAccountClick">
        mdi-account
      </v-icon>
      <v-badge
          :content="3"
          :value="3"
          color="green"
          overlap
      >
        <v-icon @click="goToCart">
          mdi-cart
        </v-icon>
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
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/">
                Home
              </router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/shop">
                Shop
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {ref} from "@vue/composition-api";

export default {
  setup(props, context) {
    const router = context.root.$router
    const drawer = ref(false);
    const group = ref(null);

    const toggleAppDrawer = () => {
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
    const goToCart = () => {
      router.push({path: '/cart'})
    }
    return {
      drawer,
      group,
      toggleAppDrawer,
      toggleAccountClick,
      goToCart
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