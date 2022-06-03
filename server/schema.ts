import { resolve } from "path";
import { GraphQLSchema } from "graphql";
import { makeSchema } from "nexus";
import { nexusShield, allow } from "nexus-shield";
import * as types from "./nexus/_types";
import NexusPrismaScalars from 'nexus-prisma/scalars'

export default makeSchema({
  plugins: [
    nexusShield({
      defaultError: new Error("Unauthorized"),
      defaultRule: allow,
    }),
  ],
  types: { ...types, ...NexusPrismaScalars },
  shouldGenerateArtifacts: process.env.NODE_ENV === "development",
  outputs: {
    schema: resolve(process.cwd(), "generated/schema.graphql"),
    typegen: resolve(process.cwd(), "generated/nexus-types.ts"),
  },
  contextType: {
    module: resolve(process.cwd(), "server/context.ts"),
    export: "Context",
  },
}) as unknown as GraphQLSchema;