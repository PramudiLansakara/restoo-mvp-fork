<template>
  <v-footer dark
    padless >

<v-card
      flat
      tile
      class="primary darken-5 white--text text-center"
    >
      <v-card-text class="white--text pt-1 pb-0">
        Alle Preise inkl. Mwst und Bedienung. Zusatzstoffe und Allergene sind an
      der Theke einzusehen.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text pt-0 pb-0" >
        {{ new Date().getFullYear() }} — <strong>&copy; Mezomia</strong>
      </v-card-text>
    </v-card>

    
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
