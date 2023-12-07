<script>
import axios from "axios";

export default {
  data() {
    return {
      menu: ``,
      product: {},
      banners: [],
      tab: null,
      menus: [
        {idx: 1, title: `INFO`, isOpen: false},
        {idx: 2, title: `배송정보`, isOpen: false}
      ],
      delivery: [],
      options: [],
      optionItems: [],
      dialog: false,
      number: 1,
      totalPrice: 0,
      selectedItem: 0,
      selectedObject: null,
      parentIdx: 0,
      selectedOption: null,
      moid: null,
      mode: `ORDER`,
      selectedItems: [],
    }
  },
  mounted() {
    this.getProductDetail();
    this.getDeliveryInfo();
    this.getProductOption();
  },
  watch: {
    selectedItem(newVal) {
      this.selectedObject = this.options.find(option => option.productOptionIdx === newVal);

      // if(this.selectedObject.down === 2) {
      //   this.parentIdx = this.selectedObject.productOptionIdx;
      //   this.getProductOption();
      // }
    },
  },
  methods: {
    getProductDetail() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/${this.$route.params.id}`)
          .then(res => {
            this.product = res.data.data;
            this.menu = res.data.data.title;
            this.banners = res.data.data.banner;
            this.totalPrice = res.data.data.total;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getDeliveryInfo() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=DELIVERY`)
          .then(res => {
            this.delivery = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapse(index) {
      this.menus[index].isOpen = !this.menus[index].isOpen;
    },
    getProductOption() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/option?productIdx=${this.$route.params.id}&parentIdx=0`)
          .then(res => {
            this.options = res.data.data;
            console.log('첫번째뎁스');
            console.log(this.options);
          })
          .catch(err => {
            console.error(err);
          })
    },
    getProductOptionChild() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/option?productIdx=${this.$route.params.id}&parentIdx=${this.parentIdx}`)
          .then(res => {
            this.optionItems = res.data.data;
            console.log('첫번쨰 뎁스의 아이템');
            console.log(this.optionItems);
          })
          .catch(err => {
            console.error(err);
          })
    },
    incrementNumber() {
      this.number++;
      this.totalPrice = this.product.total * this.number;
    },
    decrementNumber() {
      if (this.number > 1) {
        this.number--;
        this.totalPrice -= this.product.total;
      }
    },
    isItemAlreadySelected(item) {
      // 이미 선택된 아이템인지 확인
      return this.selectedItems.some((selectedItem) => selectedItem.productOptionIdx === item.productOptionIdx);
    },
    loadData() {
      // 이 예제에서는 간단하게 선택된 옵션의 title을 표시하도록 하였습니다.
      this.parentIdx = this.options.find(option => option.productOptionIdx === parseInt(this.selectedItem));
      if(!this.isItemAlreadySelected(this.parentIdx)) {
        this.selectedItems.push(this.parentIdx);
      }
      // console.log(this.parentIdx);
      // this.getProductOptionChild();
    },
    addItem(item) {
      // 아이템에 quantity 필드 동적 추가
      this.$set(item, 'quantity', 1);
      this.selectedItems.push(item);
    },
    redirectToIpay() {
      const data = {
        mode: this.mode,
        cartIdxs: [0],
        productOptionIdxs: [this.options[0].productOptionIdx],
        volumes: [Number(this.number)]
      };
      if(this.number === 0) {
        alert('수량을 선택해주세요.');
        return false;
      }
      const queryString = Object.entries(data)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
      window.location.href = `/order?${queryString}`;
    },
    // 수량 증가 메서드
    incrementQuantity(item) {
      item.quantity++;
    },

    // 수량 감소 메서드
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
  }
}
</script>

