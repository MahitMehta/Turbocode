<template>
    <div class="fixed flex justify-center items-center w-screen h-screen bg-black bg-opacity-50">
        <article v-bind="$attrs" class="bg-grey rounded-md p-3 ">
            <slot />
        </article>
    </div>
</template>
<script>

export default {
    inheritAttrs: false,
    props: {
        onClose: Function
    }
}

</script>
