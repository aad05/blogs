import {
  ElementType,
  useCallback,
  useMemo,
  type ButtonHTMLAttributes,
} from "react";

export type ButtonVariants =
  | "default"
  | "destructive"
  | "destructive-outline"
  | "destructive-ghost"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

// Move to a more maintainable object instead of enum
export const BUTTON_VARIANTS = {
  default:
    "bg-[var(--button-background-base)] shadow-button-custom text-white hover:bg-[var(--button-background-hover)] rounded-[8px] transition-colors transition-shadow duration-200 active:bg-[var(--button-background-active)]",
  destructive:
    "bg-[var(--button-destructive-background-base)] text-white shadow-xs hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-[var(--button-destructive-background-active)] active:bg-[var(--button-destructive-background-active)]",
  "destructive-outline":
    "border border-[var(--button-destructive-background-base)] bg-transparent text-destructive hover:text-white shadow-xs hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-[var(--button-destructive-background-base)] dark:focus-visible:ring-[var(--button-destructive-background-base)] active:bg-[var(--button-destructive-background-active)]",
  "destructive-ghost":
    "border-none bg-transparent text-destructive hover:text-white hover:bg-[var(--button-destructive-background-hover)] focus-visible:ring-[var(--button-destructive-background-hover)] dark:focus-visible:ring-destructive/40 dark:bg-transparent active:bg-[var(--button-destructive-background-active)] dark:hover:bg-[var(--button-destructive-background-hover)]/20 dark:hover:text-[var(--button-destructive-background-hover)]",
  outline:
    "border bg-[var(--layer-01)] shadow-xs hover:bg-[var(--background-hover)] hover:text-accent-foreground",
  secondary:
    "bg-[var(--button-secondary-background-base)] text-white hover:bg-[var(--button-secondary-background-hover)] active:bg-[var(--button-secondary-background-active)]",
  ghost:
    "hover:bg-[var(--background-hover)] hover:text-accent-foreground dark:hover:bg-[var(--background-hover)]",
  link: "text-[var(--text-primary)] underline-offset-4 hover:underline",
} as const;

export const BUTTON_SIZES = {
  xs: "h-5 rounded-md gap-1.5 p-1 has-[>svg]:px-1.5 text-xs",
  sm: "h-6.5 rounded-md gap-1.5 p-1 has-[>svg]:px-1.5",
  md: "h-8 p-1 has-[>svg]:px-2",
  lg: "h-10 rounded-md px-1 has-[>svg]:px-3 p-1",
  icon: "size-6.5 p-0",
} as const;

export const ICON_BUTTON_SIZES = {
  xs: "size-5 p-0",
  sm: "size-6.5 p-0",
  md: "size-8 p-0",
  lg: "size-10 p-0",
  icon: "size-6.5 p-0",
} as const;

export type PropGetter<T = Record<string, any>> = (props?: T) => T;
export type SlotsToClasses<T extends string> = Partial<Record<T, string>>;

