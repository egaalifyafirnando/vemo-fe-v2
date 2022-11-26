import Api from '@/api/Api';

const cart = {
    // NAMESPACE
    namespaced: true,

    // STATE
    state: {
        cart: [],
        cartTotal: 0,
        cartWeight: 0,
    },

    // MUTATIONS
    mutations: {
        // UPDATE STATE "cart" FROM RESPONSE VALUE PRODUCT
        GET_CART(state, product) {
            state.cart = product;
        },

        // UPDATE STATE "cartTotal" FROM RESPONSE VALUE TOTAL
        TOTAL_CART(state, total) {
            state.cartTotal = total;
        },

        // UPDATE STATE "cartWeight" FROM RESPONSE VALUE WEIGHT
        CART_WEIGHT(state, weight) {
            state.cartWeight = weight;
        },

        // UPDATE STATE TO EMPTY VALUE
        CLEAR_CART(state) {
            state.cart = [];
            state.cartTotal = 0;
            state.cartWeight = 0;
        },
    },

    // ACTIONS
    actions: {
        addToCart({ commit }, { product_id, price, quantity, weight }) {
            // GET TOKEN AND USER FROM LOCAL STORAGE
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            // SET DEFAULT HEADER AXIOS WITH THE TOKEN
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // SEND DATA TO SERVER WITH METHOD "POST"
            Api.post('/cart', {
                product_id: product_id,
                price: price,
                quantity: quantity,
                weight: weight,
                customer_id: user.id,
            }).then(() => {
                // AFTER SEND DATA TO SERVER, THEN GET DATA CART AND TOTAL CART
                Api.get('/cart').then((response) => {
                    // COMMIT RESPONSE TO MUTATIONS
                    commit('GET_CART', response.data.cart);
                });

                Api.get('/cart/total').then((response) => {
                    // COMMIT RESPONSE TO MUTATIONS
                    commit('TOTAL_CART', response.data.total);
                });
            });
        },

        cartCount({ commit }) {
            // GET TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem('token');

            // SET DEFAULT HEADER AXIOS WITH THE TOKEN
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // GET DATA CART
            Api.get('/cart').then((response) => {
                // COMMIT RESPONSE TO MUTATIONS
                commit('GET_CART', response.data.cart);
            });
        },

        cartTotal({ commit }) {
            // GET TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem('token');

            // SET DEFAULT HEADER AXIOS WITH THE TOKEN
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // GET DATA TOTAL CART
            Api.get('/cart/total').then((response) => {
                // COMMIT RESPONSE TO MUTATIONS
                commit('TOTAL_CART', response.data.total);
            });
        },

        cartWeight({ commit }) {
            // GET TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem('token');

            // SET DEFAULT HEADER AXIOS WITH THE TOKEN
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // GET DATA TOTAL WEIGHT
            Api.get('/cart/totalWeight').then((response) => {
                // COMMIT RESPONSE TO MUTATIONS
                commit('CART_WEIGHT', response.data.total);
            });
        },

        removeCart({ commit }, cart_id) {
            // GET TOKEN FROM LOCAL STORAGE
            const token = localStorage.getItem('token');

            // SET DEFAULT HEADER AXIOS WITH THE TOKEN
            Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // SEND DATA TO SERVER WITH METHOD "POST"
            Api.post('/cart/remove', {
                cart_id: cart_id,
            }).then(() => {
                // AFTER REMOVE DATA CART, THEN GET DATA CART, TOTAL CART, ADN TOTAL CART WEIGHT
                Api.get('/cart').then((response) => {
                    commit('GET_CART', response.data.cart);
                });

                Api.get('/cart/total').then((response) => {
                    commit('TOTAL_CART', response.data.total);
                });

                Api.get('cart/totalWeight').then((response) => {
                    commit('CART_WEIGHT', response.data.total);
                });
            });
        },

        checkout({ commit }, data) {
            // CREATE NEW PROMISE TO HANDLE CHECKOUT
            return new Promise((resolve, reject) => {
                // SEND DATA TO SERVER WITH METHOD "POST"
                Api.post('/checkout', {
                    courier: data.courier_type,
                    service: data.courier_service,
                    cost: data.courier_cost,
                    weight: data.weight,
                    name: data.name,
                    phone: data.phone,
                    province: data.province_id,
                    city: data.city_id,
                    address: data.address,
                    grand_total: data.grandTotal,
                    note: data.note,
                })
                    .then((response) => {
                        // RESOLVE WITH RESPONSE
                        resolve(response.data);

                        // AFTER CHECKOUT, REMOVE ALL CART
                        Api.post('/cart/removeAll')
                            .then(() => {
                                commit('CLEAR_CART');
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
    },

    // GETTERS
    getters: {
        // GET DATA CART
        getCart(state) {
            return state.cart;
        },

        // COUNT TOTAL CART LENGTH
        cartCount(state) {
            return state.cart.map((cart) => cart.quantity).reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        },

        // GET TOTAL CART
        cartTotal(state) {
            return state.cartTotal;
        },
    },
};

export default cart;
