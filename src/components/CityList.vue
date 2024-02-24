<template>
  <!-- 如果希望通过tailwindcss来美化滚动条的话 需要安装单独依赖tailwind-scrollbar -->
  <div
    class="mt-10 max-h-[300px] overflow-y-scroll scrollbar-thin hover:scrollbar-thumb-blue-300"
    v-if="savedCities.length"
    v-show="!isShow"
  >
   <!-- CityCard存在删除操作 不能将key值绑定为index -->
    <CityCard
      v-for="item in savedCities"
      :key="item.data.lives[0].adcode"
      :cityWeather="item"
      @delCity="delCity"
    />
  </div>
  <h2 v-else class="text-center duration-200" :class="{
    'mt-20':city
  }">
    暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。
  </h2>
</template>

<script setup>
import axios from "axios";
import {  ref, watch } from "vue";
import { WEATHER_KEY } from "../config";
import CityCard from "./CityCard.vue";
const props = defineProps({
  city: String,
});
//通过isshow来控制 当输入框有内容的时候 暂时隐藏CityList
const isShow = ref(false);
watch(props, () => {
  if (props.city) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
});
const savedCities = ref([]);
const getCityWeather = async () => {
  const tempArr = [];
  if (!localStorage.getItem("savedCities")) return;
  JSON.parse(localStorage.getItem("savedCities")).forEach((item, index) => {
    tempArr.push(
      axios.get(
        `https://restapi.amap.com/v3/weather/weatherInfo?city=${item.adcode}&key=${WEATHER_KEY}`
      )
    );
  });
  savedCities.value = await Promise.all(tempArr);
};

await getCityWeather();
//删除savdCities
const delCity = (adcode) => {
  const cityIndex = savedCities.value.findIndex((savedCity) => {
    return savedCity.data.lives[0].adcode === adcode;
  });
  savedCities.value.splice(cityIndex,1)
};
</script>
