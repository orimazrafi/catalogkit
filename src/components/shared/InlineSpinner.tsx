import { Loader2 } from 'lucide-react';
import styles from './InlineSpinner.module.css';

/** Compact centered spinner for secondary or in-progress loads. */
export function InlineSpinner() {
  return (
    <div className={styles.container}>
      <Loader2 className={`${styles.icon} spin`} />
    </div>
  );
}
