<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <h1 class="mb-3">Login form</h1>
        <form
            @submit.prevent="validate({username: form.username, password: form.password, rememberMe: form.rememberMe})">
          <v-text-field label="User name" outlined v-model="form.username" @input="v$.username.$touch()"
                        @blur="v$.username.$touch()"
                        :error-messages="v$.username.$errors.length > 0 ? v$.username.$errors[0].$message : null">
          </v-text-field>
          <v-text-field
              v-model="form.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              outlined
              @click:append="showPassword = !showPassword"
              @input="v$.password.$touch()"
              @blur="v$.password.$touch()"
              :error-messages="v$.password.$errors.length > 0 ? v$.password.$errors[0].$message : null"
          ></v-text-field>
          <v-checkbox
              v-model="form.rememberMe"
              label="Remember me"
              class="ma-0"
          ></v-checkbox>
          <div class="d-flex justify-space-between">
            <v-btn
                type="submit"
                color="primary"
            >
              Login
            </v-btn>
            <v-btn to="/register"
            >
              Register
            </v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import {print} from 'graphql';
import {computed, reactive, ref} from '@vue/composition-api';
import useVuelidate from '@vuelidate/core'
import {email, minLength, required} from '@vuelidate/validators'
import {Login} from '../graphql/login.gql';

export default {
  name: "Login",
  setup(props, context) {
    const router = context.root.$router
    const form = reactive({
      username: null,
      password: null,
      rememberMe: false
    })

    const showPassword = ref(false);

    const validations = computed(() => {
      return {
        username: {required, email},
        password: {required, minLength: minLength(8)}
      };
    })

    const v$ = useVuelidate(validations, form)

    const validate = (variables) => {
      v$.value.$touch()

      if (!v$.value.$invalid) {
        const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3000/shop-api'
        axios
            .post(httpEndpoint, {
              query: print(Login),
              variables
            })
            .then((response) => {
              const token = response.headers['vendure-auth-token']
              if (token) {
                localStorage.setItem('apollo-token', token);
                router.push({path: '/account'})
              }
            })
            .catch((error) => console.error(error));
      }
    }

    return {
      form,
      showPassword,
      v$,
      validate,
    }
  }
}
</script>

<style scoped>

</style>