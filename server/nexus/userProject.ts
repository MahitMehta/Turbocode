import { objectType, mutationType, stringArg, nonNull, extendType } from "nexus";
import { HttpError } from "graphql-helix";

export const UserProject = objectType({
    name: 'UserProject',
    definition(t) {
      t.id("id")
      t.string("ownerId")
      t.string("name")
    }
});

export const UserProjectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUserProject', {
      type: "UserProject",
      args: {
        id: nonNull(stringArg()), 
        ownerId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve: async (_, { id, ownerId, name }, { prisma }) => {

        const res = await prisma.user.create({
          data: {id, ownerId, name}
        });
        return res; 
      }
    })
  }
})