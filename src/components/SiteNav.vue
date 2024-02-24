<template>
  <header class="bg-weather-primary shadow-lg sticky top-0 z-10">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6  "
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">天气网</p>
        </div>
      </RouterLink>
      <!-- 本地天气信息展示 -->
      <Suspense>
        <LocalWeather/>
      </Suspense>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary cursor-pointer duration-1000"
          @click="toggleActive"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          v-if="!isEmpty(route.query) && !isSaved"
          @click="addCity"
        ></i>
      </div>
      <!-- 内置动画组件结合第三方动画库实现动画效果 -->
      <Teleport to="body">
        <Transition
          enterActiveClass="animate__animated animate__fadeIn"
          leaveActiveClass="animate__animated animate__fadeOut"
        >
          <InfoModal
            class="text-black"
            v-show="modalActive"
            @toggleModal="toggleActive"
          >
            <h2>关于:</h2>
            <p class="text-xs mb-4">这个应用可以用来追踪你选择城市的当前天气</p>
            <h2>如何使用:</h2>
            <p class="text-xs mb-4">
              1.点击搜索框输入你希望追踪的城市<br />
              2.在搜索结果中选中一个城市，你将获取当地最新的天气<br />
              3.点击右侧的＋号可以将追踪城市的天气情况保存在首页
            </p>
            <h2>移除城市:</h2>
            <p class="text-xs">
              如果你不想在首页关注某个城市,可以通过底部的按钮删<br />除它
            </p>
          </InfoModal>
        </Transition>
      </Teleport>
    </nav>
  </header>
</template>

<script setup>
import InfoModal from "./InfoModal.vue";
import isEmpty from "../utils/isEmpty.js";
import LocalWeather from './LocalWeather.vue'
import { uid } from "uid";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const modalActive = ref(false);
const toggleActive = () => {
  modalActive.value = !modalActive.value;
};
const savedCities =
  ref(JSON.parse(localStorage.getItem("savedCities"))).value || ref([]).value;
const addCity = () => {
  isSaved.value = true;
  const cityInfo = {
    id: uid(),
    adcode: route.params.adcode,
    city: route.query.search,
  };
  savedCities.push(cityInfo);
  localStorage.setItem("savedCities", JSON.stringify(savedCities));
};
//判断当前选中的城市是否已经被保存了
const isSaved = ref(false);
watch(route, () => {
  isSaved.value = false;
  if (savedCities.find((item) => item.adcode === route.params.adcode)) {
    isSaved.value = true;
  }
});
</script>
<style scoped></style>
