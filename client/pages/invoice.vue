<template>
  <v-container fluid class="mt-10">
    <div>
      <client-only>
        <VueHtml2pdf
          :html-to-pdf-options="htmlToPdfOptions"
          :show-layout="true"
          :float-layout="false"
          :enable-download="true"
          :paginate-elements-by-height="1400"
          filename="myPDF"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="97%"
          ref="html2Pdf"
        >
         <section class="ml-5" slot="pdf-content">
            <v-row>
              <v-col>
                <v-row
                  ><v-col
                    ><img
                    width="120"
                      height="90"
                      src="../assets/images/logo.jpg"
                      alt="Clean Globe"
                  /></v-col>
                  <v-col align="right" class="mt-1">
                    <h5>105,</h5>
                    <h5>Baudhaloka Mawatha,</h5>
                    <h5>4 Colombo</h5>
                  </v-col></v-row
                >
                <h3 class="mt-1">Order Invoice</h3>
                <h5 class="secondary--text">
                  Ref: {{ order.reference }}
                </h5>
              </v-col>
            </v-row>
            <v-row class="mt-2 d-flex">
              <v-col cols="12" align="left">
                <h4 class="font-weight-bold">Customer Details</h4>
                <h4 class="mt-1">
                  {{ $t("Name") }}: {{ order.customer.name }}
                </h4>
                <h4 >
                  {{ $t("Email") }}:
                   {{ order.customer.email }}
                </h4>
                <h4 >
                  {{ $t("Phone Number") }}:
                   {{ order.customer.phoneNumber }}
                </h4>
                <h4 >
                  {{ $t("Address") }}:
                   {{ order.customer.address }}
                </h4>
              </v-col>
              <v-col cols="12" align="left">
                <h4 class="font-weight-bold">Order Details</h4>
                <h4 class="mt-1">
                  {{ $t("Order For") }}: {{ order.orderType }}
                </h4>
                <h4 class="">
                  {{ $t("Status") }}: {{ order.status }}
                </h4>
                <h4 >
                  {{ $t("Date") }}:
                   {{ order.placedAt | formatDate }}
                </h4>
                <h4 v-if="order.deliveryCharge">
                  {{ $t("Delivery City") }}:
                   {{ order.customer.city}}
                </h4>
              </v-col>
            </v-row>
            <v-row v-for="item of order.items" :key="item._id" >
              <v-col cols="12" lg="8">
                <div class="rounded-lg elevation-0">
                  <div class="d-flex flex-no-wrap">
                    <v-card-text>
                      <v-row no-gutters>
                        <div>
                          <h4>{{ item.name }}</h4>
                          <h4 class="secondary--text">
                            {{ item.priceDetails.name }}
                          </h4>
                          <h5 v-if="item.itemNote" class="secondary--text">
                            {{ item.itemNote }}
                          </h5>
                        </div>
                        <v-col align="center">
                          <h4>
                            Rs.{{ item.priceDetails.price }}
                            <span class="secondary--text ml-1">
                              x{{ item.priceDetails.quantity }}</span
                            >
                          </h4>
                        </v-col>
                        <v-col align="right" class="mr-1">
                          <h4>
                            Rs.{{
                              item.priceDetails.price *
                              item.priceDetails.quantity
                            }}
                          </h4>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider class="mt-1"></v-divider>

            <v-row>
              <v-col cols="12" lg="8">
                <div class="rounded-lg elevation-0">
                  <div class="d-flex flex-no-wrap">
                    <v-card-text>
                      <v-row no-gutters>
                        <div v-if="order.deliveryCharge">
                          <h4>
                            {{ $t("Delivery Charge") }}:
                            {{ order.deliveryCharge | toCurrency }}
                          </h4>
                        </div>
                        <div v-if="order.discount">
                          <h4>{{ $t("Discount") }}: {{ order.discount }}%</h4>
                        </div>
                      </v-row>
                      <v-row no-gutters>
                       <h4 class="font-weight-bold mt-1">
                          {{ $t("Total") }}: Rs.{{ order.total }}
                        </h4>
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
      <section class="mt-8 ml-5">
        <v-btn
          align="right"
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
  async asyncData({ store, error, params, query }) {
    try {
      console.log(query.id);
      const order = await store.dispatch("cart/getOrderDetails", query.id);
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
