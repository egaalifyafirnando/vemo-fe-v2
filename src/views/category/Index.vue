<template>
    <div class="container-fluid mb-5 mt-4">
        <div v-if="categories.length > 0" class="row">
            <div v-for="category in categories" v-bind:key="category.id" class="col-md-2 col-sm-4 col-6 mb-3" data-aos="fade-up" data-aos-once="true">
                <router-link v-bind:to="{ name: 'detail_category', params: { slug: category.slug } }">
                    <div class="card h-100 border-0 rounded shadow">
                        <div class="card-body text-center">
                            <img v-bind:src="category.image" loading="lazy" style="width: 100px" />
                            <hr />
                            <label class="font-weight-bold text-dark">{{ category.name }}</label>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-md-2 col-sm-4 col-6 mb-3" v-for="loader in ContentLoader" v-bind:key="loader">
                <div class="card p-3 rounded-lg border-0 shadow">
                    <ContentLoader viewBox="0 0 135 140" :speed="2" primaryColor="#fafafa" secondaryColor="#f1f1f1" data-aos="fade-up" data-aos-once="true">
                        <rect x="7" y="3" rx="8" ry="8" width="124" height="128" />
                    </ContentLoader>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
export default {
    name: 'CategoryIndexComponent',

    components: {
        ContentLoader,
    },

    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch('category/getCategories');
        });

        const categories = computed(() => {
            return store.state.category.categories;
        });

        return {
            store,
            categories,
            ContentLoader: 6,
        };
    },
};
</script>
