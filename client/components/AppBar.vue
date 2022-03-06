<template>
  <div>
    <v-app-bar flat app color="transparent">
      <!-- <h2>Restoo</h2> -->
      <!-- <div class="mt-3 mb-2" id="navigation" v-for="[icon,title, route] in menuItems" :key="title">
    <ul >
      <div link :to="route">
      <li><h5><v-icon>{{ icon }}</v-icon>{{ $t(title) }}</h5></li>
      </div>
    </ul>
  </div> -->
      <v-spacer></v-spacer>
      <div
        v-show="!mobileView"
        v-for="[icon, title, route] in menuItems"
        :key="title"
        class="item"
      >
        <v-list-item>
          <!-- <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon> -->
          <v-chip
            link
            :to="route"
            class="p-2 pl-4 pr-4"
            large
            color="transparent"
          >
            <v-icon>{{ icon }}</v-icon>
            <h5>{{ $t(title) }}</h5></v-chip
          >
          <!-- <v-list-item-content  class=" pb-5">
            <v-list-item-title><h5>{{ $t(title) }}</h5></v-list-item-title>
          </v-list-item-content> -->
        </v-list-item>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
          <v-btn icon :to="'/checkout'">
            <v-badge color="danger" :content="cartCount" :value="cartCount">
              <v-icon large>mdi-food-fork-drink</v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon v-bind="attrs" v-on="on" v-on:click="resetNotification">
            <v-badge color="danger" :content="count" :value="count">
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
                  {{ $t(notification.response) }}
                </h5></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-show="mobileView" icon @click="drawer = !drawer">
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
    <v-navigation-drawer
      fixed
      right
      v-model="drawer"
      :src="require('../assets/images/drawer.png')"
      height="100%"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <h2>Restoo</h2>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list dense nav>
        <div v-for="[icon, title, route] in menuItems" :key="title">
          <v-list-item link :to="route" class="pb-5">
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="list-item-name pb-5">
              <v-list-item-title
                ><h5>{{ $t(title) }}</h5></v-list-item-title
              >
            </v-list-item-content>
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
const notificationSound = require("@/assets/sounds/notification.mp3").default;

export default {
  data() {
    return {
      menuItems: menu,
      drawer: false,
      mobileView: false,
      notificationSound,
    };
  },
  computed: {
    ...mapGetters("cart", {
      cartCount: "getCartItemCount",
    }),
    ...mapGetters("notification", {
      count: "getNotificationsCount",
    }),
    ...mapGetters("notification", {
      notifications: "getNotifications",
    }),
  },
  sockets: {
    connect() {
      console.log("socket connected");
    },
    requestStatus(val) {
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
    },
    handleView() {
      this.mobileView = window.innerWidth <= 1200;
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style lang="scss">
#navigation {
  display: flex;
  width: 100%;
  margin-bottom: 50px;
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0 20px 0 0;
    li {
      font-size: 2rem;
      padding: 2px 10px;
      cursor: pointer;
      &:hover {
        color: #7ca971;
      }
    }
  }
}

.item {
  border-radius: 25px;
}
</style>
