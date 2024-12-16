import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import Title from "../Title";
import { FiPlus, FiMinus, FiDownload } from "react-icons/fi";
import { Input } from "../ui/input";

interface PrintableIframeProps {
  content: React.ReactNode;
}

const PrintableIframe: React.FC<PrintableIframeProps> = ({ content }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [cssContent, setCssContent] = useState<string>("");
  const [zoomFactor, setZoomFactor] = useState<number>(1);
  const [inputValue, setInputValue] = useState<number>(100); // Keep initial input value as 100%

  const { t } = useTranslation();

  // Fetch the CSS once
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

    // Apply zoom
    container.style.transform = `scale(${zoomFactor})`;
    container.style.transformOrigin = "top left";

    iframeDocument.body.appendChild(container);

    const style = iframeDocument.createElement("style");
    // Append background color rule directly to the CSS so the entire iframe background is gray
    style.innerHTML = `${cssContent}\nhtml, body { background-color: gray; }`;
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
  }, [content, iframeLoaded, cssContent, zoomFactor]);

  const handlePrint = () => {
    if (!cssContent) {
      console.warn("CSS not loaded yet. Printing without styles.");
    }

    const printableHTML = renderToString(<>{content}</>);

    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (!newWindow) return;

    newWindow.document.open();
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

    setTimeout(() => {
      newWindow.focus();
      newWindow.print();
    }, 100);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoomFactor + 0.1, 3);
    setZoomFactor(newZoom);
    setInputValue(Math.round(newZoom * 100)); // Update input value to match zoom
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomFactor - 0.1, 0.1);
    setZoomFactor(newZoom);
    setInputValue(Math.round(newZoom * 100)); // Update input value to match zoom
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setInputValue(value); // Update the input field only
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newZoom = Math.max(0.1, Math.min(inputValue / 100, 3)); // Clamp between 10% and 300%
      setZoomFactor(newZoom);
    }
  };

  return (
    <>
      <Title header={t("PDF.title")} />
      {/* The iframe and zoom buttons container */}
      <div className="relative w-full my-4 border border-gray-300 rounded-sm h-96">
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          title="MeadTools Recipe PDF"
          srcDoc="<html><head></head><body></body></html>"
        />
        <div className="absolute flex items-center space-x-2 top-2 right-10">
          <span className="flex gap-2 mr-2">
            <Button onClick={handleZoomOut} variant="secondary">
              <FiMinus />
            </Button>
            <span className="relative">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="w-[4.5rem] text-center"
              />
              <span className="absolute -translate-y-1/2 right-2 top-1/2">
                %
              </span>
            </span>
            <Button onClick={handleZoomIn} variant="secondary">
              <FiPlus />
            </Button>
          </span>
          <Button onClick={handlePrint} variant="secondary">
            <FiDownload />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PrintableIframe;
