<script>
import router from "@/router";
import Footer from "@/components/common/Footer.vue";
import LeftFooter from "@/components/common/LeftFooter.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    Footer,
    LeftFooter
  },
  created() {
    this.isMobile = this.checkIfMobile();
  },
  watch: {
    $route(to) {
      switch (to.path) {
        case '/my-page-detail':
          this.menu = `마이 브랜딥`;
          break;
        case `/quit`:
          this.menu = `마이 브랜딥`;
          break;
        case `/orders`:
          this.menu = `마이 브랜딥`;
          break;
        case `/orders/${to.params.id}`:
          this.menu = `마이 브랜딥`;
          break;
        case '/delivery':
          this.menu = `배송지 관리`;
          break;
        case '/delivery-add':
          this.menu = `배송지 관리`;
          break;
        case '/notice':
          this.menu = `공지사항`;
          break;
        case '/faq':
          this.menu = `FAQ`;
          break;
        case '/inquiry':
          this.menu = `문의하기`;
          break;
        case '/inquiry-list':
          this.menu = `문의하기`;
          break;
        case '/inquiry-add':
          this.menu = `문의하기`;
          break;
        case '/community':
          this.menu = `커뮤니티`;
          break;
        case '/community-add':
          this.menu = `커뮤니티`;
          break;
        case 'community-report':
          this.menu = `커뮤니티`;
          break;
        case `/community/${to.params.id}`:
          this.menu = `커뮤니티`;
          break;
        case `/order`:
          this.menu = `주문서 작성`;
          break;
        case `/cart`:
          this.menu = `마이 리스트`;
          break;
        case `/identity-join`:
          this.menu = `LOGIN`;
          break;
        case `/identity-complete`:
          this.menu = `LOGIN`;
          break;
        case `/profile`:
          this.menu = `LOGIN`;
          break;
        case `/login`:
          this.menu = `LOGIN`;
          break;
        case `/sign-complete`:
          this.menu = `LOGIN`;
          break;
        default:
          break;
      }
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    router() {
      return router
    },
    ...mapActions({
      logoutAction: "auth/logout",
    }),
    checkIfMobile() {
      const userAgent = navigator.userAgent;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    },
    logout() {
      this.logoutAction().then(() => {
        this.$router.push(`/login`).catch(() => {
        });
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth", // 부드러운 스크롤 적용
      });
    },
  },
  data() {
    return {
      drawer: false,
      items: [
        {title: `아이디어후원`, url: `/`},
        {title: `서비스소개`, url: `/company`},
        {title: `와플TV`, url: `/tv`},
        {title: `커뮤니티`, url: `/community`},
      ],
      isMobile: false,
      menu: ``,
    }
  },
}

