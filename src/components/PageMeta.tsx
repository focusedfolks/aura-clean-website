import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoForPath } from "../data/site";
import { applyPageMeta } from "../lib/page-meta";

export function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    applyPageMeta(seoForPath(pathname));
  }, [pathname]);

  return null;
}
