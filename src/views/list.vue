<template>
  <div class="list">
    <van-row>
      <van-col
        span="6"
        v-for="(item,index) in cityArr"
        :key="index"
        :offset="index%3==0?'0':'3'"
      >
        {{item.cityName}}
      </van-col>
    </van-row>
    <van-card
      v-for="(item,index) in list"
      :key="index"
    >
      <template #title>
        <div class="title">{{item.title}}</div>
      </template>
      <template #thumb>
        <img src="" />
      </template>
      <template #desc>
        <div class="detail">
          <div>
            <span>开放时间：</span>
            <span>{{item.date}}</span>
          </div>
          <div>
            <span>负责人：</span>
            <span>{{item.personal}}</span>
          </div>
          <div>
            <span>电话：</span>
            <span>{{item.tel}}</span>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="address">
          <div class="addressTitle">地址：</div>
          <div>{{item.address}}</div>
        </div>
      </template>
    </van-card>
  </div>
</template>
<script>
export default{
  data(){
    return{
      list:[
        {
          title:"某某某时间银行能量区",
          imgUrl:"",
          date:"09:30-20:30",
          personal:"笛梵的",
          tel:"177174477474",
          address:"山西省太原市小店区长风街华德广场往西300米平阳景苑内"
        },
        {
          title:"时间银行能量区222222",
          imgUrl:"",
          date:"00:30-8:30",
          personal:"我的",
          tel:"177174477476",
          address:"山西省太原市小店区"
        }
      ]
    }
  },
   computed: {
    cityArr () {
      return this.$store.state.selectCity;
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss">
.list {
  padding: 12px 24px 0 24px;
  background: #f6f6f6;
  min-height: 100vh;
  .van-row {
    text-align: center;
    .van-col {
      width: 67px;
      height: 28px;
      background: #fffdfd;
      font-size: 13px;
      line-height: 28px;
      color: #212121;
      border-radius: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 10px;
      margin-bottom: 10px;
    }
  }
  .van-card {
    background: #fff;
    border-radius: 5px;
    text-align: left;
  }
  .van-card__footer {
    text-align: left;
  }
  .van-card__thumb {
    width: 90px;
    height: 90px;
    background: #b2b2b2;
    border-radius: 5px;
  }
  .title {
    font-size: 16px;
    color: #212121;
    margin-bottom: 5px;
  }
  .detail {
    color: #656565;
    font-size: 12px;
    line-height: 20px;
  }
  .address {
    display: flex;
    color: #212121;
    font-size: 12px;
    line-height: 18px;
    padding-top: 10px;
    .addressTitle {
      width: 45px;
    }
  }
}
</style>