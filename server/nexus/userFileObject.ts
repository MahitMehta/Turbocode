import { objectType, stringArg, nonNull, extendType } from "nexus";


export const UserFileObject = objectType({
    name: 'UserFileObject',
    definition(t) {
      t.id("id");
      t.string("name");
      t.string('code');
      t.string('filePath');
      t.string('projectId');
      t.string('type');
    }
});

export const UserFileMutation = extendType({
  type: 'Mutation', 
  definition(t) {
    t.field('createUserFileObject', {
      type: "UserFileObject",
      args: {
        name: nonNull(stringArg()),
        code: stringArg(),
        filePath: nonNull(stringArg()),
        projectId: nonNull(stringArg()),
        type: nonNull(stringArg())
      },
      resolve: async (_, { name, code, filePath, projectId, type }, { prisma }) => {
        // TODO: Need to check if project (projectId) is owned by user 
        const res = await prisma.userFileObject.create({
          data: { name, code, filePath, projectId, type }
        });
        return res;
      }
    })
  }
})