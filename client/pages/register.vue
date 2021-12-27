<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="height: 90vh">
      <v-col class="justify-center align-center" cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="layout column align-center">
              <img src="../assets/images/chef.svg" />
              <center>
                <h1 class="my-4">Welcome to Restoo</h1>
              </center>
            </div>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  class="mt-5"
                  style="padding-bottom: 0px"
                >
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :rules="rules.nameRules"
                    v-model="user.name"
                    label="Name"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  cols="12"
                  md="6"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :rules="rules.emailRules"
                    v-model="user.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="12" md="6" style="padding-top: 0px">
                  <v-text-field
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    v-model="user.password"
                    :rules="rules.passwordRules"
                    label="Password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-btn
                  :disabled="!valid"
                  color="primary lighten-1 white--text"
                  class="mb-4"
                  :loading="loading"
                  @click="register"
                >
                  Register
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-row justify="center">
              <p>
                Already have an account?<nuxt-link
                  :to="'login'"
                  style="text-decoration: none"
                >
                  Login</nuxt-link
                >
              </p>
            </v-row>
            <!-- <div>
              <p>
                Dont have an account?<nuxt-link :to="'register'" class="pl-2">
                  Register</nuxt-link
                >
              </p>
              <p>
                Forgot password?
                <nuxt-link :to="'forgot-password'" class="pl-2">
                  Click here</nuxt-link
                >
              </p>
            </div> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "redirectIfAuth",
  layout: "empty",
  data() {
    return {
      show: false,
      loading: false,
      valid: true,
      user: {
        name: "",
        email: "",
        password: "",
      },
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        passwordRules: [(v) => !!v || "Password is required"],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
      },
    };
  },
  methods: {
    async register() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        try {
          await this.$store.dispatch("login/registerUser", this.user);
          this.$dialog.message.success("Successfully Registered!", {
            position: "top-right",
          });
          this.$router.push({ name: "login" });
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
