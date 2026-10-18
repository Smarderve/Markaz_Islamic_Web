import { Navigate } from "react-router";

/** The site root makes its EN default explicit; it never guesses from cookies. */
export default function LanguageEntry() {
  return <Navigate to="/en/" replace />;
}
