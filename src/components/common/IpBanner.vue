<script>
import axios from "axios";

export default {
  data() {
    return {
      banner: [],
      isScrolled: false,
    }
  },
  props: {
    ips: Array
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
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>
<template>
  <div>
    <div>
      <div
          style="text-align: left; z-index: 9;position:absolute;left:10px;width: 100%;"
      >
        <img src="@/assets/icons/ico-white-left.svg" class="mt-4 ml-2 cursor-pointer" @click="goBack"/>
      </div>
    </div>
<!--    <v-carousel cycle height="500" hide-delimiters>-->
<!--      <v-carousel-item-->
<!--          :src="ips[0]?.thumbnailUrl"-->
<!--      >-->
<!--      </v-carousel-item>-->
<!--    </v-carousel>-->
    <v-img :src="ips[0]?.thumbnailUrl" height="500"></v-img>
<!--    <v-img src="@/assets/icons/testimg.svg" height="500"></v-img>-->
  </div>
</template>
<style scoped>

</style>