<template>
  <div>
    <v-app-bar app flat color="white" height="75" fixed>
      <v-btn icon>
        <v-icon @click="drawer = !drawer" large color="primary darken-1"
          >mdi-menu</v-icon
        >
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
          <v-btn icon v-bind="attrs" v-on="on" v-on:click="resetNotification">
            <v-badge color="danger" :content="mailCount+reqCount" :value="mailCount+reqCount">
              <v-icon color="primary darken-1" large>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list flat>
          <v-list-item
            v-for="notification of notifications"
            :key="notification.userToken"
          >
            <v-list-item-icon>
              <v-icon small>mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                ><h5>
                  New order placed from {{notification.order.email}}
                </h5></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-for="request of requests"
            :key="request.userId"
          >
            <v-list-item-icon>
              <v-icon small>mdi-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                ><h5>
                  Table {{request.tableId}} call for {{request.requestType}}
                </h5></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="primary darken-1" large>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list flat>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title><h5>Edit profile</h5></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="handleLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title><h5>Logout</h5></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item two-line>
        <v-list-item-icon>
          <img height="45" src="../assets/images/logo.png" />
        </v-list-item-icon>
        
        <v-list-item-content>
          <v-list-item-title
            ><h4>PIZZA SERVICE</h4></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list>
        <div v-for="[icon, text, route, subItems] in menuItems" :key="icon">
          <v-list-item link :to="route" v-if="subItems.length == 0">
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                ><h5>{{ $t(text) }}</h5></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            :value="true"
            :prepend-icon="icon"
            no-action
            v-if="subItems.length != 0"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  ><h5>{{ $t(text) }}</h5></v-list-item-title
                >
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="[icon, text, route] in subItems"
              :key="icon"
              link
              :to="route"
              ><v-list-item-icon>
                <v-icon small>{{ icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t(text) }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import menu from "@/util/menu";
const notificationSound = require("@/assets/sounds/notification.mp3").default;

export default {
  data() {
    return {
      drawer: null,
      menuItems: menu,
      notificationSound
    };
  },
  computed: {
    ...mapGetters("notification", {
      mailCount: "getNotificationsCount",
    }),
    ...mapGetters("notification", {
      notifications: "getNotifications",
    }),
     ...mapGetters("waiter", {
      reqCount: "getRequestsCount",
    }),
    ...mapGetters("waiter", {
      requests: "getRequests",
    }),
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    newOrder(val) {
      console.log(val);
      if (val) {
        var audio = new Audio(this.notificationSound);
        audio.play();
        console.log(audio);
      }
      this.$store.dispatch("notification/addNotification", val);
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("login/logoutUser");
    },
    resetNotification() {
      this.$store.dispatch("notification/resetNotification");
      this.$store.dispatch("waiter/resetRequestCount");
    },
  },
};
</script>

<style lang="scss" scoped></style>
