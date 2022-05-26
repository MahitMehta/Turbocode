<template>
    <section class="p-4 h-full min-w-[350px] w-[350px] bg-grey border-r-[#32342f] border-solid border-r-1 border z-10">
        <p class="text-white uppercase text-xs">Explorer
             
        </p>
        <div class="flex items-center mt-5 justify-between">
            <p class="text-white text-sm font-semibold">{{ $props.projectName }}</p>
            <div class="flex items-center space-x-3">
                <font-awesome-icon :width="15" color="#fff" :icon="['fas', 'file-circle-plus']" />
                <font-awesome-icon :width="15" color="#fff" :icon="['fas', 'folder-plus']" />
            </div>
        </div>

        <ul class="space-y-2 mt-4">
            <FileObject 
                v-for="file in files" 
                :key="file.id" 
                :file="file">
            </FileObject>
        </ul>
    </section>
</template>
<script lang="ts">

import { UserFileObject } from "@prisma/client";

export default {
    props: {
        projectName: String,
        files: Array,
    },
    data() {
        return {
            files: [],
        }
    },
    watch: {
        files() {
            this.$data.files = this.createFileStructure(this.$props.files, "/")
        }
    },
    methods: {
        createFileStructure(files:UserFileObject[], path:string) {
            const that = this; 

            const isFileObjectInCWD = (file:UserFileObject) => (
                !!file.filePath.match(new RegExp(`^${path}[A-z\.A-z]+$`))
            )

            const isFolderInCWD = (file:UserFileObject) => (
                isFileObjectInCWD(file) && file.type === "folder"
            );

            const isFileInCWD = (file:UserFileObject) => (
                isFileObjectInCWD(file) && file.type === "file"
            );

            if (files.every(isFileInCWD)) {
                return files; 
            } 
            return [
                    ...files.filter(isFileInCWD), 
                    ...files.filter(isFolderInCWD).map((file) => {
                        return {
                            ...file,
                            files: that.createFileStructure(files.filter(f => 
                                    f.filePath.startsWith(`${file.filePath}/`)
                                ), `${file.filePath}/`)
                        }
                    })
                ];
            }
    },
    mounted() {
        this.$data.files = this.createFileStructure(this.$props.files, "/");
    }  
}

</script>
