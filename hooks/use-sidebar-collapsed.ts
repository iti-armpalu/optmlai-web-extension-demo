import { useEffect, useState } from "react";

export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Select the correct sidebar element
    const el = document.querySelector(
      "[data-slot='sidebar']"
    ) as HTMLElement | null;

    console.log("🎯 Found sidebar element:", el);

    if (!el) return;

    const updateState = () => {
      const mode = el.getAttribute("data-collapsible");
      const state = el.getAttribute("data-state");

      console.log("📢 data-collapsible =", mode);
      console.log("📢 data-state =", state);

      const isCollapsed = mode === "icon" || state === "collapsed";

      console.log("📦 collapsed =", isCollapsed);

      setCollapsed(isCollapsed);
    };

    // Initial read
    updateState();

    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      console.log("🔄 Mutation detected:", mutations);
      updateState();
    });

    observer.observe(el, {
      attributes: true,
      attributeFilter: ["data-collapsible", "data-state"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return collapsed;
}
