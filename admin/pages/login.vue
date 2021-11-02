<template>
  <v-container fluid>
    <v-row align="center" justify="center" style="height: 90vh">
      <v-col class="justify-center align-center" cols="12" md="6">
        <v-card>
          <v-card-text>
            <div class="layout column align-center">
              <img src="../assets/images/chef.png" alt="Clean Globe" />
              <center>
                <h1 class="my-4">
                  {{ $t("Welcome to Restoo") }}
                </h1>
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
                  class="my-4"
                  :loading="loading"
                  @click="login"
                >
                   {{ $t("Login") }}
                </v-btn>
              </v-row>
            </v-form>
          </v-card-text>
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
        email: "",
        password: "",
      },
      rules: {
        passwordRules: [(v) => !!v || "Password is required"],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
      },
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },
  methods: {
    login() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        this.$store
          .dispatch("login/loginUser", this.user)
          .then((response) => {
            Cookie.set("authToken", response.token);
            Cookie.set("authUser", response.user);
            this.$socket.client.emit("admin-join");
            this.$dialog.message.success("Successfully Login!", {
              position: "top-right",
            });
            this.$router.push({ name: "dashboard" });
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.$dialog.message.error(error.response.data.message, {
              position: "top-right",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
