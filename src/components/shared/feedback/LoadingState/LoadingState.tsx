import { Loader2 } from 'lucide-react';

import styles from './LoadingState.module.css';

interface LoadingStateProps {
  message?: string;
}

/** Full-area loading placeholder with spinner and optional message. */
export function LoadingState({ message = 'Loading…' }: LoadingStateProps) {
  return (
    <div className={styles.container}>
      <Loader2 className={`${styles.icon} spin`} />
      <p>{message}</p>
    </div>
  );
}
