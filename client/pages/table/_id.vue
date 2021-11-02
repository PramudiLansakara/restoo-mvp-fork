<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    //   console.log(this.$route)
    // this.$store.dispatch("table/TableNumber", this.$route.query.table);
    // this.$router.push({ name: "home" });
  },
  async fetch() {
    try {
      const table = await this.$store.dispatch(
        "table/getTableDetails",
        this.$route.params.id
      );
      this.$store.dispatch("table/tableDetails", table);
      this.$router.push("/home");
    } catch (err) {
      // console.log(err);
      return this.$nuxt.context.redirect("/home");
    }
  },
  // async asyncData({ store, error, params, redirect }) {
  //   try {
  //     const table = await store.dispatch("table/getTableDetails", params.id);
  //     store.dispatch("table/tableDetails", table);
  //     return redirect("/home");
  //   } catch (err) {
  //     console.log(err);
  //     return error({ statusCode: 404 });
  //   }
  // },
};
</script>
