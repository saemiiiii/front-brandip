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
      dialog: false,
      onDialog: false,
      message: ``,
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
    likeProduct(productIdx) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/product/like`, {
        productIdx: `${productIdx}`
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
    },
    likeIp() {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/common/ips/like`, {
        ipIdx: `${this.$route.params.id}`
      })
          .then((res) => {
            if(res.data.data === `on`) {
              this.onDialog = true;
              this.message = `소식받기가 완료되었습니다.`;
            }
            this.getIp();
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
    },
  }
}
</script>

<template>
  <v-app>
    <div>
      <div style="position: relative">
        <IpBanner :ips="ips"/>
<!--        <v-avatar width="99" height="99" style="box-shadow: 0px 4px 4px 0px #00000040; position: absolute;bottom: -40px;left: 22px"><img src="@/assets/icons/testimg.svg"></v-avatar>-->
        <v-avatar width="99" height="99" style="box-shadow: 0px 4px 4px 0px #00000040; position: absolute;bottom: -40px;left: 22px"><img :src="ips[0]?.iconUrl"></v-avatar>
        <div style="position: absolute;left: 130px;bottom: 4px;color: #FFFFFF;font-family: Inter;font-size: 20px;font-weight: 700;">{{ ips[0]?.title }}</div>
      </div>
      <v-btn v-if="products.length === 0 && !ips[0]?.ipLikeIdx" @click="likeIp" class="mt-1 white--text" color="secondary" height="29" width="90" style="border-radius: 25px;font-family: Inter;font-size: 12px;font-weight: 800;text-align: center" elevation="0">
        <img src="@/assets/icons/ico-white-alarm.svg" alt="Icon" width="16" height="16">
        소식받기
      </v-btn>
      <v-btn v-else-if="products.length === 0 && ips[0]?.ipLikeIdx" @click="likeIp" class="mt-1 white--text" color="#BEBEBE" height="29" width="100" style="border-radius: 25px;font-family: Inter;font-size: 12px;font-weight: 800;text-align: center" elevation="0">
        <img src="@/assets/icons/ico-white-alarm.svg" alt="Icon" width="16" height="16">
        소식받기완료
      </v-btn>
    </div>
    <v-container>
      <div class="mb-20 pb-14">
        <div class="mt-10 text-left">
          <div>
            <div style="font-family: Inter;font-size: 18px;font-weight: 700;">
              {{ ips[0]?.title }} <p style="font-family: Inter;font-size: 13px;font-weight: 400;">{{
                ips[0]?.description
              }}</p>
            </div>
          </div>
          <v-row no-gutters style="justify-content: center">
            <v-col v-for="(ip, index) in products" :key="index" cols="6" class="text-center">
              <v-card elevation="0" class="pa-1 cursor-pointer" style="display: inline-block" @click.stop="$router.push(`/product/${ip.idx}`).catch(()=>{})">
                <v-img :src="ip.thumbnail" width="180" height="180" style="position: relative;border-radius: 15px"></v-img>
                <div class="cursor-pointer text-left" style="color: #000000;max-width: 180px; position: relative;" @click.stop="$router.push(`/product/${ip.idx}`).catch(()=>{})">
                  <div style="font-family: Inter; font-size: 18px; font-weight: 700;" class="mt-2">
                    {{ ip.title }}
                  </div>
                  <div style="font-family: Inter; font-size: 15px; font-weight: 400;">
                    {{ ip.description }}
                  </div>
                  <div style="font-family: Inter; font-size: 15px; font-weight: 700; color: #000000;" class="mb-2">
                    {{ ip.total?.toLocaleString() }}원
                  </div>
                  <div style="position: absolute; bottom: 45px; right: 0;" @click.stop="likeProduct(ip.idx)">
                    <img src="@/assets/icons/ico-like-gray.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-if="!ip?.productLikeIdx"/>
                    <img src="@/assets/icons/ico-like-primary.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-else/>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="text-center">
        <v-dialog
            v-model="dialog"
            max-width="328"
        >
          <v-card height="163" style="border-radius: 15px">
            <v-card-title style="font-family: Inter;font-size: 20px;font-weight: 700;">
              {{ message }}
            </v-card-title>
            <v-card-actions class="mt-10">
              <v-btn
                  rounded
                  color="primary"
                  width="100%"
                  @click="$router.push('/login').catch(()=>{})"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog
            v-model="onDialog"
            max-width="328"
        >
          <v-card height="163" style="border-radius: 15px">
            <v-card-title style="font-family: Inter;font-size: 20px;font-weight: 700;">
              {{ message }}
            </v-card-title>
            <v-card-actions class="mt-10">
              <v-btn
                  rounded
                  color="primary"
                  width="100%"
                  @click="onDialog = false"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>