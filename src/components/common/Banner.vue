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
          style="text-align: center; display: flex; justify-content: center; position: fixed; top: 0; left: 0; right: 0; z-index: 9; background-color: white; width: 100%; transition: background-color 0.3s ease;"
          :style="{ backgroundColor: isScrolled ? 'white' : 'transparent' }"
      >
        <img src="@/assets/icons/ico-logo.svg" class="mt-3 mb-3" @click="$router.push('/').catch(()=>{})"/>
      </div>
      <div v-if="isScrolled" style="display: flex; justify-content: end;">
        <img src="@/assets/icons/ico-black-search.svg" class="mt-4 mr-11 cursor-pointer" style="position: fixed; z-index: 10" @click="$router.push(`/search`).catch(()=>{})"/>
        <img src="@/assets/icons/ico-black-alarm.svg" class="mt-4 mr-2" style="position: fixed; z-index: 10"/>
      </div>
      <div style="display: flex; justify-content: end;">
        <img src="@/assets/icons/ico-white-search.svg" class="mt-4 mr-11 cursor-pointer" style="position: fixed; z-index: 9" @click="$router.push(`/search`).catch(()=>{})"/>
        <img src="@/assets/icons/ico-white-alarm.svg" class="mt-4 mr-2" style="position: fixed; z-index: 9"/>
      </div>
    </div>
    <v-carousel cycle height="500" hide-delimiters>
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
<style scoped>

</style>