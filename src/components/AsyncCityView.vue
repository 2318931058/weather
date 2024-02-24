<template>
  <div class="flex flex-col text-white">
    <!-- banner -->
    <div class="p-2 text-center bg-weather-secondary">
      你正在预览{{ city }}的天气信息<span v-show="!isSaved"
        >，可以通过右上角的"+"号按钮保存起来</span
      >
    </div>
    <!-- overview  -->
    <div class="container flex flex-col text-center mt-6 gap-4">
      <h1>当日气温是：{{ temperature }}摄氏度</h1>
      <h1>当日天气是：{{ weather }}</h1>
      <h1>当日风向是：{{ winddirection }}风</h1>
      <h1>当日风力是：{{ windpower }}级</h1>
    </div>
    <hr class="border-white border-opacity-10 mt-6" />
    <div class="moreweather container">
      <MoreWeather :chosenCityWeather = 'cityStore.chosenCityWeather' v-if="cityStore.chosenCityWeather"/>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"
import { useRoute } from "vue-router"
import { WEATHER_KEY } from "../config"
import { useCityStore } from "../store"
import MoreWeather from "./MoreWeather.vue"
const route = useRoute()
const weatherRes = ref(null)
const cityStore = useCityStore()
const { adcode } = route.params
const getWeatherRes = async () => {
  try {
    return await axios.get(
      `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${WEATHER_KEY}`
    )
  } catch (e) {
    // console.log(e);
  }
}
weatherRes.value = await getWeatherRes()
const {
  data: { forecasts },
} = await axios.get(
  `https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_KEY}&city=${adcode}&extensions=all`
)
cityStore.setChosenCityWeather(forecasts[0].casts)
console.log(cityStore.chosenCityWeather,123)
const {
  data: { lives },
} = weatherRes.value
const { city, temperature, weather, winddirection, windpower } = lives[0]
//isSaved状态 建议公共状态做统一管理 本项中没有管理
const isSaved = ref(false)
if (
  JSON.parse(localStorage.getItem("savedCities"))?.find(
    (item) => item.adcode === route.params.adcode
  )
) {
  isSaved.value = true
}
</script>

<style lang="scss" scoped></style>
