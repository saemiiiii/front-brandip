<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      categories: [],
      selectItem: null,
      value: ``,
      memo: ``,
      dialog: false,
      message: ``,
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  mounted() {
    this.getQuitCategory();
  },
  methods: {
    getQuitCategory() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=WITHDRAWAL`)
          .then(res => {
            this.categories = res.data.data;
            console.log(this.categories);
          })
          .catch(err => {
            console.error(err);
          })
    },
    reportCommunity() {
      axios.post(`v1/me`, {
        memo: this.selectItem.value === `기타` ? this.memo : this.selectItem.value,
      },)
          .then(() => {
            this.dialog = true;
            this.message = `탈퇴처리 완료되었습니다.<br>그동안 이용해주셔서 감사합니다.`;
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
      <div class="mt-20">
        <div style="font-family: Inter;font-size: 28px;font-weight: 700; text-align: left">
          {{ user.nickname }}님
          <p class="mt-2" style="font-family: Inter;font-size: 18px;font-weight: 700;color: #9E9E9E">탈퇴하시기 전에 아래 내용을 <br> 확인해주세요.</p>
          <v-row no-gutters style="font-family: Inter;font-size: 16px;font-weight: 800;">
            <v-col cols="12">보유하신 포인트는 소멸 처리되며, 환불되지 않습니다.<hr style="border: 1px solid #BEBEBE" class="mt-2 mb-2"></v-col>
            <v-col cols="12">구매정보 및 개인정보는 모두 삭제되며,<br>복구할 수 없습니다.<hr style="border: 1px solid #BEBEBE" class="mt-2 mb-2"></v-col>
            <v-col cols="12">게시글이나 댓글은 탈퇴 후에도삭제되지 않습니다.<br>
              게시글 등의 삭제를 원하시는 경우는 반드시 탈퇴하시기<br>
              전에 직접 삭제하신 후, 탈퇴 신청을 해 주시기 바랍니다.<hr style="border: 1px solid #BEBEBE" class="mt-2 mb-2"></v-col>
            <v-col cols="12">탈퇴한 아이디로는 재가입이 불가능합니다.<hr style="border: 1px solid #BEBEBE" class="mt-2 mb-2"></v-col>
            <v-col cols="12">탈퇴 후 일주일 동안 재가입이 불가능합니다.<hr style="border: 1px solid #BEBEBE" class="mt-2 mb-2"></v-col>
          </v-row>

          <p class="mt-14" style="font-family: Inter;font-size: 18px;font-weight: 800;">탈퇴 사유를 알려주세요.<br>더 좋은 서비스가 되도록 노력하겠습니다.</p>
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
          <v-textarea style="height: 182px;border: 1px;" outlined v-model="memo"></v-textarea>
          <v-btn class="mt-8" width="100%"
                 style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 16px;font-weight: 700;"
                 elevation="0" @click="reportCommunity" :disabled="!selectItem" >탈퇴하기
          </v-btn>
        </div>
        <div class="text-center">
          <v-dialog
              v-model="dialog"
              max-width="328"
              style="z-index: 999"
          >
            <v-card height="163" style="border-radius: 15px">
              <v-card-title style="font-family: Inter;font-size: 20px;font-weight: 700;" v-html="message">
              </v-card-title>
              <v-card-actions class="mt-10">
                <v-btn
                    rounded
                    color="primary"
                    width="100%"
                    @click="localStorage.removeItem(`token`)"
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