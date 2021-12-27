<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title
        ><h2>{{ $t("Edit Event") }}</h2></v-toolbar-title
      >
    </v-toolbar>
    <v-card class="elevation-1">
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Event Name") }}</h5>
              <v-text-field
                v-model="event.name"
                class="rounded-sm"
                filled
                dense
                rounded
                required
                :rules="rules.nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Event Description") }}</h5>
              <v-textarea
                v-model="event.description"
                class="rounded-sm"
                auto-grow
                filled
                dense
                rounded
                required
                :rules="rules.descriptionRules"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="3">
              <h5 class="mb-3">{{ $t("Event Date") }}</h5>
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
                    :value="event.date | formatDate"
                    @input="(value) => (event.date = value)"
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
                  :value="event.date | formatDate"
                  @input="setDate($event)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Event Banner") }}</h5>
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
                <v-img :src="url" max-height="200" contain></v-img>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <h5 class="mb-3">{{ $t("Event Time") }}</h5>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="event.time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="event.time"
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
                  v-model="event.time"
                  full-width
                  @click:minute="$refs.menu2.save(event.time)"
                ></v-time-picker>
              </v-menu>
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
            @click="editEvent"
            :loading="loading"
            >{{ $t("Save") }}</v-btn
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
      imageLoading:false,
      image: null,
      rules: {
        nameRules: [(v) => !!v || "Name is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        dateRules: [(v) => !!v || "Date is required"],
        timeRules: [(v) => !!v || "Time is required"],
      },
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const event = await store.dispatch("event/getEventDetails", params.id);
      const url = event.bannerImg;
      return { event, url };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    async editEvent() {
    try { 
      const validate = this.$refs.form.validate();
      if (validate) {
        console.log(this.event);
        this.loading = true;
        await this.$store
          .dispatch("event/editEvent", this.event)
            this.$dialog.message.success(this.$t('Success Message'), {
              position: "top-right",
            });
            this.$refs.form.reset();
            this.$router.push({ name: "events" });
      }
    }catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
        });        
    }  
    },
    setDate(value) {
      console.log(value);
      this.event.date = value;
      this.menu = false;
    },
    cancel() {
      this.$refs.form.reset();
      this.$router.push({
        name: "events",
      });
    },
    async uploadImage() {
      console.log(this.image);
      if (this.image != null) {
        this.imageLoading = true;
        let fd = new FormData();
        fd.append("file", this.image);
        try {
        const response = await this.$store
          .dispatch("images/uploadImage", fd)
          
            console.log(response);
            this.event.bannerImg = response.imgPath;
            this.url = URL.createObjectURL(this.image);
            this.$dialog.message.success("Successfully uploaded!", {
              position: "top-right",
            });
            this.imageLoading = false;
        }catch (error) {
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
  },
};
</script>

<style lang="scss" scoped></style>
