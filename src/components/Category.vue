<template>
    <div class="card border-0 shadow rounded">
        <div class="card-body">
            <h5 class="font-weight-bold"><i class="fa fa-shopping-bag"></i> KATEGORI</h5>
            <hr />

            <ul class="list-group">
                <div v-if="categories.length > 0">
                    <router-link v-bind:to="{ name: 'detail_category', params: { slug: category.slug } }" v-for="category in categories" v-bind:key="category.id"
                        class="list-group-item font-weight-bold text-decoration-none text-dark rounded-pill"> <img v-bind:src="category.image" style="width: 35px" />
                        {{ category.name }}
                    </router-link>
                </div>

                <div v-else>
                    <div v-for="loader in ContentLoader" v-bind:key="loader">
                        <div>
                            <ContentLoader viewBox="0 0 135 25" :speed="2" primaryColor="#fafafa" secondaryColor="#f1f1f1">
                                <rect x="1" y="2" rx="9" ry="9" width="130" height="19" />
                            </ContentLoader>
                        </div>
                    </div>
                </div>

                <router-link v-bind:to="{ name: 'categories' }" class="list-group-item text-center active shadow-sm font-weight-bold text-decoration-none rounded-pill">
                    LAINNYA <i class="fa fa-long-arrow-alt-right"></i>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'CategoryComponent',

    components: {
        ContentLoader,
    },

    setup() {
        const store = useStore();

        onMounted(() => {
            // RUN ACTION "getCategories" IN MODULE "CATEGORY"
            store.dispatch('category/getCategories');
        });

        const categories = computed(() => {
            // GET VALUE "categories" FROM STATE IN MODULE "CATEGORY"
            return store.state.category.categories;
        });

        return {
            categories,
            ContentLoader: 3,
        };
    },
};
</script>
