<template>
  <div class="C map">
    <iframe :src="request" name="request"></iframe>
    <div class="H b">
      <apc-btn @event="cancel" :svg="backSvg"></apc-btn>
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
  import backSvg from '../../../src/assets/svg/arrow';
  import {AMapManager} from 'vue-amap';
  let amapManager = new AMapManager();
  export default{
    name: 'Map',
    data() {
      let self = this;
      return {
        backSvg: backSvg,
        data: {},
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
            this.data.pois = mapCenter.getLng()+','+mapCenter.getLat();
          },
          zoomchange: () => {
            let mapCenter = this.amapManager.getMap().getCenter();
            this.markers = [[mapCenter.getLng(), mapCenter.getLat()]];
            this.center = [mapCenter.getLng(), mapCenter.getLat()];
            this.data.pois = mapCenter.getLng()+','+mapCenter.getLat();
            this.getAddressData();
          }
        },
        plugin: [
          {
            pName: 'Geolocation',
            events: {
              init(instance) {
                instance.getCurrentPosition((status, result) => {
                  self.center = [result.position.lng, result.position.lat];
                  self.markers = [[result.position.lng, result.position.lat]];
                  self.data.pois = result.position.lng+','+result.position.lat;
                });
              },
              complete() {
                self.getAddressData();
              },
              error() {
                self.center = [120.152362, 30.259313];
                self.markers = [[120.152362, 30.259313]];
                self.data.pois = 120.152362+','+30.259313
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
      pois: String
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
          this.data.pois = msg.lng + ',' + msg.lat;
        } else {
        	let location = msg.location;
          this.center = [location.lng, location.lat];
          this.markers = [[location.lng, location.lat]];
          this.data.pois = location.lng + ',' + location.lat;
        }
        this.requestAddress().then(res => {
          let msg = res.regeocode.addressComponent;
          this.$set(this.data, 'region', msg.province + msg.city + msg.district);
          this.$set(this.data, 'street', msg.township + msg.street + msg.streetNumber);
        }).catch(err => {
//          console.log(err);
        })
      },
      submit() {
        this.$set(this.$parent, 'region', this.data.region);
        this.$set(this.$parent, 'street', this.data.street);
        this.$set(this.$parent, 'pois', this.data.pois);
        this.$set(this.$parent, 'tab', 'GetAddress');
      },
      cancel() {
        this.$set(this.$parent, 'tab', 'GetAddress');
      },
      requestAddress() {
        return new Promise((resolve, reject) => {
          localStorage.setItem('geocoderDataUpdate', 0);
          this.$set(this, 'request', '');
          this.$set(this, 'request', `./static/getMap.html?${this.center[0]}&${this.center[1]}`);
          let index = 0;
          let timer = setInterval(() => {
            index++;
            if (index > 50) {
              clearInterval(timer);
              reject('timeout');
            }
            if (localStorage.getItem('geocoderDataUpdate') === '1') {
              resolve(JSON.parse(localStorage.getItem('geocoderData')));
              clearInterval(timer);
            }
          }, 100);
        });
      },
      getAddressData() {
        this.requestAddress().then(res => {
        	this.$set(this, 'searchMsg', res.regeocode.pois);
          let msg = res.regeocode.addressComponent;
          this.$set(this.data, 'region', msg.province + msg.city + msg.district);
          this.$set(this.data, 'street', msg.township + msg.street + msg.streetNumber);
        }).catch(err => {
//          console.log(err);
        })
      }
    }
  }
</script>
