import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

// Here you can create the backend endpoints needed for the application.
// Organize the endpoints to different files as needed.
export const helloWorldRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
  protectedHello: protectedProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Protected Hello ${input.text}`,
    };
  }),
});
