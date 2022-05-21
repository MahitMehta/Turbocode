import { objectType, mutationType, stringArg, nonNull, extendType, list } from "nexus";
import PasswordUtil from "~~/utils/password";
import { HttpError } from "graphql-helix";
import { setAuthState } from "~~/utils/jwt";
import type { CompatibilityEvent } from "h3";

export const User = objectType({
    name: 'User',
    definition(t) {
      t.id("id")
      t.string('email');
      t.string('pass');
      t.string('name');
    }
});

export const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        pass: nonNull(stringArg()),
        username: nonNull(stringArg()),
      },
      resolve: async (_, { email, pass, username }, { prisma, res }) => {

        const hash = await PasswordUtil.hash(pass);
        const user = await prisma.user.create({
          data: { email, pass: hash, username }
        });

        setAuthState(user, res as unknown as CompatibilityEvent);
        return user;
      }
    })
  
    t.field('loginClient', {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        pass: nonNull(stringArg()),
        type: nonNull(stringArg())
      },
      resolve: async (_root, { email, pass, type }, { prisma, res }) => {
        const user = await prisma.user.findFirst({
          where: {email}
        })

        if (!user) throw new HttpError(403, "Login failed, user doesn't exist!");

        if (await PasswordUtil.compare(pass, user.pass)) {
          setAuthState(user, res as unknown as CompatibilityEvent);
          return user; 
        } else {
          throw new HttpError(403, "Login failed, invalid email or password.");
        }
      }
    })
  }
})