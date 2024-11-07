import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Here you can create the backend endpoints needed for the application.
// Organize the endpoints to different files as needed.
export const helloWorldRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),
});
