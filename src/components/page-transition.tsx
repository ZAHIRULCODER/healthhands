import { ViewTransition } from "react";

/**
 * Page-level view transition. Place it in each page.tsx, not a layout: layouts
 * persist across navigations, so their enter/exit animations never fire.
 *
 * - nav-forward / nav-back: horizontal slide for list -> detail and back.
 * - nav-lateral: short crossfade between top-level pages.
 * Untyped navigations (browser back/forward, refresh) don't animate.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        "nav-lateral": "nav-lateral",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        "nav-lateral": "nav-lateral",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
