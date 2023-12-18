<script>
import axios from "axios";
import jwt from "jsonwebtoken";
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.VUE_APP_NEXT_S3_KEY,
  secretAccessKey: process.env.VUE_APP_NEXT_S3_SEC,
  region: ``,
});
export default {
  data() {
    return {
      selectedItem: null,
      categories: [],
      uploadedImages: [],
      sub: null,
      title: ``,
      description: ``,
      dialog: false,
      message: `문의가 등록되었습니다.`,
      blob: ``,
      selectedFile: null,
      selectedFiles: [],
    }
  },
  mounted() {
    this.getCategory();
    this.decodeToken();
  },
  methods: {
    getCategory() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=inquiry`)
          .then(res => {
            this.categories = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    uploadImage(file) {
      Array.from(file).forEach((el) => {
        const params = {
          Bucket: 'wownft-develop-upload-s3',
          Key: `renewal/user/${this.sub}/profile/${el.name}`,
          Body: el,
          ContentType: el.type,
        };
        s3.upload(params, (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          this.uploadedImages.push(data.Location);
        });
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
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      let selectedFile = event.target.files;
      if (selectedFile) {
        this.selectedFiles = selectedFile;
        this.uploadImage(selectedFile);
      }
    },
    addInquiry() {
      const formData = new FormData();
      formData.append(`type`, this.selectedItem);
      formData.append(`title`, this.title);
      formData.append(`description`, this.description);
      Array.from(this.selectedFiles).forEach((el) => {
        formData.append("files", el);
      });
      axios.post(`v1/cs/inquiry`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(() => {
            this.dialog = true;
          })
          .catch(err => {
            console.error(err);
          })
    },
    deleteImage(index) {
      this.uploadedImages.splice(index, 1);
      this.selectedFiles = [];
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        <div>
          <div style="font-family: Inter;font-size: 30px;font-weight: 700;text-align: left;" class="mb-6">1:1 문의하기</div>
          <v-select
              v-model="selectedItem"
              :items="categories"
              item-text="value"
              item-value="key"
              label="문의 유형 선택"
              density="comfortable"
              style="font-family: Inter;font-size: 20px;font-weight: 700;"
          ></v-select>
          <v-text-field label="제목(최대 20자 이내)" v-model="title" style="font-family: Inter;font-size: 20px;font-weight: 700;color: #BEBEBE"></v-text-field>
          <v-textarea outlined style="border-radius: 15px;border: 2px;font-family: Inter;font-size: 15px;font-weight: 700;" v-model="description"></v-textarea>
        </div>
        <div class="text-left ml-1">
          <p style="font-family: Inter;font-size: 20px;font-weight: 700;">사진</p>
          <v-row class="ml-1">
            <v-card width="70" height="70" style="border: 1px solid #9E9E9E" elevation="0" @click="openFileInput"
                    class="mr-2">
              <img src="@/assets/icons/ico-no-img.svg" width="22" height="22" style="margin: auto; padding-top: 35%">
            </v-card>
            <v-card width="70" height="70" v-for="(image, index) in uploadedImages" :key="index" class="mr-2">
              <img :src="image" width="22" height="22">
              <img src="@/assets/icons/ico-x-box.svg" class="text-right" style="position: absolute; top: 0; right: 0;" @click="deleteImage(index)">
            </v-card>
            <input type="file" ref="fileInput" hidden="hidden" @change="handleFileUpload" multiple accept="image/*"/>
          </v-row>
          <v-row>
            <v-col cols="12" style="font-family: Inter;font-size: 13px;font-weight: 700;color: #BEBEBE">
              파일 첨부하기 (최대 10MB)
            </v-col>
          </v-row>
          <v-row class="pt-5">
            <v-col cols="12" class="text-center">
              <v-btn width="100%" color="primary" :disabled="!selectedItem || !title || !description"
                     style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 16px;font-weight: 700;"
                     @click="addInquiry">완료
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div class="text-center">
          <v-dialog
              v-model="dialog"
              max-width="328"
              style="z-index: 9999"
          >
            <v-card height="163" style="border-radius: 15px">
              <v-card-title style="font-family: Inter;font-size: 20px;font-weight: 700;">
                {{ message }}
              </v-card-title>
              <v-card-actions class="mt-10">
                <v-btn
                    rounded
                    color="primary"
                    width="100%"
                    @click="$router.push('/inquiry-list').catch(()=>{})"
                >
                  확인
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>