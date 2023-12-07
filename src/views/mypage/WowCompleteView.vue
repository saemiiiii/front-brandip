<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {},
      moid: this.$route.query.moid,
      resultPrice: 0,
      deliveryPrice: 3000,
    }
  },
  mounted() {
    this.getOrderComplete();
  },
  methods: {
    getOrderComplete() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order/complete?moid=${this.moid}`)
          .then(res => {
            this.order = res.data.data;
            console.log(this.order)
            this.resultPrice = res.data.data.amt + this.deliveryPrice;
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
    <v-container>
      <img src="@/assets/icons/ico-black-xbox.svg" width="15" height="15" class="float-right ma-1" @click="$router.push(`/`)">
      <div class="mt-16">
        <img src="@/assets/icons/ico-big-check.svg" width="55" height="55" class="ma-auto">
        <p class="mt-10" style="font-family: Inter;font-size: 25px;font-weight: 800;"> 주문이 완료되었습니다.</p>
        <p style="font-family: Inter;font-size: 16px;font-weight: 500;"> 주문내역 및 배송현황은 마이페이지의 <br> '주문 목록'메뉴에서 확인하실 수 있습니다.</p>
        <hr style="border: 2px solid #000000" class="mt-5">
      </div>
      <div class="mt-10">
        <div class="text-left" style="font-family: Inter;font-size: 17px;font-weight: 800;">
          결제상품정보
        </div>
        <hr style="border: 1px solid #BEBEBE" class="mt-1 mb-2"/>
        <div class="mt-5">
          <div class="float-left mr-2">
            <v-img :src="order.productUrl" width="130" height="130"></v-img>
          </div>
          <div class="ml-4">
            <div style="font-family: Inter;font-size: 16px;font-weight: 800; text-align: left">{{ order.productTitle }}</div>
            <div style="font-family: Inter;font-size: 12px;font-weight: 400; text-align: left">{{ order.goodsName }}
<!--              {{ order.volume }}개--> 1개
            </div>
            <div class="mt-16" style="font-family: Inter;font-size: 16px;font-weight: 700; text-align: left">
              {{ order.amt?.toLocaleString() }}원
            </div>
          </div>
          <div class="text-left mt-10" style="font-family: Inter;font-size: 17px;font-weight: 800;">
            배송정보
          </div>
          <hr style="border: 1px solid #BEBEBE" class="mt-1 mb-2"/>
          <v-row>
            <v-col cols="12">
              <div style="font-family: Inter;font-size: 15px;font-weight: 700; text-align: left">

                <span>{{ order.buyerName }}님  <!--({{ d.deliveryName }})-->(회사)</span>
                <span class="ml-2" style="font-family: Inter;font-size: 15px;font-weight: 400;">01012345678
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
              <v-text-field
                  outlined
                  dense
                  style="border-radius: 15px;color: #9E9E9E;font-family: Inter;font-size: 13px;font-weight: 700;"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="text-left mt-5" style="font-family: Inter;font-size: 17px;font-weight: 800;">
            총 결제 금액
          </div>
          <v-row no-gutters class="mt-5">
            <v-col cols="12" class="mb-2">
              <span class="float-left" style="font-family: Inter;font-size: 14px;font-weight: 400;">상품 금액</span> <span
                class="float-right" style="font-family: Inter;font-size: 14px;font-weight: 700;">{{
                order.amt?.toLocaleString()
              }}원</span>
            </v-col>
            <v-col cols="12" class="mb-2">
              <span class="float-left" style="font-family: Inter;font-size: 14px;font-weight: 400;">배송비</span> <span
                class="float-right" style="font-family: Inter;font-size: 14px;font-weight: 700;">
              {{ deliveryPrice?.toLocaleString() }}원
            </span>
            </v-col>
          </v-row>
          <hr style="border: 2px solid #000000"/>
          <v-row no-gutters class="mt-5">
            <v-col cols="12" class="mb-2">
              <span class="float-left" style="font-family: Inter;font-size: 14px;font-weight: 400;">결제 금액</span> <span
                class="float-right" style="font-family: Inter;font-size: 14px;font-weight: 700;">{{
                resultPrice?.toLocaleString()
              }}원</span>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>