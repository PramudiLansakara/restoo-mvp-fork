<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="menuItems"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row>
            <v-toolbar-title
              ><h2>{{ $t("Menu") }}</h2></v-toolbar-title
            >
          </v-row>
          <v-btn :to="'menu/add'" color="primary lighten-1 white--text">
            <v-icon left color="white" size="20px"> mdi-plus </v-icon>
            {{ $t("Add Food") }}
          </v-btn>
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
          <v-row>
                        <v-col cols="12" md="3" class="ml-3 mb-3">
              <v-text-field
                v-model="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="viewItem(item._id)" v-bind="attrs" v-on="on">
              <v-icon color="secondary"> mdi-eye-outline </v-icon>
            </v-btn>
          </template>
          <span>View</span>
        </v-tooltip>
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
            <template v-slot:item.description="{ item }">
                  <span v-html="item.description"></span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      search: "",
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
      const menuItems = await store.dispatch("menu/getFoodItemList");
      console.log(menuItems);
      return { menuItems };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },

  methods: {
    editItem(itemId) {
      this.$router.push({
        name: "menu-id-edit",
        params: { id: itemId },
      });
    },
    addDiscount(itemId) {
      this.$router.push({
        name: "menu-id-discount",
        params: { id: itemId },
      });
    },
    viewItem(itemId) {
      this.$router.push({
        name: "menu-id",
        params: { id: itemId },
      });
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
    deleteItem(item) {
      this.itemId = item._id;
      this.itemIndex = this.menuItems.indexOf(item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        this.loading = true;
        await this.$store.dispatch("menu/deleteMenuItem", this.itemId);
        this.$dialog.message.success("Successfully item deleted!", {
          position: "top-right",
        });
        this.menuItems.splice(this.itemIndex, 1);
        this.loading = false;
        this.closeDelete();
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
        });
      }
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
