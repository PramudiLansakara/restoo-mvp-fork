<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="specials" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h2>{{$t("Specials")}}</h2></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn :to="'specials/add'" color="primary lighten-1 white--text">
            <v-icon left color="white" size="20px"> mdi-plus </v-icon>
           {{$t("Add Specials")}}</v-btn
          >
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                ><h4>
                  {{$t("Delete Confirm")}}
                </h4></v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeDelete">{{$t("Cancel")}}</v-btn>
                <v-btn
                  color="danger"
                  text
                  @click="deleteItemConfirm"
                  :loading="loading"
                  >{{$t("OK")}}</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
      headers: [
        {
          text: "ID",
          align: "start",
          value: "_id",
        },
        { text: this.$t('Name'), value: "name" },
        { text: this.$t('Description'), value: "description" },
        { text: this.$t('Actions'), value: "actions", sortable: false },
      ],
    };
  },
  async asyncData({ store, error }) {
    try {
      const specials = await store.dispatch("specials/getSpecialsList");
      console.log(specials);
      return { specials };
    } catch (error) {
      console.log(error);
      this.$dialog.message.error(error.response.data.message, {
        position: "top-right",
      });
    }
  },

  methods: {
    editItem(itemId) {
      this.$router.push({
        name: "events-specials-id-edit",
        params: { id: itemId },
      });
    },
    viewItem(itemId) {
      this.$router.push({
        name: "events-specials-id",
        params: { id: itemId },
      });
    },
    deleteItem(item) {
      this.itemId = item._id;
      this.itemIndex = this.specials.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loading = true;
      this.$store
        .dispatch("specials/deleteSpecials", this.itemId)
        .then(() => {
          this.$dialog.message.success("Successfully special deleted!", {
            position: "top-right",
          });
          this.specials.splice(this.itemIndex, 1);
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
