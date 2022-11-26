import Api from '@/api/Api';

const slider = {
    // NAMESPACE
    namespaced: true,

    // STATE
    state: {
        sliders: [],
    },

    // MUTATIONS
    mutations: {
        GET_SLIDERS(state, sliders) {
            state.sliders = sliders;
        },
    },

    // ACTIONS
    actions: {
        getSliders({ commit }) {
            Api.get('/sliders')
                .then((response) => {
                    commit('GET_SLIDERS', response.data.sliders);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    // GETTERS
    getters: {},
};

export default slider;
