<template>
  <v-footer :absolute="!fixed" app>
    <span
      >Alle Preise inkl. Mwst und Bedienung. Zusatzstoffe und Allergene sind an
      der Theke einzusehen.</span
    >
    <span>&copy; Mezomia</span>
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
