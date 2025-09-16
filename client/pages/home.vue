<template>
  <div>
    <!-- <div class="banner">
      <div class="title-name">KIVA</div>
      <div class="sub-title-name">
        HOOKAH LOUNGE<br />
        &<br />
        BISTRO
      </div>
      <div class="address">
        ADDRESS HERE<br />07321 5586964<br /><v-icon color="white"
          >mdi-instagram</v-icon
        >
        kiva.lounge
      </div>
      <img width="100%" src="../assets/images/home.jpeg" />

    </div>-->
    <v-container fluid>
      <v-row>
      <v-col cols="12">
        <h2>{{ $t("Restoo") }}</h2>
      </v-col>
        <v-col cols="12" align="center">
          <img
            height="250"
            width="350"
            src="../assets/images/home.jpeg"
            class="rounded-xl mt-8"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" align="center">
          <h1>Hello 😍</h1>
        </v-col>
      </v-row>
            <v-row>
        <v-col cols="12" align="center">
          <!-- <v-btn
            large
            icon
            href="https://www.instagram.com/hummusundco/"
            target="_blank"
          >
            <v-icon large>mdi-instagram</v-icon>
          </v-btn> -->
          <v-btn
            large
            icon
            href="https://www.google.com/search?sca_esv=8fb985a9e177f272&sxsrf=AE3TifN__222178JfhXdCSCg4p4piAsNEw:1758017552319&q=jumping+beans+cafe&sa=X&ved=2ahUKEwjdzdvdhd2PAxX3U2wGHX-0OloQ7xYoAHoECBMQAQ&biw=1920&bih=945&dpr=1"
            target="_blank"
          >
            <v-icon large>mdi-google</v-icon>
          </v-btn>
          <v-btn
            large
            icon
            href="tel:123-456-7890"
            target="_blank"
            class="ml-2"
          >
            <v-icon large>mdi-phone-forward-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <div v-if="events.length > 0">
        <v-row>
          <v-col cols="12" align="center">
            <h4>{{ $t("Our Special Events") }}</h4>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="12" md="4" lg="4">
            <v-carousel cycle height="250" hide-delimiters>
              <v-carousel-item v-for="event of events" :key="event._id">
                <EventCard :event="event" />
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </div>
      <div v-if="specials.length > 0">
        <v-row>
          <v-col cols="12" align="center">
            <h4>{{ $t("Our Specials") }}</h4>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="12" md="4" lg="4">
            <v-carousel cycle height="250" hide-delimiters>
              <v-carousel-item v-for="special of specials" :key="special._id">
                <SpecialCard :special="special" />
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </div>
      <div v-if="menuItems.length > 0">
        <v-row>
          <v-col cols="12" align="center">
            <h4>{{ $t("Our Menu") }}</h4>
          </v-col>
        </v-row>
        <!-- <v-row cols="12" justify="center">
          <v-chip-group active-class="blue-grey lighten-4">
            <CategoryChip
              @getCategoryId="viewCategoryList(category)"
              :category="category"
              v-for="category of categories"
              :key="category._id"
            />
          </v-chip-group>
        </v-row> -->
        <v-row cols="6" justify="center">
            <CategoryCard
              @getCategoryId="viewCategoryList(category)"
              :category="category"
              v-for="category of categories"
              :key="category._id"
            />
        </v-row>
        <!-- <v-row>
          <MenuItemCard
            :menuItem="menuItem"
            v-for="menuItem of menuItems"
            :key="menuItem._id"
          />
        </v-row> -->
        <v-row justify="center" class="mb-5">
          <v-btn
            :to="'menu/all'"
            rounded
            large
            class="mt-5"
            outlined
            color="primary lighten-1"
          >
            <h4 class="primary--text text--lighten-1">{{ $t("View More") }}</h4>
          </v-btn>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import EventCard from "../components/Event/EventCard.vue";
import SpecialCard from "../components/Event/SpecialCard.vue";
import MenuItemCard from "../components/Menu/MenuItemCard.vue";
import SpecialDealCard from "../components/Menu/SpecialDealCard.vue";
import CategoryCard from "../components/Category/CategoryCard.vue";

export default {
  components: { MenuItemCard, SpecialDealCard, SpecialCard },
  computed: {
    topDeals() {
      return this.menuItems.filter((item) => item.todaySpecial);
    },
  },

  async asyncData({ store }) {
    const events = await store.dispatch("event/getEventList");
    console.log(events);
    const specials = await store.dispatch("specials/getSpecialsList");
    console.log(specials);
    const menu = await store.dispatch("food/getFoodItemList");
    const categories = await store.dispatch("food/getFoodCategoryList");
    const menuItems = menu.slice(0, 5);
    return { menuItems, events, categories, specials };
  },

  methods: {
    viewCategoryList(category) {
      console.log(category);
      this.$router.push({
        name: "category-id",
        params: { id: category._id, name: category.name },
      });
    },
  },
};
</script>

<style lang="scss"></style>
