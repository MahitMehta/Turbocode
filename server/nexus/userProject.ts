import { objectType, stringArg, nonNull, extendType, list } from "nexus";

export const UserProject = objectType({
    name: 'UserProject',
    definition(t) {
      t.id("id")
      t.string("ownerId")
      t.string("name")
      t.string("type")
      t.dateTime("createdAt")
      t.dateTime("updatedAt")
      t.dateTime("updatedFilesAt")
      t.field("files", {
        type: list("UserFileObject"),
        args: { 
          projectId: nonNull(stringArg()), 
        },
        resolve: async (_, { projectId }, { prisma }) => {
          return await prisma.userFileObject.findMany({ where: { projectId }});
        }
      })
    }
});

export const UserProjectQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUserProjects", {
      type: list("UserProject"),
      resolve: async (_, _args, { prisma, auth }) => {
        const res = await prisma.userProject.findMany({
          where: { ownerId: auth.id }
        })
        return res; 
      }
    })
    t.field("getUserProject", {
        type: "UserProject",
        args: {
          id: nonNull(stringArg())
        },
        resolve: async (_, { id }, { prisma, auth }) => {
          const res = await prisma.userProject.findFirst({
            where: { id, ownerId: auth.id }
          })
          return res; 
      }
    })
  }
})

export const UserProjectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUserProject', {
      type: "UserProject",
      args: {
        name: nonNull(stringArg()),
        type: nonNull(stringArg())
      },
      resolve: async (_, { name, type }, { prisma, auth }) => {
        // TODO: Validate Type is a included in Project Types Enum
        const res = await prisma.userProject.create({
          data: { ownerId: auth.id, name, type }
        });
        return res; 
      }
    })
  }
})