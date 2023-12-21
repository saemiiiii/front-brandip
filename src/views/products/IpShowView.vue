<script>
import axios from "axios";
import IpBanner from "@/components/common/IpBanner.vue";

export default {
  components: {
    IpBanner
  },
  data() {
    return {
      ips: [],
      products: [],
    }
  },
  mounted() {
    this.getIp();
    this.getIpProduct();
  },
  methods: {
    getIp() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/ips?ipIdx=${this.$route.params.id}`)
          .then(res => {
            this.ips = res.data.data;
            console.log(this.ips);
          })
          .catch(err => {
            console.error(err);
          })
    },
    getIpProduct() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product?ipIdx=${this.$route.params.id}`)
          .then(res => {
            this.products = res.data.data.products;
          })
          .catch(err => {
            console.error(err);
          })
    },
    likeIp() {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/common/ips/like`, {
        ipIdx: `${this.$route.params.id}`
      })
          .then(() => {
            this.getIpProduct();
          })
          .catch(err => {
            if (err.response.data.resultCode === 403) {
              this.dialog = true;
              this.message = err.response.data.message;
              return false;
            } else {
              console.error(err)
            }
          })
    }
  }
}
</script>

<template>
  <v-app>
      <div>
        <div style="position: relative">
        <IpBanner :ips="ips"/>
          <v-avatar width="99" height="99" style="box-shadow: 0px 4px 4px 0px #00000040; position: absolute;bottom: -30px;left: 22px"><img :src="ips[0]?.iconUrl"></v-avatar>
        </div>
        <div class="mt-10 text-left">
          <div>
            <div style="font-family: Inter;font-size: 18px;font-weight: 700;">
              {{ ips[0]?.title }} <p style="font-family: Inter;font-size: 13px;font-weight: 400;">{{ ips[0]?.description }}</p>
            </div>
          </div>
          <v-row no-gutters>
            <v-col v-for="(ip, index) in products" :key="index" cols="6" class="cursor-pointer">
              <v-card elevation="0" class="pa-1">
                <v-img :src="ip.bannerUrl" width="180" height="180" style="position: relative;border-radius: 15px"
                       @click="$router.push(`/product/${ip.idx}`).catch(()=>{})"></v-img>
                <div style="position: absolute; bottom: 105px; right: 0;" class="mr-2"
                     @click="likeIp(ip.idx)">
                  <img src="@/assets/icons/ico-like-gray.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                       v-if="!ip.ipLikeIdx"/>
                  <img src="@/assets/icons/ico-like-primary.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                       v-else/>
                </div>
                <div @click="$router.push(`/product/${ip.idx}`).catch(()=>{})">
                  <div style="font-family: Inter;font-size: 18px;font-weight: 700;" class="mt-2">
                    {{ ip.title }}
                  </div>
                  <div style="font-family: Inter;font-size: 15px;font-weight: 400;">
                    {{ ip.description }}
                  </div>
                  <div style="font-family: Inter;font-size: 15px;font-weight: 700; color: #FF1A77" class="mb-2">
                    {{ ip.total?.toLocaleString() }}원
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    <v-container>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>