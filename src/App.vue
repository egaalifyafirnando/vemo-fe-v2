<template>
    <div>
        <HeaderComponent />
        <router-view />
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '@/components/Header';
import FooterComponent from '@/components/Footer';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Api from '@/api/Api';

export default {
    name: 'AppComponent',

    components: {
        HeaderComponent,
        FooterComponent,
    },

    // trick agar redirect ke login saat error 401
    setup() {
        const router = useRouter();
        const store = useStore();
        const token = localStorage.getItem('token');
        Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        Api.get('/user')
            .then(() => {
                console.log('Authenticated.');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    if (token === null) {
                        return router.push({ name: 'login' });
                    }
                } else {
                    console.log(error.response.data.message);
                }
            });
        return {
            store,
        };
    },
};
</script>
