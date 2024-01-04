<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      tab: null,
      carts: [],
      cnt: 0,
      totalPrice: 0,
      deliveryPrice: 3000,
      resultPrice: 0,
      selectList: [],
      mode: `ORDER`,
    }
  },

  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
    allSelected: {
      //getter
      get: function () {
        return this.carts.length > 0 && this.carts.length === this.selectList.length;
      },
      //setter
      set: function (e) {
        this.selectList = e ? this.carts : [];
      },
    },
  },
  // created() {
  //   // 초기에 allSelected 값을 true로 설정
  //   this.allSelected = true;
  // },
  watch: {
    selectList(v) {
      this.totalPrice = v.reduce((total, currentItem) => {
        return total + currentItem.total * currentItem.volume;
      }, 0);
      this.resultPrice = this.totalPrice + this.deliveryPrice;
    },
    // allSelected(v) {
    // }
  },
  mounted() {
    this.getCart();
  },
  methods: {
    getCart() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order/cart`)
          .then(res => {
            this.carts = res.data.data.carts;
            this.totalPrice = this.selectList.reduce((total, currentItem) => {
              return total + currentItem.total * currentItem.volume;
            }, 0);
            this.cnt = res.data.data.carts.length;
            this.resultPrice = this.totalPrice + this.deliveryPrice;
          })
          .catch(err => {
            console.error(err);
          })
    },
    // 수량 증가 메서드
    incrementQuantity(item) {
      item.volume++;
      this.totalPrice = this.selectList.reduce((total, currentItem) => {
        return total + currentItem.total * currentItem.volume;
      }, 0);
      this.resultPrice = this.totalPrice + this.deliveryPrice;
    },

    // 수량 감소 메서드
    decrementQuantity(item) {
      if (item.volume > 1) {
        item.volume--;
        this.totalPrice -= item.total;
        this.resultPrice = this.totalPrice + this.deliveryPrice;
      }
    },
    deleteCart(item) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/order/cart/cancel`, {
        cartIdxs: [item.cartIdx],
      },)
          .then(() => {
            this.getCart();
          })
          .catch(err => {
            console.error(err);
          })
    },
    redirectToIpay() {
      let data = {};
      data = {
        mode: this.mode,
        cartIdxs: this.selectList.map(item => item.cartIdx),
        productOptionIdxs: this.selectList.map(item => item.productOptionIdx),
        volumes: this.selectList.map(item => item.volume)
      };
      if (data.volumes.length === 0) {
        alert('상품을 선택해주세요.');
        return false;
      }
      const queryString = Object.entries(data)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
      window.location.href = `/order?${queryString}`;
    },
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <v-tabs fixed-tabs right style="max-width: 100%" v-model="tab">
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="one">장바구니</v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="two">좋아요</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <div style="position: relative;max-width: 100%">
                <div class="float-left" style="font-family: Inter; font-size: 12px; font-weight: 400;">
                  <input type="checkbox" v-model="allSelected"> 전체선택
                </div>
                <div class="float-right" style="font-family: Inter; font-size: 12px; font-weight: 400; color: #989898;">
                  {{ cnt }}개의 상품이 있습니다.
                </div>
                <div style="clear: both;"></div>
                <hr style="width: 100%; clear: both;border: 1px solid #000000">
                <div class="mt-2" v-for="(cart, index) in carts" :key="index">
                  <div class="pb-1 pt-1 clear-both">
                    <div class="float-left" style="font-family: Inter; font-size: 12px; font-weight: 400;">
                      <input type="checkbox" :value="cart" v-model="selectList" :key="index">
                    </div>
                    <div class="float-right cursor-pointer" @click="deleteCart(cart)"
                         style="font-family: Inter; font-size: 12px; font-weight: 400; color: #989898;">
                      <img src="@/assets/icons/ico-gray-xbox.svg">
                    </div>
                  </div>
                  <div class="mt-5">
                    <div class="float-left mr-4">
                      <v-img :src="cart.thumbnail" width="100" height="100"></v-img>
                    </div>
                    <div class="ml-4">
                      <div style="font-family: Inter;font-size: 16px;font-weight: 700; text-align: left">{{
                          cart.title
                        }}
                      </div>
                      <div style="font-family: Inter;font-size: 12px;font-weight: 400; text-align: left">
                        {{ cart.optionTitle }}
                      </div>
                      <div class="number-input pt-8 text-left"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: right;">
                        <img src="@/assets/icons/ico-gray-minus.svg" alt="Left Icon" width="15"
                             @click="decrementQuantity(cart)" class="cursor-pointer"/>
                        <input type="number" v-model="cart.volume" class="hide-arrow"
                               style="max-width: 25px; text-align: center;font-family: Inter;font-size: 12px;font-weight: 700;"/>
                        <img src="@/assets/icons/ico-gray-plus.svg" alt="Right Icon" width="15"
                             @click="incrementQuantity(cart)" class="cursor-pointer"/>
                        <v-spacer></v-spacer>
                        <div class="text-right" style="font-family: Inter;font-size: 16px;font-weight: 700;">
                          {{ cart.total?.toLocaleString() }}원
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr style="border: 1px solid #BEBEBE" class="mt-3">
                </div>
                <div class="mt-10" v-if="selectList.length > 0">
                  <div class="text-left mt-5" style="font-family: Inter;font-size: 17px;font-weight: 800;">
                    전체합계
                  </div>
                  <v-row no-gutters class="mt-5">
                    <v-col cols="12" class="mb-2">
                      <span class="float-left" style="font-family: Inter;font-size: 14px;font-weight: 500;">상품금액</span>
                      <span class="float-right" style="font-family: Inter;font-size: 14px;font-weight: 700;">{{
                          totalPrice?.toLocaleString()
                        }}원</span>
                    </v-col>
                    <v-col cols="12" class="mb-2">
                      <span class="float-left" style="font-family: Inter;font-size: 14px;font-weight: 500;">배송비</span>
                      <span class="float-right" style="font-family: Inter;font-size: 14px;font-weight: 700;">{{
                          deliveryPrice?.toLocaleString()
                        }}원</span>
                    </v-col>
                  </v-row>
                  <hr style="border: 2px solid #000000">
                  <v-row no-gutters class="mt-5 pb-20">
                    <v-col cols="12" class="mb-2">
                      <span class="float-left"
                            style="font-family: Inter;font-size: 14px;font-weight: 500;">총 결제 금액</span>
                      <span class="float-right" style="font-family: Inter;font-size: 20px;font-weight: 700;">
                      {{ resultPrice?.toLocaleString() }}원</span>
                    </v-col>
                  </v-row>
                </div>
                  <v-footer fixed class="justify-center flex fill-width2"
                            style="height: 65px; background-color: #EF3426;">
                    <v-btn color="primary" elevation="0"
                           style="background-color: #FFFFFF;font-family: Inter;font-size: 20px;font-weight: 700;"
                           @click="redirectToIpay">구매하기
                    </v-btn>
                  </v-footer>
              </div>
            </v-window-item>
            <v-window-item value="two">
              <!--              <div>-->
              <!--                <div class="float-left ma-2">-->
              <!--                  <v-avatar width="75px" height="75px" style="box-shadow: 0px 4px 4px 0px #00000040;">-->
              <!--                    <img :src="user.profileUrl" alt="Image">-->
              <!--                  </v-avatar>-->
              <!--                  <div style="font-family: Inter; font-size: 24px; font-weight: 700;"-->
              <!--                       class="float-right  text-left ma-2 pl-2 pt-2">-->
              <!--                    <span>{{ user.nickname }}님의 <br> 위시리스트</span>-->
              <!--                  </div>-->
              <!--                  <v-row class="mt-5">-->
              <!--                    <v-col cols="12" class="text-left" style="font-family: Inter;font-size: 16px;font-weight: 700;">-->
              <!--                      팔로잉-->
              <!--                    </v-col>-->
              <!--                  </v-row>-->
              <!--                </div>-->
              <!--              </div>-->
            </v-window-item>
          </v-window>
        </v-card-text>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>
.hide-arrow {
  appearance: textfield; /* Chrome 및 Safari에서 숫자 입력 필드의 스피너(상/하 화살표) 숨기기 */
  -moz-appearance: textfield; /* Firefox에서 숫자 입력 필드의 스피너 숨기기 */

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.number-input {
  display: flex;
  align-items: center;
}

.fill-width2 {
  max-width: 460px;
  margin-left: 50%;
  margin-bottom: 100px;
  @media screen and (max-width: 1024px) {
    margin-left: 0;
    max-width: 100% !important;
  }
}
</style>