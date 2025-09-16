<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Add City</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("City") }}</h5>
              <v-text-field
                v-model="item.city"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.cityRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Delivery Charge") }} (Rs)</h5>
              <v-text-field
                v-model="item.deliveryCharge"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.deliveryChargeRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Minimum Order Price") }} (Rs)</h5>
              <v-text-field
                v-model="item.minAmount"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.minAmountRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="form-btn ma-5">
          <v-btn
            class="mr-3"
            color="primary lighten-1 white--text"
            @click="addCity"
            :loading="loading"
            >{{ $t("Save") }}</v-btn
          >
          <v-btn color="black--text" @click="cancel">{{ $t("Cancel") }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      valid: true,
      loading: false,
      item: {
        city: "",
        deliveryCharge: "",
        minAmount:"",
      },
      rules: {
        cityRules: [(v) => !!v || "City is required"],
        deliveryChargeRules: [(v) => !!v || "Delivery Charge is required"],
        minAmountRules: [(v) => !!v || "Minimum Charge is required"],
      },
    };
  },
  methods: {
    async addCity() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        try {
          await this.$store.dispatch("city/addCity", this.item);
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
          this.$refs.form.reset();
          this.$router.push({ name: "cities" });
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        }
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.$router.push({
        name: "cities",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
