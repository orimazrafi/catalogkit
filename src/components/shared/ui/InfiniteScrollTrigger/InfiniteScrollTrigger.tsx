import { useEffect, useRef } from 'react';

import styles from './InfiniteScrollTrigger.module.css';

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
        if (entry?.isIntersecting && enabled) {
          onIntersect();
        }
      },
      { rootMargin: '120px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [enabled, onIntersect]);

  return (
    <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
  );
}
