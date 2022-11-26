<template>
    <div class="container mt-3 mb-5">
        <div class="row">
            <div class="col-md-8">
                <div class="card border-0 rounded shadow">
                    <div class="card-body p-2">
                        <img v-bind:src="product.image" class="w-100 border" />
                    </div>
                </div>
            </div>

            <div class="col-md-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="font-weight-bold" style="font-size: 20px">
                            {{ product.title }}
                        </label>
                        <hr />

                        <div class="price-product" id="price-product" style="font-size: 1.35rem">
                            <span class="font-weight-bold mr-2" style="font-size: 1.2rem"> Rp. {{ formatPrice(calculateDiscount(product)) }} </span>
                            <s v-if="product.discount > 0" style="font-size: 1rem"> Rp. {{ formatPrice(product.price) }} </s>
                        </div>

                        <table class="table table-borderless mt-3">
                            <tbody>
                                <tr v-if="product.discount > 0">
                                    <td class="font-weight-bold">DISKON</td>
                                    <td>:</td>
                                    <td>
                                        <span class="badge badge-discount rounded-pill text-white p-2">{{ product.discount }} % OFF</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">BERAT</td>
                                    <td>:</td>
                                    <td>
                                        <p>{{ product.weight }} gram</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-weight-bold">STOCK</td>
                                    <td>:</td>
                                    <td>
                                        <p>{{ product.stock }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button v-if="product.stock > 0" @click.prevent="addToCart(product.id, calculateDiscount(product), product.weight)"
                            class="btn btn-light btn-lg btn-block text-white rounded-pill" style="background: #cf1b1b">
                            <i class="fa fa-shopping-cart"></i> MASUKKAN KERANJANG
                        </button>
                        <button v-else class="btn btn-light btn-lg btn-block text-white rounded-pill" style="background: #cf1b1b" disabled>
                            <i class="fa fa-shopping-cart"></i> MASUKKAN KERANJANG
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <label class="font-weight-bold" style="font-size: 20px">DESKRIPSI PRODUK</label>
                        <hr />
                        <div v-html="product.content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
    name: 'ShowProductComponent',

    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        onMounted(() => {
            store.dispatch('product/getDetailProduct', route.params.slug);
        });

        const product = computed(() => {
            return store.state.product.product;
        });

        function addToCart(product_id, price, weight) {
            const token = store.state.auth.token;

            if (!token) {
                return router.push({ name: 'login' });
            }

            store.dispatch('cart/addToCart', {
                product_id: product_id,
                price: price,
                weight: weight,
                quantity: 1,
            });
        }

        return {
            store,
            route,
            router,
            product,
            addToCart,
        };
    },
};
</script>
