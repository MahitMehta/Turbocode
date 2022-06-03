<template>
    <NuxtLink class="no-underline text-white" :to="`/editor/${$props.project.id}`">
        <div class="flex flex-col justify-center p-6 w-[275px] min-h-[175px] space-y-5 mb-2 border-solid hover:border-white transition-colors rounded-lg border border-opacity-10 bg-black bg-opacity-50 border-white shadow-lg ">
            <h5 class="text-1xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {{ $props.project.name }}
            </h5>
            <div class="text-sm flex space-x-2 items-center">
                <font-awesome-icon :width="20" :icon="['fab', icon]" />
                <p>{{ projectType }}</p>
            </div>
            <p class="text-sm lowercase opacity-50">
                <span v-if="!updatedFilesAt && createdAt">// Created {{ createdAt }}</span>
                <span v-else-if="updatedFilesAt">// Updated {{ updatedFilesAt }}</span>
            </p>
        </div>
    </NuxtLink>
</template>
<script>    
import { projectTypeMappings } from '~~/utils/mappings';
    export default {
        data() {
            return {
                createdAt: null,
                updatedFilesAt: null,
                projectType: null,
                icon: null,
            }
        },
        async mounted() {
            const moment = await import("moment");
            const project = this.$props.project; 
            if (project.updatedFilesAt) {
                this.$data.updatedFilesAt = moment.default(project.updatedFilesAt).fromNow();
            }
            if (project.createdAt) {
                this.$data.createdAt = moment.default(project.createdAt).fromNow();
            }

            const { label, icon } = projectTypeMappings[project.type]; 
            this.projectType = label;
            this.icon = icon; 
        },
        props: {
            project: Object
        }
    }
</script>