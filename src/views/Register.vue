<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h1 class="mb-3">Register form</h1>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="12" md="6">
                <ValidationProvider name="First name" rules="required|alpha" v-slot="{errors}">
                  <v-text-field label="First name" outlined v-model="form.firstName" :error-messages="errors">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider name="Last name" rules="required|alpha" v-slot="{errors}">
                  <v-text-field label="Last name" outlined v-model="form.lastName" :error-messages="errors">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider name="E-mail" rules="required|email" v-slot="{errors}">
                  <v-text-field label="E-mail" type="email" outlined v-model="form.emailAddress"
                                :error-messages="errors">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider name="Phone number" rules="required|numeric" v-slot="{errors}">
                  <v-text-field label="Phone number" outlined v-model="form.phoneNumber" :error-messages="errors">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider name="Title" rules="required|alpha" v-slot="{errors}">
                  <v-text-field label="Title" outlined v-model="form.title" :error-messages="errors">
                  </v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
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
              </v-col>
            </v-row>
            <div class="d-flex justify-space-between">
              <v-btn
                  type="submit"
                  color="primary"
                  :disabled="invalid"
              >
                Register
              </v-btn>
              <v-btn
                  to="/login"
              >
                Login
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
import {REGISTER_CUSTOMER_ACCOUNT} from "../graphql/register";

export default {
  name: "Register",
  components: {ValidationObserver, ValidationProvider},
  setup() {
    const form = reactive({
      emailAddress: null,
      title: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      password: null
    })
    const showPassword = ref(false);
    const registerUser = useMutation(REGISTER_CUSTOMER_ACCOUNT)
    const onSubmit = () => {
      registerUser.mutate({
        input: form
      })
    }
    return {
      form,
      showPassword,
      onSubmit
    }
  }
}
</script>

<style scoped>
</style>