<template>
    <div>
        <div class="container-fluid mt-3">
            <div class="row">
                <div class="col-md-9 mb-4">
                    <!-- component Slider -->
                    <Slider data-aos="fade-up" data-aos-once="true" />
                </div>

                <div class="col-md-3 mb-4">
                    <!-- component Category -->
                    <Category data-aos="fade-up" data-aos-once="true" />
                </div>
            </div>
        </div>
        <!-- search -->
        <div class="container-fluid search-mini">
            <div class="row">
                <div class="col input-group mx-auto">
                    <input type="text" v-model="keywords" class="form-control search-form shadow" style="width: 10%; border: 1px solid #ffffff" name="q"
                        placeholder="mau belanja apa hari ini ?" @keypress.enter="search" />
                    <div class="input-group-append shadow">
                        <button class="btn search-button" @click="search" type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-5 mt-4">
            <!-- data product -->
            <div class="col">
                <div v-if="products.length > 0" class="row">
                    <div v-for="product in products" v-bind:key="product.id" class="col-md-3 col-6 mb-3">
                        <router-link v-bind:to="{ name: 'detail_product', params: { slug: product.slug } }"
                            class="card h-100 border-0 shadow rounded-md text-decoration-none" data-aos="fade-up" data-aos-once="true">
                            <span v-if="product.discount > 0" class="ribbon"></span>
                            <div class="card-img">
                                <img v-bind:src="product.image" loading="lazy" class="w-100"
                                    style="height: 15em; object-fit: cover; border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem" />
                            </div>
                            <div class="card-body" style="padding: 1rem">
                                <div class="card-title font-weight-bold text-dark" style="font-size: .8rem">
                                    <span v-if="product.title.length < 29" class="title-card">
                                        {{ product.title }}
                                    </span>
                                    <span v-else class="title-card">
                                        {{ product.title.substring(0, 29) + '...' }}
                                    </span>
                                </div>

                                <div class="font-weight-bold text-dark" style="font-size: .8rem">Rp. {{ moneyFormat(calculateDiscount(product)) }}</div>

                                <div v-if="product.discount > 0" class="discount">
                                    <small>
                                        <div class="row">
                                            <div class="col-8">
                                                <s class="text-muted" style="font-size: .7rem">Rp. {{ moneyFormat(product.price) }}</s>
                                            </div>
                                            <div class="col-4 d-flex justify-content-end">
                                                <span class="badge badge-pill badge-discount text-white d-flex align-items-center"> {{ product.discount }}% OFF</span>
                                            </div>
                                        </div>
                                    </small>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div v-else>
                    <div class="row">
                        <div class="col-md-3 col-6 mb-3" v-for="loader in ContentLoader" v-bind:key="loader">
                            <div class="card h-100 border-0 shadow rounded-md" data-aos="fade-up" data-aos-once="true">
                                <div class="card-body" style="padding: 1rem">
                                    <ContentLoader viewBox="0 0 150 175" :speed="2" primaryColor="#fafafa" secondaryColor="#f1f1f1">
                                        <!-- <rect x="21" y="178" rx="10" ry="10" width="111" height="19" /> -->
                                        <rect x="7" y="149" rx="4" ry="4" width="138" height="9" />
                                        <rect x="6" y="3" rx="8" ry="8" width="139" height="136" />
                                        <rect x="7" y="162" rx="4" ry="4" width="71" height="8" />
                                    </ContentLoader>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Category from '@/components/Category';
import Slider from '@/components/Slider';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { ContentLoader } from 'vue-content-loader';

export default {
    name: 'HomeComponent',

    components: {
        Category,
        Slider,
        ContentLoader,
    },

    setup() {
        const store = useStore();
        const router = useRouter;

        onMounted(() => {
            store.dispatch('product/getProducts');
        });

        const products = computed(() => {
            return store.state.product.products;
        });

        // feature search
        let keywords = ref('');
        function search() {
            store.dispatch('product/getSearchProduct', keywords.value);
            router.push('/search');
        }

        return {
            store,
            products,
            keywords,
            search,
            ContentLoader: 4,
        };
    },
};
</script>
