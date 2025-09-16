<template>
  <v-container fluid>
    <div>
      <client-only>
        <VueHtml2pdf
          :html-to-pdf-options="htmlToPdfOptions"
          :show-layout="true"
          :float-layout="false"
          :enable-download="false"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="myPDF"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="portrait"
          pdf-content-width="100%"
          ref="html2Pdf"
        >
          <section class="ml-5" slot="pdf-content">
            <v-row>
              <v-col>
                <v-row
                  ><v-col
                    ><img
                      height="100"
                      src="../../../assets/images/logo.jpg"
                      alt="Clean Globe"
                  /></v-col>
                  <v-col align="right" class="mt-5">
                    <h3>105,</h3>
                    <h3>Baudhaloka Mawatha,</h3>
                    <h3>4 Colombo</h3>
                  </v-col></v-row
                >
                <h3 class="mt-1">Order Invoice</h3>
                <h5 class="secondary--text">
                  Ref: <strong> {{ order.reference }}</strong>
                </h5>
              </v-col>
            </v-row>
            <v-row class="mt-2 d-flex">
              <v-col cols="" align="left">
                <h4 class="font-weight-bold">Customer Details</h4>
                <h4 class="mt-1">
                  {{ $t("Name") }}: <strong> {{ order.customer.name }}</strong>
                </h4>
                <h4 class="">
                  {{ $t("Email") }}:
                  <strong> {{ order.customer.email }}</strong>
                </h4>
                <h4 class="">
                  {{ $t("Phone Number") }}:
                  <strong> {{ order.customer.phoneNumber }}</strong>
                </h4>
                <h4 class="">
                  {{ $t("Address") }}:
                  <strong> {{ order.customer.address }}</strong>
                </h4>
              </v-col>
              <v-col cols="8" align="right">
                <h4 class="font-weight-bold">Order Details</h4>
                <h4 class="mt-1">
                  {{ $t("Order For") }}: <strong> {{ order.orderType }}</strong>
                </h4>
                <h4 class="">
                  {{ $t("Status") }}: <strong> {{ order.status }}</strong>
                </h4>
                <h4 class="">
                  {{ $t("Date") }}:
                  <strong> {{ order.placedAt | formatDate }}</strong>
                </h4>
                <h4 class="" v-if="order.deliveryCharge">
                  {{ $t("Delivery City") }}:
                  <strong> {{ order.customer.city}}</strong>
                </h4>
              </v-col>
            </v-row>
            <v-row v-for="item of order.items" :key="item._id" class="">
              <v-col cols="12" lg="8">
                <div class="rounded-lg elevation-0">
                  <div class="d-flex flex-no-wrap">
                    <v-card-text>
                      <v-row class="" no-gutters>
                        <div>
                          <h3>{{ item.name }}</h3>
                          <h4 class="secondary--text">
                            {{ item.priceDetails.name }}
                          </h4>
                          <h5 v-if="item.itemNote" class="secondary--text">
                            {{ item.itemNote }}
                          </h5>
                        </div>
                        <v-col class="" align="center">
                          <h3>
                            Rs.{{ item.priceDetails.price }}
                            <span class="secondary--text ml-1">
                              x{{ item.priceDetails.quantity }}</span
                            >
                          </h3>
                        </v-col>
                        <v-col align="right" class="mr-1">
                          <h3>
                            Rs.{{
                              item.priceDetails.price *
                              item.priceDetails.quantity
                            }}
                          </h3>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <v-row class="">
              <v-col cols="12" lg="8">
                <div class="rounded-lg elevation-0">
                  <div class="d-flex flex-no-wrap">
                    <v-card-text>
                      <v-row class="" no-gutters>
                        <div v-if="order.deliveryCharge">
                          <h3>
                            {{ $t("Delivery Charge") }}:
                            Rs.{{ order.deliveryCharge}}
                          </h3>
                        </div>
                        <div v-if="order.discount">
                          <h3>{{ $t("Discount") }}: {{ order.discount }}%</h3>
                        </div>
                      </v-row>
                      <v-row class="" no-gutters>
                       <h3 class="font-weight-bold mt-1">
                          {{ $t("Total") }}: Rs.{{ order.total}}
                        </h3>
                      </v-row>
                      <v-row>

                      </v-row>
                    </v-card-text>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider class="my-1"></v-divider>
          </section>
        </VueHtml2pdf>
      </client-only>
      <section class="mt-6 ml-4">
        <v-btn
          @click="generateReport"
          rounded
          small
          color="primary lighten-1"
          class="px-0 mr-2"
        >
          <v-icon color="white">mdi-printer</v-icon>
        </v-btn>
      </section>
    </div>
  </v-container>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  // middleware: "redirectIfNotAuth"
  data() {
    return {
      htmlToPdfOptions: {
        margin: [3, 6],
      },
      orderId: "",
    };
  },
  async asyncData({ store, error, params }) {
    try {
      const order = await store.dispatch("order/getOrderDetails", params.id);
      console.log(order);
      return { order };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  components: {
    VueHtml2pdf,
  },
  methods: {
    clickButton() {
      if (this.status == "failed") {
        this.$router.push({ name: "payment" });
      } else {
        this.$router.push({ name: "home" });
      }
    },
    viewInvoice() {
      this.$router.push({ name: "invoice" });
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>

<style lang="scss"></style>
