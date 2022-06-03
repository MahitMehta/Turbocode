import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
    faPlay, faFolderPlus, faFileCirclePlus,
    faFolderClosed, faFolderOpen,
    faAngleRight, faAngleDown, faXmark, faExpand, faMinimize,
    faCircle, faPlus
} from '@fortawesome/free-solid-svg-icons'
import { faJava, faPython } from "@fortawesome/free-brands-svg-icons";

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
    faJava, faPlus,
    faPlay, faFolderPlus, faFileCirclePlus,
    faFolderOpen, faFolderClosed,
    faAngleRight, faAngleDown, faXmark, faCircle,
    faExpand, faMinimize,
)

// Register the component globally
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
