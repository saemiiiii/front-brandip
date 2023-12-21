<script>
import router from "@/router";
import Footer from "@/components/common/Footer.vue";
import {mapGetters, mapActions} from "vuex";

export default {
  components: {
    Footer
  },
  created() {
    this.isMobile = this.checkIfMobile();
  },
  watch: {
    $route(to) {
      switch (to.path) {
        case '/my-page-detail' && `/quit` && `/orders` || `/orders/${to.params.id}`:
          this.menu = `마이 브랜딥`;
          break;
        case '/delivery' || '/delivery-add':
          this.menu = `배송지 관리`;
          break;
        case '/notice':
          this.menu = `공지사항`;
          break;
        case '/faq':
          this.menu = `FAQ`;
          break;
        case '/inquiry' || '/inquiry-list' || '/inquiry-add':
          this.menu = `문의하기`;
          break;
        case '/community' || '/community-add' || 'community-report':
          this.menu = `커뮤니티`;
          break;
        case `/community/${to.params.id}`:
          this.menu = `커뮤니티`;
          break;
        case `/order`:
          this.menu = `주문서 작성`;
          break;
        case `/cart`:
          this.menu = `MY LIST`;
          break;
        case `/identity-join`:
          this.menu = `LOGIN`;
          break;
        case `/identity-complete`:
          this.menu = `LOGIN`;
          break;
        case `/profile` && `/sign-complete`:
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
    >
      <v-col class="col1">
        <!--          <v-sheet>-->
        <!--          </v-sheet>-->
      </v-col>
      <v-col style="overflow: hidden;" class="appRow">
        <v-main>
          <!--/*          <v-app-bar :elevation="0" style="background: #FFFFFF; box-shadow: none;" v-if="this.$route.path !== `/`">*/-->
          <!--            <img src="@/assets/icons/ico-logo.svg" style="margin: auto" @click="$router.push('/').catch(()=>{})"/>-->
          <!--            <img src="@/assets/icons/ico-black-alarm.svg"/>-->
          <div
              v-if="this.$route.path !== `/` && this.$route.path === `/login` || this.$route.path === `/mypage` || this.$route.path === `/tv`
              || this.$route.path === `/service-terms` || this.$route.path === `/privacy-terms` || this.$route.path === `/cart`"
              class="fixed-div">
            <div style="text-align: center; display: flex; justify-content: center;">
              <img src="@/assets/icons/ico-logo.svg" class="mt-5"
                   style="position: absolute;  z-index: 9;"
                   @click="$router.push('/').catch(()=>{})"/>
            </div>
<!--            <div style="display: flex; justify-content: end;">-->
<!--              <img src="@/assets/icons/ico-black-alarm.svg" class="mt-5 mr-2"/>-->
<!--            </div>-->
          </div>
          <div v-if="this.$route.path === `/my-page-detail` || this.$route.path === `/delivery` || this.$route.path === `/delivery-add` ||
          this.$route.path === `/notice` || this.$route.path === `/faq` || this.$route.path === `/inquiry` || this.$route.path === `/inquiry-list` ||
          this.$route.path === `/inquiry-add` || this.$route.path === `/community` || this.$route.path === `/community/${this.$route.params.id}`||
          this.$route.path === `/community-add` || this.$route.path === `/community-report` || this.$route.path === `/order` || this.$route.path === `/cart` ||
          this.$route.path === `/identity-join` || this.$route.path === `/identity-complete` || this.$route.path === `/profile` || this.$route.path === `/sign-complete` ||
          this.$route.path === `/quit` || this.$route.path === `/orders` || this.$route.path === `/orders/${this.$route.params.id}`"
               style="height: 75px" class="fixed-div" :style="{ width: $vuetify.breakpoint.xsOnly ? '100%' : '380px'}">
            <div style="display: flex; justify-content: start;" class="mt-5">
              <img src="@/assets/icons/ico-black-left.svg" class="ml-4 cursor-pointer" @click="goBack"/>
              <span
                  class="pr-10"
                  style="text-align: center; justify-content: center; margin: auto;font-family: Inter;font-size: 25px;font-weight: 700;">{{
                  menu
                }}</span>
            </div>
          </div>
          <router-view/>
          <Footer/>
        </v-main>
      </v-col>
      <v-col class="col1">
        <!--          <v-sheet>-->
        <!--          </v-sheet>-->
      </v-col>
    </v-row>
    <!--    </v-container>-->
    <!--    </v-app>-->
    <v-footer v-if="this.$route.path !== `/product/${this.$route.params.id}` && this.$route.path !== `/order` && this.$route.path !== `/order`
    && this.$route.path !== `/wowcomplete` && this.$route.path !== `/cart` && this.$route.path !== `/identity-join` && this.$route.path !== `/identity-complete`
    && this.$route.path !== `/profile` && this.$route.path !== `/sign-complete` && this.$route.path !== `/ipay` && this.$route.path !== `/identity`"  fixed class="justify-center flex"
              style="max-width: 100%; margin: auto; height: 70px; background-color: #FFFFFF">
      <v-toolbar-items class="justify-between">
        <v-btn text>
          <router-link to="/cart" :class="this.$route.path === `/cart` ? `active` : ``">
            <img src="@/assets/icons/ico-color-cart.svg" v-if="this.$route.path === `/cart`"/>
            <img src="@/assets/icons/ico-gray-cart.svg" v-else/>
          </router-link>
        </v-btn>
        <v-btn text>
          <router-link to="/community" :class="this.$route.path === `/community` || this.$route.path === `/community/${this.$route.params.id}` ? `active` : ``">
            <img src="@/assets/icons/ico-color-community.svg" v-if="this.$route.path === `/community` || this.$route.path === `/community/${this.$route.params.id}`"/>
            <img src="@/assets/icons/ico-gray-community.svg" v-else/>
          </router-link>
        </v-btn>
        <v-btn text>
          <router-link to="/" :class="this.$route.path === `/` || this.$route.path === `/product/${this.$route.params.id}` ? `active` : ``">
            <img src="@/assets/icons/ico-color-home.svg" v-if="this.$route.path === `/` || this.$route.path === `/product/${this.$route.params.id}`"/>
            <img src="@/assets/icons/ico-gray-home.svg" v-else/>
          </router-link>
        </v-btn>
        <v-btn text>
          <router-link to="/tv" :class="this.$route.path === `/tv` ? `active` : ``">
            <img src="@/assets/icons/ico-color-tv.svg" v-if="this.$route.path === `/tv`"/>
            <img src="@/assets/icons/ico-gray-tv.svg" v-else/>
          </router-link>
        </v-btn>
        <v-btn text>
          <router-link to="/mypage"
                       :class="this.$route.path === `/mypage` || this.$route.path === `/my-page-detail` || this.$route.path === `/quit` ? 'active' : ``">
            <img src="@/assets/icons/ico-color-my.svg"
                 v-if="this.$route.path === `/mypage` || this.$route.path === `/my-page-detail` || this.$route.path === `/quit`"/>
            <img src="@/assets/icons/ico-gray-my.svg" v-else/>
          </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-footer>
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

.appRow {
  max-width: 380px;
  justify-items: center;
  @media screen and (max-width: 600px) {
    /* 화면 너비가 600px 이하인 경우에만 적용됨 */
    max-width: 100%;
  }
}

.col1 {
  @media screen and (max-width: 600px) {
    display: none;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fixed-div {
  position: fixed;
  top: 0;
  width: 380px;
  background-color: #ffffff;
  z-index: 1000;
}

</style>
