// ============================================================================
// BUTTON GROUP COMPONENT
// ============================================================================

import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button group variants for organized layouts
 */
const buttonGroupVariants = cva("inline-flex", {
    variants: {
        orientation: {
            horizontal: "flex-row",
            vertical: "flex-col",
        },
        spacing: {
            none: "gap-0",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-4",
            xl: "gap-6",
        },
        attached: {
            true: "gap-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:border-l-0",
            false: "",
        },
        fullWidth: {
            true: "w-full [&>*]:flex-1",
            false: "w-auto",
        },
    },
    defaultVariants: {
        orientation: "horizontal",
        spacing: "sm",
        attached: false,
        fullWidth: false,
    },
});

/**
 * Button group component props
 */
type ButtonGroupProps = React.ComponentProps<"div"> &
    VariantProps<typeof buttonGroupVariants>;

/**
 * ButtonGroup component for organizing related buttons
 * Supports attached mode for segmented controls
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
    ({ className, orientation, spacing, attached, fullWidth, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                buttonGroupVariants({
                    orientation,
                    spacing: attached ? "none" : spacing,
                    attached,
                    fullWidth,
                    className,
                })
            )}
            {...props}
        />
    )
);

ButtonGroup.displayName = "Strive.ButtonGroup";

export { ButtonGroup, type ButtonGroupProps, buttonGroupVariants };
