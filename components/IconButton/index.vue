<template>
    <button
        @click="$props['onClick']"
        :style="calcDimensions" 
        class="bg-transparent w-[var(--icon-button-w)] h-[var(--icon-button-w)] hover:bg-white hover:bg-opacity-10 flex justify-center items-center rounded-md cursor-pointer border-0">
        <font-awesome-icon 
            :width="$props.width" 
            :color="$props.color"
            :icon="$props.icon"
        />
    </button>
</template>
<script>
    export default {
        props: {
            width: Number,
            color: String,
            icon: Array,
        },
        computed: {
            calcDimensions() {
                return {
                    '--icon-button-w': `${this.$props.width + 14}px`,
                }
            }
        }
    }
</script>