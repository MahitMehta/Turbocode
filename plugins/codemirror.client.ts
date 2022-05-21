import { GlobalCmComponent } from "codemirror-editor-vue3";
import "codemirror/mode/clike/clike";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
//import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
// import "code-mirror-themes/themes/oceanic.css";


export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.vueApp.use(GlobalCmComponent);
});