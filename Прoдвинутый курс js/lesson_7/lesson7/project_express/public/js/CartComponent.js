// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component("cart", {
  data() {
    return {
      cartUrl: "/getBasket.json",
      cartItems: [],
      imgCart: "https://placehold.it/50x100",
      showCart: false,
    };
  },
  mounted() {
    this.$parent.getJson(`/api/cart`).then((data) => {
      for (let item of data.contents) {
        this.$data.cartItems.push(item);
      }
    });
  },
  methods: {
    addProduct(item) {
      let find = this.cartItems.find((el) => el.id_product === item.id_product);
      if (find) {
        this.$parent
          .putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
          .then((data) => {
            if (data.result === 1) {
              find.quantity++;
            }
          });
      } else {
        const prod = Object.assign({ quantity: 1 }, item);
        this.$parent.postJson(`/api/cart`, prod).then((data) => {
          if (data.result === 1) {
            this.cartItems.push(prod);
          }
        });
      }

      // this.$parent.getJson(`${API}/addToBasket.json`)
      //     .then(data => {
      //         if(data.result === 1){
      //             let find = this.cartItems.find(el => el.id_product === item.id_product);
      //             if(find){
      //                 find.quantity++;
      //             } else {
      //                 const prod = Object.assign({quantity: 1}, item);
      //                 this.cartItems.push(prod)
      //             }
      //         }
      //     })
    },
    remove(item) {
      let index = this.cartItems.findIndex(
        (el) => el.id_product === item.id_product
      );
      console.log(index);
      console.log(this.cartItems);
      console.log(item);
      let find = this.cartItems.find((el) => el.id_product === item.id_product);

      if (find) {
        this.$parent.deleteJson(`/api/cart/${find.id_product}`).then((data) => {
          if (data.result === 1) {
            find.quantity--;
            if (find.quantity < 1) {
              console.log(this.cartItems);
              this.cartItems.splice(index, 1);
              console.log(this.cartItems);
            }
          }
        });
      }
    },
  },
  template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="imgCart" :cart-item="item" @remove="remove">
            </cart-item>
        </div>
        </div>
    `,
});

Vue.component("cart-item", {
  props: ["img", "cartItem"],
  template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `,
});
