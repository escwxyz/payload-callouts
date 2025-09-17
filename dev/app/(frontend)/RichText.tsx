import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { createCalloutBlockJSXConverter } from "payload-callouts/converters";

import type { CalloutBlock as CalloutBlockType } from "../../payload-types.ts";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CalloutBlockType>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...createCalloutBlockJSXConverter((content) => (
    <ConvertRichText converters={jsxConverters} data={content} />
  )),
});

type Props = {
  data: DefaultTypedEditorState;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, ...rest } = props;
  return (
    <ConvertRichText
      className="prose md:prose-md dark:prose-invert max-w-none"
      converters={jsxConverters}
      {...rest}
    />
  );
}
