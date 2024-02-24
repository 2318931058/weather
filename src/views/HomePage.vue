<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <!-- 搜索框 -->
      <input
        type="text"
        placeholder="请输入城市名称"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-md"
        v-model="city"
        @input="queryCityWeather"
      />
      <!-- 搜索结果展示 -->
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[62px]"
        v-show="city"
      >
        <p v-show="netError">对不起网络似乎除了点问题 请稍后再查询</p>
        <p v-show="!netError && resError">似乎没有找到你查找的城市</p>
        <li
          v-for="(item, index) in queryResults"
          :key="index"
          class="py-2 cursor-pointer"
          @click="checkCity(item)"
        >
          {{ item.city }}
        </li>
      </ul>
    </div>
    <!-- 保存城市天气 -->
    <Suspense>
      <CityList :city="city" />
      <template #fallback>
        <h2 class="text-white text-center">天气信息加载中</h2>
      </template>
    </Suspense>
    <!-- 展示近期天气 -->
    <h2 class="mt-6" v-if="cityStore.defaultCityWeather">近期天气</h2>
    <MoreWeather
      :defaultCityWeather="cityStore.defaultCityWeather"
      v-if="cityStore.defaultCityWeather"
    />
  </main>
</template>

<script setup>
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { WEATHER_KEY } from "../config.js"
import CityList from "../components/CityList.vue"
import MoreWeather from "../components/MoreWeather.vue"
import { useCityStore } from "../store"
const router = useRouter()
const city = ref("")
const adcode = ref(null)
const queryTimer = ref(null)
const queryResults = ref([])
const netError = ref(false)
const resError = ref(false)
const cityStore = useCityStore()
//定义查询城市天气的方法
//1.这里使用的是高德地图API 使用时注意无法直接通过城市名称来查询天气 需要通过城市对应的adcode来查询 所以需要先通过城市名来获取adcode
//2.需要对查询方法做防抖处理
const queryCityAdcode = async () => {
  const res = await axios.get(
    `http://restapi.amap.com/v3/geocode/geo?key=${WEATHER_KEY}&address=${city.value}`
  )
  if (!res.data.geocodes) {
    resError.value = true
    return
  }
  adcode.value = res.data.geocodes[0].adcode
}
const queryCityWeather = () => {
  adcode.value = ""
  queryResults.value = []
  netError.value = false
  resError.value = false
  clearTimeout(queryTimer.value)
  queryTimer.value = setTimeout(async () => {
    try {
      await queryCityAdcode()
      if (!adcode.value) return
      const res = await axios.get(
        `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode.value}&key=${WEATHER_KEY}`
      )
      queryResults.value = res.data.lives
    } catch {
      netError.value = true
    }
  }, 500)
}
const checkCity = (item) => {
  console.log(item, 87)
  router.push({
    name: "cityView",
    params: {
      adcode: item.adcode,
    },
    query: {
      search: item.city,
    },
  })
}
</script>

<style scoped></style>
