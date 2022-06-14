<template>
      <div class="catalog-item">
      <product 
        v-for="item of filtered" 
        :key="item.id_product" 
        :img="item.img_product"
        :product="item" 
        @add-product="$emit('add-product', item)"
      />
    </div>
</template>

<script>
export default {
    data() {
    return {
      catalogUrl: "/catalogData.json",
      filtered: [],
      products: [],
      iconCart: "images/icon-cart.svg",
    };
  },
  mounted() {
    this.$parent.getJson(`/api/products`).then((data) => {
      for (let item of data) {
        this.$data.products.push(item);
        this.$data.filtered.push(item);
      }
    });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },
}
</script>
