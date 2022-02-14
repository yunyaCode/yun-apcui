<template>

  <div class="item" :class="newOptions.itemCls">

    <div v-for="item in data " :class=item.cls :style=item.style>
      {{item.data}}
      {{item.slot}}
      <slot name="item.slot"></slot>
    </div>
    <a class="to" v-if="newOptions.itemToEvent" @click="eventClick(item)"></a>
  </div>
</template>

<script>

  /**
   @module apc-mlist
   @param {options.
   @example <apc-mItem :options="option"/>
   */

  export default {
    name: 'apc-mItem',
    data() {
      return {
        defaultOptions: {
          itemCls: '',
          itemToEvent: '',
        },
      };
    },
    props: {
      options: Object,
      data: {
        type: Array,
        default: [],
      },
    },
    computed: {
      newOptions() {
        return Object.assign(this.defaultOptions, this.options);
      },
    },
    methods: {
      eventClick(item = null) {
        this.$emit(this.newOptions().itemToEvent, item);
      },
    },
  };
</script>

