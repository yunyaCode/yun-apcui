<template>
  <div>
    <div class="P apc-entry" :class="[classObject, loginCls]" v-if="tab.indexOf('login')>-1 || tab.indexOf('reg')>-1">
      <div class="C login" :class="loginClass" v-if="tab.indexOf('login')>-1">
        <div class="U">
          <div class="L form">
            <div class="title">
              <u class="icon" v-html-xss="svg"></u>
              <i class="txt">{{ loginSchoolName }}</i>
              <!-- <i>感受互联网移动学习培训新体验<br />注册加入互联网财税学校</i> -->
            </div>
            <apc-input cls="s1" :type="item.type" key="index" :ref="'input'+index" v-for="(item,index) in inputArr" :value="item.currentValue" :title="item.title" :placeholder="item.placeholder" :error="item.error"></apc-input>

            <div class="o">
              <!--<a class="reg apc-btn ">快速注册</a>-->
              <a class="login apc-btn " @click="loginBtn">登录</a>
              <a class="reg apc-btn " @click="regs">没有帐号，免费注册</a>
              <a class="reset apc-btn ">密码忘了？</a>
            </div>
          </div>
        </div>
      </div>
      <div class="C reg user" :class="regClass" v-if="tab.indexOf('reg')>-1">
        <div class="U">
          <div class="L form">
            <div class="title">
              <u class="icon" v-html-xss="svg"></u>
              <i class="txt">{{ RegSchoolName }}</i>
              <!-- <i>感受互联网移动学习培训新体验<br />注册加入互联网财税学校</i> -->
            </div>
            <apc-input cls="s1" :type="item.type" :ref="(item.sms)?'sms':'regInput'+index" @sms="sms(item.sms)" key="index"
                       v-for="(item,index) in regInputs" :title="item.title" :placeholder="item.placeholder"
                       :error="item.error"></apc-input>
            <div class="agreement apc-checkbox multi v s1">
              <a class="cb_i o1" :class="{ c:isToggle }" @click="toggle()"><u class="icon" v-html-xss="Rsvg"></u>{{ agree }}</a>
            </div>
            <div class="o">
              <a class="reg apc-btn " @click="regId">注册帐号</a>
              <a class="login apc-btn " @click="logins">已有帐号，去登录</a>
              <!-- <a class="apc-btn reg">返回登录</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="P apc-entry org edit" :class="classObject" ref="org" v-if="tab.indexOf('org')>-1">
      <div class="C reg org">
        <div class="U">
          <div class="L form">
            <label class="label"><u class="icon"></u>{{ moduleList.blueTitle }}</label>
            <apc-input ref="schoolName" cls="s1" :type="item.type" key="index" v-for="(item,index) in moduleList.lists" :title="item.title" :placeholder="item.placeholder" :error="item.error"></apc-input>
            <div class="addr apc-input multi s1 t">
              <label>添加地址</label>
              <span class="addr item" v-for="item in addrList">
                  <u class="icon" v-html-xss="Lsvg"></u>
                  <i class="txt">{{ item.keys }}<span class="tag">{{ item.tag }}</span></i>
                  <a class="del" @click="addrRemove(item)">
                      <u class="icon" v-html-xss="Wsvg"></u>
                  </a>
                </span>
              <a class="add" @click="addAddr" data-tp="addr"><u class="icon" v-html-xss="Asvg"></u></a>
            </div>
            <!--<div class="user apc-input multi s1">-->
            <!--<label>添加成员</label>-->
            <!--<span class="addr item" v-for="item in userList">-->
            <!--<u class="icon" v-html-xss="Msvg"></u>-->
            <!--<i class="txt">{{ item.keys }}<span class="tag">{{ item.tag }}</span></i>-->
            <!--<a class="del" @click="userRemove(item)">-->
            <!--<u class="icon" v-html-xss="Wsvg"></u>-->
            <!--</a>-->
            <!--</span>-->
            <!--<a class="add" @click="addUser" data-tp="user"><u class="icon" v-html-xss="Asvg"></u></a>-->
            <!--</div>-->
            <div class="phone apc-input multi s1 t">
              <label>添加电话</label>
              <span class="addr item" v-for="item in phoneList">
                  <u class="icon" v-html-xss="Psvg"></u>
                  <i class="txt">{{ item.keys }}<span class="tag">{{ item.tag }}</span></i>
                  <a class="del" @click="phoneRemove(item)">
                      <u class="icon" v-html-xss="Wsvg"></u>
                  </a>
                </span>
              <a class="add" @click="addPhone" data-tp="phone"><u class="icon" v-html-xss="Asvg"></u></a>
            </div>
            <!--注册学校-->
            <div class="agreement apc-checkbox multi v s1">
              <a class="cb_i o1" :class="{ c:isToggle }" @click="toggle()"><u class="icon" v-html-xss="Rsvg"></u>{{ agree  }}</a>
            </div>
            <div class="o">
              <a class="reg apc-btn " @click="regSchools">注册学校</a>
              <!--<a class="login apc-btn ">已有帐号，去登录</a>-->
              <!-- <a class="apc-btn reg">返回登录</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * school
   * Created by dengzhihui on 2017/4/21.
   * @module components/ 登录注册

   * @param {Array} [:modules="titles"]   注册学校蓝色底文字
   * @param {string} [:schoolName]   logo下面的文字
   * @param {Array} [ :labels="data1" ] 有三个属性 [title]  [placeholder]  [error] '手机 验证短信 设置密码'
   *
   * @param {slot} [mHtml] - 弹层
   * <apc-entry :schoolName="丁税宝-互联网财税学校1123123" :modules="titles" :labels="data1" ></apc-entry>
   */
  import svg from '../../../src/assets/svg/school'
  import svgRight from '../../../src/assets/svg/right'
  import svgWrong from '../../../src/assets/svg/wrong'
  import Asvg from '../../../src/assets/svg/add'
  import loading from '../../../src/assets/svg/loading'
  import svgLocation from '../../../src/assets/svg/location.js'
  import svgPhone from '../../../src/assets/svg/phone.js'
  import svgMember from '../../../src/assets/svg/member.js'
  export default {
    name: 'apc-entry',
    data() {
      return {
        tab: 'login',
        loginClass: '',
        loginCls: '',
        regClass: '',
        regCls: '',
        svg: svg,
        Wsvg:svgWrong,
        Asvg: Asvg,
        Rsvg: svgRight,
        Lsvg:svgLocation,
        Psvg:svgPhone,
        Msvg:svgMember,
        login: true,
        reg: false,
        isToggle: true,
        agree: '《互联网财税学校用户注册服务协议》',
        moduleList: this.modules
      }
    },
    props: {
      modules: Object,
      loginSchoolName: String,
      RegSchoolName: String,
      regInputs: Array,
      inputArr: Array,
      classObject:Object,
      addrList:Array,
      phoneList:Array,
      userList:Array,
      keys:String,
      tag:String,
      svgs:String
    },
    methods: {
      submit(){
//          console.log(1)
          //this.$emit('loginSubmit');
      },
      addrRemove(reps){
        let index=this.addrList.indexOf(reps);
        this.addrList.splice(index,1)
      },
//      userRemove(reps){
//        let index=this.userList.indexOf(reps);
//        this.userList.splice(index,1)
//      },
      phoneRemove(reps){
        let index=this.phoneList.indexOf(reps);
        this.phoneList.splice(index,1)
      },
      regs() {
        this.tab = 'login reg';
        this.loginClass = 'iR-leave-to';
        this.regClass = 'iR-enter-active';
        let _this = this;
        setTimeout(function () {
          _this.regClass = 'iR-enter-to';
        },100)
        setTimeout(function () {
          _this.loginClass = '';
          _this.regClass = '';
          _this.tab = 'reg';
        },500)
      },
      logins() {
        this.tab = 'login reg';
        this.regClass = 'iL-leave-to';
        this.loginClass = 'iL-enter-active';
        let _this = this;
        setTimeout(function () {
          _this.loginClass = 'iL-enter-to';
        },100)
        setTimeout(function () {
          _this.loginClass = '';
          _this.regClass = '';
          _this.tab = 'login';
        },500)
      },
      regSchools() {
          this.$emit('regSchools')
      },
      addAddr() {
        this.$emit('mAddr')
      },
      addUser() {
        this.$emit('mUser')
      },
      addPhone() {
        this.$emit('mPhone')
      },
      toggle() {
        this.isToggle = !this.isToggle;
      },
      sms(smsBack) {
        //this.$refs.sms[0].$emit('smsBack');
        this.$emit('parent');
      },
      loginBtn(){
        this.$emit('getData');
      },
      regId() {
        this.$emit('register')
      }
    }
  }
</script>
<style>
  .iR-leave-active {
    transform: translate3d(0, 0, 0) !important;
  }

  .iR-leave-to {
    transform: translate3d(-100%, 0, 0) !important;
  }

  .iR-enter-active {
    transform: translate3d(100%, 0, 0) !important;
  }

  .iR-enter-to {
    transform: translate3d(0, 0, 0) !important;
  }

  .iL-leave-active {
    transform: translate3d(0, 0, 0) !important;
  }

  .iL-leave-to {
    transform: translate3d(100%, 0, 0) !important;
  }

  .iL-enter-active {
    transform: translate3d(-100%, 0, 0) !important;
  }

  .iL-enter-to {
    transform: translate3d(0, 0, 0) !important;
  }
</style>