<template>
  <v-app>
    <div class="mt-16">
      <div v-if="this.$route.path === `/product/${this.$route.params.id}`"
           style="height: 75px;" class="fixed-div" :style="{ width: $vuetify.breakpoint.xsOnly ? '100%' : '380px'}">
        <div style="display: flex; justify-content: start;" class="mt-5">
          <img src="@/assets/icons/ico-black-left.svg" class="ml-4" @click="$router.go(-1);"/>
          <span
              class="pr-10"
              style="text-align: center; justify-content: center; margin: auto;font-family: Inter;font-size: 25px;font-weight: 700;">{{
              menu
            }}</span>
        </div>
      </div>
      <div>
        <v-carousel cycle height="500" hide-delimiter-background>
          <v-carousel-item
              v-for="(b,i) in banners"
              :key="i"
              :src="b.bannerUrl"
              cover
          >
            <p style="font-family: Inter;font-size: 35px;font-weight: 700;line-height: 42px;letter-spacing: 0em;text-align: center; margin-top: 300px">
              {{ b.title }}</p>
            <p style="font-family: Inter;font-size: 17px;font-weight: 700;line-height: 21px;letter-spacing: 0em;text-align: center;">
              {{ b.description }}</p>
          </v-carousel-item>
        </v-carousel>
      </div>
      <div>
        <v-tabs fixed-tabs right style="max-width: 100%" v-model="tab">
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="one">상품정보</v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="two">상품평(555)
          </v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="three">문의하기</v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="four">유의사항</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <div class="pb-14">
                <div class="float-left">
                  <p style="font-family: Inter; font-size: 25px; font-weight: 700; text-align: left">
                    {{ product.title }}
                  </p>
                  <p style="font-family: Inter; font-size: 16px; font-weight: 500; text-align: left;">
                    {{ product.description }}
                  </p>
                </div>
                <div class="float-right">
                  <img src="@/assets/icons/ico-pink-star.svg">
                  <p style="font-family: Inter;font-size: 13px;font-weight: 700;">4.9</p>
                </div>
              </div>
              <div class="mt-10 mb-5">
                <v-row no-gutters>
                  <v-col cols="12" style="font-family: Inter; font-size: 25px; font-weight: 700; text-align: left;">
                    {{ product.total?.toLocaleString() }}원
                  </v-col>
                </v-row>
              </div>
              <hr style="border: 1px solid #BEBEBE"/>
              <div class="mt-10 mb-10">
                <p style="font-family: Inter;font-size: 16px;font-weight: 500;"> {{ product.contents }}</p>
              </div>
              <div>
                <v-row>
                  <v-col v-for="(m, index) in menus" :key="index" cols="12">
                    <div style="font-family: Inter;font-size: 18px;font-weight: 700;"
                         class="d-flex justify-between mb-4 cursor-pointer" @click="toggleCollapse(index)">
                      {{ m.title }}
                      <img src="@/assets/icons/ico-black-up.svg" class="px-1.5" v-if="m.isOpen"/>
                      <img src="@/assets/icons/ico-black-down.svg" class="px-1.5" v-else/>
                    </div>
                    <hr style="border: 1px solid #BEBEBE"/>
                    <v-expand-transition>
                      <div v-if="m.isOpen && m.idx === 1" class="mb-5">
                        <div class="pa-4" style="font-family: Inter;font-size: 18px;font-weight: 700;"
                             v-for="(detail, index) in product.detail" :key="index">
                          <div class="float-left" style="font-family: Inter;font-size: 16px;font-weight: 500;">
                            {{ detail.title }}
                          </div>
                          <div class="float-right" style="font-family: Inter;font-size: 16px;font-weight: 500;">
                            {{ detail.description }}
                          </div>
                        </div>
                      </div>
                      <div v-if="m.isOpen && m.idx === 2" class="mb-5">
                        <div class="pa-4" style="font-family: Inter;font-size: 18px;font-weight: 700;"
                             v-for="(d, index) in delivery" :key="index">
                          <div class="float-left"
                               style="font-family: Inter;font-size: 16px;font-weight: 400;color: #989898;">
                            {{ d.value }}
                          </div>
                          <div class="float-right" style="font-family: Inter;font-size: 16px;font-weight: 400;">
                            {{ d.description }}
                          </div>
                        </div>
                        <div class="mt-10" style="font-family: Inter;font-size: 16px;font-weight: 400;"><p>결제 후 3일 이내
                          출고됩니다.(영업일 기준) <br> 택배사 및 상품 상황에 따라 달라질 수 있습니다.</p></div>
                      </div>
                    </v-expand-transition>
                  </v-col>
                </v-row>
              </div>
              <div class="mt-10">
                <p style="font-family: Inter;font-size: 20px;font-weight: 800;text-align: left;">이런 굿즈는 어떠신가요?</p>
                <div>
                  <div class="d-flex" style="overflow-x: auto;">
                    <div v-for="(up, idx) in product.recommend" :key="idx" class="ml-4 mr-2 mb-5">
                      <v-card elevation="0" class="pa-1">
                        <v-img :src="up.bannerUrl" width="174" height="174"></v-img>
                        <div style="font-family: Inter;font-size: 14px;font-weight: 700;text-align: left" class="mt-2">
                          {{ up.title }}
                        </div>
                        <div style="font-family: Inter;font-size: 15px;font-weight: 400;text-align: left">
                          {{ up.description }}
                        </div>
                        <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left"
                             class="mt-2 mb-2">
                          {{ up.price.toLocaleString() }}원
                        </div>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </v-window-item>
            <v-window-item value="two">
              Two
            </v-window-item>
            <v-window-item value="three">
              Three
            </v-window-item>
            <v-window-item value="four">
              four
            </v-window-item>
          </v-window>
        </v-card-text>
      </div>
    </div>
    <div>
      <v-dialog max-width="380px" content-class="bottom-dialog" v-model="dialog" scrollable
                hide-overlay transition="dialog-bottom-transition">
        <v-card max-width="380px" style="background-color: #FFFFFF">
          <v-divider></v-divider>
          <v-row class="ma-3">
            <v-col cols="12">
              <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left" class="mb-5">
                <div  v-if="options.length === 1">
                  <p>{{ options[0].title }}</p>
                  <div class="pb-2">
                    <div class="float-left"
                         style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: left;">{{
                        product.total?.toLocaleString()
                      }}원
                    </div>
                    <div class="float-right number-input text-right"
                         style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: right;">
                      <img src="@/assets/icons/ico-gray-minus.svg" alt="Left Icon" @click="decrementNumber"/>
                      <input type="number" v-model="number" class="hide-arrow"
                             style="max-width: 30px; text-align: center"/>
                      <img src="@/assets/icons/ico-gray-plus.svg" alt="Right Icon" @click="incrementNumber"/>
                    </div>
                  </div>
                </div>
                <div v-if="options.length > 1">
                  <v-select
                      v-model="selectedItem"
                      :items="options"
                      item-text="title"
                      item-value="productOptionIdx"
                      label="문의 유형 선택"
                      @change="loadData"
                  ></v-select>
                  {{ selectedItems }}
                  <v-row>
                    <v-col cols="12" v-for="(item, index) in selectedItems" :key="index">
                      <div class="float-left"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: left;">
                        {{ item.title }} {{ item.total?.toLocaleString() }}원
                      </div>
                      <div class="float-right number-input text-right"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: right;">
                        <img src="@/assets/icons/ico-gray-minus.svg" alt="Left Icon" @click="incrementQuantity(item)"/>
                        <input type="number" v-model="number" class="hide-arrow"
                               style="max-width: 30px; text-align: center"/>
                        <img src="@/assets/icons/ico-gray-plus.svg" alt="Right Icon" @click="decrementQuantity(item)"/>
                      </div>
                    </v-col>
                  </v-row>
                </div>
