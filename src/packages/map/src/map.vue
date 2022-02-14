<template>
  <div class="C map">
    <iframe :src="request" name="request"></iframe>
    <div class="H b">
      <a class="apc-btn back" @click="cancel"><u class="icon" v-html-xss="backSvg"></u></a>
      <i class="txt">地图定位</i>
    </div>
    <div class="N">
      <el-amap-search-box class="search-box apc-input" :search-option="searchOption" :on-search-result="onSearchResult" :events="searchBoxEvent" :style="[{width: width}]"></el-amap-search-box>
      <el-amap class="mapArea" :vid="'amap-vue'" :center="center" :zoom="zoom" :plugin="plugin" :map-manager="amapManager" :events="events" :style="[{width:width, height:height}]">
        <el-amap-marker key="1" v-for="marker in markers" :position="marker" :visible="false"></el-amap-marker>
      </el-amap>
    </div>
    <div class="U" :style="[{padding:height+' 0 60px'}]">
      <div class="L">
        <div @click="choose(item,index)" class="mAddr" :class="[{'c': index === chooseAddr}]" v-for="(item, index) in searchMsg">
          <div class="name">{{item.name}}</div>
          <div class="address">{{item.address}}</div>
        </div>
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
  import {AMapManager} from 'vue-amap';
  let amapManager = new AMapManager();
  export default{
    name: 'apc-map',
    data() {
      let self = this;
      return {
        isGeocoderInit: false,
        backSvg: backSvg,
        rightSvg: rightSvg,
        pois: '',
        request: '',
        width: this.mapWidth,
        height: this.mapHeight,
        searchMsg: [],
        chooseAddr: '',
        vid: 'amap-vue-1s',
        zoom: 15,
        center: [0, 0],
        searchOption: {
          city: '杭州',
          citylimit: true
        },
        searchBoxEvent: {
          init(o) {
//            console.log(o)
          }
        },
        events: {
          mousedown: () => {
            this.getAddressData();
          },
          touchend: () => {
            this.getAddressData();
          },
          moveend: () => {
            let mapCenter = this.amapManager.getMap().getCenter();
            this.markers = [[mapCenter.getLng(), mapCenter.getLat()]];
            this.center = [mapCenter.getLng(), mapCenter.getLat()];
            this.pois = mapCenter.getLng()+','+mapCenter.getLat();
          },
          zoomchange: () => {
            let mapCenter = this.amapManager.getMap().getCenter();
            this.markers = [[mapCenter.getLng(), mapCenter.getLat()]];
            this.center = [mapCenter.getLng(), mapCenter.getLat()];
            this.pois = mapCenter.getLng()+','+mapCenter.getLat();
            this.getAddressData();
          }
        },
        plugin: [
          {
            pName: 'Geolocation',
            events: {
              init(instance) {
                instance.getCurrentPosition((status, result) => {
                  if(result.hasOwnProperty('position') && result.position.hasOwnProperty('lng') && result.position.hasOwnProperty('lat')) {
                    self.center = [result.position.lng, result.position.lat];
                    self.markers = [[result.position.lng, result.position.lat]];
                    self.pois = result.position.lng+','+result.position.lat;
                  }
                });
              },
              complete() {
                self.getAddressData();
              },
              error() {
                self.center = [120.152362, 30.259313];
                self.markers = [[120.152362, 30.259313]];
                self.pois = 120.152362+','+30.259313
                self.getAddressData();
              }
            },
            showMarker: false
          }
        ],
        amapManager: amapManager,
        markers: [
          [120.152362, 30.259313]
        ]
      }
    },
    props: {
      mapHeight: String,
      mapWidth: String,
      data: Object
    },
    watch: {
      searchMsg(val) {
        this.choose(val[0], 0)
      },
      pois(val) {
      	this.data.pois = val;
      }
    },
    methods: {
      onSearchResult(pois) {
        this.searchMsg = pois;
      },
      choose(msg, index) {
        this.chooseAddr = index;
        if (msg.lng) {
          this.center = [msg.lng, msg.lat];
          this.markers = [[msg.lng, msg.lat]];
          this.pois = msg.lng + ',' + msg.lat;
        } else {
          let location = msg.location;
          this.center = [location.lng, location.lat];
          this.markers = [[location.lng, location.lat]];
          this.pois = location.lng + ',' + location.lat;
        }
        this.requestAddress().then(res => {
//          console.log(res)
          let msg = res.regeocode.addressComponent;
          this.data.region = msg.province + msg.city + msg.district;
          this.data.street = msg.township + msg.street + msg.streetNumber;
        }).catch(err => {
//          console.log(err);
        })
      },
      submit() {
        this.$emit('submit');
      },
      cancel() {
      	this.$emit('cancel');
      },
      geocoderInit() {
        return new Promise((resolve, reject) => {
          if(!this.isGeocoderInit) {
            let init = document.createElement('script');
            init.type='text/javascript';
//            init.async='async';
            init.src = 'https://webapi.amap.com/maps?v=1.3&key=9c51c614e621d60ff40eb923077f3885&plugin=AMap.Geocoder';
            document.body.appendChild(init);
            init.onload=() => {
              this.isGeocoderInit = true;
              this.getGeocoder(resolve);
            }
            setTimeout(() => {
              reject('加载相关api超时');
            }, 10000)
          } else {
            resolve(true)
          }
        })
      },
      getGeocoder(callBack) {
        if (AMap.Geocoder) {
          callBack();
        }
        setTimeout(() => {
          this.getGeocoder(callBack);
        }, 100)
      },
      regeocoder(xy) {
        return new Promise((resolve, reject) => {
          this.geocoderInit().then(()=>{
            let geocoder = new AMap.Geocoder({
              radius: 1000,
              extensions: "all"
            });
            geocoder.getAddress(xy, function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                resolve(result)
              }
            });
          })
        })
      },
      requestAddress() {
        return this.regeocoder([this.center[0], this.center[1]]).then(res => {
          return res;
        })
      },
      getAddressData() {
        this.requestAddress().then(res => {
          this.$set(this, 'searchMsg', res.regeocode.pois);
          let msg = res.regeocode.addressComponent;
          this.data.region = msg.province + msg.city + msg.district;
          this.data.street = msg.township + msg.street + msg.streetNumber;
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>
