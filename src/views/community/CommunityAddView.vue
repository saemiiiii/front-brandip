<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedItem: null,
      categories: [],
      uploadedImages: [],
      title: ``,
      description: ``,
      dialog: false,
      message: ``,
      menuTitle: ``,
      blob: ``,
      selectedFile: null,
      selectedFiles: [],
      deleteUpload: [],
      comm: {},
    }
  },
  mounted() {
    this.getCategory();
    this.comm = this.$route.query.comm ? JSON.parse(this.$route.query.comm) : {}
    this.selectedItem = this.comm.type ? this.comm.type : null;
    this.title = this.comm.title ? this.comm.title : ``;
    this.description = this.comm.contents ? this.comm.contents : ``;
    this.menuTitle = this.$route.query.comm ? `수정하기` : `글쓰기`;
    if(this.$route.query.comm && this.comm.urls.length > 0) {
      this.comm.urls.forEach((el) => {
        this.uploadedImages.push(el);
      })
    }
  },
  methods: {
    getCategory() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=community`)
          .then(res => {
            this.categories = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      let input = event.target;
      if (input.files && input.files.length > 0) {
        // 파일이 선택된 경우 배열에 파일 추가
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          // 파일 미리보기 URL을 생성
          const url = window.URL.createObjectURL(file);
          // 파일 정보를 배열에 추가
          this.uploadedImages.push({
            file,
            url,
          });
          this.selectedFiles.push({
            file,
            url
          })
        }
      }
    },
    addCommunity() {
      if (this.$route.query.comm) {
        const formData = new FormData();
        formData.append(`type`, this.selectedItem);
        formData.append(`title`, this.title);
        formData.append(`contents`, this.description);
        formData.append(`communityIdx`, this.comm.communityIdx);
        formData.append(`deleteFile`, this.deleteUpload);
        if(this.selectedFiles.length > 0) {
          Array.from(this.uploadedImages).forEach((el) => {
            formData.append("files", el.file);
          });
        } else {
          Array.from(this.selectedFiles).forEach((el) => {
            formData.append("files", el.file);
          });
        }
        axios.put(`${process.env.VUE_APP_SERVICE_URL}v1/community`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(() => {
              this.dialog = true;
              this.message = `커뮤니티가 수정되었습니다.`;
            })
            .catch(err => {
              console.error(err);
            })
      } else {
        const formData = new FormData();
        formData.append(`type`, this.selectedItem);
        formData.append(`title`, this.title);
        formData.append(`contents`, this.description);
        Array.from(this.uploadedImages).forEach((el) => {
          formData.append("files", el.file);
        });
        axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(() => {
              this.dialog = true;
              this.message = `커뮤니티가 등록되었습니다.`;
            })
            .catch(err => {
              console.error(err);
            })
      }
    },
    deleteImage(communityFileIdx, index) {
      this.uploadedImages.splice(index, 1);
      this.deleteUpload.push(communityFileIdx);
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <div>
          <div style="font-family: Inter;font-size: 30px;font-weight: 700;text-align: left;" class="mb-6">{{ menuTitle }}</div>
          <v-select
              v-model="selectedItem"
              :items="categories"
              item-text="value"
              item-value="key"
              label="게시글 주제 선택"
              density="comfortable"
              style="font-family: Inter;font-size: 20px;font-weight: 700;"
          ></v-select>
          <v-text-field label="제목(최대 20자 이내)" v-model="title"
                        style="font-family: Inter;font-size: 20px;font-weight: 700;color: #BEBEBE"></v-text-field>
          <v-textarea outlined
                      style="border-radius: 15px;border: 2px;font-family: Inter;font-size: 15px;font-weight: 700;"
                      v-model="description"></v-textarea>
        </div>
        <div class="text-left ml-1">
          <p style="font-family: Inter;font-size: 20px;font-weight: 700;">사진</p>
          <v-row class="ml-1">
            <v-card width="70" height="70" style="border: 1px solid #9E9E9E" elevation="0" @click="openFileInput"
                    class="mr-2">
              <img src="@/assets/icons/ico-no-img.svg" width="22" height="22" style="margin: auto; padding-top: 35%">
            </v-card>
            <v-card width="70" height="70" v-for="(image, index) in uploadedImages" :key="index" class="mr-2">

              <img :src="image.url">
              <img src="@/assets/icons/ico-x-box.svg" class="text-right" style="position: absolute; top: 0; right: 0;"
                   @click="deleteImage(image.communityFileIdx, index)">

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
                     @click="addCommunity">완료
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
                    @click="$router.push('/community').catch(()=>{})"
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