<template>
    <div class="flex flex-col w-full relative">
        <code-terminal :code="code"/>
        <nav class="w-full h-14 bg-grey justify-end flex py-2 px-6">
            <div @click="this.$bus.$emit('runTerminal')" class="flex space-x-2 items-center cursor-pointer">
                <font-awesome-icon :width="12" color="#fff" :icon="['fas', 'play']" />
                <!-- <span class="text-white font-medium text-sm">Run</span> -->
            </div>
        </nav>
        <client-only>
            <Codemirror
                :options="cmOptions"
                :value="code"
                border
                style="width:100%;height:100%;border: none; border-radius:0px"
                placeholder="test placeholder"
                @change="change"
            />
        </client-only>
    </div>
</template>
<script lang="ts">
export default {
    methods: {
        change(e:string) {
           this.$data.code = e;
        }
    },
    data() {
        return {
            width: 0,
            height: 0,
            code: ``,
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
        this.$data.width = window.innerWidth * 0.5; 
        this.$data.height = window.innerHeight; 
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

    .CodeMirror * {
        font-size: 15px;
        font-family: "Fira Code", inconsolata, monospace, "Source Code Pro"
    }
</style>