<template>
  <v-container fluid>
    <v-img
      height="250"
      src="https://i.picsum.photos/id/310/4928/3264.jpg?hmac=kNgLnBe4zK1Ph8cgA4ZkW_0zIPqgZGyLXVwGUSS86lk"
      class="mb-3"
    ></v-img>
    <h2>RESERVATION</h2>
    <h5 class="secondary--text mt-2 mb-5">
      You will receive an e-mail after we confirm your reservation request
    </h5>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" md="3">
          <h5 class="mb-3">Name</h5>
          <v-text-field
            v-model="reservation.name"
            class="rounded-sm"
            filled
            dense
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
            rounded
            required
            :rules="rules.emailRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <h5 class="mb-3">Reservation Date</h5>
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
                v-model="reservation.reservationDate"
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
              v-model="reservation.reservationDate"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <v-row>
            <v-col cols="6" md="6">
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
            <v-col cols="6" md="6">
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
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <h5 class="mb-3">Number of Persons</h5>
          <v-text-field
            v-model="reservation.personCount"
            class="rounded-sm"
            filled
            dense
            rounded
            required
            :rules="rules.personRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <h5 class="mb-3">Note</h5>
          <v-text-field
            v-model="reservation.note"
            class="rounded-sm"
            filled
            dense
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="mb-5">
      <v-col cols="12">
        <v-btn
          large
          rounded
          block
          depressed
          color="primary lighten-1"
          class="py-7"
          @click="requestReservation"
        >
          <h3 class="white--text">Request A Reservation</h3>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      loading: false,
      menu: false,
      menu2: false,
      menu3: false,
      reservation: {
        name: "",
        email: "",
        reservationDate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        from: null,
        to: null,
        personCount: "",
        note: "",
      },
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        dateRules: [(v) => !!v || "Date is required"],
        timeRules: [(v) => !!v || "Time is required"],
        personsRules: [(v) => !!v || "Number is required"],
      },
    };
  },
  methods: {
    requestReservation() {
      const validate = this.$refs.form.validate();
      if (validate) {
        console.log(this.reservation);
        this.loading = true;
        this.$store
          .dispatch("reservation/newReservation", this.reservation)
          .then(() => {
            this.$dialog.message.success("Successfully reservation added!", {
              position: "top-right",
            });
            this.$refs.form.reset();
            this.$router.push({ name: "home" });
          })
          .catch((error) => {
            this.loading = false;
            console.log(error);
            this.$dialog.message.error(error.response.data.message, {
              position: "top-right",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
