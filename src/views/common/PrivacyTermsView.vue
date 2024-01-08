<script>
import axios from "axios";

export default {
  data() {
    return {
      terms: [],
    }
  },
  mounted() {
    this.termsDetail();
  },
  methods: {
    termsDetail() {
      axios.get(`v1/terms/PRVT0000`)
          .then(res => {
            this.terms = res.data.data;
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
    <v-container>
      <div class="mt-20 mb-20 pb-20">
        <p style="font-family: Inter;font-size: 25px;font-weight: 700;">
          개인정보처리방침
        </p>
        <p v-html="terms.contents"></p>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>