import { callouts } from "../constants.js";
import type { CalloutBlockData } from "../types.js";
import styles from "./CalloutServer.module.css";

type Props = {
  data: CalloutBlockData;
  className?: string;
  renderContent: (content: CalloutBlockData["content"]) => React.ReactNode;
};

export const CalloutBlock = (props: Props) => {
  const { data, className, renderContent } = props;
  const { type, collapsible = true, defaultOpen = true, title } = data;
  const calloutType = type.split("-").at(1) || "";
  const styleType = type.split("-").at(0) as "github" | "obsidian";
  const config = callouts[type as keyof typeof callouts];
  const displayTitle = title || config?.label || calloutType;

  const Container = collapsible ? "details" : "div";
  const TitleContainer = collapsible ? "summary" : "div";

  const containerStyle = [styles[styleType], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Container
      className={containerStyle}
      data-callout={calloutType}
      data-collapsible={collapsible}
      {...(collapsible ? { open: defaultOpen ?? false } : {})}
    >
      <TitleContainer className={styles.calloutTitle}>
        <span
          className={styles.calloutTitleIcon}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG icons are safe
          dangerouslySetInnerHTML={{ __html: config?.icon || "" }}
        />
        <span className={styles.calloutTitleText}>{displayTitle}</span>
        {collapsible && (
          <span className={styles.calloutFoldIcon}>
            <svg
              aria-label="Toggle callout"
              fill="none"
              height="1em"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Toggle callout</title>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        )}
      </TitleContainer>
      <div className={styles.calloutContent}>{renderContent(data.content)}</div>
    </Container>
  );
};
