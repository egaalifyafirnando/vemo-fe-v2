import Api from '@/api/Api';

const category = {
    // NAMESPACE
    namespaced: true,

    // STATE
    state: {
        categories: [],
        productInCategory: [],
    },

    // MUTATIONS
    mutations: {
        GET_CATEGORIES(state, categories) {
            state.categories = categories;
        },

        PRODUCT_IN_CATEGORY(state, products) {
            state.productInCategory = products;
        },
    },

    // ACTIONS
    actions: {
        getCategories({ commit }) {
            Api.get('/categories')
                .then((response) => {
                    commit('GET_CATEGORIES', response.data.categories);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        getProductInCategory({ commit }, slug) {
            Api.get(`/category/${slug}`)
                .then((response) => {
                    commit('PRODUCT_IN_CATEGORY', response.data.product);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    // GETTERS
    getters: {},
};

export default category;
