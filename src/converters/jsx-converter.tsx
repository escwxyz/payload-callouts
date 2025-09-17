import type { SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { CalloutBlock } from "../components/CalloutServer.js";
import { getPluginConfig } from "../store.js";
import type { CalloutBlockData } from "../types.js";

export const createCalloutBlockJSXConverter = (
  renderContent: (content: CalloutBlockData["content"]) => React.ReactNode
) => {
  const config = getPluginConfig();
  const { blockSlug = "callout" } = config || {};

  return {
    blocks: {
      [blockSlug]: ({
        node,
      }: {
        node: SerializedBlockNode<CalloutBlockData>;
      }) => {
        return (
          <CalloutBlock data={node.fields} renderContent={renderContent} />
        );
      },
    },
  };
};
