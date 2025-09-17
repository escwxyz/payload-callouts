export type PayloadCalloutsConfig = {
  /** Enable or disable the plugin
   * @default false
   */
  disabled?: boolean;

  /** The slug for the callout block
   * @default "callout"
   */
  blockSlug?: string;

  /** Interface name for TypeScript generation
   * @default "CalloutBlock"
   */
  blockInterfaceName?: string;

  /** Theme to use
   * @default "github"
   * */
  theme?: "github" | "obsidian";

  /** Whether callouts are collapsible by default
   * @default true
   */
  collapsible?: boolean;

  /** Whether callouts are open by default
   * @default true
   */
  defaultOpen?: boolean;
};

export type CalloutOption = {
  label: string;
  icon: string;
};

export type CalloutBlockData = {
  type: string;
  title?: string | null;
  theme?: "obsidian" | "github" | null;
  collapsible?: boolean | null;
  defaultOpen?: boolean | null;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ("ltr" | "rtl") | null;
      format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
};
