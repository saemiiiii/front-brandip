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
      axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/common/banner?type=main_add`)
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
    <v-carousel cycle height="150" hide-delimiters hide-delimiter-background style="box-shadow: 0px 4px 4px 0px #00000040;border-radius: 15px">
      <v-carousel-item
          v-for="(b,i) in banner"
          :key="i"
          :src="b.url"
          cover
      >
        <p style="font-family: Inter;font-size: 35px;font-weight: 700;text-align: center; margin-top: 30px">
          {{ b.title }}</p>
        <p style="font-family: Inter;font-size: 17px;font-weight: 700;text-align: center;">
          {{ b.description }}</p>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<style scoped>

</style>