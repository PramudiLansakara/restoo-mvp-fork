<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    // this.$store.dispatch("table/TableNumber", this.$route.query.table);
    this.$router.push({ name: "home" });
  },
};
</script>
