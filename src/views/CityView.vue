<template>
    <Suspense>
      <AsyncCityView />
      <template #fallback >
        <h1 class="text-center text-white text-lg">天气信息加载中...</h1>
      </template>
    </Suspense>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>

<style lang="scss" scoped></style>
