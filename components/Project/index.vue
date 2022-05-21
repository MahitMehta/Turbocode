<template>
    <div class="thing block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="gaem mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project Name</h5>
    </div>
</template>

<style scoped>
.thing {
    margin: 10px;
    width: 775px;
    margin-right: 10px;
}
.gaem {
    width: 740px;
}
</style>
<script lang="ts">
    export default {
        props: {
            loading: Boolean
        }
    }
</script>