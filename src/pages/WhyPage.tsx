import { Navigate } from "react-router-dom";

/** Legacy path, content lives on About Us. */
export function WhyPage() {
  return <Navigate to="/about" replace />;
}
