'use client';

import { useEffect, useRef } from "react";

type Props = {
  css: string;
  html: string;
  script: string;
};

export default function LegacyPage({ css, html, script }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !script.trim()) return;

    const controller = new AbortController();
    const { signal } = controller;

    // Patch addEventListener so page scripts can be cleaned up on unmount.
    const originalAdd = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (options === undefined) {
        return originalAdd.call(this, type, listener, { signal });
      }
      if (typeof options === "boolean") {
        return originalAdd.call(this, type, listener, { capture: options, signal });
      }
      return originalAdd.call(this, type, listener, { ...options, signal });
    };

    try {
      // eslint-disable-next-line no-new-func
      const run = new Function(script);
      run();
    } finally {
      EventTarget.prototype.addEventListener = originalAdd;
    }

    return () => controller.abort();
  }, [script]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