<!--                <p style="font-family: Inter; font-size: 15px; font-weight: 400; text-align: left;"-->
<!--                   v-if="selectedObject && selectedObject.down === 0">-->
<!--                  {{ selectedObject.title }}000-->
<!--                </p>-->
<!--                <p style="font-family: Inter; font-size: 15px; font-weight: 400; text-align: left;"-->
<!--                   v-if="selectedObject && selectedObject.down === 1">-->
<!--                  {{ selectedObject.title }}111-->
<!--                  <v-select v-model="selectedOption" :items="optionItems" item-text="title">-->
<!--                  </v-select>-->
<!--                </p>-->
<!--                <p style="font-family: Inter; font-size: 15px; font-weight: 400; text-align: left;"-->
<!--                   v-if="selectedObject && selectedObject.down === 2">-->
<!--                  <v-select v-model="selectedOption" :items="optionItems">-->
<!--                  </v-select>-->
<!--                </p>-->
                <!--                <label for="selectedItem">문의 유형 선택</label>-->
                <!--                <select v-model="selectedItem" @change="loadData" id="selectedItem" style="z-index: 99; border: 1px solid #000">-->
                <!--                  <option v-for="(option, idx) in options" :value="option.productOptionIdx" :key="idx">{{ option.title }}</option>-->
                <!--                </select>-->

              </div>
              <hr style="border: 1px solid #BEBEBE"/>
              <div class="pt-5">
                <div class="float-left ml-1"
                     style="font-family: Inter;font-size: 22px;font-weight: 700;ext-align: left;">총금액
                </div>
                <div class="float-right"
                     style="font-family: Inter;font-size: 22px;font-weight: 700;text-align: right;">{{
                    this.totalPrice?.toLocaleString()
                  }}원
                </div>
              </div>

            </v-col>
          </v-row>
          <div>
            <v-btn width="50%" height="60" style="font-family: Inter;font-size: 20px;font-weight: 700;">장바구니</v-btn>
            <v-btn width="50%" color="primary" style="font-family: Inter;font-size: 20px;font-weight: 700;" height="60"
                   @click="redirectToIpay">
              구매하기
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <v-footer fixed class="justify-center flex"
              style="max-width: 380px; margin: auto; height: 65px; background-color: #FF1A77" :style="{ maxWidth: $vuetify.breakpoint.xsOnly ? '100%' : '380px'}">
      <v-btn class="fill-width" color="primary" elevation="0"
             style="background-color: #FFFFFF;font-family: Inter;font-size: 20px;font-weight: 700;"
             @click="dialog = true">주문하기
      </v-btn>
    </v-footer>
  </v-app>
</template>

<style>
.v-slide-group__next {
  display: none !important;
}

.fixed-div {
  position: fixed;
  top: 0;
  width: 380px;
  background-color: #ffffff;
  z-index: 1000;
}

.fill-width {
  width: 100%;
}

.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
}

.number-input {
  display: flex;
  align-items: center;
}

.number-input img {
  cursor: pointer;
}

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

</style>