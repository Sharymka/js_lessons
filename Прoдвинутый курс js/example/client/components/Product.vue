<template>
    <div class="item">
    <div class="item-overlay bounce">
      <button class="btn-add" type="button" @click="$emit('add-product')">
        <img src="images/icon-cart.svg" alt="Add to cart"  />Add to
        Cart
      </button>
    </div>
    <img :src="img" alt="item" />
    <div class="item-text">
      <a href="product.html" class="item-title" target="_blank">
      {{product.product_name}}
      </a>
      <p class="item-description">
        Known for her sculptural takes on&nbsp;traditional tailoring,
        Australian arbiter of&nbsp;cool Kym Ellery teams up&nbsp;with
        Moda Operandi.
      </p>
      <p class="item-price">{{product.price}}</p>
    </div>
  </div>
</template>

<script>
export default {
    props: ["product", "img"],
}
</script>
