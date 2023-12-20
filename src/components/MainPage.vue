<script>
import axios from "axios";
import Banner from "@/components/common/Banner.vue";
import AddBanner from "@/components/common/AddBanner.vue";

export default {
  components: {
    Banner, AddBanner
  },
  data: () => ({
    ips: [],
    limited: [],
    upcoming: [],
    count: 10,
    page: 0,
    t: ``,
    query: ``,
    sort: ``,
    message: ``,
    dialog: false,
  }),
  mounted() {
    this.getIps();
    this.getProduct();
  },
  methods: {
    getIps() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/ips?main=1`)
          .then(res => {
            this.ips = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getProduct() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/main`)
          .then(res => {
            this.limited = res.data.data.limited;
            this.upcoming = res.data.data.upcoming;
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
            this.getProduct();
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
    likeIpsUpcoming(idx) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/common/ips/like`, {
        ipIdx: `${idx}`
      })
          .then(() => {
            this.getProduct();
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
    <div class="mb-10">
      <Banner/>
      <div class="text-left mt-5">
        <div class="d-flex" style="overflow-x: auto;">
          <div v-for="(ip, idx) in ips" :key="idx" class="ml-2 mr-2 mb-5">
            <v-avatar width="75px" height="75px">
              <img :src="ip.iconUrl" alt="Image">
            </v-avatar>
          </div>
        </div>
        <v-container>
          <div>
            <div class="ml-1">
              <div style="font-family: Inter;font-size: 28px;font-weight: 700;">
                Exclusive <p style="font-family: Inter;font-size: 13px;font-weight: 400;">브랜딥 한정상품!</p>
              </div>
            </div>
            <!--          <hr style="border: 2px solid #000000"/>-->
            <v-row no-gutters>
              <v-col v-for="(limit, index) in limited" :key="index" cols="6" class="cursor-pointer">
                <v-card elevation="0" class="pa-1">
                  <v-img :src="limit.bannerUrl" width="180" height="180" style="position: relative;border-radius: 15px"
                         @click="$router.push(`/product/${limit.idx}`).catch(()=>{})"></v-img>
                  <div style="position: absolute; bottom: 105px; right: 0;" class="mr-2"
                       @click="likeProduct(limit.idx)">
                    <img src="@/assets/icons/ico-like-gray.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                         v-if="!limit.productLikeIdx"/>
                    <img src="@/assets/icons/ico-like-primary.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                         v-else/>
                  </div>
                  <div @click="$router.push(`/product/${limit.idx}`).catch(()=>{})">
                    <div style="font-family: Inter;font-size: 18px;font-weight: 700;" class="mt-2">
                      {{ limit.title }}
                    </div>
                    <div style="font-family: Inter;font-size: 15px;font-weight: 400;">
                      {{ limit.description }}
                    </div>
                    <div style="font-family: Inter;font-size: 15px;font-weight: 700; color: #FF1A77" class="mb-2">
                      {{ limit.total?.toLocaleString() }}원
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-btn class="mt-4 mb-10" width="100%"
                   style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 15px;font-weight: 700;"
                   elevation="0" color="primary" @click="$router.push(`/product`).catch(()=>{})">더보러 가기
            </v-btn>
          </div>
          <AddBanner/>
          <div class="mt-5">
            <div class="">
              <div style="font-family: Inter;font-size: 28px;font-weight: 700;">
                UPCOMING <p style="font-family: Inter;font-size: 13px;font-weight: 400;">곧 출시될 거에요!</p>
              </div>
            </div>
            <!--          <hr style="border: 2px solid #000000"/>-->
            <div>
              <div class="d-flex" style="overflow-x: auto;">
                <div v-for="(up, idx) in upcoming" :key="idx" class="mr-2 mb-5">
                  <v-card width="310" height="375" style="border-radius: 15px; margin-right: 10px;" elevation="0">
                    <!-- v-card의 내용을 추가하세요 -->
                    <v-img :src="up.thumbnailUrl" width="310" height="375" style="box-shadow: 0px 4px 4px 0px #00000040;">
                      <div style="position: absolute; top: 15px; right:0;" class="mr-2" @click="likeIpsUpcoming(up.ipIdx)">
                        <img src="@/assets/icons/ico-like-gray.svg" width="30" height="30" class="px-1.5 cursor-pointer"
                             v-if="!up.ipLikeIdx"/>
                        <img src="@/assets/icons/ico-like-primary.svg" width="30" height="30"
                             class="px-1.5 cursor-pointer" v-else/>
                      </div>
                      <v-card-title
                          style="position: absolute; bottom: 80px;font-family: Inter;font-size: 17px;font-weight: 700;color: #FFFFFF">
                        {{ up.title }}
                      </v-card-title>
                      <v-card-subtitle
                          style="position: absolute; bottom: 60px;font-family: Inter;font-size: 12px;font-weight: 600;color: #FFFFFF">
                        {{ up.description }}
                      </v-card-subtitle>
                      <v-card-actions>
                        <v-btn class="mt-4 ml-2" width="280" height="27"
                               style="border-radius: 25px; border: 1px; position: absolute; bottom: 20px; font-family: Inter; font-size: 12px; font-weight: 700;"
                               elevation="0" color="primary">
                          <img src="@/assets/icons/ico-white-alarm.svg" alt="Icon" width="15" height="15" class="mr-1">
                          알림 받기
                        </v-btn>
                      </v-card-actions>
                    </v-img>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </div>
    </div>
    <div class="text-center">
      <v-dialog
          v-model="dialog"
          max-width="328"
      >
        <v-card height="163" style="border-radius: 15px">
          <v-card-text style="font-family: Inter;font-size: 20px;font-weight: 700;" class="mt-5">
            {{ message }}
          </v-card-text>
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
  </v-app>
</template>
