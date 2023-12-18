<script>
import axios from "axios";
export default {
  data() {
    return {
      address: ``,
      zipcode: ``,
      addressDetail: ``,
      phone: ``,
      deliveryName: ``,
      username: ``,
      main: 0,
      isChecked: false,
      phoneOne: ``,
      phoneTwo: ``,
      phoneThree: ``,
      isDisabled: false
    }
  },
  mounted() {

  },
  methods: {
    addDelivery() {
      axios.post(`v1/me/delivery`, {
        zipcode: this.zipcode,
        address: this.address,
        addressDetail: this.addressDetail,
        phone: this.phoneOne + this.phoneTwo + this.phoneThree,
        deliveryName: this.deliveryName,
        username: this.username,
        main: this.main ? 1 : 0
      },)
          .then((res) => {
            if (res.data.resultCode === 200) {
              this.$router.push('/delivery').catch(()=>{});
            }
          })
          .catch(err => {
            console.error(err)
          })
    },
    openAddr() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }
          this.zipcode = data.zonecode;
        },
      }).open();
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="ml-2 mr-2 mt-20">
        <div style="font-family: Inter;font-size: 30px;font-weight: 700;text-align: left;">주소 추가</div>
        <v-text-field value="기본배송지 설정" readonly>
          <template v-slot:append>
            <input type="checkbox" style="color: #1D55F0" v-model="isChecked">
          </template>
        </v-text-field>
        <v-row>
          <v-col>
            <div class="float-left">
              <span class="font-bold text-sm mr-1"
                    style="display: inline-block; font-family: Inter;font-size: 13px;font-weight: 700;">배송지 이름</span>
              <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
            </div>
          </v-col>
        </v-row>
        <v-text-field outlined placeholder="예 : 회사, 집" v-model="deliveryName"></v-text-field>
        <v-row>
          <v-col>
            <div class="float-left">
              <span class="font-bold text-sm mr-1"
                    style="display: inline-block;font-family: Inter;font-size: 13px;font-weight: 700;">받는 사람 이름</span>
              <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
            </div>
          </v-col>
        </v-row>
        <v-text-field outlined placeholder="예 : 홍길동" v-model="username"></v-text-field>
        <v-row>
          <v-col>
            <div>
              <div class="float-left">
              <span class="font-bold text-sm mr-1"
                    style="display: inline-block;font-family: Inter;font-size: 13px;font-weight: 700;">주소</span>
                <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
              </div>
              <div class="float-right">
                <span class="underline"
                      style="color:#FF1A77;font-family: Inter;font-size: 13px;font-weight: 700;"
                      @click="openAddr">주소검색</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-text-field outlined placeholder="주소 검색을 눌러 주소를 검색하세요" v-model="address" readonly></v-text-field>
        <v-text-field outlined placeholder="상세주소를 입력해주세요" v-model="addressDetail"></v-text-field>
        <v-row>
          <v-col>
            <div class="float-left">
              <span class="font-bold text-sm mr-1"
                    style="display: inline-block;font-family: Inter;font-size: 13px;font-weight: 700;">연락처</span>
              <v-img src="@/assets/icons/ico-check.svg" width="11" height="11" style="display: inline-block;"></v-img>
            </div>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="mr-1">
            <v-text-field outlined v-model="phoneOne"></v-text-field>
          </v-col>
          <v-col class="mr-1">
            <v-text-field outlined v-model="phoneTwo"></v-text-field>
          </v-col>
          <v-col>
            <v-text-field outlined v-model="phoneThree"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-1 mr-1">
          <v-btn rounded color="primary" width="100%" style="font-family: Inter;font-size: 16px;font-weight: 700;"
                 @click="addDelivery" :disabled="!deliveryName || !username || !address || !addressDetail || !phoneOne || !phoneTwo || !phoneThree">배송지 추가
          </v-btn>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<style>
</style>