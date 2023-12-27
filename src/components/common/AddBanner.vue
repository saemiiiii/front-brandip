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
            this.banner = res.data.data;
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
    <v-img v-for="(b,i) in banner" :key="i" :src="b.url" style="border-radius: 15px;" height="240">
      <!--      <p style="font-family: Inter;font-size: 35px;font-weight: 700;text-align: center; margin-top: 30px">{{ b.title }}</p>-->
      <!--      <p style="font-family: Inter;font-size: 17px;font-weight: 700;text-align: center;">{{ b.description }}</p>-->
      <div class="ml-4">
        <div style="font-family: Heavy;font-size: 35px;font-weight: 700;text-align: left; margin-top: 150px;">FOCUS
        </div>
        <div style="font-family: Inter;font-size: 17px;font-weight: 400;text-align: left;">VANS 콜라보 상품 모음전</div>
      </div>
    </v-img>
  </div>
</template>
<style scoped>

</style>