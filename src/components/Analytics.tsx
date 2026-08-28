import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

let scriptInjected = false;

function ensureGtag(measurementId: string) {
  if (scriptInjected) return;
  scriptInjected = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/** Fires GA4 page_view on every client route when VITE_GA_MEASUREMENT_ID is set. */
export function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!GA_ID) return;
    ensureGtag(GA_ID);
    window.gtag?.("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
