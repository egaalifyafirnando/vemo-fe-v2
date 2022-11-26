<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row">
            <div class="col-md-6 mb-3">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h5><i class="fa fa-shopping-cart"></i> DETAIL PESANAN</h5>
                        <hr />

                        <div class="row pb-2" v-for="cart in carts" v-bind:key="cart.id">
                            <div class="col-4">
                                <div class="wrapper-image-cart">
                                    <img v-bind:src="cart.product.image" style="width: 100%; border-radius: 0.5rem" />
                                </div>
                            </div>

                            <div class="col-8">
                                <h6><b>{{ cart.product.title }}</b></h6>
                                <p class="m-0 font-weight-bold">Rp. {{ moneyFormat(cart.price) }}</p>
                                <p class="m-0"><s style="text-decoration-color: red">Rp. {{ moneyFormat(cart.product.price * cart.quantity) }}</s></p>
                                <div>
                                    <b>Jumlah : {{ cart.quantity }}</b>
                                    <button @click.prevent="removeCart(cart.id)" class="btn btn-sm btn-danger float-right rounded-circle" style="background: #cf1b1b">
                                        <i class="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-group pb-2">
                            <textarea class="form-control list-form-item" style="border-radius: 0.5rem" id="note" rows="3"
                                placeholder="Tulis detail pesananmu agar tidak salah pilih yaa...&#10;contoh: Item x yang besar, Item y pilih yang merah"
                                v-model="state.note"></textarea>
                            <div v-if="validation.note" class="mt-2 alert alert-danger rounded-pill">harap tulis detail pesananmu yaa...</div>
                        </div>

                        <table class="table table-default">
                            <tbody>
                                <tr>
                                    <td class="set-td text-left" width="60%">
                                        <p class="m-0">JUMLAH</p>
                                    </td>
                                    <td class="set-td text-right" width="30%">&nbsp; : Rp.</td>
                                    <td class="text-right set-td">
                                        <p class="m-0" id="subtotal">
                                            {{ moneyFormat(cartTotal) }}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="set-td text-left border-0">
                                        <p class="m-0">
                                            ONGKOS KIRIM (<strong>{{ cartWeight }}</strong> gram)
                                        </p>
                                    </td>
                                    <td class="set-td border-0 text-right">&nbsp; : Rp.</td>
                                    <td class="set-td border-0 text-right">
                                        <p class="m-0" id="ongkir-cart">
                                            {{ moneyFormat(state.courier_cost) }}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left border-0">
                                        <p class="font-weight-bold m-0 text-uppercase">Grand Total</p>
                                    </td>
                                    <td class="border-0 text-right">&nbsp; : Rp.</td>
                                    <td class="border-0 text-right">
                                        <p class="font-weight-bold m-0" align="right">
                                            {{ moneyFormat(state.grandTotal) }}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="card border-0 shadow rounded">
                    <!-- start ongkos kirim -->
                    <div class="card-body">
                        <h5><i class="fa fa-user-circle"></i> RINCIAN PENGIRIMAN</h5>
                        <hr />

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">NAMA LENGKAP</label>
                                    <input type="text" class="form-control rounded-pill list-form-item" id="nama_lengkap" placeholder="Nama Lengkap"
                                        v-model="state.name" />
                                    <div v-if="validation.name" class="mt-2 alert alert-danger rounded-pill">Masukkan Nama Lengkap</div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="font-weight-bold">NO. HP / WHATSAPP</label>
                                    <input type="number" class="form-control rounded-pill list-form-item" id="phone" placeholder="No. HP / WhatsApp"
                                        v-model="state.phone" />
                                    <div v-if="validation.phone" class="mt-2 alert alert-danger rounded-pill">Masukkan No. Telp</div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">PROVINSI </label>
                                    <select class="form-control rounded-pill list-form-item" v-model="state.province_id" @change="getCities">
                                        <option value="">-- pilih provinsi --</option>
                                        <option v-for="province in state.provinces" v-bind:key="province.id" v-bind:value="province.province_id">
                                            {{ province.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold"> KOTA / KABUPATEN </label>
                                    <select class="form-control rounded-pill list-form-item" v-model="state.city_id" @change="getCourier">
                                        <option value="">-- pilih kota --</option>
                                        <option v-for="city in state.cities" v-bind:key="city.id" v-bind:value="city.city_id">
                                            {{ city.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.courier">
                                    <label class="font-weight-bold"> KURIR PENGIRIMAN </label>
                                    <br />

                                    <div class="form-check form-check-inline row w-100 mx-auto">
                                        <label class="form-check-label font-weight-bold badge badge-pill col-4 py-2" for="ongkos_kirim-jne"
                                            style="border-radius: 2rem 0 0 2rem; background: #e2e8f0">
                                            <input type="radio" name="courier" id="ongkos_kirim-jne" class="form-check-input select-courier" value="jne"
                                                v-model="state.courier_type" @change="getOngkir" />
                                            JNE
                                        </label>

                                        <label class="form-check-label font-weight-bold badge badge-pill col-4 py-2" for="ongkos_kirim-tiki"
                                            style="border-radius: 0; background: #e2e8f0">
                                            <input type="radio" name="courier" id="ongkos_kirim-tiki" class="form-check-input select-courier" value="tiki"
                                                v-model="state.courier_type" @change="getOngkir" />
                                            TIKI
                                        </label>

                                        <label class="form-check-label font-weight-bold badge badge-pill col-4 py-2" for="ongkos_kirim-pos"
                                            style="border-radius: 0 2rem 2rem 0; background: #e2e8f0">
                                            <input type="radio" name="courier" id="ongkos_kirim-pos" class="form-check-input select-courier" value="pos"
                                                v-model="state.courier_type" @change="getOngkir" />
                                            POS
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group" v-if="state.cost">
                                    <hr />
                                    <label class="font-weight-bold">SERVICE KURIR</label>
                                    <br />
                                    <div v-for="value in state.costs" v-bind:key="value.service" class="form-check form-check-inline">
                                        <label class="form-check-label font-weight-normal p-1" v-bind:for="value.service">
                                            <input class="form-check-input" type="radio" name="cost" v-bind:id="value.service"
                                                v-bind:value="value.cost[0].value + '|' + value.service" v-model="state.costService" @change="getCostService" />
                                            <small>{{ value.service }} - Rp.
                                                {{ moneyFormat(value.cost[0].value) }}
                                            </small>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="font-weight-bold">ALAMAT LENGKAP</label>
                                    <textarea class="form-control list-form-item" style="border-radius: 1.5rem" id="alamat" rows="3"
                                        placeholder="Contoh:&#10;Jl. Langsep no. x, Ds. Tenggulunan, Candi, Sidoarjo 61271" v-model="state.address"></textarea>
                                    <div v-if="validation.address" class="mt-2 alert alert-danger rounded-pill">Masukkan Alamat Lengkap</div>
                                </div>
                            </div>

                            <div v-if="state.buttonCheckout" class="col-md-12">
                                <button @click.prevent="checkout" class="btn btn-light btn-lg btn-block rounded-pill" style="background: #3f7b70; color: white">
                                    CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- end ongkos kirim -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import Api from '@/api/Api';
import { useRouter } from 'vue-router';
export default {
    name: 'CartComponent',

    setup() {
        const store = useStore();
        const router = useRouter();

        onMounted(() => {
            store.dispatch('cart/cartCount');
            store.dispatch('cart/cartTotal');
            store.dispatch('cart/cartWeight');
        });

        const carts = computed(() => {
            return store.getters['cart/getCart'];
        });

        const cartTotal = computed(() => {
            return store.state.cart.cartTotal;
        });

        const cartWeight = computed(() => {
            return store.state.cart.cartWeight;
        });

        function removeCart(cart_id) {
            store.dispatch('cart/removeCart', cart_id);
        }

        const state = reactive({
            name: '', // <-- state name
            phone: '', // <-- state phone
            address: '', // <-- state address
            provinces: [], // <-- state provinces
            province_id: '', // <-- state ID province
            cities: [], // <-- state cities
            city_id: '', // <-- state ID City
            courier: false, // <-- state pilihan kurir
            courier_type: '', // <-- state jenis kurir
            cost: false, // <-- state cost kurir
            costs: '', // <-- state costs kurir
            costService: '', // <-- state get data cost dan service pengiriman
            courier_cost: 0, // <-- state untuk menyimpan cost kurir
            courier_service: '', // <- state untuk menyimpan service kurir
            buttonCheckout: false, // <-- state button checkout
            grandTotal: 0, // <-- state untuk grand total
            note: '', // <- state note
        });

        const validation = reactive({
            name: false, // <-- validation name
            phone: false, // <-- validation phone
            address: false, // <-- validation address
            note: false, // <- validation note
        });

        const provinces = onMounted(() => {
            Api.get('/rajaongkir/provinces')
                .then((response) => {
                    state.provinces = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        function getCities() {
            Api.get('/rajaongkir/cities', {
                params: {
                    province_id: state.province_id,
                },
            })
                .then((response) => {
                    state.cities = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        function getCourier() {
            state.courier = true;
        }

        function getOngkir() {
            if (cartWeight.value == 0) {
                alert('Silahkan pilih produk terlebih dahulu!');
                return;
            }

            Api.post('/rajaongkir/checkOngkir', {
                city_destination: state.city_id,
                weight: cartWeight.value,
                courier: state.courier_type,
            })
                .then((response) => {
                    state.cost = true;

                    state.costs = response.data.data.costs;
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        function getCostService() {
            let shipping = state.costService.split('|');

            state.courier_cost = shipping[0];
            state.courier_service = shipping[1];

            const token = store.state.auth.token;

            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            Api.get('/cart/total').then((response) => {
                state.grandTotal = parseInt(response.data.total) + parseInt(state.courier_cost);
            });

            state.buttonCheckout = true;
        }

        function checkout() {
            if (state.name && state.phone && state.address && cartWeight.value && state.note) {
                let data = {
                    name: state.name,
                    phone: state.phone,
                    province_id: state.province_id,
                    city_id: state.city_id,
                    courier_type: state.courier_type,
                    courier_service: state.courier_service,
                    courier_cost: state.courier_cost,
                    weight: cartWeight.value,
                    address: state.address,
                    grandTotal: state.grandTotal,
                    note: state.note,
                };

                store
                    .dispatch('cart/checkout', data)
                    .then((response) => {
                        router.push({
                            name: 'detail_order',
                            params: {
                                snap_token: response[0].snap_token,
                            },
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            if (!state.name) {
                validation.name = true;
            }
            if (!state.phone) {
                validation.phone = true;
            }
            if (!state.address) {
                validation.address = true;
            }
            if (!state.note) {
                validation.note = true;
            }
        }

        return {
            carts, // <-- state carts
            cartTotal, // <-- state cartTotal
            cartWeight, // <-- state cartWeight
            removeCart, // <-- method removeCart
            state, // <-- state form
            validation, // <-- state validation
            provinces, // <-- data provinces
            getCities, // <-- data city
            getCourier, // <-- get data courier
            getOngkir, // <-- get data ongkir
            getCostService, // <-- get cost dan service shipping
            checkout, // <-- method checkout
        };
    },
};
</script>
