<script>
import ProductBanner from "@/components/common/ProductBanner.vue";
import axios from "axios";
export default {
  components: {
    ProductBanner
  },
  data() {
    return {
      products: [],
      ips: [],
      isScrolled: false,
      ipIdx: 0,
      title: `전체보기`,
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.getProduct();
    this.getIps();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    getProduct() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product?ipIdx=${this.ipIdx}`)
          .then(res => {
            this.products = res.data.data.products;
          })
          .catch(err => {
            console.error(err);
          })
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      this.isScrolled = scrollPosition > 50; // Adjust the threshold as needed
    },
    getIps() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/ips?main=1`)
          .then(res => {
            this.ips = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getIpProduct(ip) {
      this.ipIdx = ip.ipIdx;
      this.title = ip.title;
      this.getProduct();
    }
  }
}
</script>

<template>
  <v-app>
    <div>
      <div
          style="text-align: left; display: flex; position: fixed; z-index: 9; background-color: white; width: 100%; transition: background-color 0.3s ease;"
          :style="{ backgroundColor: isScrolled ? 'white' : 'transparent' }"
      >
        <div class="d-flex" style="overflow-x: auto;">
          <div v-for="(ip, idx) in ips" :key="idx" class="ma-2">
            <v-avatar width="75px" height="75px" style="border: 2px solid #000" @click="getIpProduct(ip)" class="cursor-pointer">
              <img :src="ip.iconUrl" alt="Image">
            </v-avatar>
          </div>
        </div>
      </div>
    </div>
    <ProductBanner />
    <v-container>
      <div>
        <v-row no-gutters>
          <v-col cols="12" class="mt-10 mb-5" style="font-family: Inter;font-size: 28px;font-weight: 700;text-align: left">{{ title }}</v-col>
          <v-col v-for="(product, index) in products" :key="index" cols="6" class="cursor-pointer">
            <v-card elevation="0" class="pa-1 text-left">
              <v-img :src="product?.bannerUrl" width="180" height="180" style="position: relative;border-radius: 15px;"
                     @click="$router.push(`/product/${product.idx}`)"></v-img>
              <div style="position: absolute; bottom: 105px; right: 0;" class="mr-2"
                   @click="likeProduct(product.idx)">
                <img src="@/assets/icons/ico-like-gray.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                     v-if="!product?.productLikeIdx"/>
                <img src="@/assets/icons/ico-like-primary.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                     v-else/>
              </div>
              <div @click="$router.push(`/product/${product.idx}`)">
                <div style="font-family: Inter;font-size: 18px;font-weight: 700;" class="mt-2">
                  {{ product?.title }}
                </div>
                <div style="font-family: Inter;font-size: 15px;font-weight: 400;">
                  {{ product?.description }}
                </div>
                <div style="font-family: Inter;font-size: 15px;font-weight: 700; color: #FF1A77" class="mb-2">
                  {{ product?.total?.toLocaleString() }}원
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>