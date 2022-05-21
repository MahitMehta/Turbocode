<template>
    <li class="list-none">
        <p class="text-white text-sm">{{ filename }}</p>
        <ul class="ml-4 mt-2 space-y-2" v-if="!!$slots.default">
            <slot/>
        </ul>
    </li>
</template>
<script lang="ts">
export default {
    props: {
        filename: String,
    }
}
</script>
