<template>
  <v-footer :absolute="!fixed" app>
    <span>&copy; Mezomia</span>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      fixed: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
