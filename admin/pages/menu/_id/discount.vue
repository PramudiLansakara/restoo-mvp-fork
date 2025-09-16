<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Add Discount</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
        <!-- <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Discount Price (Rs)</h5>
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
        </v-form> -->

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
                              label="Price Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.amount"
                              label="Amount"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.discountPrice"
                              label="Discount Price"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
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
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
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
            </template>
          </v-data-table>
        </v-form>
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
export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      valid: true,
      loading: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Amount (Rs.)", value: "amount" },
        { text: "Discount price (Rs.)", value: "discountPrice" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        amount: 0,
        discountPrice:0,
      },
      defaultItem: {
        name: "",
        amount: 0,
        discountPrice: 0,
      },
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
    cancel() {
      this.$refs.form.reset();
      this.$router.push({
        name: "menu",
      });
    },
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
        this.item.prices.push(this.editedItem);
      }
      this.close();
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
