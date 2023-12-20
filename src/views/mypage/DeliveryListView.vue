<script>
import axios from "axios";

export default {
  data() {
    return {
      delivery: [],
      isProduct: false,
      dialogDelete: false,
      message: `삭제하시겠습니까?`
    }
  },
  mounted() {
    this.getDelivery();
  },
  methods: {
    getDelivery() {
      axios.get(`v1/me/delivery`)
          .then(res => {
            this.delivery = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    deleteDel(idx) {
      this.dialogDelete = true;
      this.idx = idx;
    },
    deleteDelivery () {
      axios.delete(`v1/me/delivery?userDeliveryIdx=${this.idx}`)
          .then(() => {
            this.dialogDelete = false;
            this.getDelivery();
          })
          .catch(err => {
            console.error(err);
          })
    },
    updateDelivery(d) {
      this.$router.push({path: '/delivery-add', query: {delivery: JSON.stringify(d),}}).catch(()=>{});
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        <div class="d-flex justify-between mb-10">
          <div class="ml-3" style="font-family: Inter; font-size: 30px; font-weight: 700; text-align: left;">
            배송지 목록
          </div>
          <div class="mt-1">
            <v-btn rounded color="primary" style="font-family: Inter;font-size: 14px;font-weight: 700;" elevation="0" height="30" @click="$router.push('delivery-add').catch(()=>{})">추가</v-btn>
          </div>
        </div>
        <div class="mt-3 ml-3">
          <v-row>
            <v-col v-for="(d, index) in delivery" :key="index" cols="12">
              <div style="font-family: Inter;font-size: 14px;font-weight: 700; text-align: left">
                {{ d.username }}님 ({{ d.deliveryName }})
                <v-chip v-if="d.main" style="font-family: Inter;font-size: 10px;font-weight: 700; height: 20px" outlined
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
              <v-btn v-if="d.main" rounded class="mt-2" outlined elevation="0" width="100%" height="30"
                     style="font-family: Inter;font-size: 14px;font-weight: 700;" @click="updateDelivery(d)"> 수정
              </v-btn>
              <div v-else>
                <v-btn rounded class="mt-2" outlined elevation="0" width="50%" height="30"
                       style="font-family: Inter;font-size: 14px;font-weight: 700;" @click="updateDelivery(d)"> 수정
                </v-btn>
                <v-btn rounded class="mt-2" outlined elevation="0" width="50%" height="30"
                       style="font-family: Inter;font-size: 14px;font-weight: 700;" @click="deleteDel(d.idx)"> 삭제
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="text-center">
        <v-dialog
            v-model="dialogDelete"
            max-width="328"
            style="z-index: 999"
        >
          <v-card height="163" style="border-radius: 15px">
            <v-card-text style="font-family: Inter;font-size: 20px;font-weight: 700;" class="mt-5">
              {{ message }}
            </v-card-text>
            <v-card-actions class="mt-10">
              <v-btn
                  rounded
                  color="primary"
                  width="100%"
                  @click="deleteDelivery()"
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

<style scoped>

</style>