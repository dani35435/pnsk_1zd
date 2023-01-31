Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
           <ul>
                <li v-for="detail in details">{{ detail }}</li>
           </ul>
      `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
   <div class="product">
	<div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>
            <p v-if="inStock">In stock</p>
            <p v-else style="text-decoration: line-through">Out of Stock</p>
            <a v-bind:href="link">More products like this</a> <br>
            <span v-if="onSale">ON SALE</span>
            <span v-else="onSale"></span> 
            <p>Shipping: {{ shipping }}</p>
            <p>{{sale}}</p>
            <div v-for="size in sizes">{{size}}</div>
            <product-details :details="details"></product-details>
            
            <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId" :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)">
            </div>
        </div>


            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }"> Add to cart </button>
            <button v-on:click="removeToCart">Remove from cart</button>
        </div>
   </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks",
            selectedVariant: 0,
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            altText: "A pair of socks",
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeToCart() {
            this.$emit('remove-to-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },

        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },

        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale'
            }
            return this.brand + ' ' + this.product + ' are not sale'
        }

    }
})


let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart(id) {
            for(let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})


