<template>
  <v-container fluid>
    <v-data-table 
      :headers="headers"
      :items="userList"
      v-model="userList"
      sort-by="placedAt"
      :sort-desc="true"
      class="elevation-1" 
    >
    <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h2>Users</h2></v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:item.role="{ item }">
        {{ item.role }}
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:item.phoneNumber="{ item }">
        {{ item.phoneNumber }}
      </template>
      <template  v-slot:item.status="{ item }">
        <v-chip
        v-if="item.active"
          small
          color="green"
          text-color="white"
          >active</v-chip
        >
        <v-chip
         v-else
          small
          color="red"
          text-color="white"
          >deactive</v-chip
        >
      </template>
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="handleActivate(item)" v-bind="attrs" v-on="on">
              <v-icon color="green"> mdi-account-check-outline </v-icon>
            </v-btn>
          </template>
          <span>Activate</span> 
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="handleDeactivate(item)" v-bind="attrs" v-on="on">
              <v-icon color="red"> mdi-account-off-outline </v-icon>
            </v-btn>
          </template>
          <span>Deactivate </span> 
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
      state: false,
      dialogDelete: false,
      loading: false,
      user:{},
      filter: {},
      orderItems: [],
      headers: [
        { text: "Name", value: "name" },
        { text: "Role", value: "role" },
        { text: "Email", value: "email" },
        { text: "Contact No", value: "phoneNumber" },
        { text: "City", value: "city" },
        { text: "Active Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  async asyncData({ store, error }) {
    try {
      const userList = await store.dispatch("auth/getUserList", {});
      console.log(userList);
      return { userList };
    } catch (err) {
      console.log(err);
      return error({ statusCode: 404 });
    }
  },
  methods: {
    async handleActivate(user) {
      this.user = user;
      console.log(user);
      try { 
        await this.$store
        .dispatch("auth/activateUser", user)
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
          this.user.active = true;
      }catch (error) {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
          });        
      }
    },
    async handleDeactivate(user) {
      this.user = user;
      console.log(user);
      try { 
        await this.$store
        .dispatch("auth/deactivateUser", user)
          this.$dialog.message.success(this.$t("Success Message"), {
            position: "top-right",
          });
          this.user.active = false;
      }catch (error) {
          console.log(error);
          this.$dialog.message.error(error.response.data.message, {
          position: "top-right",
          });        
      }
    },
  }
};
</script>

<style lang="scss" scoped></style>