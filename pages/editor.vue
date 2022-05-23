<template>
    <div class="h-screen flex">
        <CodeNavigator />
        <CodeEditor :user="user" />
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
                user: {},
            }
        },
        async mounted() {
            const query = gql`
                query getEditorData {
                    getUser {
                        username
                    }
                }
            `
            const { data, executeQuery } = useQuery({ query });
            await executeQuery();
            this.$data.user = data.value.getUser;
        }
    }
</script>

