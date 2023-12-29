<script>
import {mapGetters} from "vuex";
import axios from "axios";
import jwt from "jsonwebtoken";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_NEXT_S3_KEY,
  secretAccessKey: process.env.VUE_APP_NEXT_S3_SEC,
  region: ``,
});
export default {
  components: {},
  data() {
    return {
      switch1: true,
      type: null,
      btnColor: `primary`,
      phoneBtnColor: `primary`,
      isDisabled: false,
      isPhoneDisabled: false,
      nickName: null,
      phone: null,
      txt: null,
      phoneTxt: null,
      notiEmail: 0,
      notiMarketing: 0,
      notiService: 0,
      notiSms: 0,
      dialog: false,
      selectedItem: null,
      profileImg: [],
      profileCode: `PROFILE`,
      profileUrl: "",
      decodedToken: null,
      sub: null,
      imgUrl: ``,
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    if (this.user.socialType === `K`) {
      this.type = `카카오톡`
    } else if (this.user.socialType === `G`) {
      this.type = `구글`;
    } else {
      this.type = `네이버`;
    }
    this.nickName = this.user.nickname;
    this.phone = this.user.phone;
    this.notiEmail = this.user.notiEmail;
    this.notiMarketing = this.user.notiMarketing;
    this.notiService = this.user.notiService;
    this.notiSms = this.user.notiSms;
    this.profileUrl = this.user.profileUrl;
    this.imgUrl = this.user.profileUrl;
    this.getProfileImg();
    this.decodeToken();
  },
  methods: {
    checkNickName() {
      if (this.nickName === null || this.nickName === ``) {
        this.txt = `닉네임을 입력해주세요.`;
        this.isDisabled = false;
        return false;
      }
      if (/^[a-zA-Z0-9가-힣]*$/.test(this.nickName) === false) {
        this.txt = `특수문자를 사용하실 수 없습니다.`;
        this.isDisabled = false;
        return false;
      }
      axios.post(`v1/signin/nickname`, {
        nickname: this.nickName,
      },)
          .then((res) => {
            if (res.data.resultCode === 200) {
              this.txt = `사용 가능한 닉네임 입니다.`
              this.updateProfile();
              return false;
            }
          })
          .catch(err => {
            if (err.response) {
              this.txt = err.response.data.message
              this.isDisabled = false;
              return false;
            }
          })
    },
    checkPhone() {
      if (/^(\+82|0)1[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/.test(this.phone) === false) {
        this.phoneTxt = `휴대폰 번호 형식이 아닙니다.`;
        this.isPhoneDisabled = false;
        return false;
      } else {
        this.phoneTxt = `변경 완료`;
        this.isPhoneDisabled = true;
        this.updateProfile();
      }
    },
    updateProfile() {
      axios.put(`v1/me`, {
        nickname: this.nickName,
        email: this.user.email,
        profileUrl: this.imgUrl,
        notiService: this.notiService ? 1 : 0,
        notiMarketing: this.notiMarketing ? 1 : 0,
        notiSms: this.notiSms ? 1 : 0,
        notiEmail: this.notiEmail ? 1 : 0
      },)
          .then(() => {
            location.reload();
          })
          .catch(err => {
            console.error(err);
          })
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        this.uploadImage(selectedFile);
      }
    },
    selectItem(item) {
      if (item) {
        this.selectedItem = item;
        this.imgUrl = item.value;
      }
    },
    getProfileImg() {
      let images = [];
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=${this.profileCode}`)
          .then(res => {
            if (res.data.data.length > 0) {
              res.data.data.map((item, index) => {
                images.push({
                  no: index + 1,
                  id: item.idx,
                  value: item.value,
                  key: item.key,
                  description: item.description
                });
              });
            }
            this.profileImg = images;
          })
          .catch(err => {
            console.error(err);
          })
    },
    updateImg() {
      this.dialog = false;
      this.updateProfile();
    },
    uploadImage(file) {
      const params = {
        Bucket: 'wownft-develop-upload-s3',
        Key: `renewal/user/${this.sub}/profile/${file.name}`,
        Body: file,
        ContentType: file.type,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // this.profileUrl = data.Location;
        this.imgUrl = data.Location;
        // this.updateProfile();
      });
    },
    decodeToken() {
      try {
        const decoded = jwt.decode(localStorage.getItem('token'));
        this.decodedToken = decoded;
        this.sub = this.decodedToken.sub;
      } catch (error) {
        console.error('토큰을 복호화할 수 없습니다.', error);
      }
    },
    uploadCancel() {
      this.imgUrl = this.profileUrl;
      this.dialog = false;
    }
  }
}
</script>

<template>
  <v-app class="custom-background">
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <div style="position: relative;max-width: 124px;margin: auto">
          <v-avatar size="124" class="mb-4 cursor-pointer" @click="dialog = true"
                    style="box-shadow: 0px 2px 2px 0px #00000040;">
            <img :src="profileUrl"/>
          </v-avatar>
          <img src="@/assets/icons/ico-update2.svg"
               style="position: absolute; z-index: 9; top: 90px; right: 10px; width: 30px; height: 30px;"/>
        </div>
        <div>
          <v-chip
              class="mb-4"
              style="font-family: Inter; font-size: 11px; font-weight: 700; color: #9E9E9E; background-color: #EFEFEF; display: flex; align-items: start; max-width: 120px;display: flex; align-items: center; justify-content: center;">
            SNS 연동 : {{ this.type }}
          </v-chip>
          <span
              style="font-family: Inter;font-size: 13px;font-weight: 700; display: flex; justify-content: end; color: #9E9E9E">{{
              txt
            }}</span>
          <v-text-field label="닉네임" v-model="nickName" background-color="#EFEFEF" flat solo
                        style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left;border-radius: 25px">
            <template v-slot:append>
              <v-btn @click="checkNickName" rounded :color="btnColor" :disabled="isDisabled" elevation="0"
                     style="font-family: Inter;font-size: 15px;font-weight: 700;" height="30">변경
              </v-btn>
            </template>
          </v-text-field>

          <v-text-field label="이메일" :value="this.user.email" readonly class="text-gray" background-color="#EFEFEF" flat solo
                        style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left;border-radius: 25px;">
          </v-text-field>
          <!--          <span-->
          <!--              style="font-family: Inter;font-size: 13px;font-weight: 700; display: flex; justify-content: end; color: #BEBEBE">{{-->
          <!--              phoneTxt-->
          <!--            }}</span>-->
          <!--          <v-text-field label="전화번호" v-model="phone"-->
          <!--                        style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left;">-->
          <!--            <template v-slot:append>-->
          <!--              <v-btn @click="checkPhone" rounded class="mb-2" :color="phoneBtnColor" :disabled="isPhoneDisabled">변경-->
          <!--              </v-btn>-->
          <!--            </template>-->
          <!--          </v-text-field>-->
        </div>
        <div class="mt-10" style="color: #FFFFFF">
          <div class="flex-container">
            <div style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px; text-align: left;">서비스
              알림<br>
              <p style="font-family: Inter; font-size: 15px; font-weight: 300; line-height: 18px; text-align: left;"
                 class="mb-3">
                와우플래닛의 서비스 관련 소식을 <br> 푸시알림으로 받아볼 수 있습니다.
              </p>
            </div>
            <v-switch v-model="notiService" inset class="switch-right" @click="updateProfile"></v-switch>
          </div>
          <div class="flex-container">
            <div style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px; text-align: left;">마케팅
              및 이벤트 알림<br>
              <p style="font-family: Inter; font-size: 15px; font-weight: 300; line-height: 18px; text-align: left;"
                 class="mb-3">
                다양한 혜택과 이벤트 관련 소식을 <br> 푸시알림으로 받아볼 수 있습니다.
              </p>
            </div>
            <v-switch v-model="notiMarketing" inset class="switch-right" @click="updateProfile"></v-switch>
          </div>
          <div class="flex-container">
            <div style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px; text-align: left;">SMS
              수신 동의
            </div>
            <v-switch v-model="notiSms" inset class="switch-right" @click="updateProfile"></v-switch>
          </div>
          <div class="flex-container">
            <div style="font-family: Inter; font-size: 20px; font-weight: 700; line-height: 24px; text-align: left;">
              E-Mail 수신 동의<br>
            </div>
            <v-switch v-model="notiEmail" inset class="switch-right" @click="updateProfile"></v-switch>
          </div>
        </div>
        <div class="mt-10">
          <p style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left; color: #C2C2C2"
             class="cursor-pointer" @click="$router.push(`/quit`).catch(()=>{})">회원 탈퇴</p>
        </div>
        <div class="text-center">
          <v-dialog :max-width="$vuetify.breakpoint.xsOnly ? `100%` : `25%`" content-class="bottom-dialog"
                    v-model="dialog"
                    hide-overlay transition="dialog-bottom-transition">
            <v-card width="100%" style="background-color: white">
              <div style="position: relative;max-width: 124px;margin: auto">
                <v-avatar size="124" class="mt-6 cursor-pointer" @click="openFileInput"
                          style="box-shadow: 0px 2px 2px 0px #00000040;">
                  <img :src="imgUrl"/>
                </v-avatar>
                <img src="@/assets/icons/ico-update2.svg"
                     style="position: absolute; z-index: 9; top: 115px; right: 5px; width: 30px; height: 30px;"/>
              </div>
              <input type="file" ref="fileInput" hidden="hidden" @change="handleFileUpload" accept="image/*"/>
              <div class="mb-5">
                <v-row>
                  <v-col>
                    <div class="float-left mt-6 ml-4">
                      <span class="font-bold text-sm mr-1"
                            style="display: inline-block;font-family: Inter;font-size: 20px;font-weight: 700;text-align: left;">슈먼즈 프로필은 어떠신가요?</span>
                    </div>
                  </v-col>
                </v-row>
                <div class="mb-5">
                  <v-row class="scroll-container ml-2 mr-2">
                    <v-col v-for="(item, index) in profileImg" :key="index" cols="12" style="max-width: 125px">
                      <v-card height="143" width="113" outlined
                              style="border-radius: 25px; box-shadow: 0px 4px 4px 0px #00000040;"
                              :class="{ 'bordered-image': selectedItem === item }"
                              @click="selectItem(item)">
                        <v-avatar size="70" class="mt-6">
                          <v-img
                              :src="item.value"
                          >
                          </v-img>
                        </v-avatar>
                        <p class="text-xs font-bold" style="margin-bottom: 0.5em">{{ item.description }}</p>
                        <p class="text-xs font-bold">{{ item.key }}</p>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <div class="ma-auto mt-6 mb-6">
                      <v-btn color="#DAD8D8" width="140" height="37"
                             style="font-family: Inter;font-size: 16px;font-weight: 700;border-radius: 25px 0 0 25px;"
                             @click="updateImg">
                        변경
                      </v-btn>
                      <v-btn color="#DAD8D8" width="140" height="37"
                             style="font-family: Inter;font-size: 16px;font-weight: 700;border-radius: 0px 25px 25px 0px"
                             @click="uploadCancel()">
                        취소
                      </v-btn>
                    </div>
                  </v-row>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style>
.text-gray input {
  color: grey !important;
}

.flex-container {
  display: flex;
  flex-direction: row;
  align-items: center; /* 텍스트와 다른 요소를 세로 중앙 정렬 */
}

.switch-right {
  margin-left: auto; /* 스위치를 오른쪽으로 이동 */
}

.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
  overflow: hidden;
}

.v-dialog__content--active {
  left: 12.5%;
  @media screen and (max-width: 1020px) {
    left: 0 !important;
  }
}

.v-dialog__content {
  left: 12.5%;
  @media screen and (max-width: 1020px) {
    left: 0 !important;
  }
}

.scroll-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.bordered-image {
  background: linear-gradient(180deg, #FBC227 0%, #F04A26 100%);
}

.custom-background {
  background-color: #242424 !important;
}

.theme--light.v-input--switch .v-input--switch__track {
  color: #9E9E9E;
}
</style>