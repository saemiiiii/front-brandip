<template>
  <v-app>
    <v-container>
      <div class="mt-10 mb-10 text-left">
        <p class="text-xl font-bold">본인 인증이</p>
        <p class="text-xl font-bold">필요해요.</p>
        <p class="font-bold text-sm">회원 정보 확인이 필요합니다.</p>
      </div>
      <div>
        <v-btn> 본인인증</v-btn>
        <v-btn
            rounded
            color="primary"
            dark
            width="100%"
            @click="$router.push('/profile')"
        >
          다음으로
        </v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
};
</script>
