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
    }
  }
}
</script>
<template>
  <v-footer
      padless
      style="background-color: #FFFFFF"
      class="mb-32"
      v-if="this.$route.path !== `/ipay`"
  >
    <div class="mt-10 mb-8 flex justify-center">
      <img src="@/assets/icons/ico-logo-black.svg"/>
      <img src="@/assets/icons/ico-up.svg" class="px-1.5" v-if="isOpen" @click="toggleCollapse"/>
      <img src="@/assets/icons/ico-down.svg" class="px-1.5" v-else @click="toggleCollapse"/>
    </div>
    <v-row
        justify="center"
        no-gutters
    >
      <v-btn
          text
          rounded
          class="text-xs mb-6"
          small
          @click="$router.push(`/notice`).catch(()=>{})"
      >
        공지사항
      </v-btn>
      <v-btn
          text
          rounded
          class="text-xs mb-6"
          small
          @click="$router.push(`/service-terms`).catch(()=>{})"
      >
        이용약관
      </v-btn>
      <v-btn
          text
          rounded
          class="text-xs mb-6"
          small
          @click="$router.push(`/privacy-terms`).catch(()=>{})"
      >
        개인정보처리방침
      </v-btn>
      <v-btn
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
          class="indigo lighten-1 white--text text-center"
      >
        <v-expand-transition>
          <div v-if="isOpen">
            <div class="mb-6">
              <p class="text-xs font-bold mb-4">주식회사 와우플래닛 | 대표 Kim Annie Eunhee </p>
              <p class="text-xs"><span class="font-bold">주소</span> 서울시 용산구 한남대로 98, 2층 WOWPLANET</p>
              <p class="text-xs"><span class="font-bold">사업자 등록번호</span> 266-87-02443</p>
              <p class="text-xs mb-2"><span class="font-bold">통신판매업 신고번호</span> 제 2023-서울용산-0094호</p>
              <p class="text-xs" style="color: #00000066">와우플래닛은 통신판매중개자이며 통신판매의 당사자가 아닙니다.</p>
              <p class="text-xs" style="color: #00000066">크리에이터가 등록한 상품정보 및 거래에 와우플래닛은 책임을 지지 않습니다.</p>
              <p class="text-xs mb-2" style="color: #00000066">Copyright ⓒ WOWPLANET. All Rights reserved.</p>
              <p class="text-xs"><span class="font-bold">고객센터</span> +82 2 6348 8801</p>
              <p class="text-xs"><span class="font-bold">운영시간</span> 09:00 ~ 18:00</p>
              <p class="text-xs"><span class="font-bold">이메일</span> info@wowplanet.io</p>
            </div>
          </div>
        </v-expand-transition>
        <v-card-text style="display: flex; justify-content: center; align-items: center;">
          <img src="@/assets/icons/ico-instagram.svg" class="mx-4" @click="$router.push('/company').catch(()=>{})"/>
          <img src="@/assets/icons/ico-youtube.svg" class="mx-4" @click="$router.push('/tv').catch(()=>{})"/>
          <img src="@/assets/icons/ico-blog.svg" class="mx-4"/>
          <img src="@/assets/icons/ico-tictok.svg" class="mx-4"/>
        </v-card-text>
      </v-card>
    </v-row>
  </v-footer>
</template>