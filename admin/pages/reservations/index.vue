<template>
  <v-container fluid>
    <v-data-table :headers="headers" :items="reservations" class="elevation-1" 
      sort-by="reservationDate"
      :sort-desc="true">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h2>Reservations</h2></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.reservationDate="{ item }"> 
        {{ item.reservationDate | formatDate }}
      </template>
      <template v-slot:item.reservationStatus="{ item }">
        <v-chip
          small
          :color="item.reservationStatus | getColorByStatus"
          text-color="white"
          >{{ item.reservationStatus }}</v-chip
        >
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
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="sendEmail(item._id)" v-bind="attrs" v-on="on">
              <v-icon> mdi-email-outline </v-icon>
            </v-btn>
          </template>
          <span>View</span>
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
        todaySpecial: ""
      },
      headers: [
        {
          text: "ID",
          align: "start",
          value: "_id"
        },
        { text: "Name", value: "name" },
        { text: "E-mail", value: "email" },
        { text: "Date", value: "reservationDate" },
        { text: "From", value: "from" },
        { text: "To", value: "to" },
        { text: "Status", value: "reservationStatus" },
        { text: "Table Number", value: "tableNumber" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  async asyncData({ store, error }) {
    try {
      const reservations = await store.dispatch(
        "reservation/getReservationsList"
      );
      console.log(reservations);
      return { reservations };
    } catch (error) {
      console.log(error);
      this.$dialog.message.error(error.response.data.message, {
        position: "top-right"
      });
    }
  },

  methods: {
    editItem(itemId) {
      this.$router.push({
        name: "reservations-id-edit",
        params: { id: itemId }
      });
    },
    sendEmail(itemId) {
      this.$router.push({
        name: "reservations-id",
        params: { id: itemId }
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
            position: "top-right"
          });
        })
        .catch(error => {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right"
          });
        });
    },
    deleteItem(item) {
      this.itemId = item._id;
      this.itemIndex = this.events.indexOf(item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.loading = true;
      this.$store
        .dispatch("event/deleteEvent", this.itemId)
        .then(() => {
          this.$dialog.message.success("Successfully event deleted!", {
            position: "top-right"
          });
          this.events.splice(this.itemIndex, 1);
          this.closeDelete();
        })
        .catch(error => {
          this.loading = false;
          console.log(error.response);
          this.$dialog.message.error(error.response.data.message, {
            position: "top-right"
          });
        });
    },
    closeDelete() {
      this.dialogDelete = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
