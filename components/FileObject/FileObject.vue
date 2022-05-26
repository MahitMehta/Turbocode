<template>
    <li @click="handleOpen" class="list-none">
        <div 
            @click="open = !open"
            class="flex space-x-2 cursor-pointer items-center">
            <font-awesome-icon 
                v-if="$props.file.type === 'folder'" 
                :width="12" 
                :height="12"
                class="text-white"
                :icon="open ? ['fas', 'angle-down'] : ['fas', 'angle-right']"
            />
            <font-awesome-icon 
                v-if="$props.file.type === 'folder'" 
                :width="12" 
                class="text-orange-200"
                :icon="open ? ['fas', 'folder-open'] : ['fas', 'folder-closed']"
            />
            <p class="text-white text-sm">{{ $props.file.name }}</p>
        </div>
        <ul class="ml-4 mt-2 space-y-2" v-if="$props.file.files && open">
            <FileObject
                v-for="file in $props.file.files" 
                :key="file.id" 
                :file="file"
            />
        </ul>
    </li>
</template>
<script lang="ts">
export default {
    data() {
        return {
            open: false,
        }
    },
    methods: {
        handleOpen() {
            if (this.$props.file.type !== "file") return; 
            this.$bus.$emit('openFile', this.$props.file.id);
        }
    },  
    props: {
        file: Object,
    }
}
</script>
