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
      isDisabled: false,
      delivery: {},
      idx: 0,
      title: ``,
    }
  },
  mounted() {
    this.delivery = this.$route.query.delivery ? JSON.parse(this.$route.query.delivery) : {}
    this.address = this.delivery.address ? this.delivery.address : ``;
    this.addressDetail = this.delivery.addressDetail ? this.delivery.addressDetail : ``;
    this.deliveryName = this.delivery.deliveryName ? this.delivery.deliveryName : ``;
    this.idx = this.delivery.idx ? this.delivery.idx : 0;
    this.phone = this.delivery.phone ? this.delivery.phone : ``;
    this.username = this.delivery.username ? this.delivery.username : ``;
    this.zipcode = this.delivery.zipcode ? this.delivery.zipcode : ``;
    this.main = this.delivery.main ? this.delivery.main : 0;
    this.isChecked = this.delivery.main ? true : false;
    this.title = this.$route.query.delivery ? `수정` : `추가`;
  },
  methods: {
    addDelivery() {
      if (this.$route.query.delivery) {
        axios.put(`v1/me/delivery`, {
          idx: this.idx,
          zipcode: this.zipcode,
          address: this.address,
          addressDetail: this.addressDetail,
          phone: this.phone,
          deliveryName: this.deliveryName,
          username: this.username,
          main: this.main ? 1 : 0
        },)
            .then((res) => {
              if (res.data.resultCode === 200) {
                this.$router.push('/delivery').catch(() => {
                });
              }
            })
            .catch(err => {
              console.error(err)
            })
      } else {
        axios.post(`v1/me/delivery`, {
          zipcode: this.zipcode,
          address: this.address,
          addressDetail: this.addressDetail,
          phone: this.phone,
          deliveryName: this.deliveryName,
          username: this.username,
          main: this.main ? 1 : 0
        },)
            .then((res) => {
              if (res.data.resultCode === 200) {
                this.$router.push('/delivery').catch(() => {
                });
              }
            })
            .catch(err => {
              console.error(err)
            })
      }
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
    },
    isValidPhone(phone) {
      // 휴대전화 번호 정규식
      const phoneRegex = /^010\d{8}$/;

      // 정규식 체크
      return phoneRegex.test(phone);
    },
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <div style="font-family: Inter;font-size: 30px;font-weight: 700;text-align: left;">주소 {{ title }}</div>
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
              <div class="float-right cursor-pointer">
                <span class="underline"
                      style="color:#FF1A77;font-family: Inter;font-size: 13px;font-weight: 700;"
                      @click="openAddr">주소검색</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-text-field outlined placeholder="주소 검색을 눌러 주소를 검색하세요" v-model="address" readonly
                      @click="openAddr"></v-text-field>
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
          <!--          <v-col class="mr-1">-->
          <!--            <v-text-field outlined v-model="phoneOne"></v-text-field>-->
          <!--          </v-col>-->
          <!--          <v-col class="mr-1">-->
          <!--            <v-text-field outlined v-model="phoneTwo"></v-text-field>-->
          <!--          </v-col>-->
          <!--          <v-col>-->
          <!--            <v-text-field outlined v-model="phoneThree"></v-text-field>-->
          <!--          </v-col>-->
          <v-col>
            <v-text-field outlined v-model="phone"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-1 mr-1">
          <v-btn rounded color="primary" width="100%" style="font-family: Inter;font-size: 16px;font-weight: 700;"
                 @click="addDelivery" :disabled="!deliveryName || !username || !address || !addressDetail || !phone || !isValidPhone(phone)">배송지
            {{ title }}
          </v-btn>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<style>
</style>