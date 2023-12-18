<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {},
      orders: [],
      dialog: false,
      dialogDelete: false,
      message: `주문내역을 삭제하시겠습니까?`
    }
  },
  mounted() {
    this.getMyOrderDetail();
  },
  methods: {
    getMyOrderDetail() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/order/${this.$route.params.id}`)
          .then(res => {
            this.order = res.data.data;
            this.orders = res.data.data.orders;
          })
          .catch(err => {
            console.error(err);
          })
    },
    deleteOrder() {
      axios.delete(`${process.env.VUE_APP_SERVICE_URL}v1/community?communityIdx=${idx}`)
          .then(() => {
            this.dialogDelete = false;
            this.getDelivery();
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
        <div style="font-family: Inter; font-size: 28px; font-weight: 700; text-align: left;">
          상세보기
        </div>
        <v-row class="mt-5">
          <v-col v-for="(order, index) in orders" :key="index" cols="12">
            <div>
              <div class="float-left mr-4">
                <v-img :src="order.bannerUrl" width="100" height="100"></v-img>
              </div>
              <div>
                <div style="font-family: Inter;font-size: 16px;font-weight: 700;float: left">{{ order.title }}</div>
                <div style="font-family: Inter;font-size: 16px;font-weight: 700;float: right"><img
                    src="@/assets/icons/ico-small-dot.svg" @click="dialog = true" class="cursor-pointer"></div>
                <div class="text-left pt-6" style="font-family: Inter;font-size: 12px;font-weight: 400;">
                  {{ order.parentOptionTitle }} {{ order.optionTitle }}
                </div>
                <div class="mt-10"
                     style="font-family: Inter;font-family: Inter;font-size: 14px;font-weight: 700;;text-align: left">
                  {{ order.amount?.toLocaleString() }}원
                </div>
              </div>
            </div>
            <v-btn width="100%" class="mt-3" height="33" elevation="0" color="secondary"
                   style="font-family: Inter;font-size: 13px;font-weight: 700;">배송현황
            </v-btn>
          </v-col>
        </v-row>
        <div class="mt-10">
          <div class="text-left" style="font-family: Inter;font-size: 17px;font-weight: 800;">
            주문정보
          </div>
          <hr style="border: 1px solid #BEBEBE" class="mt-1 mb-2"/>
          <v-row no-gutters>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                주문일
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.createdDt?.substr(0,10) }}
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                받는사람
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.deliveryName }}
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                연락처
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.phone }}
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                받는주소
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                ({{ order.zipcode }}){{ order.address }}
              </div>
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.addressDetail }}
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                요청사항
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.memo }}
              </div>
            </v-col>
          </v-row>
          <div class="text-left mt-5" style="font-family: Inter;font-size: 17px;font-weight: 800;">
            결제정보
          </div>
          <hr style="border: 1px solid #BEBEBE" class="mt-1 mb-2"/>
          <v-row no-gutters>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                상품가격
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.amount?.toLocaleString() }}원
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                배송비
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.deliveryAmount?.toLocaleString() }}원
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                총 결제금액
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ Number(order.amount + order.deliveryAmount).toLocaleString() }}원
              </div>
            </v-col>
            <v-col cols="4" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400; text-align: left;color: #9E9E9E">
                결제수단
              </div>
            </v-col>
            <v-col cols="8" class="mb-1">
              <div style="font-family: Inter;font-size: 14px;font-weight: 400;text-align: right">
                {{ order.cardName }} / {{ order.cardQuita }}
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div>
        <v-dialog max-width="380px" content-class="bottom-dialog" v-model="dialog" scrollable
                  hide-overlay transition="dialog-bottom-transition">
          <v-card max-width="100%" style="background-color: #FFFFFF">
            <v-divider></v-divider>
            <v-row class="ma-3">
              <v-col cols="12">
                <div style="font-family: Inter;font-size: 20px;font-weight: 800;text-align: left" class="mb-5">
                  상세보기
                </div>
                <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left" class="cursor-pointer">문의하기</p>
                <p style="font-family: Inter;font-size: 16px;font-weight: 500;text-align: left" class="cursor-pointer" @click="dialogDelete = true">주문내역 삭제</p>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </div>
      <div class="text-center">
        <v-dialog
            v-model="dialogDelete"
            max-width="328"
            style="z-index: 999"
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
                  @click="deleteOrder(community.communityIdx)"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </v-app>
</template>

<style>
.bottom-dialog {
  margin-bottom: 0;
  align-self: flex-end;
  border-radius: 25px 25px 0px 0px;
}
</style>