</script>
<template id="app">
  <div id="app">
    <!--    <v-container>-->
    <!--    <v-app>-->
    <v-row
        align="center"
        no-gutters
        style="justify-content: center;"
    >
      <v-col class="col1">
      </v-col>
      <v-col class="col2">
        <LeftFooter/>
      </v-col>
      <v-col style="overflow: hidden;" class="appRow">
        <v-main>
          <div style="position: relative; max-width: 460px">
            <div
                v-if="(this.$route.path !== `/` && this.$route.path !== `/login` && this.$route.path !== `/my-page-detail` && this.$route.path !== `/cart`
              && this.$route.path !== `/order` && this.$route.path !== `/product` && this.$route.path !== `/identity-join` && this.$route.path !== `/wowcomplete`
              && this.$route.path !== `/inquiry` && this.$route.path !== `/product/${this.$route.params.id}` && this.$route.path !== `/identity` && this.$route.path !== `/ipay`
              && this.$route.path !== `/search` && this.$route.path !== `/ip/${this.$route.params.id}` && this.$route.path !== `/community` && this.$route.path !== `/inquiry-list`)
               || this.$route.path === `/mypage` && this.$route.path === `/tv`
              && this.$route.path === `/service-terms` && this.$route.path === `/privacy-terms`">
              <div style="text-align: center; display: flex; justify-content: center;margin: auto">
                <img src="@/assets/icons/ico-logo.svg" class="mt-3"
                     style="position: absolute;  z-index: 9;"
                     @click="$router.push('/').catch(()=>{})"/>
              </div>
            </div>
            <div v-if="this.$route.path === `/my-page-detail` || this.$route.path === `/delivery` || this.$route.path === `/delivery-add` ||
          this.$route.path === `/notice` || this.$route.path === `/faq` || this.$route.path === `/inquiry` || this.$route.path === `/inquiry-list` ||
          this.$route.path === `/inquiry-add` || this.$route.path === `/community` || this.$route.path === `/community/${this.$route.params.id}`||
          this.$route.path === `/community-add` || this.$route.path === `/community-report` || this.$route.path === `/order` || this.$route.path === `/cart` ||
          this.$route.path === `/identity-join` || this.$route.path === `/identity-complete` || this.$route.path === `/profile` || this.$route.path === `/sign-complete` ||
          this.$route.path === `/quit` || this.$route.path === `/orders` || this.$route.path === `/orders/${this.$route.params.id}` || this.$route.path === `/login`"
                 style="height: 75px" class="fixed-div">
              <div style="display: flex; justify-content: center;" class="mt-5">
                <!--              <img src="@/assets/icons/ico-black-left.svg" class="ml-4 cursor-pointer" @click="goBack"/>-->
                <span
                    style="text-align: center; justify-content: center; margin: auto;font-family: Inter;font-size: 25px;font-weight: 700;color: #FFFFFF">{{
                    menu
                  }}</span>
              </div>
            </div>
          </div>
          <router-view/>
          <Footer/>
          <div style="position: relative;max-width: 460px">
            <div class="background-gradient" v-if="this.$route.path !== `/product/${this.$route.params.id}` && this.$route.path !== `/order` && this.$route.path !== `/order`
    && this.$route.path !== `/wowcomplete` && this.$route.path !== `/identity-join` && this.$route.path !== `/identity-complete`
    && this.$route.path !== `/profile` && this.$route.path !== `/sign-complete` && this.$route.path !== `/ipay` && this.$route.path !== `/identity` && this.$route.path !== `/login`
    && this.$route.path !== `/community/${this.$route.params.id}` && this.$route.path !== `/my-page-detail`">
              <v-footer
                  fixed class="justify-center flex fixed-footer"
                  style="height: 75px; bottom: 30px;border-radius: 120px;opacity: 0.9;">
                <v-toolbar-items class="flex justify-between" style="padding-bottom: 10px;">
                  <v-btn text width="20" @click="$router.push(`/cart`).catch(()=>{})">
                    <img src="@/assets/icons/ico-active-cart.svg" v-if="this.$route.path === `/cart`" width="50"
                         height="50"/>
                    <img src="@/assets/icons/ico-base-cart.svg" v-else/>
                  </v-btn>

                  <v-btn text width="20" @click="$router.push(`/community`).catch(()=>{})">
                    <img src="@/assets/icons/ico-active-community.svg"
                         v-if="this.$route.path === `/community` || this.$route.path === `/community/${this.$route.params.id}`"
                         width="50" height="50"/>
                    <img src="@/assets/icons/ico-base-community.svg" v-else/>
                  </v-btn>

                  <v-btn text width="20" @click="$router.push(`/`).catch(()=>{})">
                    <img src="@/assets/icons/ico-active-home.svg"
                         v-if="this.$route.path === `/` || this.$route.path === `/product/${this.$route.params.id}`"
                         width="50" height="50"/>
                    <img src="@/assets/icons/ico-base-home.svg" v-else/>
                  </v-btn>

                  <!--              <v-btn text>-->
                  <!--                <router-link to="/tv" :class="this.$route.path === `/tv` ? `active` : ``">-->
                  <!--                  <img src="@/assets/icons/ico-color-tv.svg" v-if="this.$route.path === `/tv`"/>-->
                  <!--                  <img src="@/assets/icons/ico-gray-tv.svg" v-else/>-->
                  <!--                </router-link>-->
                  <!--              </v-btn>-->

                  <v-btn text width="20" @click="$router.push(`/mypage`).catch(()=>{})">
                    <v-avatar width="50" height="50" class="absolute"
                              style="border: 1px solid #000000; border-radius: 50%; background-color: #25282C;" v-if="authenticated && (this.$route.path === `/mypage` || this.$route.path === `/my-page-detail`
                || this.$route.path === `/quit` || this.$route.path === `/orders` || this.$route.path === `/delivery` || this.$route.path === `/notice` || this.$route.path === `/inquiry` || this.$route.path === `/faq` || this.$route.path === `/inquiry-list`)">
                      <img :src="this.user.profileUrl" alt="Profile Image"
                           style="width: 25px; height: 25px; object-fit: cover; border-radius: 50%;"/>
                    </v-avatar>
                    <v-avatar v-else-if="authenticated" width="27" height="27">
                      <img :src="this.user.profileUrl" width="27" height="27" style="border-radius: 50%;"/>
                    </v-avatar>
                    <img src="@/assets/icons/ico-base-mypage.svg" v-else/>
                  </v-btn>
                </v-toolbar-items>
              </v-footer>
            </div>
          </div>
        </v-main>
      </v-col>
      <v-col class="col1">
        <!--          <v-sheet>-->
        <!--          </v-sheet>-->
      </v-col>
    </v-row>
    <!--    </v-container>-->
    <!--    </v-app>-->
  </div>
</template>
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
@import url("@/assets/css/logo.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.col1 {
  flex: 1; /* 각 컬럼의 비율을 1로 설정 */
  background-color: #000000;
}
.col2 {
  position: relative;
  flex: 2;
  max-width: 460px;
  background-color: #000000;
}

.appRow {
  position: relative;
  flex: 2;
  max-width: 460px;
}

@media screen and (max-width: 1024px) {
  .col1 {
    display: none;
  }
  .col2 {
    display: none;
  }
  .appRow {
    max-width: 100%;
  }
}

.fixed-div {
  position: fixed;
  top: 0;
  background-color: #242424;
  z-index: 999;
  @media screen and (max-width: 1024px) {
    width: 100% !important;
  }
  width: 460px !important;
}

.fixed-footer {
  position: absolute;
  width: 400px !important;
  margin: auto !important;
  @media screen and (max-width: 1024px) {
    width: 100% !important;
  }
  z-index: 2;
}

.text-gradient {
  background: linear-gradient(91.42deg, #F2D807 1.93%, rgba(239, 52, 38, 0.8) 98.12%);
  -webkit-background-clip: text; /* Webkit 브라우저에 대한 프리픽스 */
  background-clip: text;
  color: transparent; /* 텍스트의 색상을 투명하게 설정 */
}

.bottom-gradient {
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
}

.background-gradient {
  position: fixed;
  bottom: 0;
  width: 460px;
  height: 100px;
  background: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
}

@media screen and (max-width: 1024px) {
  .background-gradient {
    width: 100%;
  }
}
</style>
