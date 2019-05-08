<template>
  <div class="title_color">
      <div class="title_line"></div>
      <div style="height: 8px"></div>
      <span class="title_size">{{heading}}</span >
  </div>
</template>

<script>
    export default {
      props:['heading'],
      name: "Title",
    }
</script>

<style scoped>

</style>
