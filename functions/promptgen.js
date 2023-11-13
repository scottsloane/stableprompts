import axios from "axios";

export default class PromptGen {
  constructor() {
    this.last = null;
  }

  generationPrompt = `Here's a formula for Stable Diffusion image prompt:
An image of [adjective] [subject] [doing action], [creative lighting style], extremely detailed, ultra realistic, 10k high resolution,
in the style of [art medium 1], [art medium 2], [art medium 3], [famous art style 1], [famous art style 2], [famous art style 3].

Write 5 Stable diffusion prompts using the above formula with the subject being `;

  async generate(prompt) {
    // Here we will use a prompt generator model to generate an text2image prompt
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral",
      stream: false,
      prompt: `${this.generationPrompt} ${prompt}`,
    });
    this.last = response.data.response
      .split("\n")
      .filter((x) => x.trim() !== "");
    console.log(this.last);
    return response.data.response;
  }

  async generateStatic(prompt) {
    // Here we will use static text2image prompt to generate an image
    return "This is a stable diffusion model.";
  }
}
