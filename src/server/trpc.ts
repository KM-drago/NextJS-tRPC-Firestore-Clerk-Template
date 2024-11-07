import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";
import { db } from "./db";
import { getAuth } from "@clerk/nextjs/server";

type AuthObject = ReturnType<typeof getAuth>;

//This adds context to every tRPC call
// Notice the auth and userId for Clerk
export const createTRPCContext = async (opts: { headers: Headers; auth: AuthObject }) => {
  return {
    userId: opts.auth.userId,
    ...opts,
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

// This function enforces the user authentication in protected routes.
// If needed you can customize the logic to better suit your needs.
// Or create different functions for different enforcements. ie: check subscription status of user before giving access
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { userId: ctx.userId } });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
