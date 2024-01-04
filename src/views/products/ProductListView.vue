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
      // this.$router.push(`/ip/${ip.ipIdx}`);
    }
  }
}
</script>

<template>
  <v-app>
    <div>
      <div
          style="text-align: left; display: flex; position: fixed; z-index: 9; background-color: white; width: 100%; transition: background-color 0.3s ease;"
          :style="{ backgroundColor: isScrolled ? '#FFFFFF' : 'transparent'}" class="fill-width"
      >
        <div class="d-flex" style="overflow-x: auto;">
          <div v-for="(ip, idx) in ips" :key="idx" class="ma-2">
            <v-avatar width="75px" height="75px" @click="getIpProduct(ip)" class="cursor-pointer">
              <img :src="ip.iconUrl" alt="Image">
            </v-avatar>
          </div>
        </div>
      </div>
    </div>
    <ProductBanner />
    <v-container>
      <div class="mb-20 pb-14">
        <v-row no-gutters style="justify-content: center; align-items: center;">
          <v-col cols="12" class="mt-10 mb-5" style="font-family: Inter;font-size: 28px;font-weight: 700;text-align: left">{{ title }}</v-col>
          <v-col v-for="(product, index) in products" :key="index" cols="6" class="cursor-pointer">
            <v-card elevation="0" class="text-left">
              <v-img :src="product?.thumbnail" width="180" height="180" style="border-radius: 15px;"
                     @click="$router.push(`/product/${product.idx}`).catch(()=>{})"></v-img>
              <div @click.stop="$router.push(`/product/${product.idx}`).catch(()=>{})" class="cursor-pointer" style="color: #000000;max-width: 200px; position: relative;">
                <div style="font-family: Inter; font-size: 18px; font-weight: 700;" class="mt-2">
                  {{ product.title }}
                </div>
                <div style="font-family: Inter; font-size: 15px; font-weight: 400;">
                  {{ product.description }}
                </div>
                <div style="font-family: Inter; font-size: 15px; font-weight: 700; color: #FFFFFF;" class="mb-2">
                  {{ product.total?.toLocaleString() }}원
                </div>
                <div style="position: absolute; bottom: 45px; right: 10px;" @click.stop="likeProduct(product.idx)">
                  <img src="@/assets/icons/ico-like-gray.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-if="!product?.productLikeIdx"/>
                  <img src="@/assets/icons/ico-like-primary.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-else/>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<style>
.fill-width {
  @media screen and (max-width: 1024px) {
    width: 100% !important;
    left: 0 !important;
  }
  width: 460px !important;
  left: 50% !important;
}
</style>