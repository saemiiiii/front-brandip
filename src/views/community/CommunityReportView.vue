<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      selectItem: {},
      targetIdx: this.$route.query.id ? this.$route.query.id : this.$route.query.commentIdx,
      type: this.$route.query.id ? `COMMUNITY` : `COMMENT`,
      code: ``,
      value: ``,
      description: ``,
      dialog: false,
      message: ``,
    }
  },
  mounted() {
    this.getReportCategory();
  },
  methods: {
    getReportCategory() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=COMMUNITY_INQUIRY`)
          .then(res => {
            this.categories = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    reportCommunity() {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community/inquiry`, {
        targetIdx: this.targetIdx,
        type: this.type,
        code: this.selectItem.key,
        value: this.selectItem.value === `기타` ? this.description : this.selectItem.value,
      },)
          .then(() => {
            this.dialog = true;
            this.message = `신고완료`;
          })
          .catch(err => {
            if(err.response.data.resultCode === 4900) {
              this.dialog = true;
              this.message = err.response.data.message;
            } else {
              console.error(err);
            }
          })
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <div style="font-family: Inter;font-size: 30px;font-weight: 700; text-align: left">
          신고사유
          <v-radio-group
              v-model="selectItem"
              column
          >
            <v-radio
                v-for="c in categories"
                :key="c.idx"
                :label="c.value"
                :value="c"
                style="font-family: Inter;font-size: 16px;font-weight: 600; color: black"
            ></v-radio>
          </v-radio-group>
          <v-textarea style="height: 182px;border: 1px;" outlined v-model="description" v-if="selectItem.value === `기타`"></v-textarea>
          <v-btn class="mt-8" width="100%"
                 style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 16px;font-weight: 700;"
                 elevation="0" color="primary" @click="reportCommunity" :disabled="!selectItem" >신고하기
          </v-btn>
        </div>
        <div class="text-center">
          <v-dialog
              v-model="dialog"
              max-width="328"
              style="z-index: 999"
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
                    @click="$router.push(`/community`).catch(()=>{});"
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