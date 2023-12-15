<script>
import axios from "axios";

export default {
  data() {
    return {
      tab: null,
      orders: [],
    }
  },
  mounted() {
    this.getMyOrder();
  },
  methods: {
    getMyOrder() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order/list`)
          .then(res => {
            this.orders = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        <v-tabs fixed-tabs right style="max-width: 100%" v-model="tab">
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="one">주문목록</v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="two">교환/반품 현황
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-row class="mt-5">
              <v-col v-for="(order, index) in orders" :key="index" cols="12">
                <v-card style="background: #F0F0F0;border-radius: 15px" elevation="0" height="170">
                  <div class="ma-5">
                    <div class="float-left mr-4">
                      <div class="mb-2" style="font-family: Inter;font-size: 14px;font-weight: 700;text-align: left">{{ order.createdDt?.substr(0,10).replaceAll(`-`, `.`) }}</div>
                      <v-img :src="order.bannerUrl" width="100" height="100"></v-img>
                    </div>
                    <div>
                      <div class="mb-2 cursor-pointer" style="font-family: Inter;font-size: 14px;font-weight: 700;text-align: right;color: #9E9E9E" @click="$router.push(`/orders/${order.orderIdx}`)">자세히 ></div>
                      <div style="font-family: Inter;font-size: 16px;font-weight: 700;text-align: left">{{order.title }}</div>
                      <div style="font-family: Inter;font-size: 12px;font-weight: 400;text-align: left">{{ order.optionTitle }}</div>
                      <div class="mt-8" style="font-family: Inter;font-family: Inter;font-size: 16px;font-weight: 700;;text-align: left">{{ order.amount?.toLocaleString() }}원</div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item value="two">

          </v-window-item>
        </v-window>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>