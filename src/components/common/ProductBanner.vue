<script>
import axios from "axios";

export default {
  data() {
    return {
      banner: [],
    }
  },
  mounted() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/banner?type=PRODUCT`)
          .then(res => {
            this.banner = res.data.data
          })
          .catch(err => {
            console.error(err);
          })
    },
  }
}
</script>
<template>
  <div>
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