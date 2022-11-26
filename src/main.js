import { createApp } from 'vue';
import App from './App.vue';

// IMPORT ROUTER FROM FOLDER ROUTER
import router from './router';
// IMPORT VUEX FROM FOLDER STORE
import store from './store';

const app = createApp(App);

// USE ROUTER
app.use(router);
// USE VUEX
app.use(store);

// DEFINE MIXINS FOR GLOBAL FUNCTION
app.mixin({
    methods: {
        // MONEY FORMAT THOUSANDS
        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
                thousands = reverse.match(/\d{1,3}/g);

            thousands = thousands.join('.').split('').reverse().join('');
            return thousands;
        },

        // CALCULATE DISCOUNT
        calculateDiscount(product) {
            return product.price - (product.price * product.discount) / 100;
        },

        // money format
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        },
    },
});

app.mount('#app');
