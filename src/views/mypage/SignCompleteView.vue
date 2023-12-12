<script setup>

</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20 pt-16 text-left">
        <img src="@/assets/icons/ico-new-logo.svg"/>
        <div class="mt-12 mb-12 text-left">
          <p style="font-family: Inter;font-size: 30px;font-weight: 700;">회원가입 완료</p>
          <p style="font-family: Inter;font-size: 18px;font-weight: 700;">와우플래닛의 회원이 되신 걸 환영합니다.</p>
        </div>
      </div>
    </v-container>
      <div class="mt-5 mb-5 text-left">
        <img src="@/assets/icons/su.svg"/>
      </div>
      <div class="mt-12 mb-12 text-center">
        <p class="underline cursor-pointer" style="font-family: Inter;font-size: 16px;font-weight: 700;color: #FF1A77" @click="$router.push('/company')">와우플래닛 사용법 보기</p>

        <v-btn
            rounded
            color="primary"
            dark
            width="98%"
            @click="$router.push(`/`)"
            style="font-family: Inter; font-size: 16px; font-weight: 700;"
        >확인</v-btn>
      </div>

  </v-app>
</template>

<style scoped>

</style>