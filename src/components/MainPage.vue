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
    likeProduct(product) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/product/like`, {
        productIdx: `${product.idx}`
      })
          .then(() => {
            product.productLikeIdx = !product.productLikeIdx;
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
    },
    calculateCardHeight(index) {
      // Assume that you want to have a base height of 200px and add 50px for each even-indexed item
      const baseHeight = 190;
      const additionalHeight = index % 3 === 0 ? 120 : 0;
      return `${baseHeight + additionalHeight}px`;
    },
  }
}
</script>
<template>
  <v-app style="background-color: #242424;">
    <div>
      <Banner/>
      <v-container>
        <div class="text-left" style="margin-left: 5px; margin-right: 5px;">
          <div class="d-flex" style="overflow-x: auto; margin-top: -10px;">
            <div v-for="(ip, idx) in ips" :key="idx" class="ml-2 mr-2">
              <v-avatar width="75px" height="75px" @click="$router.push(`/ip/${ip.ipIdx}`)" class="cursor-pointer">
                <img :src="ip.iconUrl" alt="Image">
              </v-avatar>
            </div>
          </div>
          <div class="mt-12">
            <div class="mb-2" style="font-family: Heavy;font-size: 28px;font-weight: 700;color: #FFFFFF">
              <div style="font-family: Inter;font-size: 13px;font-weight: 400;">브랜딥이 당신을 위해 준비한</div>
              EVENT
            </div>
          </div>
          <AddBanner/>
          <div class="mt-12">
            <div class="mb-2" style="font-family: Heavy;font-size: 28px;font-weight: 700;color: #FFFFFF">
              <div style="font-family: Inter;font-size: 13px;font-weight: 400;">브랜딥이 추천하는 콜라보</div>
              BEST COLLAB
            </div>
            <div class="card-container">
              <div class="card-column" v-for="(limit, index) in limited" :key="index">
                <div class="card-item" ref="cards">
                  <v-card elevation="0" class="pa-1 no-border" style="background-color: #242424;"
                          :style="{ bottom: index === 3 ? '120px' : '0' }">
                    <v-img :src="limit.thumbnail" width="200" :height="calculateCardHeight(index)" class="cursor-pointer"
                           style="border-radius: 15px;"
                           @click.stop="$router.push(`/product/${limit.idx}`).catch(()=>{})">
                    </v-img>
                    <div @click.stop="$router.push(`/product/${limit.idx}`).catch(()=>{})" class="cursor-pointer" style="color: #FFFFFF;max-width: 200px; position: relative;">
                      <div style="font-family: Inter; font-size: 18px; font-weight: 700;" class="mt-2">
                        {{ limit.title }}
                      </div>
                      <div style="font-family: Inter; font-size: 15px; font-weight: 400;">
                        {{ limit.description }}
                      </div>
                      <div style="font-family: Inter; font-size: 15px; font-weight: 700; color: #FFFFFF;" class="mb-2">
                        {{ limit.total?.toLocaleString() }}원
                      </div>
                      <div style="position: absolute; bottom: 45px; right: 0;" @click.stop="likeProduct(limit)">
                        <img src="@/assets/icons/ico-like-gray.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-if="!limit.productLikeIdx"/>
                        <img src="@/assets/icons/ico-like-primary.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-else/>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
            <v-btn width="100%" height="50"
                   style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 15px;font-weight: 700;color: #FFFFFF;margin-top: -120px"
                   elevation="0" color="#EF3426" @click="$router.push(`/product`).catch(()=>{})">전체보기
            </v-btn>
          </div>
          <div class="mt-12">
            <div class="mb-2" style="font-family: Heavy;font-size: 28px;font-weight: 700;color: #FFFFFF">
              <div style="font-family: Inter;font-size: 13px;font-weight: 400;">브랜딥에서만! 곧 만나요</div>
              COMING UP
            </div>
            <div>
              <div class="d-flex" style="overflow-x: auto;">
                <div v-for="(up, idx) in upcoming" :key="idx" class="mr-2 mb-5">
                  <v-card width="310" height="375" style="border-radius: 15px; margin-right: 10px;" elevation="0"
                          class="no-border">
                    <v-img :src="up.thumbnailUrl" width="310" height="375" class="cursor-pointer"
                           @click.stop="$router.push(`/ip/${up.ipIdx}`).catch(()=>{})">
                      <v-card-title
                          style="position: absolute; bottom: 80px;font-family: Inter;font-size: 17px;font-weight: 700;color: #FFFFFF">
                        {{ up.title }}
                      </v-card-title>
                      <v-card-subtitle
                          style="position: absolute; bottom: 60px;font-family: Inter;font-size: 12px;font-weight: 600;color: #FFFFFF;white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: inline-block;">
                        {{ up.description }}
                      </v-card-subtitle>
                      <v-card-actions>
                        <v-btn class="mt-4 ml-2" width="280" height="30" v-if="up.ipLikeIdx"
                               style="border-radius: 25px; border: 1px; position: absolute; bottom: 20px; font-family: Inter; font-size: 12px; font-weight: 700;color: white"
                               elevation="0" color="#BEBEBE" @click.stop="likeIpsUpcoming(up.ipIdx)">
                          <img src="@/assets/icons/ico-white-alarm.svg" alt="Icon" width="15" height="15" class="mr-1">
                          COMING SOON
                        </v-btn>
                        <v-btn class="mt-4 ml-2" width="280" height="30" v-else
                               style="border-radius: 25px; border: 1px; position: absolute; bottom: 20px; font-family: Inter; font-size: 12px; font-weight: 700;color: #FFFFFF"
                               elevation="0" color="#EF3426" @click.stop="likeIpsUpcoming(up.ipIdx)">
                          <img src="@/assets/icons/ico-white-alarm.svg" alt="Icon" width="15" height="15" class="mr-1">
                          COMING SOON
                        </v-btn>
                      </v-card-actions>
                    </v-img>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
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
<style>
.no-border {
  border: none;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* 필요에 따라 space-around 또는 space-evenly와 같은 다른 값 사용 가능 */
}

.card-column {
  width: 48%; /* 필요에 따라 폭 조정 (마진 및 패딩 고려) */
}

.card-item {
  width: 100%;
}
</style>