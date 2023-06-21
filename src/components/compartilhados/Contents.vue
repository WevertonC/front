<script>
export default {
  methods: {
    hideMenu() {}
  }
};
</script>

<template>
  <div class="contents" @click="hideMenu">
    <router-view></router-view>
  </div>
</template>

<style>
.contents {
  grid-area: contents;
  background-color: #efefef;
}
</style>