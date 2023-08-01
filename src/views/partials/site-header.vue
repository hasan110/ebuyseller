<template>
  <div class="header-wrapper">
    <div class="header-inner">
      <div class="header-action">
        <router-link :to="{name:link}">
          <i class="mdi mdi-share"></i>
        </router-link>
      </div>
      <div class="header-title">
        <slot name="title"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'site-header',
  data : () => ({
  }),
  props:{
    link:{
      type:String,
      default:'profile'
    }
  },
  methods:{
  },
  mounted() {
  }
}
</script>