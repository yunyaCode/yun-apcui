<template>
  <div class="apc-input"
    :class="[{f:newOptions.isFocus, t:newOptions.isType, d:newOptions.disabled, v:newOptions.view}, type, cls]"
    @click="focusInput">
    <label class="label">{{title}}</label>
    <i class="ph">{{placeholder}}</i>
    <input :autofocus="isAutofocus" class="text" v-if="newOptions.disabled" disabled="disabled" @click="blur"
      type="text" v-model="currentValue" />
    <input :autofocus="isAutofocus" class="text" v-else-if="newOptions.view" readonly="readonly" @click="blur"
      type="text" v-model="currentValue" />
    <input :autofocus="isAutofocus" class="text" v-else-if="type==='pw'" @focus="focus" @blur="blur" type="password"
      v-model="currentValue" />
    <input :autofocus="isAutofocus" class="text" v-else-if="type==='number'" @focus="focus" @blur="blur" min="1"
       type="number" v-model="currentValue" />
    <input :autofocus="isAutofocus" class="text" v-else @focus="focus" @keyup="keyup($event)" @blur="blur"
      :type="inputType" v-model="currentValue" ref="input" />
    <span class="tip" v-show="!newOptions.disabled">{{newOptions.tip}}</span>
    <span class="save" v-if="newOptions.isSave">
      <u class="icon" v-html-xss="rightIcon"></u>
      <i class="txt">已保存</i>
      <a class="undo" @click="undo">撤销保存</a>
    </span>
    <em class="error" v-if="newOptions.isError">{{newOptions.error}}</em>
    <a v-if="type==='sms' || hasSms" @click="sms" class="sms" :class="[{d:newOptions.isSms}]">{{newOptions.smsText}}</a>
    <a v-if="type==='img'" @click="img" class="img" :style="newOptions.imgStyle" title="看不清？点击更换"></a>
    <a :class="svgCls" @click="svgEvent" v-if="svg">
      <u class="icon" v-html-xss="svg"></u>
    </a>
    <slot name="delBtn"></slot>
    <slot name="more"></slot>
  </div>
</template>
<script>
  /**
   @module apc-input
   @param {options.<cls> | <title> | <tip> | <error> | <smsText> | <smsTime> | <imgStyle> | <isFocus> | <isSms> | <svg> | <isSave> | <isError> | <isType> | <placeholder> | <value> | <disabled> | <view> | <autofocus>} {object} apc-input组件的参数
   @event focus input的聚焦之后的回调事件
   @event blur input的失去焦点之后的回调事件
   @event undo input的撤销的回调事件
   @event sms 点击发送短信按钮的回调事件
   @event img 点击图片验证码的回调事件
   @event svgEvent 点击input的小图标按钮的回调事件
   @example <apc-input :options="options"/>
   */
  import right from "../../../assets/svg/right";

  export default {
    name: "apc-input",
    props: {
      options: Object,
      type: String,
      cls: String,
      title: String,
      placeholder: String,
      svg: String,
      svgCls: String,
      autofocus: {
        default: false,
        type: Boolean
      },
      inputType: {
        type: String,
        default: "text"
      },
      hasSms: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        isAutofocus: false,
        rightIcon: right,
        isType: false,
        isSms: false,
        currentValue: this.options.value,
        defaultOptions: {
          tip: "",
          error: "",
          smsText: "",
          imgStyle: "",
          isFocus: false,
          isSms: false,
          isSave: false,
          isError: false,
          isType: false,
          value: "",
          disabled: false,
          view: false
        }
      };
    },
    methods: {
      focus() {
        this.$set(this.options, "isFocus", true);
        this.$emit("focus");
      },
      blur() {
        this.$set(this.options, "isFocus", false);
        this.$emit("blur");
      },
      undo() {
        this.$emit("undo");
      },
      sms(e) {
        if (e && e.stopPropagation) {
          e.stopPropagation();
        } else {
          window.event.cancelBubble = true;
        }
        this.$emit("sms");
      },
      img() {
        this.$emit("img");
      },
      keyup($event) {
        this.$emit("keyup", $event);
      },
      svgEvent() {
        this.$emit("svgEvent");
      },
      focusInput() {
        if (this.$refs.input) {
          this.$refs.input.focus();
        }
      }
    },
    watch: {
      currentValue(val) {
        this.options.value = val || '';
        this.$emit("change");
        if (val.toString().length > 0) {
          this.options.isType = true;
        } else {
          this.options.isType = false;
        }
      }
    },
    created() {
      this.isAutofocus = this.autofocus;
    },
    computed: {
      newOptions() {
        this.currentValue = this.options.value || '' + "";
        return Object.assign(this.defaultOptions, this.options);
      }
    }
  };

</script>
