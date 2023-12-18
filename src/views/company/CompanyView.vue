<template>
  <div class="about">
    <div className="flex justify-center items-center text-center">
      <img src="/img/company/company-img01.jpg"/>
    </div>
    <div className="p-sm-30dx md:p-md-30dx pb-sm-80dy md:pb-md-80dy mt-sm-20dy md:mt-md-20dy bg-white flex justify-center">
      <CompanyFAQs/>
    </div>
    <div className="flex justify-center items-center text-center">
      <img src="/img/company/company-img02.jpg"/>
    </div>
    <div className="flex justify-center items-center text-center">
      <img src="/img/company/company-img02-btn.jpg" @click="$router.push(`/community`).catch(()=>{})"/>
    </div>
    <div className="flex justify-center items-center text-center">
      <img src="/img/company/company-img03.jpg"/>
    </div>
    <div className="flex justify-center items-center text-center">
      <img src="/img/company/company-img03-btn.jpg" @click="$router.push(`/`).catch(()=>{})"/>
    </div>
  </div>
</template>
<script>
import CompanyFAQs from "@/components/company/CompanyFAQs.vue";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    CompanyFAQs
  }
}
</script>