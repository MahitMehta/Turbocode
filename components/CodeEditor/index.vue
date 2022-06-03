<template>
    <div class="flex flex-col bg-grey w-full relative">
        <nav class="w-full h-14 bg-grey justify-between items-center flex pr-6">
            <TabManager 
                :files="files" 
                :filesOpen="filesOpen" 
                :fileSelectedId="fileSelectedId"
            />
            <div class="flex justify-center items-center space-x-2">
                <IconButton  
                    @click="runTerminal"
                    :width="10" 
                    color="#fff" 
                    :icon="['fas', 'play']" 
                />
                <IconButton  
                    @click="fullScreen"
                    :width="10" 
                    color="#fff" 
                    :icon="isFullScreen ? ['fas', 'minimize'] : ['fas', 'expand']" 
                />
            </div>
        </nav>
         <div 
            v-if="!fileSelectedId"
            style="transform:translate(-50%, -50%)"
            class="absolute top-[50%] space-y-2 left-[50%] flex justify-center items-center flex-col">
            <h1 class="text-white text-5xl">Turbocode.it</h1>
            <p class="text-white opacity-50 text-2xl">Learn & Build Faster.</p>
        </div>
        <ClientOnly>
            <Codemirror
                v-if="fileSelectedId"
                :options="cmOptions"
                :value="code"
                border
                style="width:100%;height:100%;border: none; border-radius:0px"
                placeholder="test placeholder"
                @change="change"
            />
            <code-terminal 
                v-bind:class="{
                    'hidden': !showTerminal,
                }"
                class="transition-all"
                v-if="$props.user.username" 
                :user="$props.user" 
                :code="code"
            />
        </ClientOnly>
    </div>
</template>
<script lang="ts">
import { UserFileObject } from '.prisma/client';
import { fileSystemStore } from "~/store/FileSystemStore";
import { gql, useMutation } from '@urql/vue';

export default {
    props: {
        user: Object,
        files: Array,
    },  
    methods: {
        fullScreen() {
            const that = this; 
            
            if (this.$data.isFullScreen) {
                document.exitFullscreen().then(() => {
                    that.$data.isFullScreen = false;
                });
            } else {
                document.body.requestFullscreen().then(() => {
                    that.$data.isFullScreen = true; 
                });
            }
        },
        injectCode(fileId:string) {
            const cachedCode = fileSystemStore.getState().files[fileId]; 
            if (cachedCode) {
                this.$data.code = cachedCode.code;
            } else {
                const file = this.$props.files.find((f:UserFileObject) => f.id === fileId);
                this.$data.code = file.code;
            }
        },  
        change(e:string) {
            this.$data.code = e; 
        },
        handleKeyDown(e) {
            const currentFile = this.fileSystemState.files[this.$data.fileSelectedId]; 
            const cmdKeyPressed = e.metaKey || e.ctrlKey;
            if (cmdKeyPressed && e.code === "KeyS") {
                e.preventDefault();
                e.stopPropagation();
                if (currentFile.saved || this.$data.savingCode) return; 
                
                this.$data.savingCode = true; 
                this.modifyCode({ code: currentFile.code, fileId: currentFile.id })
                    .then(() => {
                        fileSystemStore.setFileSaved(currentFile.id);
                    }).finally(() => {
                        this.$data.savingCode = false; 
                    });
            }
        },
        runTerminal() {
            this.$data.showTerminal = true;
            this.$nextTick(() => {
                this.$bus.$emit('runTerminal')
            });
        }
    },
    watch: {
        code() {
            const file = this.$props.files.find((f:UserFileObject) => f.id === this.$data.fileSelectedId);

            fileSystemStore.setFile({ 
                ...file,
                code: this.$data.code,
                saved: this.$data.code === file.code,
            });
        }
    },
    data() {
        return {
            isFullScreen: false,
            savingCode: false,
            filesOpen: [],
            fileSelectedId: null,
            showTerminal: false,
            width: 0,
            height: 0,
            code: "",
            cmOptions: {
                mode: "text/x-java", 
                theme: "monokai", 
                lineNumbers: true, 
                smartIndent: true, 
                indentUnit: 2, 
                foldGutter: true, 
                styleActiveLine: true,
                matchBrackets: true,
                autoCloseBrackets: true,
            } 
        }
    },
    setup() {
        const modifyCodeMutation = gql`
                mutation updateFile($code: String!, $fileId:ID!) {
                    modifyUserFileObject(code:$code, fileId:$fileId) {
                        code
                    }
                }
            `;
        const { executeMutation:modifyCode } = useMutation(modifyCodeMutation);

        return {
            modifyCode,
            fileSystemState: fileSystemStore.getState(),
            isInitialized: fileSystemStore.getIsInitialized(),
        }
    },
    unmounted() {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
    mounted() {
        const that = this; 

        window.addEventListener("keydown", this.handleKeyDown); 

        this.$data.width = window.innerWidth * 0.5; 
        this.$data.height = window.innerHeight; 

        this.$bus.$on("hideTerminal", () => {
            this.$data.showTerminal = false; 
        }); 

        this.$bus.$on("deleteTab", (fileId:string) => {
            that.$data.filesOpen = that.$data.filesOpen.filter((id:string) => id !== fileId);
            
            if (!that.$data.filesOpen.length) {
                that.$data.fileSelectedId = null; 
            } else if (fileId === that.$data.fileSelectedId) {
                that.$data.fileSelectedId = that.$data.filesOpen[0];
            }
        });

        this.$bus.$on("openFile", (fileId:string) => {
            if (!that.$data.filesOpen.includes(fileId)) {
                that.$data.filesOpen.push(fileId);
                that.$data.fileSelectedId = fileId; 
                that.injectCode(that.$data.fileSelectedId);
            }
        }); 

        this.$bus.$on("switchTab", (fileId:string) => {
            that.$data.fileSelectedId = fileId;

            that.injectCode(that.$data.fileSelectedId);
        });
    }
 }
</script>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@400;700&family=Source+Code+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap');

    .CodeMirror {
        width: 100%;
        background: #212121 !important;
    }

    .CodeMirror-linenumbers {
        background: #212121 !important;
    }

    .CodeMirror-selected {
        background: rgba(255, 255, 255, 0.1) !important;
    }

    .CodeMirror-sizer {
        margin-left: 29px !important;
        padding-bottom: max(50vh, 400px) !important;
    }

    .CodeMirror * {
        font-size: 15px;
        font-family: "Fira Code", inconsolata, monospace, "Source Code Pro"
    }
</style>