<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Add Category</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Category Name") }}</h5>
              <v-text-field
                v-model="item.name"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.nameRules"
              ></v-text-field>
            </v-col>
                         <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Category Image") }}</h5>
              <v-row class="mt-2">
                <v-file-input
                  @change="uploadImage"
                  v-model="image"
                  class="rounded-sm"
                  filled
                  dense
                  rounded
                  required
                >
                </v-file-input>
              </v-row>
              <div class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                  v-if="imageLoading"
                ></v-progress-circular>
                <v-img :src="url" max-height="200" contain></v-img>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Item Description") }}</h5>
              <v-textarea
                v-model="item.description"
                class="rounded-sm"
                auto-grow
                filled
                dense
                rounded
                required
                :rules="rules.descriptionRules"
              ></v-textarea>
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
            @click="editCategory"
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
      imageLoading: false,
      image: null,
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
      },
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const item = await store.dispatch("menu/getCategoryDetails", params.id);

      const url = item.categoryUrl;
                   console.log(url)

      return { item, url };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    async editCategory() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        try {
          await this.$store.dispatch("menu/editCategory", this.item);
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
          this.$refs.form.reset();
          this.$router.push({ name: "menu-categories" });
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
        name: "menu-categories",
      });
    },
        async uploadImage() {
      console.log(this.image);
      if (this.image != null) {
        this.imageLoading = true;
        let fd = new FormData();
        fd.append("file", this.image);
        const response = await this.$store.dispatch("images/uploadImage", fd);
        try {
          console.log(response);
          this.item.categoryUrl = response.imgPath;
          this.url = URL.createObjectURL(this.image);
          this.$dialog.message.success("Successfully uploaded!", {
            position: "top-right",
          });
          this.imageLoading = false;
        } catch (error) {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
          this.imageLoading = false;
        }
      } else {
        this.url = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
