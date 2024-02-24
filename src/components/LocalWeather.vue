<template>
  <div class="flex gap-4 items-center">
    <h4 class="text-lg">{{ city }}</h4>
    <span class="text-sm"
      >实时天气：{{ weather.weather }} {{ weather.temperature }}℃</span
    >
    <span class="text-sm"
      >{{ weather.winddirection }}风{{ weather.windpower }}级</span
    >
  </div>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { WEATHER_KEY } from "../config"
import { useCityStore } from "../store"
const city = ref("")
const adcode = ref("")
const weather = ref({})
const moreWeather = ref([])
//通过ip地址查询当前城市位置
// axios
//   .get(`https://restapi.amap.com/v3/ip?key=${WEATHER_KEY}`)
//   .then((res) => {
//     city.value = res.data.city
//     adcode.value = res.data.adcode
//     // 通过adcode查询更多天气信息
//     return axios.get(
//       `https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_KEY}&city=${adcode.value}`
//     )
//   })
//   .then((res) => {
//     weather.value = res.data.lives[0]
//   })
let res1 = await axios.get(`https://restapi.amap.com/v3/ip?key=${WEATHER_KEY}`)
city.value = res1.data.city
adcode.value = res1.data.adcode
let res2 = await axios.get(
  `https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_KEY}&city=${adcode.value}`
)
weather.value = res2.data.lives[0]
let res3 = await axios.get(
  `https://restapi.amap.com/v3/weather/weatherInfo?key=${WEATHER_KEY}&city=${adcode.value}&extensions=all`
)
moreWeather.value = res3.data.forecasts[0].casts
//将adcode和moreWeather存到store中
const cityStore = useCityStore()
cityStore.setDefaultCity(weather.value.adcode)
cityStore.setDefaultCityWeather(moreWeather.value)
</script>

<style lang="scss" scoped></style>
