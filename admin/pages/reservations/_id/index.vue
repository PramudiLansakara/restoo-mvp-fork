<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>
        <h2>Reservation Details</h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Name</h5>
              {{ reservation.name }}
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Email</h5>
              {{ reservation.email }}
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Date</h5>
              {{ reservation.reservationDate | formatDate }}
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">From</h5>
              {{ reservation.from }}
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">To</h5>
              {{ reservation.to }}
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Note</h5>
              {{ reservation.note }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Persons</h5>
              {{ reservation.personCount }}
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Reservation Status</h5>
              <v-chip
                :color="reservation.reservationStatus | getColorByStatus"
                text-color="white"
                >{{ reservation.reservationStatus }}</v-chip
              >
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Change Status</h5>
              <v-select
                v-model="reservation.reservationStatus"
                class="rounded-sm mt-2"
                filled
                dense
                rounded
                required
                :rules="rules.statusRules"
                :items="items"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">Table Number</h5>
              <v-text-field
                v-model="reservation.tableNumber"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.tableRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Note</h5>
              <v-text-field
                v-model="reservation.adminNote"
                class="rounded-sm"
                filled
                dense
                rounded
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
            @click="sendEmail"
            :loading="loading"
            >Send Email</v-btn
          >
          <v-btn color="black--text" @click="cancel">{{ $t("Cancel") }}</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { reservationStatusList } from "~/util/status";

export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      valid: true,
      loading: false,
      items: reservationStatusList,
      reservation: {
        reservationStatus: "",
        tableNumber: "",
        adminNote: "",
      },
      rules: {
        statusRules: [(v) => !!v || "Status is required"],
        tableRules: [(v) => !!v || "Table Number is required"],
      },
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const reservation = await store.dispatch(
        "reservation/getReservationDetails",
        params.id
      );
      console.log(reservation);
      return { reservation };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "orders",
      });
    },
    sendEmail() {
      this.reservation.receiverEmail = this.reservation.email;
      this.reservation.note = this.reservation.adminNote;
      console.log(this.reservation);
      const validate = this.$refs.form.validate();
      if (validate) {
        this.loading = true;
        this.$store
          .dispatch("reservation/sendEmail", this.reservation)
          .then(() => {
            this.$dialog.message.success("Successfully email sent!", {
              position: "top-right"
            });
            this.$refs.form.reset();
            this.$router.push({ name: "reservations" });
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
            this.$dialog.message.error(error.response.data.message, {
              position: "top-right"
            });
          });
      }
    },
    onChangeStatus(item) {
      console.log(item);
      this.$store
        .dispatch("order/changeStatus", item)
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
  },
};
</script>

<style lang="scss" scoped></style>
