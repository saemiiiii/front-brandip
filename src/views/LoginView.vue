<script>
import axios from 'axios'
import router from "@/router";
import {mapGetters, mapActions} from "vuex";

export default {
  data() {
    return {
      dialog: false,
      terms: [],
      selectList: [],
      isDisabled: true,
      token: ``,
      provider: ``,
      btnColor: `grey`,
    }
  },
  created() {
    const idToken = this.getIdTokenFromUrl();
    if (idToken) {
      this.token = idToken;
      this.provider = `google`;
      this.setToken();
    }
  },
  computed: {
    allSelected: {
      //getter
      get: function () {
        return this.terms.length === this.selectList.length;
      },
      //setter
      set: function (e) {
        this.selectList = e ? this.terms : [];
      },
    },
    ...mapGetters({
      authenticated: "auth/authenticated",
      type: "auth/type",
      user: "auth/user"
    }),
  },
  watch: {
    selectList(v) {
      const termsReq = this.terms.filter(item => item.require === 0).map(item => item.idx)
      const selectReq = v.filter(item => item.require === 0).map(item => item.idx)
      if (termsReq.every(item => selectReq.includes(item))) {
        this.isDisabled = false;
        this.btnColor = `primary`;
      } else {
        this.isDisabled = true;
        this.btnColor = `grey`;
      }
    },
  },
  mounted() {
    const script = document.createElement('script');
    script.src =
        'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    script.async = true;
    document.head.appendChild(script);

    this.getTerms();
    this.initNaverLogin();
  },

  methods: {
    ...mapActions({
      loginAction: "auth/login",
    }),
    initNaverLogin() {
      const naverLogin = new naver.LoginWithNaverId(
          {
            clientId: process.env.VUE_APP_NEXT_PUBLIC_NAVER_CLIENT_ID, //내 애플리케이션 정보에 cliendId를 입력해줍니다.
            callbackUrl: `http://localhost:8080/login`, // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
            isPopup: false,
            callbackHandle: true
          }
      );
      naverLogin.init();
      if (naverLogin.accessToken !== null) {
        this.token = naverLogin.accessToken.accessToken;
        this.provider = `naver`;
        this.setToken();
      }
    },
    loginWithKakao() {
      Kakao.Auth.login({
        success: () => {
          // 로그인 성공
          this.token = Kakao.Auth.getAccessToken()
          this.provider = `kakao`;
          this.setToken();
        },
        fail: (err) => {
          // 로그인 실패
          console.error('Kakao Login Failed', err);
        }
      });
    },
    GoogleLoginBtn() {
      const clientId = process.env.VUE_APP_NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      const redirectUri = `http://localhost:8080/login`;
      const scope = 'openid email profile';

      const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=id_token&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&nonce=${Math.random().toString(36).substring(7)}`;

      window.location.href = authUrl;
    },
    setToken() {
      this.loginAction({
        token: this.token,
        provider: this.provider
      })
          .then(() => {
            if (this.type === `SU`) {
              this.dialog = true;
            } else {
              router.push('/')
            }
          })
          .catch(() => {
            this.$store.commit("alert/showAlertMsg", {
              message: "로그인 정보를 확인해주세요.",
              type: "alert_error",
            });
          });
    },
    getTerms() {
      axios.get(`v1/terms?type=SIGN`)
          .then(res => {
            this.terms = res.data.data
          })
          .catch(err => {
            console.error(err);
          })
    },
    postTerms() {
      const codes = this.selectList.map(item => item.code)
      axios.post(`v1/terms`, {
        codes: codes,
      },)
          .then(() => {
            this.dialog = false;
            router.push('/profile')
          })
          .catch(err => {
            console.error(err);
          })
    },
    getIdTokenFromUrl() {
      const params = new URLSearchParams(window.location.hash.substring(1));
      return params.get('id_token');
    },
  }
}
</script>
<template>
  <v-app>
    <v-container>
      <div class="ml-1 mt-28">
        <div class="mt-12 mb-12 text-left">
          <p class="text-xl font-bold" style="font-family: Inter;font-size: 30px;font-weight: 700;">반갑습니다.</p>
          <p class="text-xl font-bold">와우플래닛 입니다.</p>
          <p class="font-bold text-sm" style="font-family: Inter;font-size: 14px;font-weight: 700;">SNS 계정<span class="font-normal text-sm" style="font-family: Inter;font-size: 14px;font-weight: 400;">으로 간편하게 로그인하세요.</span></p>
        </div>
        <div class="mt-20 mb-20">
          <v-btn class="custom-btn mb-2" elevation="0" style="background-color: #FFDF23; color: black" @click="loginWithKakao"
                 rounded>
            <v-img src="/img/common/ico-kakao.png" width="30" height="30" class="left-aligned-img"></v-img>
            <span class="centered-text" style="font-family: Inter;font-size: 13px;font-weight: 700;">kakao 로그인</span>
          </v-btn>
          <v-btn class="custom-btn mb-2" elevation="0" style="background-color: #00C352; color: white" id="naverIdLogin_loginButton"
                 rounded>
            <v-img src="/img/common/ico-naver.png" width="30" height="30" class="left-aligned-img"></v-img>
            <span class="centered-text" style="font-family: Inter;font-size: 13px;font-weight: 700;">naver 로그인</span>
          </v-btn>
          <v-btn class="custom-btn mb-2" elevation="0" style="background-color: #F0F0F0" outlined @click="GoogleLoginBtn" rounded>
            <v-img src="/img/common/ico-google.png" width="30" height="30" class="left-aligned-img"></v-img>
            <span class="centered-text" style='text-transform: none;font-family: Inter;font-size: 13px;font-weight: 700;'>Google 로그인</span>
          </v-btn>
          <v-btn class="custom-btn" style="background-color: #000000; color: white" elevation="0" @click="snsLogin(`apple`)" rounded>
            <v-img src="/img/common/ico-apple.svg" width="30" height="30" class="left-aligned-img"
                   style="color: white"></v-img>
            <span class="centered-text" style='text-transform: none;font-family: Inter;font-size: 13px;font-weight: 700;'>Apple 로그인</span>
          </v-btn>
          <!--        <div class="g_id_signin" data-type="icon" data-shape="circle"></div>-->
          <!--      <div-->
          <!--          id="appleid-signin"-->
          <!--          class="signin-button"-->
          <!--          data-color="black"-->
          <!--          data-border="true"-->
          <!--          data-type="sign-in"-->
          <!--          @click="snsLogin('apple')"-->
          <!--      ></div>-->
        </div>

        <div class="text-center">
          <v-dialog max-width="380" content-class="bottom-dialog" v-model="dialog" scrollable persistent
                    hide-overlay transition="dialog-bottom-transition">
            <v-card width="100%" style="background-color: #EEEEEE">
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12">
                  <div>
                    <div style="background-color: #FFFFFF; border-radius: 25px" class="pt-1">
                      <v-checkbox v-model="allSelected" label="전체 동의하기" class="font-bold"/>
                    </div>
                    <div>
                      <template v-for="(item, index) in terms">
                        <v-checkbox
                            :value="item"
                            v-model="selectList"
                            :key="index"
                            :label="item.require === 1 ? item.title + `(필수)` : item.title + `(선택)`"
                        />

                      </template>
                    </div>
                  </div>
                  <v-btn
                      rounded
                      :color="btnColor"
                      width="100%"
                      @click="postTerms"
                      :disabled="isDisabled"
                  >
                    다음으로
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
  </v-app>
</template>
<style>
.custom-btn {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
}

.left-aligned-img {
  margin-right: 8px;
}

.centered-text {
  display: inline-block;
  text-align: center;
  width: 100%;
}

.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
}

custom-button > a > img {
  width: 100%;
}
</style>
