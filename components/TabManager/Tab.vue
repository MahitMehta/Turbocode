<template>
    <div class="flex justify-between w-full space-x-3 items-center">
        <p
            class="text-xs"    
        >
            {{ $props.file.name }}
        </p>
        <IconButton
            @click="deleteTab($event, $props.file.id)" 
            :width="8" 
            color="#fff" 
            :icon="isSaved(files[$props.file.id]) ? ['fas', 'xmark'] : ['fas', 'circle']" 
        />
    </div>
</template>
<script>
import { fileSystemStore } from "~/store/FileSystemStore";

export default {
    props: {
        file: Object,
    },
    data() {
        return {
            files: {},
        }
    },
    mounted() {
        this.$data.files = fileSystemStore.getState().files;
    },
    methods: {
        isSaved(file) {
            return file ? file.saved : true; 
        },
        deleteTab(e, fileId) {
            e.preventDefault();
            e.stopPropagation();
            this.$bus.$emit("deleteTab", fileId);
        }
    }
}

</script>
