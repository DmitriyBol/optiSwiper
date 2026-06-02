import type { CSSProperties, ReactNode } from "react";

export type SlideData = {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export type AutoScrollConfig = {
  /** Enable automatic slide cycling. */
  enabled: boolean;
  /** Milliseconds between automatic slide changes. */
  interval: number;
};

export type NavigationConfig = {
  /** Content for the previous button. Default: "‹" */
  prevLabel?: ReactNode;
  /** Content for the next button. Default: "›" */
  nextLabel?: ReactNode;
  /** Base style applied to both buttons. */
  style?: CSSProperties;
  /** Base class applied to both buttons. */
  className?: string;
  /** Style applied only to the previous button (merges with style). */
  prevStyle?: CSSProperties;
  /** Style applied only to the next button (merges with style). */
  nextStyle?: CSSProperties;
  prevClassName?: string;
  nextClassName?: string;
};

export type PaginationConfig = {
  /** Style for the dots container. */
  style?: CSSProperties;
  className?: string;
  /** Style applied to every dot. */
  dotStyle?: CSSProperties;
  dotClassName?: string;
  /** Additional style applied to the active dot (merged on top of dotStyle). */
  activeDotStyle?: CSSProperties;
  activeDotClassName?: string;
};

export type OptiSwiperProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  trackStyle?: CSSProperties;
  trackClassName?: string;
  analytics?: AnalyticsHandlers;
  /** How many slides to show at once. Each slide fills 1/n of the container. Default: 1. */
  slidesPerView?: number;
  /** Seconds of ≥50% viewport visibility before the viewed-slides event fires. Default: 30. */
  viewedTimeout?: number;
  /** Enable automatic slide cycling. */
  autoScroll?: AutoScrollConfig;
  /** Show prev/next navigation buttons. Pass an empty object `{}` for defaults. */
  navigation?: NavigationConfig;
  /** Show pagination dots below the track. Pass an empty object `{}` for defaults. */
  pagination?: PaginationConfig;
};

export type OptiSlideProps = {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

export type AnalyticsHandlers = {
  onInViewport?: (payload: InViewportPayload) => void;
  onSlide?: (payload: SlidePayload) => void;
  onReachedEnd?: (payload: ReachedEndPayload) => void;
  onViewedSlides?: (payload: ViewedSlidesPayload) => void;
  onNavButtonClick?: (payload: NavigationButtonPayload) => void;
  onPaginationClick?: (payload: PaginationClickPayload) => void;
};

export type InViewportPayload = {
  event: "carousel_in_viewport";
  timestamp: number;
};

export type SlidePayload = {
  event: "carousel_slide";
  direction: "left" | "right";
  fromIndex: number;
  toIndex: number;
  timestamp: number;
};

export type ReachedEndPayload = {
  event: "carousel_reached_end";
  slides: SlideData[];
  timestamp: number;
};

export type ViewedSlidesPayload = {
  event: "carousel_viewed_slides";
  slides: SlideData[];
  viewedSeconds: number;
  timestamp: number;
};

export type NavigationButtonPayload = {
  event: "carousel_nav_button";
  direction: "left" | "right";
  fromIndex: number;
  toIndex: number;
  timestamp: number;
};

export type PaginationClickPayload = {
  event: "carousel_pagination_click";
  fromIndex: number;
  toIndex: number;
  timestamp: number;
};
