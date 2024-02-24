<template>
    <div class="flex flex-col min-h-screen bg-weather-primary">
        <SiteNav />
        <router-view></router-view>
    </div>
</template>

<script setup>
import SiteNav from './components/SiteNav.vue'
</script>

<style lang="scss" scoped>

</style>
