import type { Config, Plugin } from "payload";
import { setPluginConfig } from "./store.js";
import type { PayloadCalloutsConfig } from "./types.js";

export const payloadCallouts =
  (pluginOptions: PayloadCalloutsConfig = {}): Plugin =>
  (incomingConfig: Config): Config => {
    if (pluginOptions.disabled) {
      return incomingConfig;
    }

    setPluginConfig(pluginOptions);

    const config: Config = {
      ...incomingConfig,

      onInit: async (payload) => {
        if (incomingConfig.onInit) {
          await incomingConfig.onInit(payload);
        }
        setPluginConfig(pluginOptions);
      },
    };

    return config;
  };

export { createBlockConfig } from "./config.js";
export type { PayloadCalloutsConfig } from "./types.js";
