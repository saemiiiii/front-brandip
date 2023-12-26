<script>
import axios from "axios";

export default {
  data() {
    return {
      inquiries: [],
      inquiryDetail: ``,
    }
  },
  mounted() {
    this.getInquiry();
  },
  methods: {
    getInquiry() {
      let inquiries = [];
      let typeKo = ``;
      axios.get(`v1/cs/inquiry`)
          .then(res => {
            if (res.data.data.list.length > 0) {
              res.data.data.list.map((item, index) => {
                if (item.type === `event`) {
                  typeKo = `이벤트`;
                } else if (item.type === `user`) {
                  typeKo = `가입/탈퇴/로그인`;
                } else if (item.type === 'delivery') {
                  typeKo = `배송`;
                } else if (item.type === `service`) {
                  typeKo = `서비스`;
                } else {
                  typeKo = `기타`;
                }
                inquiries.push({
                  no: index + 1,
                  inquiryIdx: item.inquiryIdx,
                  type: item.type,
                  title: item.title,
                  typeKo: typeKo,
                  createdDt: item.createdDt,
                  isOpen: false,
                  status: item.status
                });
              });
            }
            this.inquiries = inquiries;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getInquiryDetail(inquiryIdx) {
      axios.get(`v1/cs/inquiry/${inquiryIdx}`)
          .then(res => {
            this.inquiryDetail = res.data.data;
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapse(index, inquiryIdx) {
      this.inquiries[index].isOpen = !this.inquiries[index].isOpen;
      if (inquiryIdx) {
        this.getInquiryDetail(inquiryIdx)
      }
    },
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 mb-20 pb-14">
        <div v-if="inquiries.length > 0">
          <div style="font-family: Inter;font-size: 30px;font-weight: 700;text-align: left;" class="mb-6">문의내역</div>
          <div class="text-left pt-10">
            <v-row>
              <v-col v-for="(i, index) in inquiries" :key="index" cols="12">
                <div class="float-left">
                  <v-avatar>
                    <img src="@/assets/icons/ico-question.svg"/>
                  </v-avatar>
                </div>
                <v-chip v-if="i.status === 2"
                    style="height: 24px;font-family: Inter;font-size: 11px;font-weight: 700;" color="primary"
                    class="ml-2 mb-1"><span class="white--text">답변완료</span>
                </v-chip>
                <v-chip
                    v-else
                    style="height: 24px;font-family: Inter;font-size: 11px;font-weight: 700;" color="#D9D9D9"
                    class="ml-2 mb-1"><span style="color: #9E9E9E">답변대기</span>
                </v-chip>
                <div class="d-flex justify-between">
                  <v-row dense no-gutters class="ml-2">
                    <v-col cols="12" style="font-family: Inter;font-size: 18px;font-weight: 700;">
                      {{ i.typeKo }}
                    </v-col>
                    <v-col cols="12" style="font-family: Inter;font-size: 15px;font-weight: 300;">
                      {{ i.title }}
                    </v-col>
                    <v-col cols="12" style="font-family: Inter;font-size: 13px;font-weight: 300;color: #9E9E9E">
                      {{ i.createdDt.substr(0, 10) }}
                    </v-col>
                  </v-row>
                  <img src="@/assets/icons/ico-black-up.svg" class="px-1.5" v-if="i.isOpen"
                       @click="toggleCollapse(index)"/>
                  <img src="@/assets/icons/ico-black-down.svg" class="px-1.5" v-else
                       @click="toggleCollapse(index, i.inquiryIdx)"/>
                </div>
                <div style="font-family: Inter;font-size: 12px;font-weight: 300;" class="mb-2">

                </div>
                <v-expand-transition>
                  <div v-if="i.isOpen" class="mt-5 mb-5">
                    <div class="mb-6 pa-4 ml-5"
                         style="font-family: Inter;font-size: 15px;font-weight: 700;">
                      {{ inquiryDetail.description }}
                      <div v-for="(image, index) in inquiryDetail.files" :key="index" cols="12">
                        <img :src="image" alt="Image" style="width: 100%;"/>
                      </div>
                    </div>
                    <div v-if="inquiryDetail.answer">
                      <div class="float-left mr-2">
                        <v-avatar>
                          <img src="@/assets/icons/ico-answer.svg"/>
                        </v-avatar>
                      </div>
                      <div>
                        <v-row dense no-gutters>
                          <v-col cols="12" style="font-family: Inter;font-size: 15px;font-weight: 700;">
                            {{ inquiryDetail.answer }}
                          </v-col>
                          <v-col cols="12" style="font-family: Inter;font-size: 13px;font-weight: 300;color: #9E9E9E">
                            {{ inquiryDetail.createdDt?.substr(0, 10) }}
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </div>
                </v-expand-transition>
                <hr/>
              </v-col>
            </v-row>
            <v-btn class="mt-8" width="100%"
                   style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 16px;font-weight: 700;"
                   elevation="0" color="primary" @click="$router.push(`/inquiry-add`).catch(()=>{})">문의하기
            </v-btn>
          </div>
        </div>
        <div
            v-else
            style="font-family: Inter; font-size: 15px; font-weight: 300; color: #9E9E9E; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh;">
          <span>등록된 문의가 없습니다.</span>
          <br>
          <v-btn elevation="0" class="mt-3" color="primary" width="185px" height="37px"
                 style="border-radius: 25px; border: 1px;font-family: Inter;font-size: 14px;font-weight: 700;"
                 @click="$router.push('/inquiry-add').catch(()=>{})">문의하기
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>