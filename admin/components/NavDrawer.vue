<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list-item two-line>
      <v-list-item-icon>
        <img height="50" src="../assets/images/chef.png" />
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          ><h1>{{ $t("Hello") }}</h1></v-list-item-title
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
</template>

<script>
import menu from "@/util/menu";

export default {
  data() {
    return {
      drawer: null,
      menuItems: menu
    };
  }
};
</script>

<style lang="scss" scoped></style>
