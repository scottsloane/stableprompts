import axios from "axios";

export default class AOne {
  constructor() {
    this.last = null;
  }

  makePaylod(prompt) {
    return {
      prompt,
      negative_prompt: "",
      seed: -1,
      subseed: -1,
      subseed_strength: 0,
      seed_resize_from_h: -1,
      seed_resize_from_w: -1,
      sampler_name: "DPM++ 3M SDE Karras",
      batch_size: 1,
      n_iter: 1,
      steps: 70,
      cfg_scale: 7,
      width: 576,
      height: 1024,
      restore_faces: false,
      tiling: false,
      do_not_save_samples: false,
      do_not_save_grid: false,
      eta: 0,
      denoising_strength: 0,
      s_min_uncond: 0,
      s_churn: 0,
      s_tmax: 0,
      s_tmin: 0,
      s_noise: 0,
      override_settings: {},
      override_settings_restore_afterwards: true,
      refiner_checkpoint: "string",
      refiner_switch_at: 0,
      disable_extra_networks: false,
      comments: {},
      enable_hr: false,
      script_args: [],
      send_images: true,
      save_images: true,
      alwayson_scripts: {},
    };
  }

  async generate(prompt) {
    console.log("Rendering via A1111");
    // Here we will use a prompt generator model to generate an text2image prompt
    const response = await axios.post(
      "http://192.186.0.182:7860/sdapi/v1/txt2img",
      this.makePaylod(prompt)
    );
    this.last = response.data.response
      .split("\n")
      .filter((x) => x.trim() !== "");
    return response.data.response.images;
  }
}
