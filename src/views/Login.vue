<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <h1 class="mb-3">Login form</h1>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="onSubmit">
            <ValidationProvider name="User name" rules="required|email" v-slot="{errors}">
              <v-text-field label="User name" outlined v-model="form.username"
                            :error-messages="errors">
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="Password" rules="required" v-slot="{errors}">
              <v-text-field
                  v-model="form.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 8 characters"
                  outlined
                  @click:append="showPassword = !showPassword"
                  :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <v-checkbox
                v-model="form.rememberMe"
                label="Remember me"
                class="ma-0"
            ></v-checkbox>
            <div class="d-flex justify-space-between">
              <v-btn
                  type="submit"
                  color="primary"
                  :disabled="invalid"
              >
                Login
              </v-btn>
              <v-btn to="/register"
              >
                Register
              </v-btn>
            </div>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {reactive, ref} from 'vue';
import {ValidationObserver, ValidationProvider} from 'vee-validate/dist/vee-validate.full';
import {useMutation} from "@vue/apollo-composable";
import {LOGIN_CUSTOMER} from "../graphql/login";

export default {
  name: "Login",
  components: {ValidationObserver, ValidationProvider},
  setup() {
    const form = reactive({
      username: null,
      password: null,
      rememberMe: false
    })
    const showPassword = ref(false);
    const loginUser = useMutation(LOGIN_CUSTOMER);
    const onSubmit = () => {
      loginUser.mutate({
        ...form
      })
    }
    return {
      form,
      showPassword,
      onSubmit,
    }
  }
}
</script>

<style scoped>
</style>