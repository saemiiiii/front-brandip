<script>
import axios from "axios";

export default {
  data() {
    return {
      faqs: [],
      search: ``,
    }
  },
  mounted() {
    this.getFaq();
  },
  methods: {
    getFaq() {
      let faqs = [];
      axios.get(`v1/cs?code=faq&query=${this.search}`)
          .then(res => {
            if (res.data.data.list.length > 0) {
              res.data.data.list.map((item, index) => {
                faqs.push({
                  no: index + 1,
                  noticeIdx: item.noticeIdx,
                  code: item.code,
                  title: item.title,
                  description: item.description,
                  createdDt: item.createdDt,
                  isOpen: false,
                });
              });
            }
            this.faqs = faqs;
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapse(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-40">
        <div class="fixed-div mt-16 pt-4">
          <div style="font-family: Inter; font-size: 30px; font-weight: 700; text-align: left;">
            FAQ
          </div>
          <div style="font-family: Inter;font-size: 15px;font-weight: 400; text-align: left;color: #9E9E9E">자주 묻는 질문</div>
          <div class="mt-8">
            <v-text-field background-color="#EFEFEF" dense flat solo style="border-radius: 40px; width: 340px"
                          class="mr-2" placeholder="검색어를 입력하세요" @keyup="getFaq" v-model="search">
              <template v-slot:prepend-inner>
                <img src="@/assets/icons/ico-gray-search.svg" class="input-image" alt="Icon">
              </template>
            </v-text-field>
          </div>
        </div>
        <div class="text-left pt-24">
          <v-row>
            <v-col v-for="(f, index) in faqs" :key="index" cols="12">
              <div style="font-family: Inter;font-size: 18px;font-weight: 700;" class="d-flex justify-between mb-4">
                Q. {{ f.title }}
                <img src="@/assets/icons/ico-black-up.svg" class="px-1.5" v-if="f.isOpen" @click="toggleCollapse(index)"/>
                <img src="@/assets/icons/ico-black-down.svg" class="px-1.5" v-else @click="toggleCollapse(index)"/>
              </div>
              <v-expand-transition>
                <div v-if="f.isOpen">
                  <div class="mb-6 pa-4" style="font-family: Inter;font-size: 18px;font-weight: 700;">
                    A. {{ f.description }}
                  </div>
                </div>
              </v-expand-transition>
              <hr/>
            </v-col>
          </v-row>
          <div class="text-center mt-12" style="font-family: Inter;font-size: 25px;font-weight: 700;">
            원하시는 답변이 없으신가요?<br>
            <span
                style="font-family: Inter;font-size: 15px;font-weight: 700;color: #BEBEBE">질문을 남겨주시면 성의껏 답변 드리겠습니다.</span>
            <v-btn width="100%" class="mt-4" color="primary" elevation="0"
                   style="border-radius: 25px;border: 1px;font-family: Inter;font-size: 16px;font-weight: 700;"
                   @click="$router.push('/inquiry')">문의하기
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style>
.fixed-div {
  position: fixed;
  top: 0;
  width: 380px;
  background-color: #ffffff;
  z-index: 1000;
}
</style>