import type { PayloadCalloutsConfig } from "./types.js";

let pluginConfig: PayloadCalloutsConfig | undefined;

export function setPluginConfig(config: PayloadCalloutsConfig) {
  pluginConfig = config;
}

export function getPluginConfig(): PayloadCalloutsConfig | undefined {
  return pluginConfig;
}
