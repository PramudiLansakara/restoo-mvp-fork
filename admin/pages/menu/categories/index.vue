<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="categories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h2>Category</h2></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            :to="'/menu/categories/add'"
            color="primary lighten-1 white--text"
          >
            <v-icon left color="white" size="20px"> mdi-plus </v-icon>
            Add Category</v-btn
          >
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                ><h4>
                  {{ $t("Delete Confirm") }}
                </h4></v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDelete">{{ $t("Cancel") }}</v-btn>
                <v-btn
                  color="danger"
                  text
                  @click="deleteItemConfirm"
                  :loading="loading"
                  >{{ $t("OK") }}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="editItem(item._id)" v-bind="attrs" v-on="on">
              <v-icon> mdi-pencil-outline </v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="deleteItem(item)" v-bind="attrs" v-on="on">
              <v-icon color="danger"> mdi-delete-outline </v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      dialogDelete: false,
      loading: false,
      itemId: "",
      itemIndex: "",
      todaySpecial: {
        id: "",
        todaySpecial: "",
      },
      headers: [
        {
          text: "ID",
          align: "start",
          value: "_id",
        },
        { text: this.$t("Name"), value: "name" },
        { text: this.$t("Description"), value: "description" },
        { text: this.$t("Actions"), value: "actions", sortable: false },
      ],
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
    editItem(itemId) {
      this.$router.push({
        name: "menu-categories-id-edit",
        params: { id: itemId },
      });
    },
    deleteItem(item) {
      this.itemId = item._id;
      this.itemIndex = this.categories.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loading = true;
      this.$store
        .dispatch("menu/deleteCategory", this.itemId)
        .then(() => {
          this.$dialog.message.success("Successfully item deleted!", {
            position: "top-right",
          });
          this.categories.splice(this.itemIndex, 1);
          this.closeDelete();
        })
        .catch((error) => {
          this.loading = false;
          console.log(error.response);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
          });
        });
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
