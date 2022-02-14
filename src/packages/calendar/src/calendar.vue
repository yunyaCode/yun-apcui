<template>
  <div class="apc-calendar" :class="cls" :style="[{'width':width+'px'}]">
    <div class="calN">
      <a class="next" @click="nextMonth"><u class="icon" v-html-xss="svg.esc"></u></a>
      <a class="prev" @click="preMonth"><u class="icon" v-html-xss="svg.esc"></u></a>
    </div>
    <div class="calC" :style="move"
         @touchmove="swipeMove"
         @touchstart="swipeStart"
         @touchend="swipeEnd"
         @mousedown="swipeStart"
         @mouseup="swipeEnd"
         @mousemove="swipeMove">
      <div class="month" v-for="item in months" :month="item.month">
        <div class="day" v-for="(day,index) in item.days" :class="[{'c' :day.day === today && day.cls !== 'd'},day.cls]"
             :key="index" @touchstart="showDate(item.year,day.day,item.month, day.cls, false)"
             @click="showDate(item.year,day.day,item.month, day.cls)">
          <b><i>
            <!--{{dayText}}-->
            {{day.cls === '' ? day.day === 1 ? item.month <= 9 ? '0' + item.month + '/01' : item.month + '/01' :
            day.day : day.day === 1 ? (item.month + 1) <= 9 || (item.month + 1) === 13 ? '0' + ((item.month + 1) === 13
            ? 1 :
            (item.month + 1)) + '/01' : (item.month + 1) + '/01' : day.day
            }}
          </i></b>
          <u><i class="c"></i><i class="s"></i></u>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   @module calendar
   @param {string} [nowYear] 本年
   @event getDays 获取当月天数
   @event getFirstDay 获取当月第一天是星期几
   @event currentDate 获取today的年月日
   @event init 初始化日期
   @event showDate 点击某一天拿到日期
   @event preMonth 点击上一月进行日期跳转
   @event nextMonth 点击下一月进行日期跳转
   @example <calendar></calendar>
   */
  import esc from '../../../assets/svg/esc';

  let index = 4;
  export default {
    name: 'apc-calendar',
    data() {
      return {
        width: '100%',
        svg: {esc},
        nowMonth: null,
        nowYear: null,
        nowDate: null,
        months: [],
        swipeData: {
          posWidth: '0',
          start: {},
          end: {},
          tracking: false,
        },
        move: {
          transform: 'translate3d(0,0,0)',
          transition: 'all 0s ease'
        },
        todayMonth: null,
      }
    },
    props: {
      cls: String
    },
    computed: {
      today() {
        let date = new Date();
        if (this.nowYear === date.getFullYear() && this.todayMonth === date.getMonth() + 1) {
          let todayTime = this.nowDate;
          return todayTime;
        }
        return false;
      }
    },
    created() {
      this.$nextTick(() => {
        this.currentDate();
        for (let i = -1; i < 2; i++) {
          let year = this.nowYear;
          let month = this.nowMonth + i;
          if (month < 1) {
            year = year - 1;
            month = 12;
          } else if (month > 12) {
            year = year + 1;
            month = 1;
          }
          this.init(year, month)
        }
      })
    },
    methods: {
      test() {
        console.log(1)
      },
      // 获取当月总天数
      getDays(year, month) {
        let date = new Date(year, month, 0);
        return date.getDate();
      },
      // 获取当月第一天是星期几
      getFirstDay(year, month) {
        let firstDay = new Date(year, month - 1, 1).getDay();
        return firstDay < 2 ? 7 + firstDay : firstDay;
      },
      //获取今天的年月日
      currentDate() {
        let date = new Date();
        this.nowYear = date.getFullYear();
        this.nowMonth = date.getMonth() + 1;
        this.todayMonth = date.getMonth() + 1;
        this.nowDate = date.getDate();
      },
      //获取每个月日期数组
      getDaysArr(year, month) {
        let days = [];
        let getDays = this.getDays(year, month);
        let firstDay = this.getFirstDay(year, month);
        //前一个月
        for (let i = 0; i < firstDay - 1; i++) {
          // 特殊情况2020-1
          days.unshift({
            day: new Date((month === 1 ? year - 1 : year), month - 1, 0).getDate() - i,
            cls: 'd'
          });
        }
        //这个月
        for (let i = 0; i < getDays; i++) {
          days.push({
            day: i + 1,
            cls: ''
          });
        }
        //下个月
        let nextDays = 42 - days.length;
        if (nextDays > 0) {
          for (let i = 0; i < nextDays; i++) {
            days.push({
              day: i + 1,
              cls: 'd'
            });
          }
        }
        return days;
      },
      //初始化一个月
      init(year, month) {
        let days = this.getDaysArr(year, month);
        this.months.push({
          year: year,
          month: month,
          days: days
        });
      },
      preMonth() {
        this.todayMonth = null;
        this.move.transform = 'translate3d(33.3%,0,0)';
        this.move.transition = 'all 0.4s ease';
        setTimeout(() => {
          // this.nowYear,this.nowMonth重置，前一个月
          if (this.nowMonth === 1) {
            this.nowMonth = 12;
            this.nowYear -= 1;
          } else {
            this.nowMonth -= 1;
          }
          // 加载前第二个月的日子
          let year = this.nowYear;
          let month = this.nowMonth;
          if (this.nowMonth === 1) {
            month = 12;
            year -= 1;
          } else {
            month -= 1;
          }
          let preDays = this.getDaysArr(year, month);
          this.months.unshift({
            year: year,
            month: month,
            days: preDays,
          });
          this.months.splice(this.months.length - 1, 1);
          this.move.transform = '';
          this.move.transition = '';
          if (this.nowMonth === new Date().getMonth() + 1) {
            this.todayMonth = new Date().getMonth() + 1;
          }
        }, 400)
      },
      nextMonth() {
        this.todayMonth = null;
        this.move.transform = 'translate3d(-33.3%,0,0)';
        this.move.transition = 'all 0.4s ease';
        setTimeout(() => {
          // this.nowYear,this.nowMonth重置，后一个月
          if (this.nowMonth === 12) {
            this.nowMonth = 1;
            this.nowYear += 1;
          } else {
            this.nowMonth += 1;
          }
          // 加载后第二个月的日子
          let year = this.nowYear;
          let month = this.nowMonth;
          if (this.nowMonth === 12) {
            month = 1;
            year += 1;
          } else {
            month += 1;
          }
          let nextDays = this.getDaysArr(year, month);
          this.months.splice(0, 1);
          this.months.push({
            year: year,
            month: month,
            days: nextDays,
          });
          this.move.transform = '';
          this.move.transition = '';
          if (this.nowMonth === new Date().getMonth() + 1) {
            this.todayMonth = new Date().getMonth() + 1;
          }
        }, 400)
      },
      showDate(year, day, month, cls, pc) {
        if (pc) {
          return;
        }
        if (cls === 'd') {
          if (day < 10) {
            month = month + 1;
          }
          if (day > 20) {
            month = month - 1;
          }
        }
        this.$emit('getDay', {day, month, year});
      },
      //阻止页面滚动的默认事件
      preventDefault(e) {
        e.preventDefault();
      },
      swipeStart(e) {
        let _this = this;
        //阻止页面滚动
        document.addEventListener('touchmove', _this.preventDefault(e));
        if (e.type === 'touchstart') {
          if (e.touches.length > 1) {
            this.swipeData.tracking = false;
            return;
          } else {
            this.swipeData.tracking = true;
            this.swipeData.start.t = new Date().getTime();
            this.swipeData.start.x = e.targetTouches[0].clientX;
            this.swipeData.end.x = e.targetTouches[0].clientX;
          }
        } else {
          this.swipeData.tracking = true;
          this.swipeData.start.t = new Date().getTime();
          this.swipeData.start.x = e.clientX;
          this.swipeData.end.x = e.clientX;
        }
      },
      swipeMove(e) {
        if (this.swipeData.tracking) {
          if (e.type === 'touchmove') {
            e.preventDefault();
            this.swipeData.end.x = e.targetTouches[0].clientX;
          } else {
            e.preventDefault();
            this.swipeData.end.x = e.clientX;
          }
          this.move.transform = `translate3d(${this.swipeData.end.x - this.swipeData.start.x}px,0,0)`;
          this.move.transition = 'all 0s ease';
        }
      },
      swipeEnd(e) {
        let _this = this;
        this.swipeData.tracking = false;
        let now = new Date().getTime();
        let difTime = now - this.swipeData.start.t;
        let difX = this.swipeData.end.x - this.swipeData.start.x;
        //解除阻止
        document.removeEventListener('touchmove', _this.preventDefault(e));
        if (difTime > 1000) {//滑动太慢
//          console.log('您划得太慢啦');
          this.move.transform = 'translate3d(0,0,0)';
          this.move.transition = 'all 0.4s ease';
          return;
        } else {
          if (difX > 100) {
            this.preMonth();
            return;
          } else if (-difX > 100) {
            this.nextMonth();
            return;
          } else if (difX < 100) {
            this.move.transform = 'translate3d(0,0,0)';
            this.move.transition = 'all 0.4s ease';
            return;
          } else if (-difX < 100) {
            this.move.transform = 'translate3d(0,0,0)';
            this.move.transition = 'all 0.4s ease';
            return
          }
        }
      }
    }
  }
</script>
