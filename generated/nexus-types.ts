/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../server/context"
import type { FieldShieldResolver, ObjectTypeShieldResolver } from "nexus-shield"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  User: { // root type
    email?: string | null; // String
    id?: string | null; // ID
    name?: string | null; // String
    pass?: string | null; // String
  }
  UserFile: { // root type
    code?: string | null; // String
    filePath?: string | null; // String
    id?: string | null; // ID
    name?: string | null; // String
    srsProjectId?: string | null; // String
  }
  UserProject: { // root type
    id?: string | null; // ID
    name?: string | null; // String
    ownerId?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createUser: NexusGenRootTypes['User'] | null; // User
    createUserFile: NexusGenRootTypes['UserFile'] | null; // UserFile
    createUserProject: NexusGenRootTypes['UserProject'] | null; // UserProject
    loginClient: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    ok: boolean; // Boolean!
  }
  User: { // field return type
    email: string | null; // String
    id: string | null; // ID
    name: string | null; // String
    pass: string | null; // String
  }
  UserFile: { // field return type
    code: string | null; // String
    filePath: string | null; // String
    id: string | null; // ID
    name: string | null; // String
    srsProjectId: string | null; // String
  }
  UserProject: { // field return type
    id: string | null; // ID
    name: string | null; // String
    ownerId: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createUser: 'User'
    createUserFile: 'UserFile'
    createUserProject: 'UserProject'
    loginClient: 'User'
  }
  Query: { // field return type name
    ok: 'Boolean'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    name: 'String'
    pass: 'String'
  }
  UserFile: { // field return type name
    code: 'String'
    filePath: 'String'
    id: 'ID'
    name: 'String'
    srsProjectId: 'String'
  }
  UserProject: { // field return type name
    id: 'ID'
    name: 'String'
    ownerId: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      email: string; // String!
      pass: string; // String!
      username: string; // String!
    }
    createUserFile: { // args
      code?: string | null; // String
      filePath: string; // String!
      name: string; // String!
      srcProjectId: string; // String!
    }
    createUserProject: { // args
      id: string; // String!
      name: string; // String!
      ownerId: string; // String!
    }
    loginClient: { // args
      email: string; // String!
      pass: string; // String!
      type: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
    /**
     * Default authorization rule to execute on all fields of this object
     */
    shield?: ObjectTypeShieldResolver<TypeName>
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization rule to execute for this field
     */
    shield?: FieldShieldResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}