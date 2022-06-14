Vue.component("cart-item", {
  props: ["img", "cartItem"],
  template: `
  <div class="product-block">
      <img class="product-img" :src="cartItem.img_product" alt="Some img">
      <div class="product-desc">
        <div class="product-title" style="min-width: 250px">{{ cartItem.product_name }}</div>
        <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
        <div class="product-single-price">Price: $ {{ cartItem.price }} </div>
        <div class="product-price"> Total: $ {{ Math.ceil( 100* cartItem.quantity*cartItem.price) / 100 }}</div>
      </div>
        <button class="del-btn" @click="$emit('remove', cartItem)">X</button>
  </div>
`,
});
