<template>
  <div class="nodata">
    <div class="item">
      <u class="icon" v-html-xss="nodata"></u>
      <i class="txt"></i>
    </div>
  </div>
</template>
<script>
  import { nodata } from '../../../../src/assets/svg';

  export default {
    name: 'nodata',
    data() {
      return {
        nodata,
      };
    },
  };
</script>
