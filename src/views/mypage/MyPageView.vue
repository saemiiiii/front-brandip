<script>
import axios from "axios";
// import MyBanner from "@/components/banner/MyBanner.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  // components: {
  //   MyBanner
  // },
  data() {
    return {
      profileImg: [
        {id: 1, value: `@/assets/icons/testimg.svg`, description: `zzz`},
        {id: 2, value: `@/assets/icons/testimg.svg`, description: `zzz`},
        {id: 3, value: `@/assets/icons/testimg.svg`, description: `zzz`},
        {id: 4, value: `@/assets/icons/testimg.svg`, description: `zzz`}
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    ...mapActions({
      logoutAction: "auth/logout",
    }),
    getBanner() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/banner?type=main`)
          .then(res => {
            this.banner = res.data.data
          })
          .catch(err => {
            console.error(err);
          })
    },
    logout() {
      this.logoutAction().then(() => {
        this.$router.push(`/`).catch(() => {
        });
      });
    }
  }
}
</script>

<template>
  <v-app>
<!--    <MyBanner/>-->
    <div class="mt-16">
      <div
          style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px; margin-left: 30px;">
        <div>
          <p style="font-family: Inter; font-size: 28px; font-weight: 700; line-height: 36px; letter-spacing: 0em; text-align: left;">
            {{ this.user.nickname }}님
          </p>
          <p style="font-family: Inter; font-size: 15px; font-weight: 300; line-height: 18px; letter-spacing: 0em; text-align: left; margin-top: 10px;" @click="logout" class="cursor-pointer">
            로그아웃 >
          </p>
        </div>
        <div style="position: relative">
        <v-avatar size="70" class="mr-4 mb-4 cursor-pointer" @click="$router.push('/my-page-detail').catch(()=>{})" style="box-shadow: 0px 2px 2px 0px #00000040;">
          <img :src="this.user.profileUrl"/>
        </v-avatar>
        <img src="@/assets/icons/ico-update2.svg"
             style="position: absolute; z-index: 9; top: 43px; left: 45px; width: 25px; height: 25px;"/>
        </div>
      </div>
      <div style="margin-top: 25px; margin-left: 30px;margin-right: 30px">
        <v-card elevation="0" height="63" style="border-radius: 15px; background-color: #FF1A77;">
          <v-row align="center">
            <v-col class="d-flex align-center" cols="7">
              <img src="@/assets/icons/ico-pink-logo.svg"
                   style="border-radius: 0; margin-left: 15px; margin-top: 16px"/>
              <span class="white--text ml-2"
                    style="margin-top: 16px; font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px; text-align: left;">브랜딥 포인트</span>
            </v-col>
            <v-col class="text-right mt-5">
              <span class="white--text mr-4"
                    style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px;">{{
                  Number(this.user.point + this.user.freePoint).toLocaleString()
                }}P</span>
            </v-col>
          </v-row>
        </v-card>
      </div>
<!--      <div style="margin-top: 25px; margin-left: 30px">-->
<!--        <p class="text-left" style="font-family: Inter;font-size: 20px;font-weight: 700;line-height: 24px;">-->
<!--          결제목록</p>-->
<!--        <v-row class="scroll-container">-->
<!--          <v-col cols="12" style="max-width: 175px">-->
<!--            <v-img src="@/assets/icons/testimg.svg"></v-img>-->
<!--            <div style="font-family: Inter;font-size: 14px;font-weight: 700;line-height: 17px;text-align: left;" class="mt-2">잔나비 프로젝트</div>-->
<!--            <div style="font-family: Inter;font-size: 15px;font-weight: 400;line-height: 18px;text-align: left;" class="mb-2">Point-Up-Rug | 2개</div>-->
<!--            <div style="font-family: Inter;font-size: 20px;font-weight: 700;line-height: 24px;text-align: left;">20,000원</div>-->
<!--          </v-col>-->
<!--          <v-col cols="12" style="max-width: 175px">-->
<!--            <v-img src="@/assets/icons/testimg.svg"></v-img>-->
<!--            <div style="font-family: Inter;font-size: 14px;font-weight: 700;line-height: 17px;text-align: left;" class="mt-2">잔나비 프로젝트</div>-->
<!--            <div style="font-family: Inter;font-size: 15px;font-weight: 300;line-height: 18px;text-align: left;" class="mb-2">Point-Up-Rug | 2개</div>-->
<!--            <div style="font-family: Inter;font-size: 20px;font-weight: 700;line-height: 24px;text-align: left;">20,000원</div>-->
<!--          </v-col>-->
<!--          <v-col cols="12" style="max-width: 175px">-->
<!--            <v-img src="@/assets/icons/testimg.svg"></v-img>-->
<!--            <div style="font-family: Inter;font-size: 14px;font-weight: 700;line-height: 17px;text-align: left;" class="mt-2">잔나비 프로젝트</div>-->
<!--            <div style="font-family: Inter;font-size: 15px;font-weight: 300;line-height: 18px;text-align: left;" class="mb-2">Point-Up-Rug | 2개</div>-->
<!--            <div style="font-family: Inter;font-size: 20px;font-weight: 700;line-height: 24px;text-align: left;">20,000원</div>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </div>-->
      <div style="margin-top: 35px; margin-left: 30px;margin-right: 30px">
          <p class="d-flex justify-between cursor-pointer" style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px;" @click="$router.push(`/orders`).catch(()=>{})">
            주문 목록
            <img src="@/assets/icons/ico-black-right.svg"/>
          </p>
<!--          <p class="d-flex justify-between" style="font-family: Inter; font-size: 20px; font-weight: 800; line-height: 24px;">-->
<!--            교환 / 반품 현황-->
<!--            <img src="@/assets/icons/ico-black-right.svg"/>-->
<!--          </p>-->
          <p class="d-flex justify-between cursor-pointer" style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px;" @click="$router.push(`/delivery`).catch(()=>{})">
            배송지 관리
            <img src="@/assets/icons/ico-black-right.svg"/>
          </p>
<!--          <p class="d-flex justify-between" style="font-family: Inter; font-size: 20px; font-weight: 800; line-height: 24px;">-->
<!--            리뷰 관리-->
<!--            <img src="@/assets/icons/ico-black-right.svg"/>-->
<!--          </p>-->
          <p class="d-flex justify-between cursor-pointer" style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px;" @click="$router.push(`/notice`).catch(()=>{})">
            공지사항
            <img src="@/assets/icons/ico-black-right.svg"/>
          </p>
          <p class="d-flex justify-between cursor-pointer" style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px;" @click="$router.push(`/inquiry`).catch(()=>{})">
            문의하기
            <img src="@/assets/icons/ico-black-right.svg"/>
          </p>
          <p class="d-flex justify-between cursor-pointer" style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px;" @click="$router.push(`/faq`).catch(()=>{})">
            FAQ
            <img src="@/assets/icons/ico-black-right.svg"/>
          </p>
      </div>
    </div>
  </v-app>
</template>

<style>
.scroll-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>