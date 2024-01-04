<script>
  import axios from "axios";

  export default {
    data() {
      return {
        search: ``,
        products: [],
        dialog: false,
        message: ``,
      }
    },
    computed: {
      chips() {
        // 로컬 스토리지에서 검색어 데이터를 가져옴
        return JSON.parse(localStorage.getItem('searchChips')) || [];
      },
    },
    methods: {
      addChip() {
        // 검색어를 공백을 기준으로 단어로 분할하여 각 단어를 chips 배열에 추가
        // const words = this.search.trim().split(/\s+/);
        //
        // // 빈 문자열이 아니면서, chips 배열에 없는 단어만 추가
        // words.forEach(word => {
        //   if (word !== '' && !this.chips.includes(word)) {
        //     this.chips.push(word);
        //   }
        // });
        // 검색어를 로컬 스토리지에 추가
        const chips = this.chips;
        const trimmedSearch = this.search.trim();
        this.getProduct();
        if (trimmedSearch !== '' && !chips.includes(trimmedSearch)) {
          chips.push(trimmedSearch);
          localStorage.setItem('searchChips', JSON.stringify(chips));
        }
      },
      removeChip(index) {
        const chips = this.chips;
        chips.splice(index, 1);
        localStorage.setItem('searchChips', JSON.stringify(chips));
        location.reload();
      },
      getProduct() {
        axios.get(`${process.env.VUE_APP_SERVICE_URL}v1/product?query=${this.search}`)
            .then(res => {
              this.products = res.data.data.products;
            })
            .catch(err => {
              console.error(err);
            })
      },
      searchProduct(chip) {
        this.search = chip;
        this.getProduct();
      },
      likeProduct(productIdx) {
        axios.post(`${process.env.VUE_APP_SERVICE_URL}v1/product/like`, {
          productIdx: `${productIdx}`
        })
            .then(() => {
              this.getProduct();
            })
            .catch(err => {
              if (err.response.data.resultCode === 403) {
                this.dialog = true;
                this.message = err.response.data.message;
                return false;
              } else {
                console.error(err)
              }
            })
      },
    }
  }
</script>

<template>
  <v-app style="background-color: #242424">
    <v-container>
      <div>
        <div class="mt-5 mb-20 pb-14">
          <div class="flex">
            <v-text-field
                background-color="#EFEFEF"
                dense
                flat
                solo
                style="border-radius: 40px; width: 360px; font-family: Inter; font-size: 13px; font-weight: 400"
                class=""
                placeholder="어떤 굿즈를 찾고 계신가요?"
                v-model="search"
                @keyup.enter="addChip"
            >
              <template v-slot:prepend-inner>
                <img src="@/assets/icons/ico-gray-search.svg" class="input-image" alt="Icon">
              </template>
              <template v-slot:append>
                <v-btn text style="font-family: Inter;font-size: 15px;font-weight: 400;" class="underline" @click="addChip">검색</v-btn>
              </template>
            </v-text-field>

            <v-btn text style="font-family: Inter;font-size: 15px;font-weight: 700;color: #BEBEBE" @click="$router.push(`/`).catch(()=>{})">취소</v-btn>
          </div>
          <v-row no-gutters v-if="search && products.length > 0" style="justify-content: center">
            <v-col cols="12" class="mt-10 mb-5" style="font-family: Inter;font-size: 28px;font-weight: 700;text-align: left;color: #FFFFFF">검색 결과</v-col>
            <v-col v-for="(product, index) in products" :key="index" cols="6" style="background-color: #242424">
              <v-card elevation="0" class="pa-1 text-left cursor-pointer no-border" style="display: inline-block;background-color: #242424" @click.stop="$router.push(`/product/${product.idx}`).catch(()=>{})">
                <v-img :src="product?.thumbnail" width="180" height="180" style="position: relative;border-radius: 15px;">
<!--                  <div>-->
<!--                    <div style="position: absolute;bottom: 5px;right: 5px"-->
<!--                         @click.stop="likeProduct(product.idx)">-->
<!--                      <img src="@/assets/icons/ico-like-gray.svg" width="30" height="30"-->
<!--                           class="px-1.5 cursor-pointer"-->
<!--                           v-if="!product.productLikeIdx"/>-->
<!--                      <img src="@/assets/icons/ico-like-primary.svg" width="30" height="30"-->
<!--                           class="px-1.5 cursor-pointer"-->
<!--                           v-else/>-->
<!--                    </div>-->
<!--                  </div>-->
                </v-img>
                <div class="cursor-pointer" style="color: #000000;max-width: 180px; position: relative;color: #FFFFFF" @click.stop="$router.push(`/product/${product.idx}`).catch(()=>{})">
                  <div style="font-family: Inter; font-size: 18px; font-weight: 700;" class="mt-2">
                    {{ product.title }}
                  </div>
                  <div style="font-family: Inter; font-size: 15px; font-weight: 400;">
                    {{ product.description }}
                  </div>
                  <div style="font-family: Inter; font-size: 15px; font-weight: 700;" class="mb-2">
                    {{ product.total?.toLocaleString() }}원
                  </div>
                  <div style="position: absolute; bottom: 45px; right: 0;" @click.stop="likeProduct(product.idx)">
                    <img src="@/assets/icons/ico-like-gray.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-if="!product?.productLikeIdx"/>
                    <img src="@/assets/icons/ico-like-primary.svg" width="35" height="30" class="px-1.5 cursor-pointer" v-else/>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="search && products.length === 0" style="justify-content: center; align-items: center; height: 60vh;">
            <v-col cols="12" style="font-family: Inter; font-size: 20px; font-weight: 400; text-align: center;color: #FFFFFF">
              검색 결과가 없습니다. <br> 다른 검색어를 입력해보세요.
            </v-col>
          </v-row>
          <v-row class="text-left mt-10" v-if="!search">
            <v-col cols="12">
              <p style="font-family: Inter;font-size: 28px;font-weight: 700;color: #FFFFFF">최근 검색어</p>
              <v-col cols="12">
                <v-chip
                    v-for="(chip, index) in chips"
                    :key="index"
                    close
                    @click:close="removeChip(index)"
                    class="ma-1"
                    @click="searchProduct(chip)"
                    color="#EFEFEF"
                    style="font-family: Inter;font-size: 16px;font-weight: 400;"
                >
                  {{ chip }}
                </v-chip>
              </v-col>
            </v-col>
            <v-col cols="12"></v-col>
            <!--            <v-col cols="12">-->
            <!--              <p style="font-family: Inter;font-size: 28px;font-weight: 700;">추천 검색어</p>-->
            <!--            </v-col>-->
          </v-row>
        </div>
      </div>
    </v-container>
    <div class="text-center">
      <v-dialog
          v-model="dialog"
          max-width="328"
      >
        <v-card height="163" style="border-radius: 15px">
          <v-card-title style="font-family: Inter;font-size: 20px;font-weight: 700;">
            {{ message }}
          </v-card-title>
          <v-card-actions class="mt-10">
            <v-btn
                rounded
                color="primary"
                width="100%"
                @click="$router.push('/login').catch(()=>{})"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<style>
.no-border {
  border: none;
}
</style>