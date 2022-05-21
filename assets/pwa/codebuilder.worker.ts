let bytecode:any = {};

onmessage = async (e) => {
    switch(e.data.type) {
        case "pause": {
            Atomics.wait(new Int32Array(e.data.generalSAB), 0, 1);
            break; 
        }
        case "run": {
            const res = await fetch(e.data.blobUrl);
            const js = await res.text();
            
            eval(`${js};\nbytecode = bytecoder;`);
        
            if (!bytecode) return; 
            bytecode.imports.console = {
                printLineString: function(p1){
                    postMessage({ 
                        type: "log",
                        format: "println",
                        message: bytecode.toJSString(p1)
                    })
                },
                printLineInt: function(p1) {
                    postMessage({
                        type: "log",
                        format: "println",
                        message: p1
                    })
                },
                printLineFloat: function(p1) {
                    postMessage({ 
                        type: "log",
                        format: "println",
                        message: p1
                    })
                },
                printString: function(p1){
                    postMessage({ 
                        type: "log",
                        format: "print",
                        message: bytecode.toJSString(p1)
                    })
                },
                printInt: function(p1) {
                    postMessage({
                        type: "log",
                        format: "print",
                        message: p1
                    })
                },
                printFloat: function(p1) {
                    postMessage({ 
                        type: "log",
                        format: "print",
                        message: p1
                    })
                }
            }

            // bytecode.imports.fileinputstream.readBytesINTL1BYTEINTINT = function(handle,data,offset,length) {
            //     return 0; 
            // };

            // bytecode.imports.fileinputstream.available0INT = function(handle) {
            //     return 0; 
            // };

            bytecode.imports.scanner = {
                getInputInt: function(_thisref, _p1) {
                    Atomics.store(new Int32Array(e.data.generalSAB), 0, 1);
                    Atomics.notify(new Int32Array(e.data.generalSAB), 0);
                    Atomics.wait(new Int32Array(e.data.generalSAB), 0, 1);
                    const bytes = Uint8Array.from(new Int32Array(e.data.inputSAB));
                    const decoder = new TextDecoder();
                    const str = decoder.decode(bytes);
                    return Number.parseInt(str);
                },
                getInput: function(_thisref, _p1) {
                    console.log("Input: ");
                    Atomics.store(new Int32Array(e.data.generalSAB), 0, 1);
                    Atomics.notify(new Int32Array(e.data.generalSAB), 0);
                    Atomics.wait(new Int32Array(e.data.generalSAB), 0, 1);
                    const bytes = Uint8Array.from(new Int32Array(e.data.inputSAB));
                    const decoder = new TextDecoder();
                    const str = decoder.decode(bytes);
                    return bytecode.toBytecoderString(str);
                },
            }

            // Execution Started
            postMessage({
                type: "init"
            })
            bytecode.bootstrap();
            bytecode.initializeFileIO();

            var buf = new ArrayBuffer(0);
            var bufView = new Uint8Array(buf);

            Object.assign(bytecode.filehandles[0], {
                currentpos: 0,
                data: bufView,
                size: bufView.length,
                skip0INTINT: function(handle,amount) {
                    var remaining = this.size - this.currentpos;
                    var possible = Math.min(remaining, amount);
                    this.currentpos+=possible;
                    return possible;
                },
                read0INT: function(handle) {
                    return this.data[this.currentpos++];
                },
                readBytesINTL1BYTEINTINT:function(handle,target,offset,length) {
                    if (this.currentpos === 0) {
                        Atomics.store(new Int32Array(e.data.generalSAB), 0, 1);
                        Atomics.notify(new Int32Array(e.data.generalSAB), 0);
                        Atomics.wait(new Int32Array(e.data.generalSAB), 0, 1);
                        let bytes = Uint8Array.from(new Int32Array(e.data.inputSAB));
                        bytes = bytes.filter(byte => byte !== 0);
                        this.data = bytes;
                        this.size = bytes.length;
                    }

                    if (length === 0) {return 0;}
                    var remaining = this.size - this.currentpos;
                    var possible = Math.min(remaining, length);
                    if (possible === 0) {
                        this.currentpos = 0; 
                        return -1;
                    }
                    for (var j=0;j<possible;j++) {
                        target.data[offset++]=this.data[this.currentpos++];
                    }
                    return possible;
                },
                available0INT: function(handle) {
                    return this.size - this.currentpos;
                }
            });

            bytecode.exports.main();
            // Execution Done

            postMessage({
                type: "terminate"
            })

            break; 
        }
    }
    
};