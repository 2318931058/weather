<template>
  <div class="bg-weather-secondary px-12 pt-10 mt-2 rounded">
    <div class="flex gap-6">
      <div
        class="flex flex-col flex-1 text-center gap-4"
        v-for="(city, index) in weatherLists"
        :key="index"
      >
        <span>{{ whichDay(index, city) }}</span>
        <span>{{city.date.slice(5) }}</span>
        <span>{{city.dayweather }}</span>
        <span>风力 {{city.nightpower}}级</span>
      </div>
    </div>
    <div class="weathercanvas h-40 mt-10"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
const weatherLists = ref([])
const chartOption = ref({
  grid: {
    left: 0,
    top: "15%",
    right: 0,
    bottom: 0,
  },
  xAxis: {
    type: "category",
    boudaryGap: false,
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: "line",
      smooth: true,
      data: [],
      label: {
        show: true,
        formatter: "白{c}℃",
        color: "#fff",
      },
    },
    {
      type: "line",
      smooth: true,
      data: [],
      label: {
        show: true,
        formatter: "晚{c}℃",
        position: "bottom",
        color: "#fff",
      },
    },
  ],
})
const props = defineProps(["defaultCityWeather", "chosenCityWeather"])
if (props.defaultCityWeather) {
  weatherLists.value = props.defaultCityWeather
  const series1 = weatherLists.value.map((item) => item.daytemp)
  const series2 = weatherLists.value.map((item) => item.nighttemp)
  chartOption.value.series[0].data = series1
  chartOption.value.series[1].data = series2
}
if (props.chosenCityWeather) {
  weatherLists.value = props.chosenCityWeather
  const series1 = weatherLists.value.map((item) => item.daytemp)
  const series2 = weatherLists.value.map((item) => item.nighttemp)
  chartOption.value.series[0].data = series1
  chartOption.value.series[1].data = series2
}

const whichDay = (index, city) => {
  switch (index) {
    case 0:
      return "今天"
    case 1:
      return "明天"
    default:
      switch (city.week) {
        case "1":
          return "周一"
        case "2":
          return "周二"
        case "3":
          return "周三"
        case "4":
          return "周四"
        case "5":
          return "周五"
        case "6":
          return "周六"
        case "7":
          return "周日"
      }
  }
}
onMounted(() => {
  let chart = echarts.init(document.querySelector(".weathercanvas"))
  chart.setOption(chartOption.value)
})
</script>

<style lang="scss" scoped></style>
