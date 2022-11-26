<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div v-if="validation.message" class="mt-2 alert alert-danger">
                    {{ validation.message }}
                </div>

                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h4>LOGIN</h4>
                        <hr />

                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label>Email Address</label>
                                <input type="email" v-model="user.email" class="form-control rounded-pill list-form-item" placeholder="Email Address" />
                            </div>

                            <div v-if="validation.email" class="mt-2 alert alert-danger rounded-pill">
                                {{ validation.email[0] }}
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="user.password" class="form-control rounded-pill list-form-item" placeholder="Password" />
                            </div>

                            <div v-if="validation.password" class="mt-2 alert alert-danger rounded-pill">
                                {{ validation.password[0] }}
                            </div>

                            <button type="submit" class="btn btn-light btn-md mt-3 btn-block shadow-md text-white rounded-pill" style="background: #cf1b1b">LOGIN</button>
                        </form>
                    </div>
                </div>
                <div class="register mt-3 text-center">
                    <p>Belum punya akun ? <router-link v-bind:to="{ name: 'register' }">Daftar Sekarang !</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'LoginComponent',

    setup() {
        // STATE USER
        const user = reactive({
            email: '',
            password: '',
        });

        // STATE VALIDATION
        const validation = ref([]);

        const store = useStore();
        const router = useRouter();

        function login() {
            // DEFINE VARIABLE
            let email = user.email;
            let password = user.password;

            // RUN ACTION "login" IN MODULE "AUTH" STORE VUEX
            store
                .dispatch('auth/login', {
                    email,
                    password,
                })
                .then(() => {
                    router.push({ name: 'dashboard' });
                })
                .catch((error) => {
                    validation.value = error;
                });
        }

        // RETURN STATES AND METHOD
        return {
            user,
            validation,
            login,
        };
    },
};
</script>
