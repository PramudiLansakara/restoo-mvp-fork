<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title
        ><h2>{{ $t("Add Food") }}</h2></v-toolbar-title
      >
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Item Name") }}</h5>
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
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Item Category") }}</h5>
              <v-select
                :items="categories"
                v-model="item.category"
                item-text="name"
                item-value="_id"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.categoryRules"
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Item Image") }}</h5>
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
          </v-row>
        <v-spacer></v-spacer>
          <v-row>
            <v-col cols="12" md="6">
              <h5>{{ $t("Item Description") }}</h5>
              <!-- <button @click="saveContent"></button> -->
              <vue-editor
                v-model="item.description"
                :editorToolbar="customToolbar"
              ></vue-editor>
              <!-- <h5 class="mb-3">{{ $t("Item Description") }}</h5>
              <v-textarea
                v-model="item.description"
                class="rounded-sm"
                auto-grow
                filled
                dense
                rounded
                required
                :rules="rules.descriptionRules"
              ></v-textarea> -->
            </v-col>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="item.prices"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>PRICES</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary lighten-1 white--text"
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left color="white" size="20px"> mdi-plus </v-icon>
                      {{ $t("Add Another Price") }}
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              :label="$t('Price') + ' Name'"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.amount"
                              :label="$t('Amount')"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        {{ $t("Cancel") }}
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        {{ $t("Save") }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">{{
                      $t("Delete Confirm")
                    }}</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">{{
                        $t("Cancel")
                      }}</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >{{ $t("OK") }}</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="form-btn ma-5">
          <v-btn
            class="mr-3"
            color="primary lighten-1 white--text"
            @click="addItem"
            :loading="loading"
            :disabled="isDisabled"
            >{{ $t("Save") }}</v-btn
          >
          <v-btn color="black--text" @click="cancel">{{ $t("Cancel") }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-quill-editor";

export default {
  middleware: "redirectIfNotAuth",
  components: {
    VueEditor,
  },
  data() {
    return {
      valid: true,
      loading: false,
      imageLoading: false,
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
    [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" }
    ],
  [{ color: [] }, { background: [] }],  ["clean"]      ],
      item: {
        name: "",
        category: "",
        prices: [],
        description: "",
        itemUrl: "",
      },
      url: null,
      image: null,
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        categoryRules: [(v) => !!v || "Category is required"],
      },
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: this.$t("Name"),
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: this.$t("Price"), value: "amount" },
        { text: this.$t("Discount"), value: "discountPrice" },
        { text: this.$t("Actions"), value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        amount: 0,
        discountPrice: 0,
      },
      defaultItem: {
        name: "",
        amount: 0,
        discountPrice: 0,
      },
    };
  },
  async asyncData({ store, error }) {
    try {
      const categories = await store.dispatch("menu/getFoodCategoryList");
      console.log(categories);
      return { categories };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },

  methods: {
    async addItem() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        try {
          this.$store.dispatch("menu/addMenuItem", this.item);
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
          this.$refs.form.reset();
          this.$router.push({ name: "menu" });
        } catch (error) {
          this.loading = false;
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        }
      }
    },
    async uploadImage() {
      console.log(this.image);
      if (this.image != null) {
        this.imageLoading = true;
        let fd = new FormData();
        fd.append("file", this.image);
        try {
          const response = await this.$store.dispatch("images/uploadImage", fd);
          console.log(response);
          this.item.itemUrl = response.imgPath;
          this.url = URL.createObjectURL(this.image);
          this.$dialog.message.success(this.$t("Success Message"), {
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
    cancel() {
      this.$refs.form.reset();
      this.$router.push({
        name: "menu",
      });
    },
    editItem(item) {
      this.editedIndex = this.item.prices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.item.prices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.item.prices.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.item.prices[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.discountPrice = this.editedItem.amount;
        this.item.prices.push(this.editedItem);
      }
      this.close();
    },
    setEditorContent() {
      this.htmlForEditor = "<h1>Html For Editor</h1>";
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Price" : "Edit Price";
    },
    isDisabled() {
      if (!this.item.prices.length) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>

<style lang="scss" scoped></style>
