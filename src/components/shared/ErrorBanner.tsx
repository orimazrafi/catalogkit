import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
  message?: string;
  size?: 'default' | 'small';
}

/** Styled error banner for failed requests or operations. */
export function ErrorBanner({
  message = 'Something went wrong.',
  size = 'default',
}: ErrorBannerProps) {
  return (
    <div
      className={size === 'small' ? styles.bannerSmall : styles.banner}
    >
      {message}
    </div>
  );
}
