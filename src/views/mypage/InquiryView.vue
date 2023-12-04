<script>
export default {
  methods: {
    toggleCollapse(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    },
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        <div>
          <div style="font-family: Inter; font-size: 30px; font-weight: 700; text-align: left;">
            문의하기
          </div>
          <div style="font-family: Inter;font-size: 15px;font-weight: 400; text-align: left;color: #9E9E9E">문의하실 내용을 찾아보세요</div>
        </div>
        <div class="text-left mt-10">
          <v-row>
            <v-col cols="12">
              <div style="font-family: Inter;font-size: 20px;font-weight: 700;" class="d-flex justify-between cursor-pointer" @click="$router.push('/inquiry-list')">
                일반문의
                <img src="@/assets/icons/ico-black-right.svg" class="px-1.5"/>
              </div>
              <div style="font-family: Inter;font-size: 15px;font-weight: 400;color: #9E9E9E" class="mb-2">
                1:1 문의
              </div>
              <hr/>
            </v-col>
            <v-col cols="12">
              <div style="font-family: Inter;font-size: 20px;font-weight: 700;" class="d-flex justify-between">
                이메일 문의
                <img src="@/assets/icons/ico-black-right.svg" class="px-1.5"/>
              </div>
              <div style="font-family: Inter;font-size: 15px;font-weight: 400;color: #9E9E9E" class="mb-2">
                info@wowplanet.io
              </div>
              <hr/>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>