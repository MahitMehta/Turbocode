<template>
    <div class="h-screen w-screen bg-grey flex">
        <CodeNavigator
            :projectName="projectName"  
            :files="files"
            v-if="!loading" />
        <CodeEditor 
            :user="user" 
            :files="files"
            v-if="!loading" 
        />
    </div>
</template>
<script setup lang="ts">

definePageMeta({
    middleware: "editor",
})

</script>
<script lang="ts">
    import { gql, useQuery } from '@urql/vue';

    export default {
        data() {
            return { 
                loading: true,
                user: {},
                files: [],
                projectName: "",
            }
        },
        async mounted() {
            const query = gql`
                query getEditorData($projectId: String!) {
                    getUser {
                        username
                    }
                    getUserProject(id:$projectId) {
                        name,
                        files(projectId:$projectId) {
                            id,
                            name,
                            filePath,
                            code,
                            type
                        }
                    }
                }
            `

            const { params } = useRoute();

            const { data, executeQuery } = useQuery({ query, variables: {
                projectId: params.projectId
            }});
            await executeQuery();

            this.$data.user = data.value.getUser;
            this.$data.files = data.value.getUserProject.files;
            this.$data.projectName = data.value.getUserProject.name;

            this.$data.loading = false; 
        }
    }
</script>

