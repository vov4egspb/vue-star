/* eslint-disable no-tabs */
<template>
<div>
<ice-rating-star v-bind="$attrs" v-on="$listeners"/>
</div>
</template>

<script>
export default {
  components: {
    IceRatingStar: () => import('./IceRatingStar.vue'),
  },

};
</script>
