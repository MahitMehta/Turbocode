<template>
    <div class="h-screen flex">
        <CodeNavigator />
        <ClientOnly>
            <CodeEditor />
        </ClientOnly>
    </div>
</template>
<script setup lang="ts">

definePageMeta({
    middleware: [],
})

</script>
