<template>
    <!-- 外层div为遮罩层 -->
    <div class="fixed z-20 w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 ">
        <!-- 内层div为内容区域 -->
        <div class="p-4 bg-white self-start mt-32 max-w-screen-md">
            <!-- 通过默认插槽来分发父组件的内容 -->
            <slot/>
            <button class="text-white mt-8 bg-weather-primary py-2 px-6 text-xs" @click="closeModal">关闭</button>
        </div>
    </div>
</template>

<script setup>
    const emits = defineEmits(['toggleModal'])
    const closeModal=()=>{
        emits('toggleModal')
    }
</script>
