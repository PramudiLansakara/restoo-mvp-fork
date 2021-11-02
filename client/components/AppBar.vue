<template>
  <div>
    <v-app-bar flat app color="transparent">
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
          <v-btn icon v-bind="attrs" v-on="on" v-on:click="resetNotification">
            <v-badge color="danger" :content="count" :value="count">
              <v-icon color="primary darken-1" large>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list flat >
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
                  {{ $t(notification.response) }}
                </h5></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click="drawer = !drawer">
        <v-icon large color="primary darken-1">mdi-menu</v-icon>
      </v-btn>

      <!-- <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
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
    </v-menu> -->
    </v-app-bar>
    <v-navigation-drawer fixed
      v-model="drawer"
      :src="require('../assets/images/drawer.png')"
      height="100%"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <h2>DAMAS LOUNGE</h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list dense nav>
        <div v-for="[title, route] in menuItems" :key="title">
          <v-list-item link :to="route" class="list-item-name pb-5">
            <v-list-item-title>{{ $t(title) }}</v-list-item-title>
          </v-list-item>
        </div>
        <v-spacer></v-spacer>
        <!-- <v-list-item class="list-item-name">
          <v-list-item-title>LOG OUT</v-list-item-title>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import menu from "@/util/menu";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menuItems: menu,
      drawer: false
    };
  },
  computed: {
    ...mapGetters("notification", {
      count: "getNotificationsCount"
    }),
    ...mapGetters("notification", {
      notifications: "getNotifications"
    })
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    requestStatus(val) {
      console.log(val);
      this.$store.dispatch("notification/addNotification", val);
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("login/logoutUser");
    },
    resetNotification(){
      this.$store.dispatch("notification/resetNotification");
    }
  }
};
</script>

<style lang="scss"></style>
