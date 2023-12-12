<script>
export default {
  data() {
    return {
      status: ``,
    }
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.status = urlParams.get('status');
    if(this.status !== `success`) {
      this.$router.push(`/login`);
    }
  },
}
</script>

<template>
  <v-app>
    <v-container>
      <div style="position: relative; height: 100vh;">
        <div class="pt-10 text-center"
             style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh">
          <div style="font-family: Inter; font-size: 30px; font-weight: 700;">본인 인증이 완료되었습니다!</div>
        </div>
        <div style="position: absolute; bottom: 30px; width: 100%; text-align: center;">
          <v-btn
              rounded
              color="primary"
              dark
              width="100%"
              @click="$router.push(`/profile`)"
              style="font-family: Inter; font-size: 16px; font-weight: 700;"
          >
            다음으로
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>