<template>
    <div class="card border-0 rounded shadow">
        <div class="card-body">
            <h5 class="font-weight-bold">MAIN MENU</h5>
            <hr />

            <ul class="list-group">
                <router-link v-bind:to="{ name: 'dashboard' }" class="list-group-item text-decoration-none text-dark text-uppercase rounded-pill text-center">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </router-link>

                <router-link v-bind:to="{ name: 'order' }" class="list-group-item text-decoration-none text-dark text-uppercase rounded-pill text-center">
                    <i class="fas fa-shopping-cart"></i> My Order
                </router-link>

                <a @click="logout" style="cursor: pointer" class="list-group-item text-decoration-none text-dark text-uppercase rounded-pill text-center">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </ul>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'CustomerMenuComponent',

    setup() {
        const store = useStore();
        const router = useRouter();

        function logout() {
            // RUN ACTION "logout" IN MODULE "AUTH"
            store.dispatch('auth/logout').then(() => {
                // THEN REDIRECT TO LOGIN PAGE
                router.push({ name: 'login' });
            });
        }

        return {
            store,
            router,
            logout,
        };
    },
};
</script>
