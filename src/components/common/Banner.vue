<script>
import axios from "axios";

export default {
  data() {
    return {
      banner: [],
      isScrolled: false,
    }
  },
  mounted() {
    this.getBanner();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getBanner() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/banner?type=main`)
          .then(res => {
            this.banner = res.data.data
          })
          .catch(err => {
            console.error(err);
          })
    },
    handleScroll() {
      const scrollPosition = window.scrollY;
      this.isScrolled = scrollPosition > 50; // Adjust the threshold as needed
    },
  }
}
</script>
<template>
  <div>
    <div>
      <div
          style="display: flex; justify-content: left; position: fixed;z-index: 9; background-color: #242424;width:460px;transition: background-color 0.3s ease;"
          :style="{ backgroundColor: isScrolled ? '#242424' : 'transparent'}" class="fixed-div"
      >
        <!--          <img src="@/assets/icons/ico-logo.svg" class="mt-3 mb-3" @click="$router.push('/').catch(()=>{})"/>-->
        <p class="ma-3"><img src="../../assets/icons/ico-brandip-logo.png"></p>
      </div>
<!--      <div v-if="isScrolled" style="display: flex; justify-content: end;">-->
<!--        <img src="@/assets/icons/ico-white-search.svg" class="mt-3 mr-2 cursor-pointer"-->
<!--             style="position: fixed; z-index: 9" @click="$router.push(`/search`).catch(()=>{})"/>-->
<!--        &lt;!&ndash;        <img src="@/assets/icons/ico-black-alarm.svg" class="mt-4 mr-11" style="position: fixed; z-index: 10"/>&ndash;&gt;-->
<!--      </div>-->
      <div style="display: flex; justify-content: right;z-index: 9">
        <img src="@/assets/icons/ico-white-search.svg" class="mt-3 mr-2 cursor-pointer"
             style="position: fixed; z-index: 9" @click="$router.push(`/search`).catch(()=>{})"/>
        <!--        <img src="@/assets/icons/ico-white-alarm.svg" class="mt-4 mr-11" style="position: fixed; z-index: 9"/>-->
      </div>
    </div>
    <div>
      <v-carousel cycle height="620" hide-delimiters>
        <v-carousel-item
            v-for="(b, i) in banner"
            :key="i"
            :src="b.url"
            cover
            style="position: relative;"
        >
          <!-- 이미지 위에 텍스트 -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 100%;">
            <p style="font-family: Inter; font-size: 35px; font-weight: 700; line-height: 42px; letter-spacing: 0em; color: #FFFFFF; margin-bottom: 10px;">
              {{ b.title }}
            </p>
            <p style="font-family: Inter; font-size: 17px; font-weight: 700; line-height: 21px; letter-spacing: 0em; color: #FFFFFF;">
              {{ b.description }}
            </p>
          </div>


        </v-carousel-item>
        <!-- 그라데이션 -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: linear-gradient(0deg, #242424 0%, rgba(0, 0, 0, 0) 100%);"></div>
      </v-carousel>
    </div>
  </div>
</template>
<style>
.fixed-div {
  @media screen and (max-width: 1024px) {
    width: 100% !important;
  }
}
</style>