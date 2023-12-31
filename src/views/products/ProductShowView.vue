<script>
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  data() {
    return {
      menu: ``,
      product: {},
      banners: [],
      tab: this.$route.query.tab ? this.$route.query.tab : '',
      menus: [
        {idx: 1, title: `INFO`, isOpen: true},
        {idx: 2, title: `배송정보`, isOpen: true}
      ],
      delivery: [],
      options: [],
      optionChildes: [],
      dialog: false,
      number: 1,
      totalPrice: 0,
      selectedItem: 0,
      selectedItemOption: 0,
      selectedObject: null,
      items: [],
      optionItems: [],
      selectedOption: null,
      moid: null,
      mode: `ORDER`,
      selectedItems: [],
      selectedOptionItems: [],
      productFaqs: [],
      productNotices: [],
      loginDialog: false,
      inquiryDialog: false,
      message: ``,
      sub: null,
    }
  },
  mounted() {
    this.getProductDetail();
    this.getDeliveryInfo();
    this.getProductOption();
    this.getProductNotice();
    this.getProductFaq();
    this.decodeToken();
  },
  watch: {
    selectedItem(newVal) {
      this.selectedObject = this.options.find(option => option.productOptionIdx === newVal);
    },
  },
  methods: {
    decodeToken() {
      try {
        if (localStorage.getItem('token')) {
          const decoded = jwt.decode(localStorage.getItem('token'));
          this.decodedToken = decoded;
          this.sub = this.decodedToken.sub;
        }
      } catch (error) {
        console.error('토큰을 복호화할 수 없습니다.', error);
      }
    },
    getProductDetail() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/${this.$route.params.id}`)
          .then(res => {
            this.product = res.data.data;
            this.menu = res.data.data.title;
            this.banners = res.data.data.banner;
            if (this.options.length === 1) {
              this.totalPrice = res.data.data.total;
            }
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
    getProductNotice() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/etc?productIdx=${this.$route.params.id}&code=NOTICE`)
          .then(res => {
            this.productNotices = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getProductFaq() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/inquiry?productIdx=${this.$route.params.id}`)
          .then(res => {
            let productFaqs = [];
            if (res.data.data.length > 0) {
              res.data.data.map((item, index) => {
                productFaqs.push({
                  no: index,
                  contents: item.contents,
                  createdDt: item.createdDt,
                  nickname: item.nickname,
                  productInquiryIdx: item.productInquiryIdx,
                  userIdx: item.userIdx,
                  view: item.view,
                  answer: item.answer,
                  isOpen: false,
                });
              });
            }
            this.productFaqs = productFaqs;
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapse(index) {
      this.menus[index].isOpen = !this.menus[index].isOpen;
    },
    getProductOption() {
      let optionsArray = [];
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/option?productIdx=${this.$route.params.id}&parentIdx=0`)
          .then(res => {
            if (res.data.data.length > 0) {
              res.data.data.map((item, index) => {
                optionsArray.push({
                  no: index + 1,
                  productOptionIdx: item.productOptionIdx,
                  title: item.title,
                  price: item.price,
                  down: item.down,
                  limit: item.limit,
                  sale: item.sale,
                  surcharge: item.surcharge,
                  total: item.total,
                  quantity: 1,
                });
              });
            }
            this.options = optionsArray;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getProductOptionChild() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product/option?productIdx=${this.$route.params.id}&parentIdx=${this.parentIdx}`)
          .then(res => {
            let optionChildes = [];
            if (res.data.data.length > 0) {
              res.data.data.map((item, index) => {
                optionChildes.push({
                  no: index + 1,
                  productOptionIdx: item.productOptionIdx,
                  title: item.title,
                  price: item.price,
                  down: item.down,
                  limit: item.limit,
                  sale: item.sale,
                  surcharge: item.surcharge,
                  total: item.total,
                  quantity: 1,
                });
              });
            }
            this.optionChildes = optionChildes;
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
    // 수량 증가 메서드
    incrementQuantity(item) {
      item.quantity++;
      if (this.optionItems.length === 0) {
        this.totalPrice = this.selectedItems.reduce((total, currentItem) => {
          return total + currentItem.total * currentItem.quantity;
        }, 0);
      } else {
        this.totalPrice = this.selectedOptionItems.reduce((total, currentItem) => {
          return total + currentItem.total * currentItem.quantity;
        }, 0);
      }
    },

    // 수량 감소 메서드
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.totalPrice -= item.total;
      }
    },
    isItemAlreadySelected(item) {
      // 이미 선택된 아이템인지 확인
      return this.selectedItems.some((selectedItem) => selectedItem.productOptionIdx === item.productOptionIdx);
    },
    isItemAlreadySelectedOption(item) {
      // 이미 선택된 아이템인지 확인
      return this.selectedOptionItems.some((selectedItem) => selectedItem.productOptionIdx === item.productOptionIdx);
    },
    loadData() {
      this.items = this.options.find(option => option.productOptionIdx === parseInt(this.selectedItem));
      this.parentIdx = this.items.productOptionIdx;

      if (!this.isItemAlreadySelected(this.items) && this.items.down !== 2) {
        this.selectedItems.push(this.items);
      }
      this.totalPrice = this.selectedItems.reduce((total, currentItem) => {
        return total + currentItem.total * currentItem.quantity;
      }, 0);

      this.getProductOptionChild();
    },
    loadDataOption() {
      this.optionItems = this.optionChildes.find(child => child.productOptionIdx === parseInt(this.selectedItemOption));
      if (!this.isItemAlreadySelectedOption(this.optionItems) && this.selectedItem && this.optionItems.down !== 2) {
        this.selectedOptionItems.push({
          selectedItem: this.selectedObject.title,
          title: this.optionItems.title,
          total: this.optionItems.total,
          down: this.optionItems.down,
          limit: this.optionItems.limit,
          price: this.optionItems.price,
          productOptionIdx: this.optionItems.productOptionIdx,
          sale: this.optionItems.sale,
          no: this.optionItems.no,
          quantity: this.optionItems.quantity,
          surcharge: this.optionItems.surcharge,
        });
      }
      this.totalPrice = this.selectedOptionItems.reduce((total, currentItem) => {
        return total + currentItem.total * currentItem.quantity;
      }, 0);
    },
    redirectToIpay() {
      let data = {};
      if (this.options.length === 1) {
        data = {
          mode: this.mode,
          cartIdxs: [0],
          productOptionIdxs: [this.options[0].productOptionIdx],
          volumes: [Number(this.number)]
        };
      } else if (this.options.length > 1 && this.optionChildes.length === 0) {
        data = {
          mode: this.mode,
          cartIdxs: [0],
          productOptionIdxs: this.selectedItems.map(item => item.productOptionIdx),
          volumes: this.selectedItems.map(item => item.quantity)
        };
      } else {
        data = {
          mode: this.mode,
          cartIdxs: [0],
          productOptionIdxs: this.selectedOptionItems.map(item => item.productOptionIdx),
          volumes: this.selectedOptionItems.map(item => item.quantity)
        };
      }
      if (data.volumes.length === 0) {
        alert('수량을 선택해주세요.');
        return false;
      }
      const queryString = Object.entries(data)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
      window.location.href = `/order?${queryString}`;
    },
    addCart() {
      let body = {};
      if (this.options.length === 1) {
        body = {
          productIdx: this.$route.params.id,
          productOptionIdxs: [this.options[0].productOptionIdx],
          volumes: [Number(this.number)]
        };
      } else if (this.options.length > 1 && this.optionChildes.length === 0) {
        body = {
          productIdx: this.$route.params.id,
          productOptionIdxs: this.selectedItems.map(item => item.productOptionIdx),
          volumes: this.selectedItems.map(item => item.quantity)
        };
      } else {
        body = {
          productIdx: this.$route.params.id,
          productOptionIdxs: this.selectedOptionItems.map(item => item.productOptionIdx),
          volumes: this.selectedOptionItems.map(item => item.quantity)
        };
      }
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/order/cart`, body)
          .then((res) => {
            if (res.data.resultCode === 200) {
              alert(`장바구니에 담겼습니다.`);
              this.dialog = false;
              return false;
            }
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapseFaq(n) {
      if (n.view === 1 && Number(this.sub) === Number(n.userIdx)) {
        this.productFaqs[n.no].isOpen = !this.productFaqs[n.no].isOpen;
      } else if (n.view === 1 && Number(this.sub) !== Number(n.userIdx)) {
        this.inquiryDialog = true;
      } else {
        this.productFaqs[n.no].isOpen = !this.productFaqs[n.no].isOpen;
      }
    },
    likeProduct() {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/product/like`, {
        productIdx: this.$route.params.id
      })
          .then(() => {
            this.getProductDetail();
          })
          .catch(err => {
            if (err.response.data.resultCode === 403) {
              this.loginDialog = true;
              this.message = err.response.data.message;
              return false;
            } else {
              console.error(err);
            }
          })
    },
  }
}
</script>

<template>
  <v-app>
    <div class="mt-16 mb-16 pb-14">
      <div v-if="this.$route.path === `/product/${this.$route.params.id}`"
           style="height: 75px;" class="fixed-div">
        <div style="display: flex;" class="ml-4 mt-5">
          <!--          <img src="@/assets/icons/ico-black-left.svg" class="ml-4 cursor-pointer" @click="$router.go(-1);"/>-->
          <span
              style="text-align: center; justify-content: center; margin: auto;font-family: Inter;font-size: 25px;font-weight: 700;">{{
              menu
            }}</span>
        </div>
      </div>
      <div>
        <v-carousel cycle height="500" hide-delimiters>
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
          <div style="position: absolute; bottom: 15px; right: 0;" class="mr-2 cursor-pointer z-20"
               @click="likeProduct()">
            <img src="@/assets/icons/ico-like-gray.svg" class="px-1.5" v-if="!product.productLikeIdx"/>
            <img src="@/assets/icons/ico-like-primary.svg" class="px-1.5" v-else/>
          </div>
        </v-carousel>
      </div>
      <div>
        <v-tabs fixed-tabs right style="max-width: 100%" v-model="tab">
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="one">상품정보</v-tab>
          <!--          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="two">상품평(555)</v-tab>-->
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="three">문의하기</v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="four">유의사항</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <div class="pb-14">
                <div class="float-left">
                  <p style="font-family: Inter; font-size: 25px; font-weight: 700; text-align: left" class="mt-6">
                    {{ product.title }}
                  </p>
                  <p style="font-family: Inter; font-size: 16px; font-weight: 500; text-align: left;">
                    {{ product.description }}
                  </p>
                </div>
                <!--                <div class="float-right">-->
                <!--                  <img src="@/assets/icons/ico-pink-star.svg">-->
                <!--                  <p style="font-family: Inter;font-size: 13px;font-weight: 700;">4.9</p>-->
                <!--                </div>-->
              </div>
              <div class="mt-16 mb-10">
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
            </v-window-item>
            <v-window-item value="two">
              Two
            </v-window-item>
            <v-window-item value="three">
              <div class="pt-4">
                <div style="font-family: Inter;font-size: 26px;font-weight: 700;text-align: left">
                  문의하기
                </div>
              </div>
              <div class="text-left pt-10">
                <v-row>
                  <v-col v-for="(n, index) in productFaqs" :key="index" cols="12">
                    <v-chip v-if="n.answer"
                            style="height: 24px;font-family: Inter;font-size: 11px;font-weight: 700;" color="primary"
                            class="mb-2"><span class="white--text">답변완료</span>
                    </v-chip>
                    <v-chip
                        v-else
                        style="height: 24px;font-family: Inter;font-size: 11px;font-weight: 700;" color="#D9D9D9"
                        class="mb-2"><span style="color: #9E9E9E">답변대기</span>
                    </v-chip>
                    <div v-if="n.view === 1" style="font-family: Inter;font-size: 18px;font-weight: 500;"
                         class="d-flex justify-between">
                      <div class="float-left">Q. {{ Number(sub) === Number(n.userIdx) ? n.contents : `비밀글 입니다.` }}<img
                          class="float-right ml-2" src="@/assets/icons/ico-lock.svg"></div>
                      <img src="@/assets/icons/ico-black-up.svg" class="px-1.5" v-if="n.isOpen"
                           @click="toggleCollapseFaq(n)"/>
                      <img src="@/assets/icons/ico-black-down.svg" class="px-1.5" v-else @click="toggleCollapseFaq(n)"/>
                    </div>
                    <div v-else style="font-family: Inter;font-size: 18px;font-weight: 500;"
                         class="d-flex justify-between">
                      <div class="float-left"
                           style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 70%; display: inline-block;">
                        Q. {{ n.contents }}
                      </div>
                      <img src="@/assets/icons/ico-black-up.svg" class="px-1.5" v-if="n.isOpen"
                           @click="toggleCollapseFaq(n)"/>
                      <img src="@/assets/icons/ico-black-down.svg" class="px-1.5" v-else @click="toggleCollapseFaq(n)"/>
                    </div>
                    <div style="font-family: Inter;font-size: 14px;font-weight: 400;color: #9E9E9E" class="mb-2 mt-1">
                      <span
                          style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 40%; display: inline-block;">
                        {{ n.nickname }}
                      </span>
                      <span style="vertical-align: top;"> ∣ {{
                          n.createdDt.substr(0, 10)
                        }}</span>
                    </div>
                    <v-expand-transition>
                      <div v-if="n.isOpen">
                        <div class="mb-6 pa-4"
                             style="background-color: #EFEFEF;font-family: Inter;font-size: 15px;font-weight: 700;"
                             v-if="n.answer" v-html="'A. ' + n.answer"></div>
                      </div>
                    </v-expand-transition>
                    <hr/>
                  </v-col>
                </v-row>
                <div style="position: relative;display: flex;justify-content: right"
                     :style="{maxWidth: $vuetify.breakpoint.width <= 1024 ? `100%` : `460px` }">
                  <div class="fixed-button-container cursor-pointer">
                    <img src="@/assets/icons/ico-pen.svg"
                         @click="$router.push({ path: '/product-inquiry-add', query: { productIdx: $route.params.id, title: product.title } }).catch(()=>{})">
                  </div>
                </div>
              </div>
            </v-window-item>
            <v-window-item value="four">
              <div class="mt-5">
                <p class="text-left mb-10" style="font-family: Inter;font-size: 26px;font-weight: 700;">꼭 읽어주세요.</p>
                <div class="text-left flex mb-2" v-for="(item, index) in productNotices" :key="index">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <div class="d-flex align-center" style="font-family: Inter;font-size: 15px;font-weight: 400;">
                        <img src="@/assets/icons/ico-black-notice.svg" width="15" height="15" class="mr-2">
                        {{ item.title }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="pl-6"
                           style="font-family: Inter;font-size: 10px;font-weight: 400;color: #989898;word-wrap: break-word">
                      {{ item.description }}
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </div>
    </div>
    <div class="text-center">
      <v-dialog
          v-model="loginDialog"
          max-width="328"
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
                @click="$router.push('/login').catch(()=>{})"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <v-dialog content-class="bottom-dialog" v-model="dialog" scrollable
                hide-overlay transition="dialog-bottom-transition">
        <v-card max-width="100%" style="background-color: #FFFFFF">
          <v-divider></v-divider>
          <v-row class="ma-3">
            <v-col cols="12">
              <div style="font-family: Inter;font-size: 20px;font-weight: 700;text-align: left" class="mb-5">
                <div v-if="options.length === 1">
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
                      label="선택"
                      @change="loadData"
                  ></v-select>
                  <v-row v-if="optionChildes.length === 0">
                    <v-col cols="12" v-for="(item, index) in selectedItems" :key="index">
                      <div class="float-left"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: left;">
                        {{ item.title }} {{ item.total?.toLocaleString() }}원
                      </div>
                      <div class="float-right number-input text-right"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: right;">
                        <img src="@/assets/icons/ico-gray-minus.svg" alt="Left Icon" @click="decrementQuantity(item)"/>
                        <input type="number" v-model="item.quantity" class="hide-arrow"
                               style="max-width: 30px; text-align: center"/>
                        <img src="@/assets/icons/ico-gray-plus.svg" alt="Right Icon" @click="incrementQuantity(item)"/>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row v-else>
                    <v-col cols="12">
                      <v-select
                          v-model="selectedItemOption"
                          :items="optionChildes"
                          item-text="title"
                          item-value="productOptionIdx"
                          label="선택"
                          @change="loadDataOption"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" v-for="(item, index) in selectedOptionItems" :key="index">
                      <div class="float-left"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: left;">
                        {{ item.selectedItem }} {{ item.title }} {{ item.total?.toLocaleString() }}원
                      </div>
                      <div class="float-right number-input text-right"
                           style="font-family: Inter;font-size: 15px;font-weight: 700;text-align: right;">
                        <img src="@/assets/icons/ico-gray-minus.svg" alt="Left Icon" @click="decrementQuantity(item)"/>
                        <input type="number" v-model="item.quantity" class="hide-arrow"
                               style="max-width: 30px; text-align: center"/>
                        <img src="@/assets/icons/ico-gray-plus.svg" alt="Right Icon" @click="incrementQuantity(item)"/>
                      </div>
                    </v-col>
                  </v-row>
                </div>
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
            <v-btn width="50%" height="60" style="font-family: Inter;font-size: 20px;font-weight: 700;"
                   @click="addCart">장바구니
            </v-btn>
            <v-btn width="50%" color="primary" style="font-family: Inter;font-size: 20px;font-weight: 700;" height="60"
                   @click="redirectToIpay">
              구매하기
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
    <div>
      <div class="text-center">
        <v-dialog
            v-model="inquiryDialog"
            max-width="328"
            style="z-index: 9999"
        >
          <v-card height="163" style="border-radius: 15px" class="justify-center align-center">
            <v-card-text style="font-family: Inter;font-size: 20px;font-weight: 700;" class="mt-5">
              작성자 본인만 확인할 수 있습니다.
            </v-card-text>
            <v-card-actions class="mt-10">
              <v-btn
                  rounded
                  color="primary"
                  width="100%"
                  @click="inquiryDialog = false"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <v-footer fixed class="justify-center flex fill-width"
              style="height: 65px; background-color: #EF3426"
    >
      <v-btn color="primary" elevation="0"
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
  background-color: #ffffff;
  z-index: 1000;
  @media screen and (max-width: 1024px) {
    width: 100% !important;
  }
  width: 460px !important;
}

.fill-width {
  @media screen and (max-width: 1024px) {
    width: 100% !important;
    left: 0 !important;
  }
  width: 460px !important;
  left: 50% !important;
}

.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
  max-width: 460px;
  @media screen and (max-width: 1024px) {
    max-width: 100%;
  }
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

.fixed-button-container {
  bottom: 100px;
  z-index: 999; /* 다른 요소 위에 나타나도록 설정 */
  position: fixed;
}
</style>