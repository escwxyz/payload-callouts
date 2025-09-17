import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { callouts } from "./constants.js";
import { getPluginConfig } from "./store.js";

export const createBlockConfig = (): Block => {
  const config = getPluginConfig();

  const {
    blockSlug = "callout",
    blockInterfaceName = "CalloutBlock",
    theme = "github",
    defaultOpen = true,
    collapsible = true,
  } = config || {};

  const options = Object.entries(callouts)
    .map(([key, value]) => ({
      label: value.label,
      value: key,
    }))
    .filter((option) => option.value.startsWith(theme));

  return {
    slug: blockSlug,
    interfaceName: blockInterfaceName,
    fields: [
      {
        type: "tabs",
        tabs: [
          {
            label: "Content",
            fields: [
              {
                name: "type",
                label: "Callout Type",
                type: "select",
                options: options,
                required: true,
              },
              {
                type: "text",
                name: "title",
                label: "Title",
                admin: {
                  description:
                    "Override the default title for this callout type",
                },
                localized: true,
              },
              {
                name: "content",
                type: "richText",
                editor: lexicalEditor({
                  features: ({ rootFeatures }) => {
                    return [
                      ...rootFeatures,
                      FixedToolbarFeature(),
                      InlineToolbarFeature(),
                    ];
                  },
                }),
                label: false,
                required: true,
                localized: true,
              },
            ],
          },
          {
            label: "Config",
            fields: [
              {
                type: "checkbox",
                name: "collapsible",
                label: "Make Expandable",
                defaultValue: collapsible,
              },
              {
                type: "checkbox",
                name: "defaultOpen",
                label: "Expanded by Default",
                defaultValue: defaultOpen,
                admin: {
                  condition: (_, { collapsible }) => collapsible === true,
                },
              },
            ],
          },
        ],
      },
    ],
  };
};
