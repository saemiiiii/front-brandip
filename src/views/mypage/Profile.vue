<script>
import {mapGetters} from "vuex";
import axios from "axios";
import AWS from 'aws-sdk';
import jwt from 'jsonwebtoken';

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_NEXT_S3_KEY,
  secretAccessKey: process.env.VUE_APP_NEXT_S3_SEC,
  region: ``,
});
export default {
  data() {
    return {
      profileImg: [],
      interest: [],
      profileCode: `PROFILE`,
      interestCode: `INTEREST`,
      nickName: ``,
      message: ``,
      dialog: false,
      interests: [],
      selectedItem: null,
      btnColor: `primary`,
      isDisabled: false,
      profileUrl: ``,
      imgUrl: "/img/common/ico-new-logo.svg",
      decodedToken: null,
      sub: null
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    this.getProfileImg();
    this.getInterest();
    this.decodeToken();
    this.nickName = this.user.nickname ?? ``;
    this.profileUrl = this.user.profileUrl ?? ``;
  },
  methods: {
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
    getInterest() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=${this.interestCode}`)
          .then(res => {
            this.interest = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    checkNickName() {
      if (this.nickName === null || this.nickName === ``) {
        this.dialog = true;
        this.message = `닉네임을 입력해주세요.`;
        this.isDisabled = false;
        return false;
      }
      axios.post(`v1/signin/nickname`, {
        nickname: this.nickName,
      },)
          .then((res) => {
            if (res.data.resultCode === 200) {
              this.isDisabled = true;
            }
          })
          .catch(err => {
            if (err.response) {
              this.dialog = true;
              this.message = err.response.data.message
              this.isDisabled = false;
              return false;
            }
          })
    },
    selectItem(item) {
      if (item) {
        this.selectedItem = item;
        this.profileUrl = item.value;
      }
    },
    updateProfile() {
      axios.put(`v1/me`, {
        nickname: this.nickName,
        profileUrl: this.profileUrl
      },)
          .then(() => {
          })
          .catch(err => {
            console.error(err);
          })
    },
    postJoin() {
      if (this.interests.length === 0) {
        this.message = `관심사를 선택해주세요.`;
        this.dialog = true;
        return false;
      }
      if (!this.profileUrl) {
        this.message = `프로필을 선택해주세요.`;
        this.dialog = true;
        return false;
      }
      axios.put(`v1/me/interest`, {
        keys: this.interests,
      },)
          .then(() => {
            this.updateProfile();
            this.$router.push('/sign-complete')
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
        this.profileUrl = data.Location;
        this.imgUrl = data.Location;
        this.updateProfile();
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
    }
  }
}
</script>
<template>
  <v-app>
    <v-container>
      <div class="mt-16 pt-16 mb-10 text-left">
        <p style="font-family: Inter;font-size: 30px;font-weight: 700;">프로필 설정</p>
      </div>
      <div class="mb-5">
        <v-row>
          <v-col>
            <div class="float-left">
              <span class="mr-1" style="display: inline-block;font-family: Inter;font-size: 13px;font-weight: 700;">닉네임</span>
              <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
            </div>
          </v-col>
        </v-row>
        <v-text-field placeholder="닉네임" v-model="nickName" dense outlined style="font-family: Inter;font-size: 17px;font-weight: 700;">
          <template v-slot:append>
            <v-btn @click="checkNickName" class="mb-2" :color="btnColor" :disabled="isDisabled" rounded elevation="0" style="font-family: Inter;font-size: 14px;font-weight: 700;">중복확인</v-btn>
          </template>
        </v-text-field>
      </div>
      <div class="mb-5">
        <v-row>
          <v-col>
            <div class="float-left">
              <span class="mr-1" style="display: inline-block;font-family: Inter;font-size: 13px;font-weight: 700;">프로필 사진</span>
              <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
            </div>
          </v-col>
        </v-row>
        <v-row class="scroll-container">
          <v-col cols="12" style="max-width: 125px" class="mb-3">
            <v-card height="143" width="113" outlined
                    style="border-radius: 25px; box-shadow: 0px 4px 4px 0px #00000040;" @click="openFileInput">
              <v-avatar size="70" class="mt-4">
                <img v-if="imgUrl" :src="imgUrl" style="position: absolute; top: 0; left: 0;"/>
                <img src="@/assets/icons/ico-update2.svg"
                     style="position: absolute; z-index: 20; top: 43px; left: 43px; width: 25px; height: 25px;box-shadow: 0px 2px 2px 0px #00000040;"/>
              </v-avatar>
              <p style="margin-bottom: 0.5em;margin-top:0.5em;font-family: Inter;font-size: 12px;font-weight: 700;">사진</p>
              <p style="margin-bottom: 0.5em;margin-top:0.5em;font-family: Inter;font-size: 10px;font-weight: 700;">직접 업로드</p>
              <input type="file" ref="fileInput" hidden="hidden" @change="handleFileUpload" accept="image/*"/>
            </v-card>
          </v-col>
          <v-col v-for="(item, index) in profileImg" :key="index" cols="12" style="max-width: 125px">
            <v-card height="143" width="113" outlined
                    style="border-radius: 25px; box-shadow: 0px 4px 4px 0px #00000040;"
                    :class="{ 'bordered-image': selectedItem === item }"
                    @click="selectItem(item)">
              <v-avatar size="70" class="mt-4">
                <v-img
                    :src="item.value"
                >
                </v-img>
              </v-avatar>
              <p style="margin-bottom: 0.5em;margin-top:0.5em;font-family: Inter;font-size: 12px;font-weight: 700;">{{ item.description }}</p>
              <p style="margin-bottom: 0.5em;margin-top:0.5em;font-family: Inter;font-size: 10px;font-weight: 700;">{{ item.key }}</p>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="mb-5">
        <v-row>
          <v-col>
            <div class="float-left">
              <span class="font-bold text-sm mr-1" style="display: inline-block;font-family: Inter;font-size: 13px;font-weight: 700;">관심사</span>
              <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
            </div>
          </v-col>
        </v-row>
        <v-chip-group
            multiple
            v-model="interests"
            style="font-family: Inter;font-size: 16px;font-weight: 700;"
        >
          <v-chip
              v-for="inter in interest"
              :key="inter.idx"
              active-class="secondary"
              color="light-grey"
              :value="inter.key"
          >
            {{ inter.value }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-container>
    <div style="position: absolute; bottom: 30px; width: 100%; text-align: center;">
      <v-btn
          rounded
          color="primary"
          dark
          width="95%"
          @click="$router.push(`/sign-complete`)"
          style="font-family: Inter; font-size: 16px; font-weight: 700;"
      >
        다음으로
      </v-btn>
    </div>
    <div>
      <div class="text-center">
        <v-dialog
            v-model="dialog"
            max-width="328"
        >
          <v-card height="163" style="border-radius: 15px">
            <v-card-title class="text-h6 font-weight-bold justify-center">
              {{ message }}
            </v-card-title>
            <v-card-actions class="mt-10">
              <v-btn
                  rounded
                  color="primary"
                  width="100%"
                  @click="dialog = false"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </v-app>
</template>

<style scoped>
.scroll-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.bordered-image {
  border: 2px solid #FF1A77; /* 원하는 테두리 스타일 및 색상을 지정하세요. */
}
</style>