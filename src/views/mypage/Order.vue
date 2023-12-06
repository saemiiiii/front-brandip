<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      selectedItem: null,
      isChecked: false,
      selectedCategory: `0`,
      terms: [],
      selectList: [],
      mode: this.$route.query.mode,
      cartIdxs: [this.$route.query.cartIdxs],
      volumes: [this.$route.query.volumes],
      productOptionIdxs: [this.$route.query.productOptionIdxs],
      orders: [],
      totalPrice: 0,
      resultPrice: 0,
      deliveryPrice: 3000,
      isDisabled: true,
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
  },
  watch: {
    selectList(v) {
      const termsReq = this.terms.filter(item => item.require === 0).map(item => item.idx)
      const selectReq = v.filter(item => item.require === 0).map(item => item.idx)
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
    this.getDeliveryCategory();
    this.getTerms();
    this.getOrderDetail();
  },
  methods: {
    getDeliveryCategory() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=delivery_memo`)
          .then(res => {
            this.categories = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    handleChipClick(category) {
      this.selectedCategory = category;
    },
    getTerms() {
      axios.get(`v1/terms?type=ORDER`)
          .then(res => {
            this.terms = res.data.data
          })
          .catch(err => {
            console.error(err);
          })
    },
    getOrderDetail() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order/detail?mode=${encodeURI(this.mode)}&cartIdxs=${this.cartIdxs}&volumes=${this.volumes}&productOptionIdxs=${this.productOptionIdxs}`)
          .then(res => {
            this.orders = res.data.data;
            console.log(this.orders);
            const productPrices = this.orders.map(item => item.total);
            const result = productPrices.reduce(function add(sum, currValue) {
              return sum + currValue;
            }, 0);
            this.totalPrice = result;
            this.resultPrice = result + this.deliveryPrice;
          })
          .catch(err => {
            console.error(err);
          })
    },
    postTerms() {
      const codes = this.selectList.map(item => item.code);
      console.log(codes);
      // axios.post(`v1/terms`, {
      //   codes: codes,
      // },)
      //     .then(() => {
      //       this.dialog = false;
      //       router.push('/profile')
      //     })
      //     .catch(err => {
      //       console.error(err);
      //     })
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        <div class="flex justify-between">
          <div class="text-left" style="font-family: Inter;font-size: 19px;font-weight: 700;">
            배송지
          </div>
          <div class="text-right cursor-pointer"
               style="font-family: Inter;font-size: 14px;font-weight: 400;color: #BEBEBE;"
               @click="$router.push(`/delivery`)">
            배송지선택
          </div>
        </div>
        <hr style="border: 1px solid #BEBEBE"/>
        <div class="mt-5">
          <v-row>
            <v-col cols="12">
              <div style="font-family: Inter;font-size: 15px;font-weight: 700; text-align: left">

                <span><!--{{ d.username }}-->이름님  <!--({{ d.deliveryName }})-->(회사)</span><span class="ml-2"
                                                                                                style="font-family: Inter;font-size: 15px;font-weight: 400;">01012345678
                <!-- {{ d.phone }} --></span>
              </div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: left;">
                <!-- [{{ d.zipcode }}]-->[12345]
              </div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: left;">
                <!-- {{ d.address }}--> 서울특별시 용산구 한남대로 98 <!-- {{ d.addressDetail }}-->2층와우플래닛
              </div>
            </v-col>
            <v-col cols="12">
              <v-select
                  v-model="selectedItem"
                  :items="categories"
                  item-text="value"
                  item-value="key"
                  label="배송 옵션 선택"
                  outlined
                  dense
                  style="border-radius: 15px;color: #9E9E9E;font-family: Inter;font-size: 13px;font-weight: 700;"
              ></v-select>
              <v-text-field v-if="selectedItem === `dm3`" outlined dense style="border-radius: 15px;"></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <div class="text-left" style="font-family: Inter;font-size: 19px;font-weight: 700;">
            결제상품정보
          </div>
          <hr style="border: 1px solid #BEBEBE"/>
          <div class="mt-5" v-for="(order, index) in orders" :key="index">
            <div class="float-left mr-2">
              <v-img :src="order.bannerUrl" width="130" height="130"></v-img>
            </div>
            <div class="ml-4">
              <div style="font-family: Inter;font-size: 18px;font-weight: 700; text-align: left">{{ order.title }}</div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left">{{ order.optionTitle }} {{ order.volume }}개</div>
              <div class="mt-13" style="font-family: Inter;font-size: 18px;font-weight: 700; text-align: left">{{ order.total?.toLocaleString() }}원</div>
            </div>
          </div>
        </div>
        <div>
          <div class="text-left mt-10" style="font-family: Inter;font-size: 19px;font-weight: 700;">
            결제수단
          </div>
          <hr style="border: 1px solid #BEBEBE"/>
          <div class="flex justify-center mt-5">
            <v-chip-group v-model="selectedCategory" class="flex">
              <v-chip
                  active-class="secondary"
                  color="light-grey"
                  value="0"
                  @click="handleChipClick(0)"
                  style="font-family: Inter; font-size: 14px; font-weight: 700; width: 170px;height: 32px; display: flex; align-items: center; justify-content: center;"
              >
                신용/체크카드
              </v-chip>
              <v-spacer></v-spacer>
              <v-chip
                  active-class="secondary"
                  color="light-grey"
                  value="1"
                  @click="handleChipClick(1)"
                  style="font-family: Inter; font-size: 14px; font-weight: 700; width: 170px;height: 32px; display: flex; align-items: center; justify-content: center;"
              >
                간편결제
              </v-chip>
            </v-chip-group>
          </div>
          <!--          <div class="mt-2 text-left">-->
          <!--            <input type="checkbox" v-model="isChecked"><span class="ml-2" style="font-family: Inter;font-size: 12px;font-weight: 400;">선택한 결제수단 다음에도 사용</span>-->
          <!--          </div>-->
          <div>
            <div class="text-left mt-5" style="font-family: Inter;font-size: 19px;font-weight: 700;">
              총 결제 금액
            </div>
            <v-row no-gutters class="mt-5">
              <v-col cols="12" class="mb-2">
                <span class="float-left" style="font-family: Inter;font-size: 15px;font-weight: 400;">상품 금액</span> <span
                  class="float-right" style="font-family: Inter;font-size: 15px;font-weight: 700;">{{ totalPrice?.toLocaleString() }}원</span>
              </v-col>
              <v-col cols="12" class="mb-2">
                <span class="float-left" style="font-family: Inter;font-size: 15px;font-weight: 400;">배송비</span> <span
                  class="float-right" style="font-family: Inter;font-size: 15px;font-weight: 700;">{{ deliveryPrice.toLocaleString() }}원</span>
              </v-col>
            </v-row>
            <hr style="border: 2px solid #000000"/>
            <v-row no-gutters class="mt-5">
              <v-col cols="12" class="mb-2">
                <span class="float-left" style="font-family: Inter;font-size: 15px;font-weight: 400;">결제 금액</span> <span
                  class="float-right" style="font-family: Inter;font-size: 15px;font-weight: 700;">{{ resultPrice?.toLocaleString() }}원</span>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-5">
              <v-col cols="12" class="mb-2">
                <div style="background-color: #FFFFFF;font-family: Inter;font-size: 12px;font-weight: 400;text-align: left;">
                  <input type="checkbox" v-model="allSelected"/> 주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
                  <hr style="border: 1px solid #9E9E9E" class="mt-2"/>
                </div>
              </v-col>
              <v-col cols="12" v-for="(item, index) in terms" :key="index">
                <div style="font-family: Inter;font-size: 12px;font-weight: 400;text-align: left;">
                  <input type="checkbox" :value="item" v-model="selectList" :key="index"/>
                  {{ item.require === 1 ? item.title + `(필수)` : item.title + `(선택)` }} <span class="text-right"> [보기]</span>
                </div>
              </v-col>
            </v-row>
            <v-bottom-sheet class="bottom-sheet">
              <v-sheet class="pa-4">
                <v-row>
                  <v-col>
                    <v-btn block style="font-family: Inter;font-size: 20px;font-weight: 700;">
                      장바구니
                    </v-btn>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-bottom-sheet>
          </div>
        </div>
      </div>
      <v-footer fixed class="justify-center flex"
                style="max-width: 380px; margin: auto; height: 65px; background-color: #FF1A77">
        <v-btn class="fill-width" color="secondary" elevation="0"
               style="background-color: #FFFFFF;font-family: Inter;font-size: 20px;font-weight: 700;"
        @click="postTerms" >{{ resultPrice?.toLocaleString() }}원 결제하기
        </v-btn>
      </v-footer>
    </v-container>
  </v-app>
</template>

<style>
.active {
  background-color: #FF1A77; /* 활성화된 버튼 배경색 */
  color: white; /* 활성화된 버튼 텍스트 색상 */
}
.fill-width {
  width: 100%;
}
</style>