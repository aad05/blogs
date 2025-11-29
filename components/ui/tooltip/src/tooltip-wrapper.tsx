"use client";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useState } from "react";

type TooltipWrapperProps = {
  /**
   * The content to display inside the tooltip.
   * Can be a plain string or any React node (e.g., JSX).
   */
  content: string | React.ReactNode;

  /**
   * The element that will trigger the tooltip on hover or focus.
   * Typically a button, icon, or text element.
   */
  children: React.ReactElement;

  /**
   * The preferred side of the trigger where the tooltip should appear.
   * Defaults to "top" if not specified.
   */
  side?: "top" | "bottom" | "left" | "right";

  /**
   * The distance (in pixels) between the trigger and the tooltip.
   * Useful for fine-tuning tooltip positioning.
   */
  sideOffset?: number;

  /**
   * The alignment of the tooltip relative to the trigger.
   * - "start" aligns to the start edge of the trigger.
   * - "center" aligns to the center (default).
   * - "end" aligns to the end edge.
   */
  alignment?: "start" | "center" | "end";

  /**
   * Optional custom class names to style the tooltip parts.
   * - `trigger`: class applied to the trigger element.
   * - `content`: class applied to the tooltip content container.
   */
  classNames?: {
    trigger?: string;
    content?: string;
  };
};

const TooltipWrapper = ({
  content,
  children,
  side = "top",
  sideOffset = 6,
  alignment = "center",
  classNames,
}: TooltipWrapperProps) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const triggerProps = {
    onPointerEnter: () => setEnabled(true),
    onTouchStart: () => setEnabled(true),
  } as const;

  if (!enabled) { 
    return { 
      ...children,
      props: {
        ...children.props!,
        ...triggerProps,
      },
    };
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={cn(classNames?.trigger)}>
         {
          { ...children, props: { ...children?.props!, ...triggerProps } }
        }
        </TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          align={alignment}
          className={cn(
            "bg-[var(--background)] py-0.5 rounded-[6px] border border-solid text-[var(--text-primary)]",
            classNames?.content
          )}
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { TooltipWrapper, type TooltipWrapperProps };
