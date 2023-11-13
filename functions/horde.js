import axios from "axios";

export default class Horde {
  constructor(baseURL, key) {
    this.baseURL = baseURL;
    this.key = key;
    axios.defaults.headers.common["apikey"] = key;
  }

  createPayload(prompt) {
    return {
      prompt: prompt.replace(/\"/g, ""),
      params: {
        sampler_name: "k_lms",
        cfg_scale: 7,
        denoising_strength: 0.75,
        seed: "-1",
        height: 512,
        width: 512,
        seed_variation: 1,
        post_processing: ["GFPGAN"],
        karras: true,
        tiling: false,
        hires_fix: true,
        clip_skip: 1,
        special: {},
        steps: 30,
        n: 1,
      },
      nsfw: false,
      trusted_workers: false,
      slow_workers: true,
      censor_nsfw: false,
      // workers: ["string"],
      worker_blacklist: false,
      // models: ["string"],
      // source_image: "string",
      // source_processing: "img2img",
      // source_mask: "string",
      r2: true,
      shared: false,
      replacement_filter: true,
      dry_run: false,
    };
  }

  async generate(prompt) {
    let request = null;
    try {
      request = await axios.post(
        `${this.baseURL}/api/v2/generate/async`,
        this.createPayload(prompt)
      );
    } catch (e) {
      console.log(e);
      console.log(e.response.data);
    }

    console.log(request.data.message);
    const id = request.data.id;
    await ((id) => {
      return new Promise((resolve) => {
        let ival = setInterval(async () => {
          const response = await axios.get(
            `${this.baseURL}/api/v2/generate/check/${id}`
          );
          if (response.data.done) {
            clearInterval(ival);
            resolve(response.data.response);
          }
        }, 1000);
      });
    })(id);
    request = await axios.get(`${this.baseURL}/api/v2/generate/status/${id}`, {
      apikey: this.key,
    });
    for (let gen of request.data.generations) {
      console.log(gen.img); // This is what we need to save
    }
    return request.data.generations;
  }
}
