<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h2>Edit Reservation</h2></v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Name</h5>
              <v-text-field
                v-model="reservation.name"
                class="rounded-sm"
                filled
                dense
                disabled
                rounded
                required
                :rules="rules.nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Email</h5>
              <v-text-field
                v-model="reservation.email"
                class="rounded-sm"
                filled
                dense
                disabled
                rounded
                required
                :rules="rules.emailRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">reservation Date</h5>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="reservation.reservationDate | formatDate"
                    @input="value => (reservation.reservationDate = value)"
                    readonly
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    required
                    :rules="rules.dateRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :value="reservation.reservationDate | formatDate"
                  @input="setDate($event)"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Persons</h5>
              <v-text-field
                v-model="reservation.personCount"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.countRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="2">
              <h5 class="mb-3">From</h5>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="reservation.from"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="reservation.from"
                    readonly
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    required
                    :rules="rules.timeRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="reservation.from"
                  full-width
                  @click:minute="$refs.menu2.save(reservation.from)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2">
              <h5 class="mb-3">To</h5>
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="reservation.to"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="reservation.to"
                    readonly
                    class="rounded-sm"
                    filled
                    dense
                    rounded
                    required
                    :rules="rules.timeRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu3"
                  v-model="reservation.to"
                  full-width
                  @click:minute="$refs.menu3.save(reservation.to)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">Note</h5>
              <v-textarea
                v-model="reservation.note"
                class="rounded-sm"
                auto-grow
                filled
                dense
                rounded
                required
                disabled
                :rules="rules.nameRules"
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
            @click="editReservation"
            :loading="loading"
            >Save</v-btn
          >
          <v-btn color="black--text" @click="cancel">{{$t("Cancel")}}</v-btn>
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
      menu: false,
      menu2: false,
      menu3: false,
      image: null,
      rules: {
        nameRules: [v => !!v || "Name is required"],
        emailRules: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        dateRules: [v => !!v || "Date is required"],
        timeRules: [v => !!v || "Time is required"],
        countRules: [v => !!v || "Count is required"]
      }
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
    editReservation() {
      const validate = this.$refs.form.validate();
      if (validate) {
        console.log(this.reservation);
        this.loading = true;
        this.$store
          .dispatch("reservation/editReservation", this.reservation)
          .then(() => {
            this.$dialog.message.success("Successfully reservation edited!", {
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
    setDate(value) {
      console.log(value);
      this.reservation.reservationDate = value;
      this.menu = false;
    },
    cancel() {
      this.$refs.form.reset();
      this.$router.push({
        name: "reservations"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
