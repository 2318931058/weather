<template>
  <div
    class="flex justify-between"
    @mouseenter="showBtn = true"
    @mouseleave="showBtn = false"
  >
    <!-- Card -->
    <div
      class="mb-4 bg-weather-secondary py-2 px-4 flex justify-between cursor-pointer w-full duration-300"
      :class="{
        'w-4/5': showBtn,
      }"
    >
      <h3>{{ city }}</h3>
      <span>{{ temperature }}度</span>
    </div>
    <!-- Button -->
    <div class="flex mb-4 gap-2" v-show="showBtn">
      <button class="bg-yellow-500 text-center w-[80px]" @click="goCity">
        查看
      </button>
      <button class="bg-yellow-500 text-center w-[80px]" @click="deleteInfo">
        删除
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
  cityWeather: Object,
});
const emits = defineEmits(["delCity"]);
const city = ref(props.cityWeather.data.lives[0].city);
const temperature = ref(props.cityWeather.data.lives[0].temperature);
const adcode = ref(props.cityWeather.data.lives[0].adcode);

const goCity = () => {
  router.push({
    name: "cityView",
    params: {
      adcode: adcode.value,
    },
    query: {
      search: city.value,
    },
  });
};
//控制按钮显示
const showBtn = ref(false);
//删除当前城市信息
const deleteInfo = () => {
  emits("delCity", adcode.value);
  //在本地存储中删除对应信息
  const arr = JSON.parse(localStorage.getItem("savedCities"))
  const cityIndex = JSON.parse(localStorage.getItem("savedCities")).findIndex(
    (savedCity) => {
      return savedCity.adcode === adcode.value;
    }
  );
  arr.splice(cityIndex, 1);
  localStorage.setItem(
    "savedCities",
    JSON.stringify(arr)
  );
};
</script>
