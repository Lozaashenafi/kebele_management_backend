import { z } from "zod";

const kebeleSchema = {
  register: z.object({
    name: z.string(),
    city: z.string(),
    region: z.string(),
    wereda: z.string(),
    zone: z.string(),
  }),
};

export default kebeleSchema;
