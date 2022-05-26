<template>
    <div class="flex flex-col bg-grey w-full relative">
        <nav class="w-full h-14 bg-grey justify-between flex pr-6">
            <TabManager 
                :files="files" 
                :filesOpen="filesOpen" 
                :fileSelectedId="fileSelectedId"
            />
            <div @click="runTerminal" class="flex space-x-2 items-center cursor-pointer">
                <font-awesome-icon :width="12" color="#fff" :icon="['fas', 'play']" />
                <!-- <span class="text-white font-medium text-sm">Run</span> -->
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
export default {
    props: {
        user: Object,
        files: Array,
    },  
    methods: {
        change(e:string) {
           localStorage.setItem("code", e);
           this.$data.code = e;
        },
        runTerminal() {
            this.$data.showTerminal = true;
            this.$nextTick(() => {
                this.$bus.$emit('runTerminal')
            });
        }
    },
    data() {
        return {
            filesOpen: [],
            fileSelectedId: null,
            showTerminal: false,
            width: 0,
            height: 0,
            code: `// New Java File...\n`,
            cmOptions: {
                mode: "text/x-java", 
                theme: "monokai", 
                lineNumbers: true, 
                smartIndent: true, 
                indentUnit: 2, 
                foldGutter: true, 
                styleActiveLine: true,
                matchBrackets: true,
            } 
        }
    },
    mounted() {
        const that = this; 

        const cachedCode = localStorage.getItem("code");
        if (!!cachedCode) {
            this.$data.code = cachedCode; 
        }

        this.$data.width = window.innerWidth * 0.5; 
        this.$data.height = window.innerHeight; 

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
            }
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