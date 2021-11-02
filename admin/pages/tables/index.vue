<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title
        ><h2>{{ $t("Tables") }}</h2></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-col lg="2" md="2" sm="12">
        <h5>{{ $t("All Table Status") }}</h5>
        <v-chip
          :color="allTables.status | getColorByStatus"
          text-color="white"
          >{{ allTables.status }}</v-chip
        >
      </v-col>
      <v-col lg="3" md="3" sm="12">
        <h5>{{ $t("Change Status") }}</h5>
        <v-select
          v-model="allTables.status"
          class="rounded-sm"
          filled
          dense
          rounded
          :label="$t('Select a Status')"
          :items="tableStatusList"
          item-text="status"
          @change="onAllChangeStatus"
        ></v-select>
      </v-col>
      <v-col lg="3" md="3" sm="12">
        <v-btn :to="'tables/add'" color="primary lighten-1 white--text">
          <v-icon left color="white" size="20px"> mdi-plus </v-icon>
          {{ $t("Add Table") }}</v-btn
        >
      </v-col>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            ><h4>{{ $t("Delete Confirm") }}</h4></v-card-title
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
    <v-data-table :headers="headers" :items="tables" class="elevation-1">
      <template v-slot:item.status="{ item }">
        <v-chip
          small
          :color="item.status | getColorByStatus"
          text-color="white"
          >{{ $t(item.status) }}</v-chip
        >
      </template>
      <template v-slot:item.changeStatus="{ item }">
        <v-select
          class="rounded-sm mt-2"
          filled
          dense
          rounded
          v-model="item.status"
          :items="tableStatusList"
          item-text="status"
          @change="onChangeStatus(item)"
        ></v-select>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn @click="editTable(item._id)" icon v-bind="attrs" v-on="on">
              <v-icon color="secondary"> mdi-pencil-outline </v-icon>
            </v-btn>
          </template>
          <span>View</span>
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
import { tableStatusList } from "~/util/status";
export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      dialogDelete: false,
      loading: false,
      allTables: {
        status: "",
      },
      itemId: "",
      itemIndex: "",
      filter: {},
      tableStatusList: tableStatusList,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "_id",
        },

        { text: this.$t("Table Number"), value: "tableNumber" },
        { text: this.$t("Table Status"), value: "status" },
        { text: this.$t("Change Status"), value: "changeStatus" },
        { text: this.$t("Actions"), value: "actions", sortable: false },
      ],
    };
  },
  async asyncData({ store, error }) {
    try {
      const tables = await store.dispatch("table/getTableList", {});
      console.log(tables);
      return { tables };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    onChangeStatus(item) {
      console.log(item);
      this.$store
        .dispatch("table/updateTable", item)
        .then(() => {
          this.$dialog.message.success(this.$t("Success Message"), {
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
    onAllChangeStatus() {
      this.$store
        .dispatch("table/updateAllStatus", this.allTables)
        .then(() => {
          this.$dialog.message.success(this.$t("Success Message"), {
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
    editTable(tableId) {
      this.$router.push({
        name: "tables-id-edit",
        params: { id: tableId },
      });
    },
    deleteItem(item) {
      this.itemId = item._id;
      this.itemIndex = this.tables.indexOf(item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.loading = true;
      this.$store
        .dispatch("table/deleteTable", this.itemId)
        .then(() => {
          this.$dialog.message.success("Successfully item deleted!", {
            position: "top-right",
          });
          this.tables.splice(this.itemIndex, 1);
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
