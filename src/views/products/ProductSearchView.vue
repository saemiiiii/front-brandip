<script>
  export default {
    data() {
      return {
        search: ``,
      }
    }
  }
</script>

<template>
  <v-app>
    <v-container>
      <div>
        <div class="mt-5">
          <div class="flex">
            <v-text-field background-color="#EFEFEF" dense flat solo style="border-radius: 40px; width: 360px;font-family: Inter;font-size: 13px;font-weight: 400"
                          class="" placeholder="어떤 굿즈를 찾고 계신가요?" v-model="search">
              <template v-slot:prepend-inner>
                <img src="@/assets/icons/ico-gray-search.svg" class="input-image" alt="Icon">
              </template>
            </v-text-field>
            <v-btn text style="font-family: Inter;font-size: 13px;font-weight: 700;color: #BEBEBE" @click="$router.push(`/`)">취소</v-btn>
          </div>
          <v-row class="text-left mt-10">
            <v-col cols="12">
              <p style="font-family: Inter;font-size: 30px;font-weight: 700;">최근 검색어</p>
            </v-col>
            <v-col cols="12"></v-col>
            <v-col cols="12">
              <p style="font-family: Inter;font-size: 30px;font-weight: 700;">추천 검색어</p>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>