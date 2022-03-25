<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h1 class="mb-3">Register form</h1>
        <ApolloMutation :mutation="require('../graphql/register.gql')"
                        :variables="{input: form}">
          <template v-slot="{mutate}">
            <form @submit.prevent="validate(mutate)">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="First name" outlined v-model="form.firstName"
                                @input="v$.firstName.$touch()"
                                @blur="v$.firstName.$touch()"
                                :error-messages="v$.firstName.$errors.length > 0 ? v$.firstName.$errors[0].$message : null">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Last name" outlined v-model="form.lastName"
                                @input="v$.lastName.$touch()"
                                @blur="v$.lastName.$touch()"
                                :error-messages="v$.lastName.$errors.length > 0 ? v$.lastName.$errors[0].$message : null">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="E-mail" type="email" outlined v-model="form.emailAddress"
                                @input="v$.emailAddress.$touch()"
                                @blur="v$.emailAddress.$touch()"
                                :error-messages="v$.emailAddress.$errors.length > 0 ? v$.emailAddress.$errors[0].$message : null">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Phone number" outlined v-model="form.phoneNumber"
                                @input="v$.phoneNumber.$touch()"
                                @blur="v$.phoneNumber.$touch()"
                                :error-messages="v$.phoneNumber.$errors.length > 0 ? v$.phoneNumber.$errors[0].$message : null">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Title" outlined v-model="form.title"
                                @input="v$.title.$touch()"
                                @blur="v$.title.$touch()"
                                :error-messages="v$.title.$errors.length > 0 ? v$.title.$errors[0].$message : null">
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
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
                </v-col>
              </v-row>
              <div class="d-flex justify-space-between">
                <v-btn
                    type="submit"
                    color="primary"
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
          </template>
        </ApolloMutation>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {computed, reactive, ref} from '@vue/composition-api';
import useVuelidate from '@vuelidate/core'
import {email, minLength, required} from '@vuelidate/validators'

export default {
  name: "Register",
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

    const validations = computed(() => {
      return {
        emailAddress: {required, email},
        title: {required},
        firstName: {required},
        lastName: {required},
        phoneNumber: {required},
        password: {required, minLength: minLength(8)}
      };
    })

    const v$ = useVuelidate(validations, form)

    const validate = (mutate) => {
      v$.value.$touch()
      if (!v$.value.$invalid) {
        mutate();
      }
    }

    return {
      form,
      showPassword,
      v$,
      validate
    }
  }
}
</script>

<style scoped>

</style>