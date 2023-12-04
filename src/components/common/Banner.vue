<script>
import axios from "axios";

export default {
  data() {
    return {
      banner: []
    }
  },
  mounted() {
    this.getBanner();
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
    }
  }
}
</script>
<template>
  <div>
    <div style="text-align: center; display: flex; justify-content: center;">
      <img src="@/assets/icons/ico-logo.svg" class="mt-5"
           style="position: absolute;  z-index: 9;"
           @click="$router.push('/').catch(()=>{})"/>
    </div>
    <div style="display: flex; justify-content: end;">
      <img src="@/assets/icons/ico-white-search.svg" class="mt-4 mr-11" style="position: absolute; z-index: 9"/>
      <img src="@/assets/icons/ico-white-alarm.svg" class="mt-4 mr-2" style="position: absolute; z-index: 9"/>
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