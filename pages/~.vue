<template>
    <div class="bg-grey min-h-screen w-screen flex justify-center items-center flex-col">
        <BrandButton @click="showCreateProject = !showCreateProject">
            Create a New Project
        </BrandButton>
        <div class="mt-5">
            <div class="flex flex-wrap space-x-2 p-5 justify-center items-center">
                <Project v-for="project in projects" :project="project" :key="project.id" />
            </div>
        </div> 
        <Modal v-if="showCreateProject">
            <BrandButton :loading="attemptingProjectCreation" @click="createProject">
                <div class="space-x-2 flex justify-center items-center">
                    <font-awesome-icon :width="12" :icon="['fas', 'plus']"/>
                    <span>Turbo.env</span>
                </div>
            </BrandButton>
        </Modal>
    </div>
</template>
<script>
import { gql, useMutation, useQuery } from '@urql/vue';
import { EProjectType } from "~/common/enums/projectType";

export default {
    data() {
        return {
            projects: [],
            showCreateProject: false,
        }
    },
    methods: {
        async createProject() {
            const { data } = await this.createUserProject({ 
                name: "New Java Project",
                type: EProjectType.JAVA_11_TRANSPILER
            });
            const projectId = data?.createUserProject?.id; 
            if (!projectId) return; 
            navigateTo({ 
                path: `/editor/${projectId}`,
            })
        }
     },
     setup() {
        const mutation = gql`
                mutation createUserProject($name: String!, $type: String!) {
                    createUserProject(name:$name, type:$type) {
                        id
                    }
                }
            `;
        const { executeMutation:createUserProject, fetching:attemptingProjectCreation } = useMutation(mutation);
        return {
            createUserProject,
            attemptingProjectCreation
        }
    },
    async mounted() {
        const projectsQuery = gql`
            query projects {
                getUserProjects {
                    id,
                    name,
                    type,
                    createdAt,
                    updatedFilesAt
                }
            }
        `;
        const { executeQuery } = useQuery({ query: projectsQuery });

        const { data:projects } = await executeQuery({ requestPolicy: "cache-only" });
        
        if (projects.value) {
            this.$data.projects = projects.value.getUserProjects || [];
        }
    }
}

</script>

<style scoped>
.container {
    font-family: 'Courier New';
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #151515;
}
.head {
    color:#0A758F;
    transform: translate(-300px, -110px);
    font-size: 25px;
    text-decoration: none;
    margin-top: 250px;
}
.create {
    transform: Translate(0px, -150px);
    margin-left: 600px;
    width: 250px;
}
.boxexistence {
    width: 800px;
    height: 500px;
    border-radius: 10px;
    transform: Translate(28px, -100px);
    margin-bottom: 0px;
}
</style>

