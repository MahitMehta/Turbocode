<template>
    <NuxtLink class="link" to="/editor/628d1c22991d7978e4a97f19">
        <div class="thing block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 class="gaem mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Project Name</h5>
        </div>
    </NuxtLink>
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
.link:link, .link:hover, link:visited, link:active {
    text-decoration: none;
}
</style>
<script lang="ts">
    export default {
        props: {
            loading: Boolean
        }
    }
</script>