// hooks/useDocumentTitle.ts
import { useEffect } from "react";

interface Options {
  prefix?: string;
  suffix?: string;
  defaultTitle?: string;
}

export default function useDocumentTitle(
  title?: string,
  favicon?: string,
  options?: Options
) {
  useEffect(() => {
    // Format title
    if (!title) return;
    const prefix = options?.prefix ? `${options.prefix} - ` : "";
    const suffix = options?.suffix ? ` - ${options.suffix}` : "";
    document.title = `${prefix}${
      title || options?.defaultTitle || "App"
    }${suffix}`;

    // Set favicon
    if (favicon) {
      const existingLink = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement;
      if (existingLink) {
        existingLink.href = favicon;
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = favicon;
        document.head.appendChild(link);
      }
    }
  }, [title, favicon, options]);
}
