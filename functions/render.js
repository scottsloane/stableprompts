export default class Render {
  constructor() {
    this.last = null;
  }

  async render(prompt) {
    // Here we will use StableHord to render an image!
    console.log(`Rendering prompt ${prompt}...`.grey);
  }
}
