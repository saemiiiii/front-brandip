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
      moid: ``,
      dialog: false,
      message: ``,
      delivery: [],
      d: {},
      btnColor: `gray`,
      memo: ``,
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
      const termsReq = this.terms.filter(item => item.require === 1).map(item => item.idx)
      const selectReq = v.filter(item => item.require === 1).map(item => item.idx)
      if (termsReq.every(item => selectReq.includes(item))) {
        this.isDisabled = false;
        this.btnColor = `primary`;
      } else {
        this.isDisabled = true;
        this.btnColor = `gray`;
      }
    },
  },
  mounted() {
    this.getDeliveryCategory();
    this.getTerms();
    this.getOrderDetail();
    this.getDelivery();
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
            this.totalPrice = this.orders.reduce((total, currentItem) => {
              return total + currentItem.total * currentItem.volume;
            }, 0);
            this.resultPrice = this.totalPrice + this.deliveryPrice;
          })
          .catch(err => {
            console.error(err);
          })
    },
    postPay() {
      if (!this.d) {
        alert('배송지를 선택해주세요.');
        return false;
      }
      let body = {};
      if (this.orders.length > 1) {
        body = {
          mode: this.mode,
          productOptionIdxs: this.productOptionIdxs[0].split(',').map(Number),
          volumes: this.volumes[0].split(',').map(Number),
          zipcode: this.d.zipcode,
          address: this.d.address,
          addressDetail: this.d.addressDetail,
          phone: this.d.phone,
          deliveryName: this.d.deliveryName,
          username: this.d.username,
          memo: this.selectedItem === `기타` ? this.memo : this.selectedItem
        }
      } else {
        body = {
          mode: this.mode,
          productOptionIdxs: [(Number(this.productOptionIdxs))],
          volumes: [Number(this.volumes)],
          zipcode: this.d.zipcode,
          address: this.d.address,
          addressDetail: this.d.addressDetail,
          phone: this.d.phone,
          deliveryName: this.d.deliveryName,
          username: this.d.username,
          memo: this.selectedItem === `기타` ? this.memo : this.selectedItem
        }
      }
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/order`, body)
          .then((res) => {
            if (res.data.resultCode === 200) {
              this.moid = res.data.data;
              this.goPayment();
            }
          })
          .catch(err => {
            console.error(err)
          })
    },
    goPayment() {
      this.$router.push({
        path: '/ipay',
        query: {
          moid: this.moid,
          type: this.selectedCategory,
          accessToken: localStorage.getItem(`token`)
        },
      }).catch(() => {
      })
    },
    postTerms() {
      const codes = this.selectList.map(item => item.code);
      axios.post(`v1/terms`, {
        codes: codes,
      },)
          .then(() => {
          })
          .catch(err => {
            console.error(err);
          })
    },
    getDelivery() {
      axios.get(`v1/me/delivery`)
          .then(res => {
            this.delivery = res.data.data;
            const del = this.delivery.filter(item => item.main).map(item => item);
            if (del) {
              this.d = del[0];
            }
          })
          .catch(err => {
            console.error(err);
          })
    },
    deleteDelivery(idx) {
      axios.delete(`${process.env.VUE_APP_SERVICE_URL}v1/community?communityIdx=${idx}`)
          .then(() => {
            this.dialogDelete = false;
            this.getDelivery();
          })
          .catch(err => {
            console.error(err);
          })
    },
    selectDelivery(d) {
      this.d = d;
      this.dialog = false;
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14 div-parent" style="position: relative;">
        <div class="flex justify-between">
          <div class="text-left" style="font-family: Inter;font-size: 19px;font-weight: 700;">
            배송지
          </div>
          <div class="text-right cursor-pointer"
               style="font-family: Inter;font-size: 14px;font-weight: 400;color: #BEBEBE;"
               @click="dialog = true">
            배송지선택
          </div>
        </div>
        <hr style="border: 1px solid #BEBEBE"/>
        <div class="mt-5">
          <v-row>
            <v-col cols="12" v-if="d">
              <div style="font-family: Inter;font-size: 15px;font-weight: 700; text-align: left">
                <div>
                  <v-chip v-if="d.main" style="font-family: Inter;font-size: 10px;font-weight: 700; height: 20px"
                          outlined
                          color="primary" class="mb-1"> 기본배송지
                  </v-chip>
                </div>
                <span>{{ d.username }}님  ({{ d.deliveryName }})</span>
                <span class="ml-2" style="font-family: Inter;font-size: 15px;font-weight: 400;">{{ d.phone }}</span>
              </div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: left;">
                [{{ d.zipcode }}]
              </div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: left;">
                {{ d.address }} {{ d.addressDetail }}
              </div>
            </v-col>
            <v-col cols="12">
              <v-select
                  v-model="selectedItem"
                  :items="categories"
                  item-text="value"
                  item-value="value"
                  label="배송 옵션 선택"
                  outlined
                  dense
                  style="border-radius: 15px;color: #9E9E9E;font-family: Inter;font-size: 13px;font-weight: 700;"
              ></v-select>
              <v-text-field v-if="selectedItem === `기타`" v-model="memo" outlined dense
                            style="border-radius: 15px;"></v-text-field>
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
              <v-img :src="order.thumbnail" width="130" height="130"></v-img>
            </div>
            <div class="ml-4">
              <div style="font-family: Inter;font-size: 18px;font-weight: 700; text-align: left">{{ order.title }}</div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left">{{ order.optionTitle }}
                {{ order.volume }}개
              </div>
              <div class="mt-13" style="font-family: Inter;font-size: 18px;font-weight: 700; text-align: left">
                {{ order.total?.toLocaleString() }}원
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="text-left mt-10" style="font-family: Inter;font-size: 19px;font-weight: 700;">
            결제수단
          </div>
          <hr style="border: 1px solid #BEBEBE"/>
          <div class="mt-5">
            <v-chip-group v-model="selectedCategory">
              <v-chip
                  active-class="secondary"
                  color="light-grey"
                  value="0"
                  @click="handleChipClick(`0`)"
                  class="text-center"
                  style="font-family: Inter; font-size: 14px; font-weight: 700; width: 50%; height: 32px; text-align: center; display: flex; align-items: center; justify-content: center;"
              >
                신용/체크카드
              </v-chip>
              <v-chip
                  active-class="secondary"
                  color="light-grey"
                  value="1"
                  @click="handleChipClick(`1`)"
                  class="text-center"
                  style="font-family: Inter; font-size: 14px; font-weight: 700; width: 50%; height: 32px; text-align: center; display: flex; align-items: center; justify-content: center;"
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
                  class="float-right" style="font-family: Inter;font-size: 15px;font-weight: 700;">{{
                  totalPrice?.toLocaleString()
                }}원</span>
              </v-col>
              <v-col cols="12" class="mb-2">
                <span class="float-left" style="font-family: Inter;font-size: 15px;font-weight: 400;">배송비</span> <span
                  class="float-right" style="font-family: Inter;font-size: 15px;font-weight: 700;">{{
                  deliveryPrice.toLocaleString()
                }}원</span>
              </v-col>
            </v-row>
            <hr style="border: 2px solid #000000"/>
            <v-row no-gutters class="mt-5">
              <v-col cols="12" class="mb-2">
                <span class="float-left" style="font-family: Inter;font-size: 15px;font-weight: 400;">결제 금액</span> <span
                  class="float-right" style="font-family: Inter;font-size: 15px;font-weight: 700;">{{
                  resultPrice?.toLocaleString()
                }}원</span>
              </v-col>
            </v-row>
            <v-row no-gutters class="mt-5">
              <v-col cols="12" class="mb-2">
                <div
                    style="background-color: #FFFFFF;font-family: Inter;font-size: 12px;font-weight: 400;text-align: left;">
                  <label class="cursor-pointer">
                    <input type="checkbox" v-model="allSelected"/> 주문 내용을 확인했으며, 아래 내용에 모두 동의합니다.
                  </label>
                  <hr style="border: 1px solid #9E9E9E" class="mt-2"/>
                </div>
              </v-col>
              <v-col cols="12" v-for="(item, index) in terms" :key="index">
                <div style="font-family: Inter;font-size: 12px;font-weight: 400;text-align: left;">
                  <label class="cursor-pointer">
                    <input type="checkbox" :value="item" v-model="selectList" :key="index"/>
                    {{ item.require === 1 ? item.title + `(필수)` : item.title + `(선택)` }}
                    <span v-if="item.view === 1" class="text-right"> [보기]</span>
                  </label>
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
        <div class="text-center">
          <v-dialog max-width="460" :fullscreen="$vuetify.breakpoint.width <= 1024" content-class="bottom-dialog"
                    v-model="dialog"
                    scrollable
                    hide-overlay transition="dialog-bottom-transition">
            <v-card width="100%" style="background-color: white;height: 100vh">
              <div :class="$vuetify.breakpoint.width <= 1024 ? `mt-20 pt-20 ma-3` : `mt-20 ma-3 h-full`">
                <div class="d-flex justify-between mb-10">
                  <div class="ml-3" style="font-family: Inter; font-size: 26px; font-weight: 700; text-align: left;">
                    배송지 목록
                  </div>
                  <div class="mt-1">
                    <v-btn rounded color="primary" style="font-family: Inter;font-size: 14px;font-weight: 700;"
                           elevation="0"
                           height="30" @click="$router.push('delivery-add').catch(()=>{})">추가
                    </v-btn>
                  </div>
                </div>
                <div class="mt-3 ml-3">
                  <v-row>
                    <v-col v-for="(d, index) in delivery" :key="index" cols="12">
                      <div style="font-family: Inter;font-size: 14px;font-weight: 700; text-align: left">
                        {{ d.username }}님 ({{ d.deliveryName }})
                        <v-chip v-if="d.main" style="font-family: Inter;font-size: 10px;font-weight: 700; height: 20px"
                                outlined
                                color="primary" class="mb-1"> 기본배송지
                        </v-chip>
                      </div>
                      <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: left;">
                        [{{ d.zipcode }}] {{ d.address }}
                      </div>
                      <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: left;">
                        {{ d.addressDetail }}
                      </div>
                      <div style="font-family: Inter;font-size: 14px;font-weight: 300;text-align: left;">
                        {{ d.phone }}
                      </div>
                      <div>
                        <v-btn rounded class="mt-2" outlined elevation="0" width="50%" height="30"
                               style="font-family: Inter;font-size: 14px;font-weight: 700;" @click="selectDelivery(d)">
                          선택
                        </v-btn>
                        <v-btn rounded class="mt-2" outlined elevation="0" width="50%" height="30"
                               style="font-family: Inter;font-size: 14px;font-weight: 700;" @click="deleteDelivery"> 삭제
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-card>
          </v-dialog>
        </div>
        <v-footer fixed class="justify-center flex footer-style" style="height: 65px;"
                  :aria-disabled="isDisabled" :color="btnColor" @click="postPay">
          <v-btn fixed bottom class="justify-center flex white--text" elevation="0"
                 style="width: 460px;font-family: Inter;font-size: 20px;font-weight: 700;" @click="postPay"
                 :disabled="isDisabled" text>
            {{ resultPrice?.toLocaleString() }}원 결제하기
          </v-btn>
        </v-footer>
      </div>
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

.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
}

.v-dialog__content--active {
  left: 230px;
  @media screen and (max-width: 1024px) {
    left: 0 !important;
  }
}
.v-dialog__content {
  left: 230px;
  @media screen and (max-width: 1024px) {
    left: 0 !important;
  }
}
.custom-btn:disabled {
  background-color: transparent;
  color: gray /* 원하는 색상 */;
}

.footer-style {
  max-width: 460px;
  margin-left: 50%;
  @media screen and (max-width: 1024px) {
    margin-left: 0;
    max-width: 100% !important;
  }
}
.div-parent {
  max-width: 460px;
  @media screen and (max-width: 1024px) {
    margin-left: 0;
    max-width: 100% !important;
  }
}
</style>