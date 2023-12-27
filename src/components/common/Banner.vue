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
            style="text-align: center; display: flex; justify-content: left; position: fixed; top: 0;right: 0; z-index: 9; background-color: #242424;transition: background-color 0.3s ease;"
            :style="{ backgroundColor: isScrolled ? '#242424' : 'transparent'}" class="fixed-div"
        >
<!--          <img src="@/assets/icons/ico-logo.svg" class="mt-3 mb-3" @click="$router.push('/').catch(()=>{})"/>-->
          <p style="font-family:Heavy;font-size: 25px;font-weight: 800;color: #FFFFFF" class="ma-3">BRANDIP</p>
        </div>
        <div v-if="isScrolled" style="display: flex; justify-content: end;">
          <img src="@/assets/icons/ico-white-search.svg" class="mt-3 mr-2 cursor-pointer"
               style="position: fixed; z-index: 10" @click="$router.push(`/search`).catch(()=>{})"/>
          <!--        <img src="@/assets/icons/ico-black-alarm.svg" class="mt-4 mr-11" style="position: fixed; z-index: 10"/>-->
        </div>
        <div style="display: flex; justify-content: end;">
          <img src="@/assets/icons/ico-white-search.svg" class="mt-3 mr-2 cursor-pointer"
               style="position: fixed; z-index: 9" @click="$router.push(`/search`).catch(()=>{})"/>
          <!--        <img src="@/assets/icons/ico-white-alarm.svg" class="mt-4 mr-11" style="position: fixed; z-index: 9"/>-->
        </div>
      </div>
      <v-carousel cycle height="600" hide-delimiters class="banner-gradient">
        <v-carousel-item
            v-for="(b,i) in banner"
            :key="i"
            :src="b.url"
            cover
        >
          <p style="font-family: Inter;font-size: 35px;font-weight: 700;line-height: 42px;letter-spacing: 0em;text-align: center; margin-top: 300px">
            {{ b.title }}</p>
          <p style="font-family: Inter;font-size: 17px;font-weight: 700;line-height: 21px;letter-spacing: 0em;text-align: center;">
            {{ b.description }}</p>
        </v-carousel-item>
      </v-carousel>
    </div>
</template>
<style>
.fixed-div {
  @media screen and (max-width: 1020px) {
    width: 100% !important;
    left: 0 !important;
  }
  width: 25% !important;
  left: 50% !important;
}

.banner-gradient{
  background: linear-gradient(180deg, #242424 0%, rgba(0, 0, 0, 0) 100%);

}
</style>