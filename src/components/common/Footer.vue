<script>
export default {
  data() {
    return {
      links: [
        '공지사항',
        '이용약관',
        '개인정보처리방침',
        '아이디어제안',
      ],
      isOpen: false,
      faq: {
        1: false,
      },
    }
  },
  methods: {
    toggleCollapse() {
      this.isOpen = !this.isOpen;
    },
    toggleFaq(index) {
      this.$set(this.faq, index, !this.faq[index]);
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
    }
  }
}
</script>
<template>
  <v-footer
      padless
      style="background-color: #242424;"
      class="pb-32"
      v-if="this.$route.path !== `/ipay` && this.$route.path === `/`"
  >
    <v-row
        no-gutters
        style="justify-content: center;align-items: center;"
    >
      <v-col cols="12">
        <div class="mt-10 mb-8 flex justify-center">
          <img src="@/assets/icons/ico-white-logo.svg"/>
          <img src="@/assets/icons/ico-white-up.svg" class="px-1.5" v-if="isOpen" @click="toggleCollapse"/>
          <img src="@/assets/icons/ico-white-down.svg" class="px-1.5" v-else @click="toggleCollapse"/>
        </div>
      <v-btn
          style="color: #FFFFFF"
          text
          rounded
          class="text-xs mb-6"
          small
          @click="$router.push(`/notice`).catch(()=>{})"
      >
        공지사항
      </v-btn>
      <v-btn
          style="color: #FFFFFF"
          text
          rounded
          class="text-xs mb-6"
          small
          @click="$router.push(`/service-terms`).catch(()=>{})"
      >
        이용약관
      </v-btn>
      <v-btn
          style="color: #FFFFFF"
          text
          rounded
          class="text-xs mb-6"
          small
          @click="$router.push(`/privacy-terms`).catch(()=>{})"
      >
        개인정보처리방침
      </v-btn>
      <v-btn
          style="color: #FFFFFF"
          text
          rounded
          class="text-xs mb-6"
          small
      >
        아이디어제안
      </v-btn>

      <v-card
          flat
          tile
          class="indigo lighten-1 white--text text-center no-border"
          style="background-color: #242424"
      >
        <v-expand-transition>
          <div v-if="isOpen">
            <div class="mb-6" style="color: #FFFFFF">
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
        </v-expand-transition>
        <v-card-text style="display: flex; justify-content: center; align-items: center;background-color: #242424">
          <img src="@/assets/icons/ico-white-instagram.svg" width="25" class="mx-4 cursor-pointer" @click="goUrl(`instagram`)"/>
          <img src="@/assets/icons/ico-white-youtube.svg" width="25" class="mx-4 cursor-pointer" @click="goUrl(`youtube`)"/>
          <img src="@/assets/icons/ico-white-blog.svg" width="25" class="mx-4 cursor-pointer" @click="goUrl(`blog`)"/>
          <img src="@/assets/icons/ico-white-tictok.svg" width="25" class="mx-4 cursor-pointer" @click="goUrl(`tictok`)"/>
        </v-card-text>
      </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>
<style>
.no-border {
  border: none;
}
</style>