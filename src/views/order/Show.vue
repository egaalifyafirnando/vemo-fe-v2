<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>

            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h5 class="font-weight-bold">
                            <i class="fas fa-shopping-cart"></i>
                            DETAIL ORDER
                        </h5>
                        <hr />

                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <tr>
                                    <td style="width: 25%">NO. INVOICE</td>
                                    <td style="width: 1%">:</td>
                                    <td>
                                        {{ detailOrder.invoice }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>NAMA LENGKAP</td>
                                    <td>:</td>
                                    <td>{{ detailOrder.name }}</td>
                                </tr>
                                <tr>
                                    <td>NO. TELP / WA</td>
                                    <td>:</td>
                                    <td>{{ detailOrder.phone }}</td>
                                </tr>
                                <tr>
                                    <td>ALAMAT LENGKAP</td>
                                    <td>:</td>
                                    <td>{{ detailOrder.address }}</td>
                                </tr>
                                <tr>
                                    <td>BIAYA KURIR</td>
                                    <td>:</td>
                                    <td>Rp. {{ formatPrice(detailOrder.cost_courier) }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL PEMBAYARAN</td>
                                    <td>:</td>
                                    <td>Rp. {{ formatPrice(detailOrder.grand_total) }}</td>
                                </tr>
                                <tr>
                                    <td>STATUS</td>
                                    <td>:</td>
                                    <td>
                                        <button
                                            @click="payment(detailOrder.snap_token)"
                                            v-if="detailOrder.status == 'pending'"
                                            class="btn btn-light text-white rounded-pill font-weight-bolder text-uppercase"
                                            style="background: #2d5c7f; font-size: 0.8rem"
                                        >
                                            BAYAR SEKARANG
                                        </button>
                                        <span
                                            v-else-if="detailOrder.status == 'success'"
                                            class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                            style="background: #105652; font-size: 0.8rem"
                                        >
                                            {{ detailOrder.status }}
                                        </span>
                                        <span
                                            v-else-if="detailOrder.status == 'expired'"
                                            class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                            style="background: #fecd51; font-size: 0.8rem"
                                        >
                                            {{ detailOrder.status }}
                                        </span>
                                        <span
                                            v-else-if="detailOrder.status == 'failed'"
                                            class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                            style="background: #911f27; font-size: 0.8rem"
                                        >
                                            {{ detailOrder.status }}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div v-if="detailOrder.status == 'success'" class="col-md-4 mb-4">
                        <div class="card border-0 rounded shadow">
                            <div class="card-body">
                                <h5><i class="fa fa-truck"></i> RESI PENGIRIMAN</h5>
                                <hr />

                                <div v-if="detailOrder.airway_bill == null" class="pb-3">Pantau secara berkala untuk informasi mengenai nomor resi.</div>

                                <div v-else>
                                    <h2 class="font-weight-bolder text-uppercase">{{ detailOrder.courier }}</h2>
                                    <h6>Service {{ detailOrder.service }}</h6>
                                    <h6>
                                        Nomor resi Anda: <strong>{{ detailOrder.airway_bill }}</strong>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md">
                        <div class="card border-0 rounded shadow">
                            <div class="card-body">
                                <h5><i class="fa fa-shopping-cart"></i> DETAIL ITEM</h5>
                                <hr />

                                <div class="row pb-3" v-for="product in productInOrder" v-bind:key="product.id">
                                    <div class="col-4">
                                        <div class="wrapper-image-cart">
                                            <img v-bind:src="product.image" style="width: 100%; border-radius: 0.5rem" />
                                        </div>
                                    </div>

                                    <div class="col-8">
                                        <h5>
                                            <b style="font-size: 1.1rem">
                                                {{ product.product_name }}
                                            </b>
                                        </h5>
                                        <p class="m-0" style="font-size: 1rem">Rp. {{ moneyFormat(product.price) }}</p>
                                        <p class="m-0" style="font-size: 1rem">Jumlah : {{ product.qty }}</p>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col">
                                        <p class="alert alert-success"><strong>Catatan Pesanan :</strong> {{ detailOrder.note }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CustomerMenu from '@/components/CustomerMenu';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
export default {
    name: 'OrderShowComponent',

    components: {
        CustomerMenu,
    },

    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        onMounted(() => {
            store.dispatch('order/detailOrder', route.params.snap_token);
        });

        const detailOrder = computed(() => {
            return store.getters['order/detailOrder'];
        });

        const productInOrder = computed(() => {
            return store.getters['order/productInOrder'];
        });

        function payment(snap_token) {
            window.snap.pay(snap_token, {
                onSuccess: function () {
                    router.push({
                        name: 'detail_order',
                        params: { snap_token: snap_token },
                    });
                },
                onPending: function () {
                    router.push({
                        name: 'detail_order',
                        params: { snap_token: snap_token },
                    });
                },
                onError: function () {
                    router.push({
                        name: 'detail_order',
                        params: { snap_token: snap_token },
                    });
                },
            });
        }

        return {
            store,
            route,
            router,
            detailOrder,
            productInOrder,
            payment,
        };
    },
};
</script>
