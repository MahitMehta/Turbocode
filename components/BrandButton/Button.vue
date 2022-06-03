<template>
    <button 
        type="button" 
        class="text-white flex justify-center items-center cursor-pointer border-none bg-gradient-to-r from-purple-500 to-blue-500 focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 focus:outline-none">
            <Loader class="mr-2" v-if="loading" />
            <slot/>
    </button>
</template>
<script lang="ts">
    export default {
        props: {
            loading: Boolean
        }
    }
</script>