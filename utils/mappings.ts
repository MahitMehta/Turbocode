import { EProjectType } from "~~/common/enums/projectType";
import { EUserRole } from "~~/common/enums/userRole";

export const userRoleMappings : { [ Key in EUserRole ]: string } = {
    [ EUserRole.VOLUNTEER ]: "Volunteer",
    [ EUserRole.PROJECT_LEAD ]: "Project Lead"
}

export type IProjectMap = { 
    [ Key in EProjectType ]: {
        label: string; 
        icon: string,
    }
}

export const projectTypeMappings : IProjectMap  = {
    [ EProjectType.JAVA_8_WEB_JVM ]: { 
        label: "Java 8 Web JVM",
        icon: "java"
    },
    [ EProjectType.JAVA_11_TRANSPILER ]: {
        label: "Java 11 Transpiler",
        icon: "java"
    }
}