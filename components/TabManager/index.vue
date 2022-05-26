<template>
    <ul class="flex items-center">
        <li 
            v-bind:class="{ 'border-t-blue-500': fileSelectedId === fileId }"
            class="list-none space-x-3 border-l-0 text-white border border-[#32342f] border-solid h-full p-3 flex justify-center items-center"
            :key="fileId"
            v-for="fileId in $props.filesOpen">
            <p
                class="text-xs"    
            >
                {{ $props.files.find(file => file.id === fileId).name }}
            </p>
            <font-awesome-icon 
                @click="deleteTab(fileId)" 
                :width="8" 
                color="#fff" 
                :icon="['fas', 'xmark']" 
            />
        </li>
    </ul>
</template>
<script>

export default {
    props: {
        filesOpen: Array,
        files: Array,
        fileSelectedId: String,
    },
    methods: {
        deleteTab(fileId) {
            this.$bus.$emit("deleteTab", fileId);
        }
    }
}

</script>
