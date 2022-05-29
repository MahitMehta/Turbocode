<template>
    <div class="absolute bottom-0 z-50 bg-grey border border-solid h-[300px] overflow-hidden border-t-[#32342f] w-full">
        <div class="px-8 py-4 flex justify-between">
            <p class="text-white uppercase text-sm">Terminal</p>
            <div>
                 <IconButton
                    @click="$bus.$emit('hideTerminal')" 
                    :width="12" 
                    color="#fff" 
                    :icon="['fas', 'xmark']" 
                />
            </div>
        </div>
        <div class="p-4 px-8 relative z-50 h-[225px] w-full bottom-3" id="terminal"></div>
    </div>
</template>
<script lang="ts">
import "xterm/css/xterm.css";
import * as zip from "@zip.js/zip.js";
import type { Terminal } from 'xterm';

export default {
    data() {
        return {
            generalSAB: new SharedArrayBuffer(1024),
            inputSAB: new SharedArrayBuffer(1024),
            generalInt32: undefined,
            inputInt32: undefined,
            worker: undefined,
            term: undefined,
            blobUrl: undefined,
            shellPrompt: "user@00:00:00 ~ % ",
            programRunning: false,
        }
    },
    watch: {
        code() {
            this.$data.blobUrl = undefined; 
        },
    },
    props: {
        code: String,
        user: Object,
    },
    methods: {
        async buildProgram() {
            const worker:Worker = this.$data.worker; 
            if (!worker) return; 

            let clientCode = this.$props.code; 

            // PRODUCTION url
            // 
            const buildURL = process.env.NODE_ENV === "development" ? 
                "http://localhost:8080" : 
                "https://us-central1-mah-it.cloudfunctions.net/jbytecoder-builder"; 
            
            const res = await fetch(buildURL, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file: clientCode,
                }),
            }).catch(() => null);

            if (!!!res) { return; };

            const blob = await res.blob();

            const reader = new zip.ZipReader(new zip.BlobReader(blob));
            const entries = await reader.getEntries();
            
            const mainBundle = entries.find(entry => entry.filename === "bytecoder.js");

            if (!mainBundle) {
                console.log("Error Compiling and Retrieving Code!");
                return; 
            }

            const bundleBlob = await mainBundle.getData(new zip.BlobWriter());
            const blobUrl = window.URL.createObjectURL(bundleBlob);
            this.$data.blobUrl = blobUrl;
            console.log("Build Success: ", blobUrl);
        },
        async runProgram() {
            const worker:Worker = this.$data.worker; 
            if (!worker) return; 

            let blobUrl = this.$data.blobUrl; 

            if (!blobUrl) {
                await this.buildProgram();
                blobUrl = this.$data.blobUrl; 
            }

            if (!blobUrl) return; 

            const generalSAB = this.$data.generalSAB; 
            const inputSAB = this.$data.inputSAB;
            
            worker.postMessage({ type: "run", blobUrl, generalSAB, inputSAB });

            const term:Terminal = this.$data.term; 

            const that = this; 

            worker.onmessage = (e) => {
                switch (e.data.type) {
                    case "init": {
                        that.$data.programRunning = true; 
                       // term.clear();
                        break; 
                    }
                    case "log": {
                        if (e.data.format === "println") {
                            term.writeln(""+e.data.message);
                        } else if (e.data.format === "print") {
                            term.write(""+e.data.message);
                        }
                        break; 
                    }
                    case "terminate": {
                        that.$data.programRunning = false; 
                        that.promptTerm();
                        break; 
                    }
                }  
            };
        },
        async promptTerm() {
            const moment = await import("moment");
            const username = this.$props.user?.username;
            const shellPrompt=  `${username ? username.split(" ").join("") : "user"}@${moment.default().format().toString()} ~ % `;
            this.$data.term.write('\r\n' + shellPrompt);
        }
    },
    async mounted() {
        const moment = await import("moment");
        this.$data.shellPrompt = `user@${moment.default().format().toString()} ~ % `;

        this.$bus.$on("runTerminal", () => {
           // this.term.clear();
            term.writeln("java Entry.java");
            this.runProgram();
        }); 

        this.$data.generalInt32 = new Int32Array(this.$data.generalSAB);
        this.$data.inputInt32 = new Int32Array(this.$data.inputSAB);

        let workerURL; 

        if (process.env.NODE_ENV === "development") {
            workerURL = "../assets/pwa/codebuilder.worker.js";
        } else {
            const file = await fetch("https://d1cllsacqk1ao3.cloudfront.net/codebuilder.worker.js");
            const blob = await file.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            workerURL = blobUrl;
        }
       
        const worker = new Worker(workerURL);
        this.$data.worker = worker;

        this.buildProgram();

        const { Terminal } = await import("xterm");
        const { FitAddon } = await import ("xterm-addon-fit");

        const term = new Terminal();
        const fitAddon = new FitAddon()

        this.$data.term = term; 

        term.loadAddon(fitAddon);
        term.writeln("Last login: Tue May 10 15:05:01 on ttys002");
        term.open(document.getElementById("terminal"));
        term.options = {
            cursorBlink: true,
            fontFamily: "Fira Code",
            theme: {
                background: "#181818",
            },
            rightClickSelectsWord: true,
        }
        this.promptTerm();
        fitAddon.fit();
        
        let cmd = '';

        const that = this; 

        term.onRender(() => {
            fitAddon.fit();
        });

        term.onKey(({ key, domEvent }) => {
            var printable = (
                !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey
            );

            if (domEvent.keyCode == 13) {
                if(cmd === 'clear')
                {
                    term.clear();
                    cmd = '';
                    this.promptTerm();
                   
                } else if (cmd === "java Entry.java") {
                    cmd = '';
                    this.term.writeln("");
                    this.runProgram();
            
                } else if (that.$data.programRunning) {
                    console.log("take input", cmd);

                    const encoder = new TextEncoder();
                    const view = encoder.encode(cmd);
                    
                    that.$data.inputInt32.forEach((val, idx) => {
                        if (val !== 0){
                            Atomics.store(that.$data.inputInt32, idx, 0);
                        }
                    });

                    view.forEach((byte, index) => {
                        Atomics.store(that.$data.inputInt32, index, byte);
                    });

                    term.writeln("");

                    Atomics.store(that.$data.generalInt32, 0, 0);
                    Atomics.notify(that.$data.generalInt32, 0);
                    if (that.$data.programRunning) cmd = "";
                    else cmd = "";
                } else {
                    cmd = "";
                    this.promptTerm();
                }
            } else if (domEvent.keyCode == 8) {
                // Do not delete the prompt
                if (!cmd.length) return; 
                cmd = cmd.substring(0, cmd.length - 1);
                term.write('\b \b');
            }
            else if (printable) {
                console.log(key);
                // if (key === "[C" || key === "[D") {
                //     return; 
                // }
                cmd += key;
                term.write(key);
            } 
        });  
    }
}

</script>
