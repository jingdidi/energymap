<!--  -->
<template>
  <div id="Home">
    <van-swipe
      class="my-swipe"
      :vertical="true"
      style="height: 100vh;"
      :show-indicators="false"
    >
      <van-swipe-item>
        <dotMap></dotMap>
      </van-swipe-item>
      <van-swipe-item>
        <list></list>
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
  import dotMap from "@/components/dotMap";
  import list from "@/views/list";
  export default {
    name: "home",
    components: {
      dotMap,
      list
    },
    data() {
      return {
      };
    },
    mounted() {},
    methods: {
    
    },
  };
</script>
<style lang="scss" scoped>
#Home {
  width: 100%;
  height: 100vh;
  background: #fff;

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
}
</style>