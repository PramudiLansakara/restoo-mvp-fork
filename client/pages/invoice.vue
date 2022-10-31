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
          pdf-content-width="92%"
          ref="html2Pdf"
        >
          <section class="ml-5" slot="pdf-content">
            <v-row>
              <v-col>
                <h3>🍕 Restoo Pizza - Invoice</h3>
                <h5 class="secondary--text">
                  Ref: <strong> {{ order.reference }}</strong>
                </h5>
              </v-col>
            </v-row>
            <v-row v-for="item of order.items" :key="item._id" class="mt-1">
              <v-col cols="12" md="6" lg="4">
                <div class="rounded-lg elevation-0">
                  <div class="d-flex flex-no-wrap">
                    <v-card-text>
                      <v-row class="ml-1">
                        <div>
                          <h4>{{ item.name }}</h4>
                          <h5 class="secondary--text ml-1">
                            {{ item.priceDetails.name }}
                          </h5>
                        </div>
                        <v-col class="" align="center">
                          <h5>
                            {{ item.priceDetails.price }}€
                            <span class="secondary--text ml-1">
                              x{{ item.priceDetails.quantity }}</span
                            >
                          </h5>
                        </v-col>
                        <v-col align="right" class="mr-1">
                          <h5>
                            {{
                              item.priceDetails.price *
                              item.priceDetails.quantity
                            }}€
                          </h5>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-divider class="my-1"></v-divider>
            <div class="rounded-lg elevation-0">
              <div class="d-flex flex-no-wrap">
                <v-card-text>
                  <v-row class="ml-1">
                    <div v-if="order.deliveryCharge">
                      <h4>
                        Delivery Charge: {{ order.deliveryCharge | toCurrency }}
                      </h4>
                    </div>
                    <div v-if="order.discount">
                      <h4>Discount: {{ order.discount }}%</h4>
                    </div>
                  </v-row>
                  <v-row class="ml-1 mb-2">
                    <h4>Total: {{ order.total | toCurrency }}</h4>
                  </v-row>
                </v-card-text>
              </div>
            </div>
            <v-row class="mt-5">
              <v-col cols="" align="left">
                <h5 class=""><u> Customer Details </u></h5>
                <h5 class="">
                  Name: <strong> {{ order.customer.name }}</strong>
                </h5>
                <h5 class="">
                  Email: <strong> {{ order.customer.email }}</strong>
                </h5>
                <h5 class="">
                  Contact No: <strong> {{ order.customer.phoneNumber }}</strong>
                </h5>
              </v-col>
              <v-col cols="8" align="left">
                <h5 class=""><u> Order Details </u></h5>
                <h5 class="">
                  Order type: <strong> {{ order.orderType }}</strong>
                </h5>
                <h5 class="">
                  Order status: <strong> {{ order.status }}</strong>
                </h5>
                <h5 class="">
                  Date: <strong> {{ order.placedAt | formatDate }}</strong>
                </h5>
              </v-col>
            </v-row>
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
