import {
  buildInViewportPayload,
  buildNavButtonPayload,
  buildPaginationClickPayload,
  buildReachedEndPayload,
  buildSlidePayload,
  buildViewedSlidesPayload,
  mergeHandlers,
} from "./analytics";

describe("payload builders", () => {
  beforeEach(() => jest.useFakeTimers().setSystemTime(1_000_000));
  afterEach(() => jest.useRealTimers());

  it("buildInViewportPayload returns correct shape", () => {
    expect(buildInViewportPayload()).toEqual({
      event: "carousel_in_viewport",
      timestamp: 1_000_000,
    });
  });

  it("buildSlidePayload returns correct shape", () => {
    expect(buildSlidePayload("right", 0, 1)).toEqual({
      event: "carousel_slide",
      direction: "right",
      fromIndex: 0,
      toIndex: 1,
      timestamp: 1_000_000,
    });
  });

  it("buildReachedEndPayload includes all slides", () => {
    const slides = [
      { index: 0, data: { id: 1 } },
      { index: 1, data: { id: 2 } },
    ];
    const p = buildReachedEndPayload(slides);
    expect(p.event).toBe("carousel_reached_end");
    expect(p.slides).toHaveLength(2);
    expect(p.timestamp).toBe(1_000_000);
  });

  it("buildViewedSlidesPayload includes slides and elapsed time", () => {
    const p = buildViewedSlidesPayload([{ index: 0, data: null }], 30);
    expect(p.event).toBe("carousel_viewed_slides");
    expect(p.viewedSeconds).toBe(30);
    expect(p.slides).toHaveLength(1);
  });

  it("buildNavButtonPayload returns correct shape", () => {
    expect(buildNavButtonPayload("right", 1, 2)).toEqual({
      event: "carousel_nav_button",
      direction: "right",
      fromIndex: 1,
      toIndex: 2,
      timestamp: 1_000_000,
    });
  });

  it("buildPaginationClickPayload returns correct shape", () => {
    expect(buildPaginationClickPayload(0, 3)).toEqual({
      event: "carousel_pagination_click",
      fromIndex: 0,
      toIndex: 3,
      timestamp: 1_000_000,
    });
  });
});

describe("mergeHandlers", () => {
  it("falls back to default console handlers when none provided", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const handlers = mergeHandlers();
    handlers.onInViewport(buildInViewportPayload());
    expect(spy).toHaveBeenCalledWith(
      "[OptiSwiper] carousel_in_viewport",
      expect.any(Object),
    );
    spy.mockRestore();
  });

  it("uses custom onSlide handler and skips default", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const customFn = jest.fn();
    const handlers = mergeHandlers({ onSlide: customFn });
    handlers.onSlide(buildSlidePayload("left", 1, 0));
    expect(customFn).toHaveBeenCalledTimes(1);
    expect(customFn.mock.calls[0][0].direction).toBe("left");
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("merges partial handlers — provided ones override, rest stay default", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const onSlide = jest.fn();
    const handlers = mergeHandlers({ onSlide });
    handlers.onInViewport(buildInViewportPayload());
    handlers.onSlide(buildSlidePayload("right", 0, 1));
    expect(spy).toHaveBeenCalledTimes(1); // only onInViewport used default
    expect(onSlide).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("uses custom onNavButtonClick handler", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const onNavButtonClick = jest.fn();
    const handlers = mergeHandlers({ onNavButtonClick });
    handlers.onNavButtonClick(buildNavButtonPayload("right", 0, 1));
    expect(onNavButtonClick).toHaveBeenCalledTimes(1);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("uses custom onPaginationClick handler", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const onPaginationClick = jest.fn();
    const handlers = mergeHandlers({ onPaginationClick });
    handlers.onPaginationClick(buildPaginationClickPayload(0, 3));
    expect(onPaginationClick).toHaveBeenCalledTimes(1);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("default onNavButtonClick logs to console", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    mergeHandlers().onNavButtonClick(buildNavButtonPayload("left", 2, 1));
    expect(spy).toHaveBeenCalledWith(
      "[OptiSwiper] carousel_nav_button",
      expect.objectContaining({ event: "carousel_nav_button" }),
    );
    spy.mockRestore();
  });

  it("default onPaginationClick logs to console", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    mergeHandlers().onPaginationClick(buildPaginationClickPayload(1, 4));
    expect(spy).toHaveBeenCalledWith(
      "[OptiSwiper] carousel_pagination_click",
      expect.objectContaining({ event: "carousel_pagination_click" }),
    );
    spy.mockRestore();
  });
});
