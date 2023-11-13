import fastify from "fastify";
import colors from "colors";
import PromptGen from "./promptgen.js";

export default class API {
  constructor() {
    this.app = fastify();
    this.promptGen = new PromptGen();
  }

  async start() {
    // Here we will start the API server

    this.app.get("/", async (request, reply) => {
      return { hello: "world" };
    });

    this.app.post("/generate", async (request, reply) => {
      const subject = request.body.subject;
      console.log(`Generating prompt for ${subject}`.grey);
      const prompt = await this.promptGen.generate(subject);

      return { prompt: prompt.split("\n").filter((x) => x.trim() !== "") };
    });

    this.app.post("/render", async (request, reply) => {
      return { hello: "world" };
    });

    let address = await this.app
      .listen({ port: 3000, host: "0.0.0.0" })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
    console.log(`API server listening at ${address}`);
  }
}
