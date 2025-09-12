<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title
        ><h2>{{ $t("Edit Food Item") }}</h2></v-toolbar-title
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
                @change="selectCategory(item)"
              ></v-select>
            </v-col>
                        <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Discount") }}</h5>
              <v-simple-checkbox
                :ripple="false"
                @click="handleTodaySpecial(item._id, item.todaySpecial)"
                v-model="item.todaySpecial"
              ></v-simple-checkbox>
            </v-col>
          </v-row>
          <v-row>
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
                <v-img :src="url || item.itemUrl" max-height="200" contain></v-img>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <h5>{{ $t("Item Description") }}</h5>
              <vue-editor
                v-model="item.description"
                :editorToolbar="customToolbar"
              ></vue-editor>
            </v-col>
          </v-row>
        </v-form>
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
              <v-dialog v-model="dialogDiscount" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="discountItem.discountPrice"
                            :label="$t('Discount')"
                          ></v-text-field>
                          </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDiscount">
                      {{ $t("Cancel") }}
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="saveDiscount">
                      {{ $t("Save") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary lighten-1 white--text"
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left color="white" size="20px"> mdi-plus </v-icon>
                    Add Another Price
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
                            :label="$t('Name')"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.amount"
                            :label="$t('Price')"
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
                  <v-card-title class="text-h5"
                    >Are you sure you want to delete this item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
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
          <v-btn
            :disabled="discountisDisabled"
            icon
            @click="discountPrice(item)"
          >
            <v-icon>mdi-tag-outline</v-icon>
          </v-btn>

          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="form-btn ma-1">
          <v-btn
            class="mr-3"
            color="primary lighten-1 white--text"
            @click="saveEditItem"
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
      image: null,
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        priceRules: [(v) => !!v || "Price is required"],
        categoryRules: [(v) => !!v || "Category is required"],
      },
      dialog: false,
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
      dialogDiscount:false,
      dialogDelete: false,
      todaySpecial: {
        id: "",
        todaySpecial: "",
      },
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
       discountIndex: -1,
      discountItem: {
        // name: "",
        // amount: 0,
         discountPrice: 0,
      },
      editedIndex: -1,
      editedItem: {
        name: "",
        amount: 0,
      },
      defaultItem: {
        name: "",
        amount: 0,
      },
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const categories = await store.dispatch("menu/getFoodCategoryList");
      const item = await store.dispatch("menu/getFoodItemDetails", params.id);
      const url = item.itemUrl;
      console.log(item);
      item.category = item.category._id;
      return { categories, item, url };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },

  methods: {
    async saveEditItem() {
      try {
        const validate = this.$refs.form.validate();
        if (validate) {
          this.loading = true;
          await this.$store.dispatch("menu/editMenuItem", this.item);
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
          this.$refs.form.reset();
          this.$router.push({ name: "menu" });
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
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
          this.item.itemUrl = response.imgPath;
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
    selectCategory(item) {
      console.log(item);
    },
    cancel() {
      this.$refs.form.reset();
      this.$router.push({
        name: "menu",
      });
    },
    discountPrice(item) {
      this.discountIndex = this.item.prices.indexOf(item);
      this.discountItem = Object.assign({}, item);
      this.dialogDiscount = true;
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
    closeDiscount() {
      this.dialogDiscount = false;
      this.$nextTick(() => {
        this.discountItem = Object.assign({}, this.defaultItem);
        this.discountIndex = -1;
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
        this.item.prices.push(this.editedItem);
      }
      this.close();
    },
    saveDiscount() {
      if (this.discountIndex > -1) {
        Object.assign(this.item.prices[this.discountIndex], this.discountItem);
      } else {
        this.item.prices.push(this.discountItem);
      }
      this.closeDiscount();
    },
    handleTodaySpecial(id, todaySpecial) {
      this.todaySpecial.id = id;
      if (todaySpecial) {
        this.todaySpecial.todaySpecial = "mark";
      } else {
        this.todaySpecial.todaySpecial = "unmark";
      }
      console.log(this.todaySpecial);
      this.$store
        .dispatch("menu/todaySpecial", this.todaySpecial)
        .then(() => {
          this.$dialog.message.success("Successfully marked!", {
            position: "top-right",
          });
        })
        .catch((error) => {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        });
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
    discountisDisabled() {
      if (this.item.todaySpecial) {
        return false;
      } else {
        return true;
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
