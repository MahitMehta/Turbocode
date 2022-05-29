<template>
    <ul class="flex items-center h-full">
        <li 
            v-bind:class="{ 'border-t-purple-500': fileSelectedId === fileId }"
            class="list-none border-l-0 text-white border border-[#32342f] border-solid h-full p-3 flex justify-center items-center"
            :key="fileId"
            v-for="fileId in $props.filesOpen"
            @click="$bus.$emit('switchTab', fileId)">
           <Tab :file="$props.files.find(file => file.id === fileId)" />
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        filesOpen: Array,
        files: Array,
        fileSelectedId: String,
    }
}

</script>
