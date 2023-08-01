<template>
  <div class="product-wrapper">
    <router-link :to="{name:'product' , params : {id : product.uuid}}" class="product" :class="[bg ? 'type-1' : 'type-2']">
      <div class="picture">
        <img :src="ImageUrl + product.files[0]['path']">
      </div>
      <h4 class="name">{{product.name}}</h4>
      <div class="short-desc">
        <p>{{product.description}}</p>
      </div>
      <div class="shipment">
        <img :src="StaticImageUrl + 'assets/images/icons/delivery-truck-svgrepo-com.svg'">
        ارسال در {{product.store.shipping_time}}
      </div>
      <template v-if="showOff && product.discount">
        <div class="off-price">

          <bdi class="off">
            %{{product.discount}} تخفیف
          </bdi>
          <div class="prices">
            <span>{{formatPrice(product.price)}} تومان</span>
            <span class="strike">{{formatPrice(product.price_before_off)}} تومان</span>
          </div>

        </div>
      </template>
      <template v-else>
        <div class="price">
          {{formatPrice(product.price)}} تومان
        </div>
      </template>
      <div class="action">
        <button class="px-btn block size-md px-btn-primary">+ افزودن به سبد خرید</button>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props:{
      product:{
        required:true,
        type:Object
      },
      bg:{
        default:false,
        type:Boolean
      },
      showOff:{
        default:false,
        type:Boolean
      }
    },
    data: () => ({
    }),
  }
</script>
