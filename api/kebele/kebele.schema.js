import { z } from "zod";

const kebeleSchema = {
  register: z.object({
    name: z.string(),
  }),
};

export default kebeleSchema;
