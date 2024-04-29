import { z } from "zod";

const newsSchema = {
  //register admin
  createnew: z.object({
    title: z.string(),
    description: z.string(),
  }),
  updateNews: z.object({
    title: z.string(),
    description: z.string(),
  }),
  getsingleNews: z.object({
    title: z.string(),
    description: z.string(),
  }),
};
export default newsSchema;
