<script>
import axios from "axios";

export default {
  data() {
    return {
      title: ``,
      contents: ``,
      view: 0,
      dialog: false,
      message: `문의가 등록되었습니다.`,
      blob: ``,
      menu: this.$route.query.title,
      isView: 0,
    }
  },
  watch: {
    isView(v) {
      this.view = v ? 1 : 0
    }
  },
  methods: {
    addInquiry() {
      const body = {
        productIdx: this.$route.query.productIdx,
        contents: this.contents,
        view: this.view,
      };
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/product/inquiry`, body)
          .then(() => {
            this.dialog = true;
          })
          .catch(err => {
            console.error(err);
          })
    },
  }
}
</script>

<template>
  <v-app>
    <div
         style="height: 75px;" class="fixed-div" :style="{ width: $vuetify.breakpoint.xsOnly ? '100%' : '25%'}">
      <div style="display: flex; justify-content: center;" class="mt-5">
<!--        <img src="@/assets/icons/ico-black-left.svg" class="ml-4 cursor-pointer" @click="$router.go(-1);"/>-->
        <span
            style="text-align: center; justify-content: center; margin: auto;font-family: Inter;font-size: 25px;font-weight: 700;">{{
            menu
          }}</span>
      </div>
    </div>
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <div>
          <div style="font-family: Inter;font-size: 30px;font-weight: 700;text-align: left;" class="mb-6">문의하기</div>
          <v-text-field label="제목(최대 20자 이내)" v-model="title" style="font-family: Inter;font-size: 20px;font-weight: 700;color: #BEBEBE"></v-text-field>
          <v-textarea outlined style="border-radius: 15px;border: 2px;font-family: Inter;font-size: 15px;font-weight: 700;" height="300" v-model="contents"></v-textarea>
          <div class="text-left"><input type="checkbox" v-model="isView"> 비밀글입니다.</div>
          <v-row class="pt-5">
            <v-col cols="12" class="text-center">
              <v-btn width="100%" color="primary" :disabled="!contents"
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
                    @click="$router.push(`/product/${$route.query.productIdx}?tab=three`).catch(()=>{})"
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