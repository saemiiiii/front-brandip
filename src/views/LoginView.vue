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
      termsInfo: {},
      termsDialog: false,
      title: ``,
      content: ``,
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
      const termsReq = this.terms.filter(item => item.require === 1).map(item => item.idx)
      const selectReq = v.filter(item => item.require === 1).map(item => item.idx)
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

    // Apple Sign-In JS 라이브러리 로드
    // const script2 = document.createElement('script');
    // script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    // script.async = true;
    // document.head.appendChild(script2);

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
            // callbackUrl: `http://localhost:8080/login`,
            // callbackUrl: `http://ec2-3-34-182-84.ap-northeast-2.compute.amazonaws.com:8080/login`,
            callbackUrl: `https://dev.brandip.shop/login`,
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
      // const redirectUri = `http://localhost:8080/login`;
      // const redirectUri = `http://ec2-3-34-182-84.ap-northeast-2.compute.amazonaws.com:8080/login`;
      const redirectUri = `https://dev.brandip.shop/login`;
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
              router.push('/').catch(() => {
              })
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
            this.terms = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    termsDetail(code) {
      axios.get(`v1/terms/${code}`)
          .then(res => {
            this.termsInfo = res.data.data;
            this.termsDialog = true;
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
            router.push(`/identity-join`).catch(() => {
            });
          })
          .catch(err => {
            console.error(err);
          })
    },
    getIdTokenFromUrl() {
      const params = new URLSearchParams(window.location.hash.substring(1));
      return params.get('id_token');
    },
    handleAppleSignIn() {
      // Apple Sign-In 로그인 창 열기
      const appleIdAuthRequest = new AppleIDAuthRequest();
      appleIdAuthRequest.request();

      // Apple Sign-In 완료 후 처리
      appleIdAuthRequest.onsuccess = async (response) => {
        const identityToken = response.identityToken;

        // identityToken을 서버로 전송하여 검증 (백엔드에서 수행)
        await this.sendTokenToServer(identityToken);
      };

      // Apple Sign-In 에러 처리
      appleIdAuthRequest.onfailure = (error) => {
        console.error('Apple Sign-In 에러:', error);
      };
    },
    // async sendTokenToServer(identityToken) {
    // 여기에 백엔드로 identityToken을 전송하는 로직을 추가해야 합니다.
    // 백엔드에서는 identityToken을 검증하고 유효한 사용자인지 확인해야 합니다.
    // },
    toggleCheckbox() {
      this.allSelected = !this.allSelected;
    },
    toggleChildCheckbox(index) {
      this.$set(this.selectList, index, !this.selectList[index]);
    },
  }
}
</script>
<template>
  <v-app style="background-color: #242424">
    <v-container>
      <div class="ml-1 mt-28" style="color: #FFFFFF">
        <div class="mt-12 mb-12 text-center">
          <div style="font-family: Inter-Black;font-size: 25px;font-weight: 800;">IP, BRAND<span
              style="font-family: Inter;font-family: Inter;font-size: 25px;font-weight: 700">를 입다</span></div>
          <!--          <div style="font-family: Inter;font-size: 30px;font-weight: 700;">브랜딥 입니다.</div>-->
          <div><img src="@/assets/icons/ico-medium-brandip-logo.svg" class="mx-auto"></div>
        </div>
        <div class="mt-20 mb-20">
          <p class="mt-2" style="font-family: Inter;font-size: 14px;font-weight: 700;">SNS 계정<span
              style="font-family: Inter;font-size: 14px;font-weight: 400;">으로 간편하게 로그인하세요.</span></p>
          <v-img src="@/assets/icons/ico-kakao-login.svg" class="mb-3 ma-auto cursor-pointer" max-width="400"
                 @click="loginWithKakao">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <div class="text-center" style="font-family: Inter;font-size: 16px;font-weight: 700;">Kakao 로그인</div>
            </v-row>
          </v-img>

          <v-img src="@/assets/icons/ico-naver-login.svg" class="mb-3 ma-auto cursor-pointer" max-width="400"
                 id="naverIdLogin_loginButton">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <div class="text-center white--text" style="font-family: Inter;font-size: 16px;font-weight: 700;">Naver
                로그인
              </div>
            </v-row>
          </v-img>

          <v-img src="@/assets/icons/ico-google-login.svg" class="mb-3 ma-auto cursor-pointer" max-width="400"
                 @click="GoogleLoginBtn">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <div class="text-center" style="font-family: Inter;font-size: 16px;font-weight: 700;">Google 로그인</div>
            </v-row>
          </v-img>

          <v-img src="@/assets/icons/ico-apple-login.svg" class="ma-auto" max-width="400">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <div class="text-center white--text" style="font-family: Inter;font-size: 16px;font-weight: 700;">Apple
                로그인
              </div>
            </v-row>
          </v-img>


          <!--          <v-btn class="custom-btn" style="background-color: #000000; color: white" elevation="0"-->
          <!--                 @click="handleAppleSignIn" rounded>-->
          <!--            <v-img src="/img/common/ico-apple.svg" width="30" height="30" class="left-aligned-img"-->
          <!--                   style="color: white"></v-img>-->
          <!--            <span class="centered-text"-->
          <!--                  style='text-transform: none;font-family: Inter;font-size: 13px;font-weight: 700;'>Apple 로그인</span>-->
          <!--          </v-btn>-->
          <!--          <div class="g_id_signin" data-type="icon" data-shape="circle"></div>-->
          <!--                <div id="appleid-signin" class="signin-button"-->
          <!--                    data-color="black"-->
          <!--                    data-border="true"-->
          <!--                    data-type="sign-in"-->
          <!--                ></div>-->
          <!--          <div id="appleid-signin" data-mode="logo-only" data-color="black" data-border="false" data-border-radius="15" data-size="60"></div>-->
        </div>

        <div class="text-center">
          <v-dialog content-class="bottom-dialog" v-model="dialog" scrollable persistent
                    hide-overlay transition="dialog-bottom-transition">
            <v-card width="100%" style="background-color: #FFFFFF">
              <v-divider></v-divider>
              <v-row class="ma-3">
                <v-col cols="12">
                  <div class="mb-10" style="overflow-x: auto">
                    <div
                        style="background-color: #EFEFEF; border-radius: 25px;height: 50px;margin-top: 5px;display: flex;justify-content: left;align-items: center"
                    class="custom-div">
                      <v-checkbox color="#1D55F0" v-model="allSelected" class="ml-4"/>
                      <span style="font-family: Inter;font-size: 22px;font-weight: 700;color: #000000"
                            @click="toggleCheckbox">전체 동의하기</span>
                    </div>
                    <div class="mt-4">
                      <template v-for="(item, index) in terms">
                        <div style="display: flex; align-items: center; white-space: nowrap;" class="ml-4">
                          <v-checkbox
                              :value="item"
                              v-model="selectList"
                              :key="index"
                              dense
                              color="#9E9E9E"
                              :id="'checkbox-' + index"
                          />
                          <label :for="'checkbox-' + index" class="mb-2">
                            <span class="mb-2"
                                  style="font-family: Inter;font-size: 17px;font-weight: 400;">{{ item.title }}</span>

                          <span v-if="item.require === 1" style="font-size: 17px;font-weight: 700;" class="mb-2 ml-1">(필수)</span>
                          <span v-else style="font-size: 17px;font-weight: 700;" class="mb-2 ml-1">(선택)</span>
                          </label>
                          <v-spacer></v-spacer>
                          <span v-if="item.view === 1" class="ml-2 mb-2 cursor-pointer"
                                style="font-weight: 600;color: #9E9E9E" @click="termsDetail(item.code)">></span>
                        </div>
                      </template>
                    </div>
                  </div>
                  <v-btn
                      rounded
                      :color="btnColor"
                      @click="postTerms"
                      :disabled="isDisabled"
                      style="font-family: Inter;font-size: 16px;font-weight: 700;"
                      elevation="0"
                      :width="$vuetify.breakpoint.width <= 1024 ? `100%` : `400px`"
                      height="50"
                      class="mb-5"
                  >
                    다음으로
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </div>
        <v-row justify="center">
          <v-dialog
              v-model="termsDialog"
              style="z-index: 999;"
              overlay-color="#ffffff"
              :max-width="$vuetify.breakpoint.width <= 1024 ? `100%` : `460px`"
          >
            <v-card class="text-center" :max-width="$vuetify.breakpoint.width <= 1024 ? `100%` : `460px`">
              <v-card-title>
                <span class="text-h5">{{ termsInfo.title }}</span>
              </v-card-title>
              <v-card-text v-html="termsInfo.contents" class="card-txt">
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="termsDialog = false"
                    elevation="0"
                >
                  확인
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
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
  overflow: hidden;
  max-width: 460px;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
}

.v-dialog__content--active {
  left: 230px;
  @media screen and (max-width: 1024px) {
    left: 0 !important;
  }
}

.v-dialog__content {
  left: 230px;
  @media screen and (max-width: 1024px) {
    left: 0 !important;
  }
}

.card-txt {
  max-height: 460px;
  max-width: 460px;
  overflow: auto;
  white-space: pre-wrap;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
}
.custom-div {
  max-width: 400px;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
}
</style>
