<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedCategory: ``,
      categories: [],
      communities: [],
      search: ``,
      communityLikeIdx: 0,
      page: 0,
      last: false,
      addData: [],
    }
  },
  mounted() {
    this.page = 0;
    this.getCommunity();
    this.getCategory();
  },
  methods: {
    handleChipClick(category) {
      this.communities = [];
      this.selectedCategory = category;
      this.getCommunity();
      this.page = 0;
    },
    searchCommunity() {
      this.communities = [];
      this.getCommunity();
      this.page = 0;
    },
    getCommunity() {
      if (this.page === 0) {
        // 초기 페이지 로드 시에만 댓글 초기화
        this.communities = [];
      }
      let communities = [];
      let typeKo = ``;
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/community?type=${this.selectedCategory}&query=${this.search}&page=${this.page}`)
          .then(res => {
            if (res.data.data.list.length > 0) {
              res.data.data.list.map((item, index) => {
                if (item.type === `normal`) {
                  typeKo = `잡담`;
                } else if (item.type === `quesion`) {
                  typeKo = `궁금한거`;
                } else if (item.type === 'delivery') {
                  typeKo = `buy`;
                } else if (item.type === `buy`) {
                  typeKo = `사요`;
                } else {
                  typeKo = `팔아요`;
                }
                communities.push({
                  no: index + 1,
                  communityIdx: item.communityIdx,
                  communityLikeIdx: item.communityLikeIdx,
                  userIdx: item.userIdx,
                  nickname: item.nickname,
                  comment: item.comment,
                  title: item.title,
                  contents: item.contents,
                  type: item.type,
                  url: item.url,
                  typeKo: typeKo,
                  like: item.like,
                  createdDt: item.createdDt,
                });
              });
            }
            this.addData = communities;
            this.communities = [...this.communities, ...communities];
            this.last = res.data.data.last;
          })
          .catch(err => {
            console.error(err);
          })
    },
    getCategory() {
      let newObj = {idx: 0, key: ``, value: `전체`, description: null};
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/code?code=community`)
          .then(res => {
            this.categories = res.data.data;
            this.categories.unshift(newObj)
          })
          .catch(err => {
            console.error(err);
          })
    },
    replaceNewline(text) {
      return text.replace(/\n/g, '<br>');
    },
    updateLike(communityIdx) {
      axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/community/like`, {
        communityIdx: communityIdx,
      },)
          .then(() => {
            this.getCommunity();
          })
          .catch(err => {
            console.error(err);
          })
    },
    likeCountView(number) {
      if (isNaN(number) || number === undefined) return '';
      const bill = 1000000000;
      const mill = 1000000;
      const kill = 1000;
      if (number > bill) {
        return Math.floor((number * 10) / bill) / 10 + 'B';
      }
      if (number > mill) {
        return Math.floor((number * 10) / mill) / 10 + 'M';
      }
      if (number > kill) {
        return Math.floor((number * 10) / kill) / 10 + 'K';
      }
      return number;
    },
    formatTimeAgo(dateString) {
      if (!dateString) return '';
      const offset = new Date().getTimezoneOffset();
      const date = new Date(dateString);
      const now = Date.now();

      const SEC = 1000;
      const MIN = SEC * 60;
      const HOUR = MIN * 60;
      const DAY = HOUR * 24;
      const WEEK = DAY * 7;
      const MON = DAY * 30;
      const YEAR = DAY * 365;

      const cur = now - date.getTime() + offset * 60 * 1000;

      const seconds = `${Math.floor(cur / SEC)} 초전`;
      const minutes =
          Number(cur / MIN) >= 1 ? `${Math.floor(cur / MIN)}분 전` : false;
      const hours =
          Number(cur / HOUR) >= 1 ? `${Math.floor(cur / HOUR)}시간 전` : false;
      const days = Number(cur / DAY) >= 1 ? `${Math.floor(cur / DAY)}일 전` : false;
      const weeks =
          Number(cur / WEEK) >= 1 ? `${Math.floor(cur / WEEK)}주 전` : false;
      const months =
          Number(cur / MON) >= 1 ? `${Math.floor(cur / MON)}달 전` : false;
      const years =
          Number(cur / YEAR) >= 1 ? `${Math.floor(cur / YEAR)}년 전` : false;
      return years || months || weeks || days || hours || minutes || seconds;
    },
    async handleIntersection(entries) {
      if (entries[0].isIntersecting && !this.last) {
        // 스크롤이 일정 부분 내려가면 추가 데이터 로딩
        await this.getCommunity();
        this.page++;
      }
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-40 mb-20 pb-14 pl-1 pr-1">
        <div style="position: relative;right: 16px;">
          <div class="fixed-div-chips mt-13 pt-4 pl-4">
            <v-chip-group
                v-model="selectedCategory"
            >
              <v-chip
                  v-for="c in categories"
                  :key="c.idx"
                  active-class="secondary"
                  color="light-grey"
                  :value="c.key"
                  @click="handleChipClick(c.key)"
                  style="font-family: Inter;font-size: 14px;font-weight: 700;"
              >
                {{ c.value }}
              </v-chip>
            </v-chip-group>
            <div class="mt-2">
              <v-text-field background-color="#EFEFEF" flat dense solo
                            style="border-radius: 40px; width: 95%;font-family: Inter;font-size: 13px;font-weight: 400; color: black"
                            class="mr-2" placeholder="검색어를 입력하세요." v-model="search" @keyup="searchCommunity">
                <template v-slot:prepend-inner>
                  <img src="@/assets/icons/ico-gray-search.svg" class="input-image" alt="Icon">
                </template>
              </v-text-field>
            </div>
          </div>
        </div>
        <div class="pt-12">
          <v-row>
            <v-col v-for="(c, index) in communities" :key="index" cols="12" class="cursor-pointer"
                   style="max-height: 190px" @click.stop="$router.push(`/community/${c.communityIdx}`).catch(()=>{})">
              <div class="float-left" :style="{ width: c.url? '50%' : '100%'}">
                <div>
                  <div style="font-family: Inter; font-size: 22px; font-weight: 700; text-align: left;" class="mt-3">
                <span
                    style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 40%; display: inline-block;">
                  {{ c.title }}
                </span>
                    <span style="font-family: Inter; font-size: 15px; font-weight: 700; vertical-align: super;"> ∣ {{
                        c.typeKo
                      }}</span>
                  </div>
                  <div
                      style="font-family: Inter; font-size: 17px; font-weight: 400; text-align: left; white-space: normal; word-break: break-all;"
                      v-html="replaceNewline(c.contents)" class="clamped-text mr-2">
                  </div>
                </div>
                <div style="font-family: Inter;font-size: 13px;font-weight: 400;text-align: left;color: #9E9E9E"
                     class="mb-3 mt-5">
                  <span class="mr-2">{{ c.nickname }}</span> ∣ <span
                    class="ml-2">{{ formatTimeAgo(c.createdDt) }}</span>
                  <div v-if="!c.url" class="float-right mt-2"
                       style="width: 30%; display: flex; align-items: center; justify-content: flex-end;">
                    <img src="@/assets/icons/ico-pink-heart.png" class="float-right cursor-pointer"
                         v-if="c.communityLikeIdx"
                         @click.stop="updateLike(c.communityIdx)">
                    <img src="@/assets/icons/ico-white-heart.png" class="float-right cursor-pointer" v-else
                         @click.stop="updateLike(c.communityIdx)">
                    <span class="mr-4 ml-1"
                          style="font-family: Inter;font-size: 13px;font-weight: 700;color: black">{{
                        likeCountView(c.like)
                      }}</span>
                    <img src="@/assets/icons/ico-comment.svg" class="float-right">
                    <span class="ml-1" style="font-family: Inter;font-size: 13px;font-weight: 700; color: black">{{
                        c.comment
                      }}</span>
                  </div>
                </div>
              </div>
              <div v-if="c.url" class="float-right mt-4 cursor-pointer"
                   @click.stop="$router.push(`/community/${c.communityIdx}`).catch(()=>{})">
                <v-card elevation="0" width="103" max-width="103" height="103" max-height="103">
                  <img :src="c.url" width="105" height="105" style="max-width: 103px;max-height: 103px;">
                </v-card>
                <div class="float-right mt-2"
                     style="display: flex; align-items: center; justify-content: flex-end;">
                  <img src="@/assets/icons/ico-pink-heart.png" class="float-right cursor-pointer"
                       v-if="c.communityLikeIdx"
                       @click.stop="updateLike(c.communityIdx)">
                  <img src="@/assets/icons/ico-white-heart.png" class="float-right cursor-pointer" v-else
                       @click.stop="updateLike(c.communityIdx)">
                  <span class="mr-4 ml-1" style="font-family: Inter;font-size: 13px;font-weight: 700;">{{
                      likeCountView(c.like)
                    }}</span>
                  <img src="@/assets/icons/ico-comment.svg" class="float-right">
                  <span class="ml-1" style="font-family: Inter;font-size: 13px;font-weight: 700;">{{ c.comment }}</span>
                </div>
              </div>
              <hr/>
            </v-col>
          </v-row>
        </div>
        <div style="position: relative;display: flex;justify-content: right" :style="{maxWidth: $vuetify.breakpoint.width <= 1024 ? `100%` : `460px` }">
          <div class="cursor-pointer fixed-button-container">
            <img src="@/assets/icons/ico-pen.svg" @click.stop="$router.push(`/community-add`).catch(()=>{})">
          </div>
        </div>
      </div>
      <div ref="intersectionTarget" class="intersection-target" v-intersect="handleIntersection"></div>
    </v-container>
  </v-app>
</template>

<style>
.input-with-image {
  padding-left: 30px; /* 이미지를 덮지 않도록 왼쪽 패딩 추가 */
}

.fixed-div-chips {
  position: fixed;
  top: 0;
  background-color: #242424;
  z-index: 999;
  @media screen and (max-width: 1024px) {
    width: 100% !important;
    right: 0;
  }
  width: 460px !important;
}

.clamped-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 여기서 4는 최대 표시할 줄 수입니다. */
  -webkit-box-orient: vertical;
}

.fixed-button-container {
  bottom: 100px;
  z-index: 999; /* 다른 요소 위에 나타나도록 설정 */
  position: fixed;
}

</style>