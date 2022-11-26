<template>
    <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner shadow">
            <div v-if="sliders.length > 0">
                <div class="carousel-item" v-for="(slider, id) in sliders" v-bind:class="{ active: id == 0 }" v-bind:key="slider.id">
                    <img v-bind:src="slider.image" class="d-block w-100 rounded-lg" />
                </div>
            </div>
            <div v-else>
                <div class="card border-0 rounded-lg" v-for="loader in ContentLoader" v-bind:key="loader">
                    <div class="card-body">
                        <ContentLoader />
                    </div>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'SliderComponent',

    components: {
        ContentLoader,
    },

    setup() {
        const store = useStore();

        onMounted(() => {
            // RUN ACTION "getSliders" IN MODULE "SLIDER"
            store.dispatch('slider/getSliders');
        });

        // GET VALUE "sliders" FROM STATE IN MODULE "SLIDER"
        const sliders = computed(() => {
            return store.state.slider.sliders;
        });

        return {
            store,
            sliders,
            ContentLoader: 1,
        };
    },
};
</script>
