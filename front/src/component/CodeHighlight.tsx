"use client";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("json", json);

export default function CodeHighlight({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      showTooltip();
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const showTooltip = () => {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      tooltip.style.visibility = "visible";
      setTimeout(() => {
        tooltip.style.visibility = "hidden";
      }, 1500);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <SyntaxHighlighter
        language={language}
        style={{
          ...prism,
          'pre[class*="language-"]': {
            ...prism['pre[class*="language-"]'],
            padding: "2rem ",
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: 15,
          right: 10,
        }}
      >
        📋
      </button>
      <div id="tooltip">Copied!</div>
    </div>
  );
}
