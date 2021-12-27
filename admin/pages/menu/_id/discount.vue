<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Add Discount</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Discount Price (€)</h5>
              <v-text-field
                v-model="item.discountPrice"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.priceRules"
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
            @click="editItem"
            :loading="loading"
            >Save</v-btn
          >
          <v-btn color="black--text" @click="cancel">{{$t("Cancel")}}</v-btn>
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
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
      },
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const item = await store.dispatch("menu/getFoodItemDetails", params.id);
      item.category = item.category._id;
      return { item };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },

  methods: {
    async editItem() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        try {
        await this.$store
          .dispatch("menu/editMenuItem", this.item)
            this.$dialog.message.success(this.$t('Success Message'), {
              position: "top-right",
            });
            this.$refs.form.reset();
            this.$router.push({ name: "menu" });
        }catch (error) {
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
        name: "menu",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
