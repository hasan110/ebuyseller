<template>
  <div class="site-section">
    <div class="section-icon">
      <slot name="icon"></slot>
    </div>
    <h3 class="section-title">
      {{ title }}
    </h3>
  </div>
</template>
<script>
export default {
  name: 'site-section',
  data : () => ({
  }),
  props:{
    title:{
      type:String,
      required:true
    }
  },
  mounted() {
  }
}
</script>