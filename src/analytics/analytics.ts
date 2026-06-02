import type {
  AnalyticsHandlers,
  InViewportPayload,
  NavigationButtonPayload,
  PaginationClickPayload,
  ReachedEndPayload,
  SlideData,
  SlidePayload,
  ViewedSlidesPayload,
} from "../types";

type ResolvedHandlers = Required<AnalyticsHandlers>;

const defaultHandlers: ResolvedHandlers = {
  onInViewport(payload: InViewportPayload) {
    console.log("[OptiSwiper] carousel_in_viewport", payload);
  },
  onSlide(payload: SlidePayload) {
    console.log("[OptiSwiper] carousel_slide", payload);
  },
  onReachedEnd(payload: ReachedEndPayload) {
    console.log("[OptiSwiper] carousel_reached_end", payload);
  },
  onViewedSlides(payload: ViewedSlidesPayload) {
    console.log("[OptiSwiper] carousel_viewed_slides", payload);
  },
  onNavButtonClick(payload: NavigationButtonPayload) {
    console.log("[OptiSwiper] carousel_nav_button", payload);
  },
  onPaginationClick(payload: PaginationClickPayload) {
    console.log("[OptiSwiper] carousel_pagination_click", payload);
  },
};

export function mergeHandlers(custom?: AnalyticsHandlers): ResolvedHandlers {
  return {
    onInViewport: custom?.onInViewport ?? defaultHandlers.onInViewport,
    onSlide: custom?.onSlide ?? defaultHandlers.onSlide,
    onReachedEnd: custom?.onReachedEnd ?? defaultHandlers.onReachedEnd,
    onViewedSlides: custom?.onViewedSlides ?? defaultHandlers.onViewedSlides,
    onNavButtonClick:
      custom?.onNavButtonClick ?? defaultHandlers.onNavButtonClick,
    onPaginationClick:
      custom?.onPaginationClick ?? defaultHandlers.onPaginationClick,
  };
}

export function buildInViewportPayload(): InViewportPayload {
  return { event: "carousel_in_viewport", timestamp: Date.now() };
}

export function buildSlidePayload(
  direction: "left" | "right",
  fromIndex: number,
  toIndex: number,
): SlidePayload {
  return {
    event: "carousel_slide",
    direction,
    fromIndex,
    toIndex,
    timestamp: Date.now(),
  };
}

export function buildReachedEndPayload(slides: SlideData[]): ReachedEndPayload {
  return { event: "carousel_reached_end", slides, timestamp: Date.now() };
}

export function buildViewedSlidesPayload(
  slides: SlideData[],
  viewedSeconds: number,
): ViewedSlidesPayload {
  return {
    event: "carousel_viewed_slides",
    slides,
    viewedSeconds,
    timestamp: Date.now(),
  };
}

export function buildNavButtonPayload(
  direction: "left" | "right",
  fromIndex: number,
  toIndex: number,
): NavigationButtonPayload {
  return {
    event: "carousel_nav_button",
    direction,
    fromIndex,
    toIndex,
    timestamp: Date.now(),
  };
}

export function buildPaginationClickPayload(
  fromIndex: number,
  toIndex: number,
): PaginationClickPayload {
  return {
    event: "carousel_pagination_click",
    fromIndex,
    toIndex,
    timestamp: Date.now(),
  };
}
