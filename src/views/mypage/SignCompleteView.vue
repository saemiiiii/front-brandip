<script setup>

</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-12 mb-12 text-left">
        <img src="@/assets/icons/ico-new-logo.svg"/>
        <div class="mt-12 mb-12 text-left">
          <p class="text-xl font-bold">회원가입 완료</p>
          <p class="font-bold text-sm">와우플래닛의 회원이 되신 걸 환영합니다.</p>
        </div>
      </div>
      <div class="mt-12 mb-12 text-left">
        <img src="@/assets/icons/su.svg"/>
      </div>
      <div class="mt-12 mb-12 text-center">
        <p class="font-bold text-sm underline cursor-pointer" style="color: #FF1A77" @click="$router.push('/company')">와우플래닛 사용법 보기</p>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>