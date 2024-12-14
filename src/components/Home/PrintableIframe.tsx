import React, { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import Title from "../Title";

interface PrintableIframeProps {
  content: React.ReactNode; // Accepts any React component as content
}

const PrintableIframe: React.FC<PrintableIframeProps> = ({ content }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const iframeDocument = iframe?.contentDocument;

    if (iframeDocument) {
      // Clear previous content
      iframeDocument.body.innerHTML = "";

      // Create a container for the React content
      const container = iframeDocument.createElement("div");
      iframeDocument.body.appendChild(container);

      // Inject the CSS file into the iframe
      const link = iframeDocument.createElement("link");
      link.rel = "stylesheet";
      link.href = "/iframe-styles.css"; // Path to your CSS file
      iframeDocument.head.appendChild(link);

      // Render React content into the iframe
      const root = createRoot(container);
      root.render(<>{content}</>);
    }
  }, [content]);

  const handlePrint = () => {
    const iframeWindow = iframeRef.current?.contentWindow;

    if (iframeWindow) {
      iframeWindow.focus();
      iframeWindow.print();
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <Title header={t("PDF.title")} />
      <iframe
        ref={iframeRef}
        className="w-full my-4 border border-gray-300 rounded-sm h-96"
        title="MeadTools Recipe PDF"
      />
      <Button onClick={handlePrint} variant={"secondary"}>
        {t("SAVE")}
      </Button>
    </>
  );
};

export default PrintableIframe;
