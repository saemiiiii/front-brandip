<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    showDelivery() {

    }
  }
}
</script>

<template>
  <v-app>
    <v-container>
      <div class="mt-20">
        주문서 작성
        <div>
          <v-text-field placeholder="배송지" @click="$router.push(`/delivery`)"></v-text-field>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>