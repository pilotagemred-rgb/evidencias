"use client";

import { useEffect } from "react";

export const FRAME_HEIGHT_MESSAGE = "red-doc-frame-height";

export function FrameHeightReporter({ resetKey }: { resetKey?: string }) {
  useEffect(() => {
    if (window.parent === window) return;

    const send = () => {
      const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      window.parent.postMessage({ type: FRAME_HEIGHT_MESSAGE, height }, "*");
    };

    send();
    const observer = new ResizeObserver(send);
    observer.observe(document.documentElement);
    window.addEventListener("resize", send);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", send);
    };
  }, [resetKey]);

  return null;
}
