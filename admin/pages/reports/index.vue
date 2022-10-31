<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title><h3>{{ $t("Generate Report") }}</h3></v-toolbar-title>
      <v-spacer></v-spacer>  
      <v-btn
          @click="printReport"
          rounded
          small
          color="primary lighten-1"
          class="px-0 mr-2"
        >
          <v-icon color="white">mdi-printer</v-icon>
        </v-btn>  
    </v-toolbar>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-row class="ml-5">
      <v-col cols="12" md="3">
          <h5 class="mb-3">{{ $t("From") }}</h5>
          <v-menu
            v-model="date1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="filter.fromDate"
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
              v-model="filter.fromDate"
              @input="date1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="3">
          <h5 class="mb-3">{{ $t("To") }}</h5>
          <v-menu
            v-model="date2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="filter.toDate"
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
              v-model="filter.toDate"
              @input="date2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-btn
          @click="generateReport"
          rounded
          small
          color="primary lighten-1"
          class="mt-12 ml-5 mr-2"
        >
          <v-icon color="white">mdi-file-document-outline</v-icon>
        </v-btn> 
    </v-row>
  </v-form>
      <client-only>
        <VueHtml2pdf
          :html-to-pdf-options="htmlToPdfOptions"
          :show-layout="true"
          :float-layout="false"
          :enable-download="true"
          filename="Monthly Report"
          :pdf-quality="2"
          :paginate-elements-by-height="1400"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="92%"
          ref="html2Pdf"
        >
          <section class=" ml-10 mr-10 my-2" slot="pdf-content">
      <h4>🍕 Pizza Service {{$t("Order Report")}} </h4>
      <h5 class="mb-2 ml-5">Total Income: {{orderDetails.total | toCurrency}}</h5>    
    <v-data-table
        hide-default-footer
        disable-pagination
      :headers="headers"
      :items="orderDetails.orders"
      sort-by="placedAt"
      :sort-desc="true"
      class="elevation-1"
    >
      <template v-slot:item.placedAt="{ item }">
        {{ item.placedAt | formatDate }}
      </template>
      <template v-slot:item.total="{ item }">
        {{ item.total + " " }}$
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          small
          
          >{{ item.status }}</v-chip
        >
      </template>
    </v-data-table>

</section>
        </VueHtml2pdf>
      </client-only>
  </v-container>
</template>

<script>
import { statusList, filterStatusList } from "~/util/status";
import VueHtml2pdf from "vue-html2pdf";

export default {
  middleware: "redirectIfNotAuth",
  data() {
    return {
      htmlToPdfOptions: {
    margin: [3, 6],
    pagebreak: { avoid: 'tr'}
    },
      date1: false,
      date2: false,
      dialogAccept: false,
      dialogDecline: false,
      items: statusList,
      filter: {
        fromDate:"",
        toDate:"",
      },
      order:{},
      orderDetails: [],
      headers: [
        {
          text: this.$t("Name"),
          align: "start",
          value: "customer.name"
        },
        {
          text: this.$t("Email"),
          align: "start",
          value: "customer.email"
        },
        { text: this.$t("Date"), value: "placedAt" },
        { text: this.$t("Price"), value: "total" },
        { text: this.$t("Order For"), value: "orderType" },
        // { text: "Change Status", value: "changeStatus", sortable: false },
        // { text: "Actions", value: "actions", sortable: false }
      ],
      rules:{
        dateRules: [(v) => !!v || "Date is required"],
      },
    };
  },
  async asyncData({ store, error }) {
    try {
      const orderDetails = await store.dispatch("order/getOrdersReport", {});
      console.log(orderDetails);
      return { orderDetails };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  components: {
    VueHtml2pdf,
  },
  methods: {
    async onChangeStatus(item) {
      console.log(item);
      try { 
      await this.$store
        .dispatch("order/changeStatus", item)
          this.$dialog.message.success(this.$t('Success Message'), {
            position: "top-right"
          });
      }catch (error) {
      console.log(error);
      this.$dialog.message.error(error.response.data.message, {
      position: "top-right",
      });        
      }
    },
    async onSelectStatus() {
      if (this.filter.status === "all") {
        this.filter = {};
      }
      try { 
      const response = await this.$store
        .dispatch("order/getOrderList", this.filter)
          this.orderItems = response;
      }catch (error) {
      console.log(error);
      this.$dialog.message.error(error.response.data.message, {
      position: "top-right",
      });        
      }    
    },
     viewOrder(orderId) {
      this.$router.push({
        name: "orders-id",
        params: { id: orderId }
      });
    },
     viewInvoice(orderId) {
      this.$router.push({
        name: "orders-id-invoice",
        params: { id: orderId }
      });
    },
  async handleAccept(item) {
      try { 
      console.log(item)
      // this.order=item;
      // this.dialogAccept=true;
      item.status="accepted"
      await this.$store
        .dispatch("order/acceptOrder", item)
          this.$dialog.message.success(this.$t('Success Message'), {
            position: "top-right"
          });
      }catch (error) {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
          });        
      }
    },
    async acceptOrderConfirm() {
      try {
      this.loading = true;
      this.order.status="accepted"
      console.log(this.order.status)
      await this.$store
        .dispatch("order/acceptOrder", this.order)
          this.$dialog.message.success(this.$t('Success Message'), {
            position: "top-right"
          });
          this.closeOrderConfirm();
       }catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
        });        
      }
    },
    closeOrderConfirm() {
      this.dialogAccept = false;
    },
    async handleDecline(item) {
      try { 
      console.log(item)
      this.order=item;
      this.dialogDecline = true;
      // item.status="declined"
      // await this.$store
      //   .dispatch("order/declineOrder", item)
      //     this.$dialog.message.success(this.$t('Success Message'), {
      //       position: "top-right"
      //     });
      }catch (error) {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
          });        
      }
    },
    async orderDeclineConfirm() {
      try {
      this.loading = true;
      this.order.status="declined"
      console.log(this.order.status)
      await this.$store
        .dispatch("order/declineOrder", this.order)
          this.$dialog.message.success(this.$t('Success Message'), {
            position: "top-right"
          });
          this.closeOrderDecline();
       }catch (error) {
        this.loading = false;
        console.log(error);
        this.$dialog.message.error(error.response.data.message, {
            position: "top-right",
        });        
      }
    },
    closeOrderDecline() {
      this.dialogDecline = false;
    },
    printReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    async generateReport() {
    const validate = this.$refs.form.validate();
    if (validate) {
    this.loading = true;
    try { 
      const response = await this.$store
        .dispatch("order/getOrdersReport", this.filter)
          this.orderDetails = response;
    }catch (error) {
      console.log(error);
      this.$dialog.message.error(error.response.data.message, {
      position: "top-right",
      });        
    }      
    }
    },
  }
};
</script>

<style lang="scss" scoped></style>
