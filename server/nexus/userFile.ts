import { objectType, mutationType, stringArg, nonNull, extendType } from "nexus";
import { HttpError } from "graphql-helix";


export const UserFile = objectType({
    name: 'UserFile',
    definition(t) {
      t.id("id");
      t.string("name");
      t.string('code');
      t.string('filePath');
      t.string('srsProjectId');
    }
});

export const UserFileMutation = extendType({
  type: 'Mutation', 
  definition(t) {
    t.field('createUserFile', {
      type: "UserFile",
      args: {
        name: nonNull(stringArg()),
        code: stringArg(),
        filePath: nonNull(stringArg()),
        srcProjectId: nonNull(stringArg()),
      },
      resolve: async (_, { name, code, filePath, srcProjectId }, { prisma }) => {
        const res = await prisma.user.create({
          data: {name, code, filePath, srcProjectId}
        });
        return res;
      }
    })
  }
})