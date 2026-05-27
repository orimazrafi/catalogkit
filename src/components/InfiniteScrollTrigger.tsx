import { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  /** Called when the sentinel scrolls into view (e.g. fetch next page). */
  onIntersect: () => void;
  /** When false, intersection is ignored — use while loading or when there are no more pages. */
  enabled: boolean;
}

/**
 * Invisible sentinel placed at the bottom of a list.
 * Uses IntersectionObserver to detect when the user scrolls near the end
 * and triggers pagination without scroll-event listeners.
 */
export function InfiniteScrollTrigger({
  onIntersect,
  enabled,
}: InfiniteScrollTriggerProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Only fire when visible and parent allows loading (avoids duplicate fetches).
        if (entry?.isIntersecting && enabled) {
          onIntersect();
        }
      },
      // Preload the next page slightly before the sentinel is fully on screen.
      { rootMargin: '120px' },
    );

    // Start watching the sentinel: when it enters the viewport, the callback above runs.
    observer.observe(element);

    // Disconnect on unmount or when deps change so we never leak observers.
    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  // Zero-UI anchor element observed by IntersectionObserver.
  return (
    <div
      ref={sentinelRef}
      className="flex h-16 w-full items-center justify-center"
      aria-hidden
    />
  );
}
