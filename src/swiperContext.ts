import { createContext, useContext } from "react";

export type SwiperContextType = {
  /** Width of one slide in px, computed from container / slidesPerView. */
  slideWidth: number;
  /** Current active slide index (reactive — triggers re-renders). */
  currentIndex: number;
  /** Maximum scrollable index = slideCount − slidesPerView. */
  maxIndex: number;
  /** Navigate to a specific index. Called by Navigation and Pagination components. */
  goToIndex: (index: number, source: "button" | "pagination") => void;
};

export const SwiperContext = createContext<SwiperContextType>({
  slideWidth: 0,
  currentIndex: 0,
  maxIndex: 0,
  goToIndex: () => {},
});

export const useSwiperContext = () => useContext(SwiperContext);
