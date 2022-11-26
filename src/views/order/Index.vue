<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-3 mb-4">
                <CustomerMenu />
            </div>

            <div class="col-md-9 mb-4">
                <div class="card border-0 rounded shadow">
                    <div class="card-body table-responsive">
                        <h5 class="font-weight-bold">
                            <i class="fas fa-shopping-cart"></i>
                            MY ORDER
                        </h5>
                        <hr />

                        <table class="table table-striped table-bordered">
                            <thead class="text-white" style="background: #cf1b1b">
                                <tr>
                                    <th scope="col">INVOICE</th>
                                    <th scope="col">FULL NAME</th>
                                    <th scope="col">TOTAL PEMBAYARAN</th>
                                    <th scope="col">STATUS</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="order in orders" v-bind:key="order.id">
                                    <td>{{ order.invoice }}</td>
                                    <td>{{ order.name }}</td>
                                    <td>Rp. {{ moneyFormat(order.grand_total) }}</td>
                                    <td class="text-center">
                                        <router-link v-bind:to="{ name: 'detail_order', params: { snap_token: order.snap_token } }">
                                            <span v-if="order.status == 'pending'" class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                                style="background: #2d5c7f; font-size: 0.8rem">
                                                {{ order.status }}
                                            </span>
                                            <span v-else-if="order.status == 'success'" class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                                style="background: #3f7b70; font-size: 0.8rem">
                                                {{ order.status }}
                                            </span>
                                            <span v-else-if="order.status == 'expired'" class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                                style="background: #ffcc1d; font-size: 0.8rem">
                                                {{ order.status }}
                                            </span>
                                            <span v-else-if="order.status == 'failed'" class="badge badge-pill text-white font-weight-bolder text-uppercase p-2"
                                                style="background: #911f27; font-size: 0.8rem">
                                                {{ order.status }}
                                            </span>
                                        </router-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
export default {
    name: 'OrderIndexComponent',

    components: {
        CustomerMenu,
    },

    setup() {
        const store = useStore();

        onMounted(() => {
            // RUN ACTIONS "getOrder" IN MODULE "ORDER" STORE VUEX
            store.dispatch('order/getOrder');
        });

        const orders = computed(() => {
            // RUN GETTERS "getOrder" IN MODULE "ORDER" STORE VUEX
            return store.getters['order/getOrder'];
        });

        return {
            store,
            orders,
        };
    },
};
</script>
