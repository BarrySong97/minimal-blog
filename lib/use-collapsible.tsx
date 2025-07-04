"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

interface UseCollapsibleOptions {
  /**
   * The height of the element when collapsed
   * @defaultValue 200
   */
  collapsedHeight?: number;
}

export function useCollapsible({
  collapsedHeight = 200,
}: UseCollapsibleOptions = {}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setExpanded] = useState(false);
  const [isCollapsible, setCollapsible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onResize = (): void => {
      const height = element.scrollHeight;
      setCollapsible(height > collapsedHeight);
    };

    onResize();
    const observer = new ResizeObserver(onResize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [collapsedHeight]);

  const toggle = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const getContainerProps = useCallback(
    (props: HTMLAttributes<HTMLDivElement> = {}) => {
      return {
        ...props,
        ref,
        style: {
          "--collapsed-height": `${collapsedHeight}px`,
          maxHeight:
            isCollapsible && !isExpanded
              ? "var(--collapsed-height)"
              : undefined,
          ...props.style,
        },
        "data-collapsible": isCollapsible,
        "data-expanded": isExpanded,
        id: `collapsible-${id}`,
      };
    },
    [collapsedHeight, isCollapsible, isExpanded, id]
  );

  return {
    isExpanded,
    isCollapsible,
    toggle,
    getContainerProps,
  };
}

export const Collapsible = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    button: React.ReactNode;
  }
>(({ children, button, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
      {button}
    </div>
  );
});

Collapsible.displayName = "Collapsible";
