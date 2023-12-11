<script>
export default {
  data() {
    return {
      tab: null,
    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        <v-tabs fixed-tabs right style="max-width: 100%" v-model="tab">
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="one">장바구니</v-tab>
          <v-tab style="width: 30px;font-family: Inter;font-size: 15px;font-weight: 700;" tab-value="two">좋아요</v-tab>
        </v-tabs>
        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              one
            </v-window-item>
            <v-window-item value="two">
              Two
            </v-window-item>
          </v-window>
        </v-card-text>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>