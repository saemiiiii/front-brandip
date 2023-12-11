<script>
import axios from "axios";
import TvBanner from "@/components/banner/TvBanner.vue";
export default {
  components: {
    TvBanner
  },
  data() {
    return {
      tvs: [],
      search: ``,
    }
  },
  mounted() {
    this.getTv();
  },
  methods: {
    getTv() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/wapletv`)
          .then(res => {
            this.tvs = res.data.data;
            console.log(this.tvs);
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
    <TvBanner />
    <v-container>
      <div class="mt-5">
        <div>
          <v-text-field background-color="#EFEFEF" dense flat solo style="border-radius: 40px; width: 360px"
                        class="ma-auto" placeholder="검색어를 입력하세요" v-model="search">
            <template v-slot:prepend-inner>
              <img src="@/assets/icons/ico-gray-search.svg" class="input-image" alt="Icon">
            </template>
          </v-text-field>
        </div>
        <v-row>
          <v-col v-for="(item, index) in tvs" :key="index" cols="12">
            <img :src="item.thumbnailUrl" width="360" height="240" style="border-radius: 15px;">
            <div class="text-left" style="font-family: Inter;font-size: 18px;font-weight: 700;">{{ item.title }}</div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>