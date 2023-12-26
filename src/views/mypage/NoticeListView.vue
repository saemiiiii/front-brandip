<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [
        {id: 1, value: ``, text: `전체`},
        {id: 2, value: `notice`, text: `공지`},
        {id: 3, value: `event`, text: `이벤트`},
      ],
      selectedCategory: '',
      notices: [],
    }
  },
  mounted() {
    this.getNotices()
  },
  methods: {
    getNotices() {
      let notices = [];
      axios.get(`v1/cs?code=${this.selectedCategory}`)
          .then(res => {
            if (res.data.data.list.length > 0) {
              res.data.data.list.map((item, index) => {
                notices.push({
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
            this.notices = notices;
          })
          .catch(err => {
            console.error(err);
          })
    },
    toggleCollapse(index) {
      this.notices[index].isOpen = !this.notices[index].isOpen;
    },
    handleChipClick(category) {
      this.selectedCategory = category;
      this.getNotices();
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-40 mb-20 pb-14">
        <div class="fixed-div mt-16 pt-4">
          <div style="font-family: Inter; font-size: 30px; font-weight: 700; text-align: left;" class="ml-4">
            공지사항
          </div>
          <v-chip-group
              v-model="selectedCategory"
              class="ml-4"
          >
            <v-chip
                v-for="c in categories"
                :key="c.id"
                active-class="secondary"
                color="light-grey"
                :value="c.value"
                @click="handleChipClick(c.value)"
            >
              {{ c.text }}
            </v-chip>
          </v-chip-group>
        </div>
        <div class="text-left pt-10">
          <v-row>
            <v-col v-for="(n, index) in notices" :key="index" cols="12">
              <v-chip v-if="n.code === `EVENT`"
                      style="height: 24px;font-family: Inter;font-size: 11px;font-weight: 700;" color="#1D55F0"
                      class="text-center white--text">이벤트
              </v-chip>
              <v-chip v-if="n.code === `NOTICE`"
                      style="height: 24px;font-family: Inter;font-size: 11px;font-weight: 700;" color="#FC9DC3"
                      class="text-center white--text">공지
              </v-chip>
              <div style="font-family: Inter;font-size: 18px;font-weight: 700;" class="d-flex justify-between">
                {{ n.title }}
                <img src="@/assets/icons/ico-black-up.svg" class="px-1.5" v-if="n.isOpen" @click="toggleCollapse(index)"/>
                <img src="@/assets/icons/ico-black-down.svg" class="px-1.5" v-else @click="toggleCollapse(index)"/>
              </div>
              <div style="font-family: Inter;font-size: 12px;font-weight: 300;" class="mb-2">
                {{ n.createdDt.substr(0, 10) }}
              </div>
              <v-expand-transition>
                <div v-if="n.isOpen">
                  <div class="mb-6 pa-4" style="background-color: #EFEFEF;font-family: Inter;font-size: 15px;font-weight: 700;" v-html="n.description">
                  </div>
                </div>
              </v-expand-transition>
              <hr/>
            </v-col>
          </v-row>
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