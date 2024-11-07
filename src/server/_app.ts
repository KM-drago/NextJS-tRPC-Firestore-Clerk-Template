import { helloWorldRouter } from "./routers/helloWorld";
import { createCallerFactory, createTRPCRouter } from "./trpc";

// multiple router files can be put here seperated by commas.
export const appRouter = createTRPCRouter({
  helloWorld: helloWorldRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
