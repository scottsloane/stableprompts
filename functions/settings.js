import fs from "fs";

export default class Settings {
  constructor(path) {
    this.path = path;
    this.current = null;
  }

  async load() {
    // Here we will load settings from a file
  }

  async save() {
    // Here we will save settings to a file
  }

  async set(key, value) {
    // Here we will set a setting
  }
}
