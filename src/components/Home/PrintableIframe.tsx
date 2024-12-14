import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import Title from "../Title";

interface PrintableIframeProps {
  content: React.ReactNode;
}

const PrintableIframe: React.FC<PrintableIframeProps> = ({ content }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [cssContent, setCssContent] = useState<string>("");
  const { t } = useTranslation();

  // Fetch the CSS once when component mounts
  useEffect(() => {
    fetch("/iframe-styles.css")
      .then((res) => res.text())
      .then((css) => {
        setCssContent(css);
      })
      .catch((err) => console.error("Failed to load CSS:", err));
  }, []);

  const injectPreviewContent = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const iframeDocument = iframe.contentDocument;
    if (!iframeDocument) return;

    iframeDocument.body.innerHTML = "";

    const container = iframeDocument.createElement("div");
    container.className = "printable-content";
    iframeDocument.body.appendChild(container);

    // Instead of linking the stylesheet, we'll just inject it as a <style> for the preview too.
    const style = iframeDocument.createElement("style");
    style.innerHTML = cssContent;
    iframeDocument.head.appendChild(style);

    const root = createRoot(container);
    root.render(<>{content}</>);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIframeLoaded(true);
      if (cssContent) {
        injectPreviewContent();
      }
    };

    iframe.addEventListener("load", handleLoad);
    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [cssContent]);

  useEffect(() => {
    if (iframeLoaded && cssContent) {
      injectPreviewContent();
    }
  }, [content, iframeLoaded, cssContent]);

  const handlePrint = () => {
    if (!cssContent) {
      // If CSS not loaded yet, just print without CSS or warn the user
      console.warn("CSS not loaded yet. Printing without styles.");
    }

    const printableHTML = renderToString(<>{content}</>);

    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (!newWindow) return;

    newWindow.document.open();
    // Inject the fetched CSS as a <style> block here
    newWindow.document.write(`
      <html>
        <head>
          <style>${cssContent}</style>
        </head>
        <body>
          ${printableHTML}
        </body>
      </html>
    `);
    newWindow.document.close();

    // Wait a short time to ensure rendering before print
    // This tiny delay allows Firefox to layout the page with CSS
    setTimeout(() => {
      newWindow.focus();
      newWindow.print();
    }, 100);
  };

  return (
    <>
      <Title header={t("PDF.title")} />
      <iframe
        ref={iframeRef}
        className="w-full my-4 border border-gray-300 rounded-sm h-96"
        title="MeadTools Recipe PDF"
        srcDoc="<html><head></head><body></body></html>"
      />
      <Button onClick={handlePrint} variant={"secondary"}>
        {t("SAVE")}
      </Button>
    </>
  );
};

export default PrintableIframe;
