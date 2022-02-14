<!--高德地图，非第三方组件，满足搜索和定位-->
<template>
<div class="C map">
  <div class="H b">
    <a class="apc-btn back" @click="cancel"><u class="icon" v-html-xss="backSvg"></u></a>
    <i class="txt">地图定位{{mapHeight}}</i>
  </div>
  <div class="N">
    <input class="search-box apc-input" type="text" id="mapSearch">
    <div id='container' style="width: 100%;" :style="{height: mapHeight}"></div>
  </div>
  <div class="U" :style="[{padding: mapHeight+' 0 60px'}]">
    <div class="L">
      <!--<div @click="choose(item,index)" class="mAddr" :class="[{'c': index === chooseAddr}]" v-for="(item, index) in searchMsg">-->
        <!--<div class="name">{{item.name}}</div>-->
        <!--<div class="address">{{item.address}}</div>-->
      <!--</div>-->
    </div>
  </div>
  <div class="o">
    <a class="apc-btn submit" @click="submit"></a>
  </div>
</div>
</template>
<script>
import backSvg from '../../../assets/svg/arrow';
import rightSvg from '../../../assets/svg/right';
export default{
  name: 'apc-map',
  data() {
    return {
      backSvg,
      rightSvg,
      map: {},
      geolocation: {},
      positionResult: {},
    };
  },
  props: {
    mapHeight: String,
  },
  methods: {
    //解析定位结果
    onComplete(data) {
    },
    onError(data) {
      console.log('定位失败', data)
    },
    submit() {
      this.$emit('submit', this.positionResult);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
  mounted() {
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom:14
    });
    //加载地图，调用浏览器定位服务
    this.map.plugin('AMap.Geolocation', ()=>{
      this.geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
      });
      this.map.addControl(this.geolocation);
      this.geolocation.getCurrentPosition();
      AMap.event.addListener(this.geolocation, 'complete', this.onComplete);//返回定位信息
      AMap.event.addListener(this.geolocation, 'error', this.onError);      //返回定位出错信息
    });
    //搜索框
    AMap.service(['AMap.PlaceSearch', 'AMap.Autocomplete'],() => {//回调函数
      //实例化PlaceSearch
      let placeSearch = new AMap.PlaceSearch({
        map: this.map
      });
      let auto =  new AMap.Autocomplete({
        input: 'mapSearch'
      });
      AMap.event.addListener(auto, "select", (e) => {
        //注册监听，当选中某条记录时会触发
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
      });
    })
    //构造地点查询类
    AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker)=>{
      let positionPicker = new PositionPicker({
        mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
        map: this.map//依赖地图对象
      });
      positionPicker.on('success', (positionResult) => {
        console.log(positionResult)
        this.positionResult = positionResult;
      });
      positionPicker.start();
    });
  }
}
</script>
