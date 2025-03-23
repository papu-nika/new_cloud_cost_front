import { defineConfig } from "orval";

export default defineConfig({
  cloud_cost: {
    input: "openapi.yaml",

    output: {
      mode: "tags-split",
      target: "app/client/",
      schemas: "app/model",
      client: "react-query",
    },
  },
});