export type UseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.RefObject<HTMLButtonElement>;
  /**
   * The visual style variant of the button.
   * @default "default"
   */
  variant?: ButtonVariants;

  /**
   * The size of the button, affecting padding, height, and font size.
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * If true, the button will render as a child of another component
   * (e.g., for use with Radix UI's `asChild` pattern or React Router's Link).
   * @default false
   */
  asChild?: boolean;

  /**
   * React node to render before the button content (e.g., an icon or avatar).
   * Will be wrapped with prepend slot classes if provided via classNames.
   */
  prepend?: React.ReactNode;

  /**
   * React node to render after the button content (e.g., an icon, badge, or arrow).
   * Will be wrapped with append slot classes if provided via classNames.
   */
  append?: React.ReactNode;

  /**
   * Accessible description for the button, primarily used for screen readers
   * when the button is icon-only or needs additional context.
   * Shows as tooltip content when `hasIconOnly` or `withBadge` is true.
   */
  iconDescription?: React.ReactNode;

  /**
   * Horizontal alignment of the tooltip content relative to the button.
   * Only applies when tooltip is shown (icon-only or badge buttons).
   * @default "center"
   */
  tooltipAlignment?: "start" | "center" | "end";

  /**
   * Position of the tooltip relative to the button.
   * Only applies when tooltip is shown (icon-only or badge buttons).
   * @default "top"
   */
  tooltipPosition?: "top" | "bottom" | "left" | "right";

  /**
   * Whether the button is in a loading state.
   * When true, disables the button and shows loading indicator.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Content to display when the button is in loading state.
   * Replaces the button's children content while loading.
   * @default "Loading..."
   */
  loadingContent?: React.ReactNode;

  /**
   * Custom loading indicator to show when `isLoading` is true.
   * If not provided, defaults to a spinning Loader icon.
   */
  loadingIndicator?: React.ReactNode;

  /**
   * Whether the button should be disabled.
   * When combined with `isLoading`, the button remains disabled.
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Whether to show a notification badge on the button.
   * When true, displays a bell icon with a badge indicator.
   * @default false
   */
  withBadge?: boolean;

  /**
   * Whether the button contains only an icon with no text.
   * When true, automatically applies icon size and shows tooltip.
   * @default false
   */
  hasIconOnly?: boolean;

  /**
   * Number to display inside the badge when `withBadge` is true.
   * If not provided, badge will be shown without a count.
   */
  badgeCount?: number;

  /**
   * The component or HTML element to render as.
   * Useful for polymorphic components (e.g., render as 'a', 'div', etc.).
   * @default "button"
   */
  as?: ElementType;

  /**
   * Object containing className overrides for different button slots.
   * Allows fine-grained styling control over button parts.
   *
   * @example
   * ```tsx
   * classNames={{
   *   base: "my-button-base",
   *   content: "my-button-text",
   *   prepend: "my-prepend-icon",
   *   append: "my-append-icon",
   *   loader: "my-loading-spinner"
   * }}
   * ```
   */
  classNames?: SlotsToClasses<
    "base" | "content" | "prepend" | "append" | "loader"
  >;
};

const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer";

export const useButton = (props: UseButtonProps) => {
  const {
    variant = "default",
    size = "md",
    isLoading = false,
    loadingContent = "Loading...",
    loadingIndicator,
    isDisabled = false,
    withBadge = false,
    hasIconOnly = false,
    className,
    as,
    classNames,
    badgeCount,
    ...otherProps
  } = props;

  const Component = as || "button";
  const disabled = isLoading || isDisabled;

  // Auto-detect icon size if hasIconOnly is true
  const finalSize = hasIconOnly ? ICON_BUTTON_SIZES[size] : size;

  const slots = useMemo(() => {
    const baseClasses = [
      BASE_STYLES,
      BUTTON_VARIANTS[variant],
      hasIconOnly ? ICON_BUTTON_SIZES[size] : BUTTON_SIZES[size],
      withBadge && "relative",
      className,
      classNames?.base,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      base: baseClasses,
      content: [classNames?.content].filter(Boolean).join(" "),
      prepend: [classNames?.prepend].filter(Boolean).join(" "),
      append: [classNames?.append].filter(Boolean).join(" "),
      loader: ["animate-spin", classNames?.loader].filter(Boolean).join(" "),
    };
  }, [variant, finalSize, withBadge, className, classNames]);

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => ({
      ref: props.ref,
      "data-slot": "base",
      "data-variant": variant,
      "data-size": finalSize,
      "data-disabled": disabled || undefined,
      "data-loading": isLoading || undefined,
      "data-with-badge": withBadge || undefined,
      "data-has-icon-only": hasIconOnly || undefined,
      className: slots?.base,
      disabled,
      type: otherProps.type || "button", // Default to button type
      ...otherProps,
      ...props,
    }),
    [
      slots.base,
      variant,
      finalSize,
      disabled,
      isLoading,
      withBadge,
      hasIconOnly,
      otherProps,
      props,
    ]
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "content",
      className: slots.content,
      ...props,
    }),
    [slots.content]
  );

  const getPrependProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "prepend",
      className: slots.prepend,
      ...props,
    }),
    [slots.prepend]
  );

  const getAppendProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "append",
      className: slots.append,
      ...props,
    }),
    [slots.append]
  );

  const getLoaderProps = useCallback<PropGetter>(
    (props = {}) => ({
      "data-slot": "loader",
      className: slots.loader,
      ...props,
    }),
    [slots.loader]
  );

  return {
    Component,
    disabled,
    isLoading,
    withBadge,
    hasIconOnly,
    variant,
    size: finalSize,
    badgeCount,
    loadingContent,
    loadingIndicator,
    slots,
    getBaseProps,
    getContentProps,
    getPrependProps,
    getAppendProps,
    getLoaderProps,
  };
};
