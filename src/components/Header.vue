<template>
    <header class="section-header">
        <section class="header-main border-bottom">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-lg navbar-dark">
                    <router-link v-bind:to="{ name: 'home' }" class="text-decoration-none" data-abc="true">
                        <span class="logo">
                            <img style="height: 40px;" src="@/assets/brand.png" />
                        </span>
                    </router-link>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item d-lg-none">
                                <router-link v-bind:to="{ name: 'home' }" class="nav-link" data-abc="true">
                                    <i class="fa fa-home" aria-hidden="true"></i> Home
                                </router-link>
                            </li>
                            <li class="nav-item d-lg-none">
                                <router-link v-bind:to="{ name: 'categories' }" class="nav-link">
                                    <i class="fa fa-shopping-bag"></i> Categories
                                </router-link>
                            </li>
                            <li class="nav-item d-lg-none">
                                <router-link v-bind:to="{ name: 'login' }" v-if="!isLoggedIn" class="nav-link">
                                    <i class="fa fa-user-circle"></i> Login
                                </router-link>
                            </li>
                            <li class="nav-item d-lg-none" d-lg-none>
                                <router-link v-bind:to="{ name: 'login' }" v-if="isLoggedIn" class="nav-link">
                                    <i class="fa fa-store-alt"></i> Dashboard
                                </router-link>
                            </li>
                            <li class="nav-item d-lg-none">
                                <router-link v-bind:to="{ name: 'cart' }" class="nav-link">
                                    <i class="fa fa-shopping-cart"></i>
                                    Cart: {{ cartCount }} | Rp.
                                    {{ moneyFormat(cartTotal) }}
                                </router-link>
                            </li>
                        </ul>
                        <div class="d-none d-md-flex justify-content-between search-bar badge badge-pill py-0" style="width:40%;">
                            <input type=" text" v-model="keywords" class="form-control search-form border-0 bg-transparent my-auto" style="width: 90%;" name="q"
                                placeholder="mau belanja apa hari ini ?" @keypress.enter="search" />
                            <div class="input-group-append">
                                <button class="btn search-button border-0 bg-transparent" @click="search" type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </div>
                        </div>

                        <div class="d-none d-lg-flex justify-content-end search-bar ml-2">
                            <div class="cart-header">
                                <div class="cart-header">
                                    <router-link v-bind:to="{ name: 'cart' }" class="badge badge-pill py-2">
                                        <i class="fa fa-shopping-cart"></i>
                                        {{ cartCount }} | Rp.
                                        {{ moneyFormat(cartTotal) }}
                                    </router-link>
                                </div>
                            </div>

                            <div class="account">
                                <router-link v-bind:to="{ name: 'login' }" v-if="!isLoggedIn" class="ml-2">
                                    <i class="fa fa-user-circle" style="color: white; font-size: 37px; line-height: 35px"></i>
                                </router-link>
                                <router-link v-bind:to="{ name: 'dashboard' }" v-else class="ml-3">
                                    <i class="fa fa-store-alt" style="color: white; font-size: 37px; line-height: 35px"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    </header>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'HeaderComponent',

    setup() {
        const store = useStore();
        const router = useRouter();

        // DECISION FOR HEADER BUTTON (ACCOUNT/DASHBOARD)
        const isLoggedIn = computed(() => {
            // GET GETTER "isLoggedIn" FROM MODULE "AUTH"
            return store.getters['auth/isLoggedIn'];
        });

        // GET VALUE "cartCount" FROM GETTERS IN MODULE "CART"
        const cartCount = computed(() => {
            return store.getters['cart/cartCount'];
        });

        // GET VALUE "cartTotal" FROM GETTERS IN MODULE "CART"
        const cartTotal = computed(() => {
            return store.getters['cart/cartTotal'];
        });

        // CHECKING "token" FROM STATE IN MODULE "AUTH"
        onMounted(() => {
            const token = store.state.auth.token;

            // IF NOT HAVE TOKEN, RETURN
            if (!token) {
                return;
            }
            // RUN ACTION "cartCount" IN MODULE "CART"
            store.dispatch('cart/cartCount');
            // RUN ACTION "cartTotal" IN MODULE "CART"
            store.dispatch('cart/cartTotal');
        });

        // feature search
        let keywords = ref('');
        function search() {
            store.dispatch('product/getSearchProduct', keywords.value);
            router.push({ name: 'search' });
        }

        return {
            store,
            isLoggedIn,
            cartCount,
            cartTotal,
            keywords,
            search,
        };
    },
};
</script>
