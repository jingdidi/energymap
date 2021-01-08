<template>

  <div class="echarts">
    <div class="mapChoose">
      <span
        v-for="(item,index) in parentInfo"
        :key="item.code"
      >
        <span
          class="title"
          @click="chooseArea(item,index)"
        >{{item.cityName}}</span>
      </span>
      <div class="title">
        <span>能量区数：</span>
        <span>{{totalCount}}</span>
      </div>
    </div>
    <div
      style="width:100;height:100%"
      ref="dotMap"
    ></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import resize from "./mixins/resize";
  export default {
    name: 'dotMap',
    mixins: [resize],
    data() {
      return {
        myCharts: null,
        geoJson: {
          features: []
        },
        parentInfo: [{
          cityName: "中国",
          code: 100000,
        }],
        areaColorArr:[],
        totalCount:0
      }
    },
    watch:{
      parentInfo:function (oldVal,newVal){
        this.$store.commit("changeSelect",newVal);
      }
    },
    mounted() {
      this.getGeoJson(100000);
      this.$store.commit("changeSelect",this.parentInfo);
    },
    methods: {
      getGeoJson(adcode) {
        let that = this;
        AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
          var districtExplorer = new DistrictExplorer();
          districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
              console.error(error);
              return;
            }
            let Json = areaNode.getSubFeatures();
            if (Json.length > 0) {
              that.geoJson.features = Json;
            } else if (Json.length === 0) {
              that.geoJson.features = that.geoJson.features.filter(
                item => item.properties.adcode == adcode
              );
              if (that.geoJson.features.length === 0) return;
            }
            that.getMapData();
          });
        });
      },
      //获取数据
      getMapData() {
        let mapData = this.geoJson.features.map(item => {
          let value = Math.random() * 40;
          if (value < 5) {
            value = 5
          }
          return {
            name: item.properties.name,
            value: [item.properties.center[0], item.properties.center[1], value],
            cityCode: item.properties.adcode
          }
        });
          //中国总value
        let valueTotal=0;
        mapData.map(v=>{
          valueTotal+= v.value[2];
        });
        this.parentInfo.map(v=>{
          if(v.cityName=="中国"){
            this.totalCount=Math.round(valueTotal);
          }
        })
        //排序
        mapData = mapData.sort(function (a, b) {
          return a.value[2] - b.value[2];
        });
        //地区颜色
        let mapMaxValue=mapData[mapData.length-1].value[2];
        mapData.forEach(v=>{
          let value=v.value[2];
          let cityObj={
              name: v.name, //区块名称
              itemStyle: {  
                  normal: {
                      areaColor: '#ccc'
                  }
              }
          }
          if(value<mapMaxValue*0.2){
            cityObj.itemStyle.normal.areaColor="#FF99CC";
          }else if(value>mapMaxValue*0.2&&value<mapMaxValue*0.5){
            cityObj.itemStyle.normal.areaColor="#FF6666";
          }else if(value>mapMaxValue*0.5&&value<mapMaxValue*0.9){
            cityObj.itemStyle.normal.areaColor="#CC6699";
          }else{
            cityObj.itemStyle.normal.areaColor="#CC0033";
          }
          this.areaColorArr.push(cityObj);
        });
        //去渲染echarts
        this.initEcharts(mapData)
      },
      initEcharts(mapData) {
        this.myChart = echarts.init(this.$refs.dotMap)
        echarts.registerMap('Map', this.geoJson) //注册
        this.myChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: p => {
                let val = p.value[2]
                if (window.isNaN(val)) {
                  val = 0
                }
                let txtCon = p.name + '：' + val.toFixed()
                return txtCon
              }
            },
            geo: {
              show: true,
              map: 'Map', //使用
              roam: true,
              itemStyle: {
                normal: {
                  show: true,
                  borderColor: '#215495',
                  borderWidth: '1.3',
                },
                //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                emphasis: {
                  show: true,
                  areaColor: '#8dd7fc',
                }
              },
               regions:this.areaColorArr,
              label: {
                normal: {
                  show: true,
                  color: "#000", //省份标签字体颜色
                  formatter: p => {
                    switch (p.name) {
                      case "内蒙古自治区":
                        p.name = "内蒙古";
                        break;
                      case "西藏自治区":
                        p.name = "西藏";
                        break;
                      case "新疆维吾尔自治区":
                        p.name = "新疆";
                        break;
                      case "宁夏回族自治区":
                        p.name = "宁夏";
                        break;
                      case "广西壮族自治区":
                        p.name = "广西";
                        break;
                      case "香港特别行政区":
                        p.name = "香港";
                        break;
                      case "澳门特别行政区":
                        p.name = "澳门";
                        break;
                      default:
                        break;
                    }
                    return p.name;
                  }
                },
                emphasis: {
                  show: true,
                  color: "#f75a00"
                }
              },
              zoom: 1.15
            },
            series: [{
              name: 'top5',
              type: 'effectScatter',
              data: mapData,
              coordinateSystem: 'geo',
              //这里可以设置点的大小
              symbolSize: function (val) {
                return val[2] / 1.2
              },
              showEffectOn: 'render', //高亮时显示特效
              rippleEffect: {
                brushType: 'fill'
              },
              hoverAnimation: false,
              label: {
                normal: {
                  formatter: p => {
                    return p.value[2].toFixed()
                  },
                  position: 'center', //地图上是否有文字
                  show: true,
                  textStyle: {
                    color: '#fff'
                  }
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(255, 128, 0,0.8)' //地图点的颜色
                }
              },
              layoutCenter: ['50%', '50%'], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
              layoutSize: 430
            }]
          },
          true
        )

        let that = this;
        this.myChart.off("click");
        this.myChart.on("click", params => {
          if (!params.data) {
            return
          }
          if (
            that.parentInfo[that.parentInfo.length - 1].code ==params.data.cityCode) {
            return;
          }
          let data = params.data;
          that.parentInfo.push({
            cityName: data.name,
            code: data.cityCode
          });
          that.getGeoJson(data.cityCode);
        });
      },

      //选择切换市县
      chooseArea(val, index) {
        if (this.parentInfo.length === index + 1) {
          return
        }
        this.parentInfo.splice(index + 1)
        this.getGeoJson(this.parentInfo[this.parentInfo.length - 1].code);
      }
    }
  }
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
}

.mapChoose {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 55px;
  color: #eee;
  font-size: 14px;
  .title {
    padding: 5px;
    color: #000;
    font-weight: 600;
  }
}
</style>