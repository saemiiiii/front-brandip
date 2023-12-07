<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {},
      moid: `244-8-4000`//this.$route.query.moid
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
      <img src="@/assets/icons/ico-black-xbox.svg" width="15" height="15" class="float-right ma-1">
      <div class="mt-20">
        <img src="@/assets/icons/ico-big-check.svg" width="60" height="60" class="ma-auto">
        <p class="mt-10" style="font-family: Inter;font-size: 25px;font-weight: 800;"> 주문이 완료되었습니다.</p>
        <p style="font-family: Inter;font-size: 18px;font-weight: 400;"> 주문내역 및 배송현황은 마이페이지의 <br> '주문 목록'메뉴에서 확인하실 수 있습니다.</p>
        <hr style="border: 2px solid #000000" class="mt-5">
      </div>
      <div class="mt-10">
        <div class="text-left" style="font-family: Inter;font-size: 19px;font-weight: 700;">
          결제상품정보
        </div>
        <hr style="border: 1px solid #BEBEBE"/>
        <div class="mt-5">
          <div class="float-left mr-2">
            <v-img :src="order.productUrl" width="130" height="130"></v-img>
          </div>
          <div class="ml-4">
            <div style="font-family: Inter;font-size: 18px;font-weight: 700; text-align: left">{{ order.productTitle }}</div>
            <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left">{{ order.goodsName }}
<!--              {{ order.volume }}개--> 1개
            </div>
            <div class="mt-13" style="font-family: Inter;font-size: 18px;font-weight: 700; text-align: left">
              {{ order.amt?.toLocaleString() }}원
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>