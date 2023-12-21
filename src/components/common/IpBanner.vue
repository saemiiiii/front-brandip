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
        <img src="@/assets/icons/ico-black-left.svg" class="mt-3 mb-3 cursor-pointer" @click="goBack"/>
      </div>
    </div>
    <v-carousel cycle height="500" hide-delimiters>
      <v-carousel-item
          :src="ips[0]?.thumbnailUrl"
      >
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<style scoped>

</style>