<script>
import axios from "axios";

export default {
  data() {
    return {
      footers: [],
    }
  },
  mounted() {
    this.getFooter();
  },
  methods: {
    getFooter() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=footer`)
          .then(res => {
            this.footers = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    goUrl(type) {
      if(type === `instagram`) {
        window.open("https://www.instagram.com/wowplanet_official", "_blank");
        return false;
      } else if(type === `youtube`) {
        window.open("https://www.youtube.com/@wowplanet_official", "_blank");
        return false;
      } else if(type === `blog`) {
        window.open("https://blog.naver.com/wowplanetio", "_blank");
        return false;
      } else {
        window.open("https://www.tiktok.com/@wowplanetio", "_blank");
      }
    },
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <div class="text-left" style="position: fixed">
      <p class="mt-10"
         style="font-family: Heavy; font-size: 26px; font-weight: 800; text-align: left;color: #FFFFFF;">IP, BRAND <span style="font-family: Inter; font-size: 20px; font-weight: 800;">를 입다.</span></p>
<!--      <p style="font-family: Heavy; font-size: 72px; font-weight: 800; text-align: left;" class="text-gradient">-->
<!--        BRANDIP</p>-->
      <img src="@/assets/icons/ico-new-logo2.svg" @click="$router.push(`/`).catch(()=>{})" class="cursor-pointer" width="400">
      <div style="position: fixed; bottom: 0;">
        <div class="flex mb-10">
          <img src="@/assets/icons/ico-white-instagram.svg" width="25" class="mx-3 cursor-pointer" @click="goUrl('instagram')"/>
          <img src="@/assets/icons/ico-white-youtube.svg" width="25" class="mx-3 cursor-pointer" @click="goUrl('youtube')"/>
          <img src="@/assets/icons/ico-white-blog.svg" width="25" class="mx-3 cursor-pointer" @click="goUrl('blog')"/>
          <img src="@/assets/icons/ico-white-tictok.svg" width="25" class="mx-3 cursor-pointer" @click="goUrl('tictok')"/>
        </div>
        <div
            class="mb-6"
        >
          <v-btn
              text
              rounded
              class="text-xs"
              small
              @click="$router.push(`/notice`).catch(()=>{})"
              style="color: white"
          >
            공지사항
          </v-btn>
          <v-btn
              text
              rounded
              class="text-xs"
              small
              @click="$router.push(`/service-terms`).catch(()=>{})"
              style="color: white"
          >
            이용약관
          </v-btn>
          <v-btn
              text
              rounded
              class="text-xs"
              small
              @click="$router.push(`/privacy-terms`).catch(()=>{})"
              style="color: white"
          >
            개인정보처리방침
          </v-btn>
          <v-btn
              text
              rounded
              class="text-xs"
              small
              style="color: white"
          >
            아이디어제안
          </v-btn>
        </div>
        <div class="mb-10 ml-3"
             style="font-family: Inter;text-align: left;color: #FFFFFF">
          <p class="mb-4" style="font-size: 12px;font-weight: 700;">주식회사 와우플래닛 | 대표 Kim Annie Eunhee </p>
          <p style="font-size: 12px;font-weight: 700;">주소 <span style="font-size: 12px;font-weight: 400;">서울시 용산구 한남대로 98, 2층 WOWPLANET</span></p>
          <p style="font-size: 12px;font-weight: 700;">사업자 등록번호 <span style="font-size: 12px;font-weight: 400;">266-87-02443</span></p>
          <p class="mb-4" style="font-size: 12px;font-weight: 700;">통신판매업 신고번호 <span style="font-size: 12px;font-weight: 400;">제 2023-서울용산-0094호</span></p>
          <p style="font-size: 12px;font-weight: 700;">고객센터 <span style="font-size: 12px;font-weight: 400;">+82 2 6348 8801</span></p>
          <p style="font-size: 12px;font-weight: 700;">운영시간 <span style="font-size: 12px;font-weight: 400;">09:00 ~ 18:00</span></p>
          <p style="font-size: 12px;font-weight: 700;" class="mb-2">이메일 <span style="font-size: 12px;font-weight: 400;">info@wowplanet.io</span></p>
          <p style="color: #FFFFFF66;font-size: 12px;font-weight: 400;">와우플래닛은 통신판매중개자이며 통신판매의 당사자가 아닙니다.</p>
          <p style="color: #FFFFFF66;font-size: 12px;font-weight: 400;">크리에이터가 등록한 상품정보 및 거래에 와우플래닛은 책임을 지지 않습니다.</p>
          <p style="color: #FFFFFF66;font-size: 12px;font-weight: 400;">Copyright ⓒ WOWPLANET. All Rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>