import type { ReactNode } from 'react';
import styles from './MovieCard.module.css';
import { Link } from 'react-router';

interface ActionButtonProps {
  icon: ReactNode;
  title: string;
  ariaLabel: string;
  onClick?: () => void;
  to?: string;
  className?: string;
  isLink?: boolean;
}

const ActionButton = ({ icon, title, ariaLabel, onClick, to, className = '', isLink = false }: ActionButtonProps) => {
  if (isLink && to) {
    return (
      <Link
        to={to}
        className={`${styles.actionBtn} ${className}`}
        title={title}
        aria-label={ariaLabel}
      >
        {icon}
      </Link>
    );
  }
  return (
    <button
      className={`${styles.actionBtn} ${className}`}
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  );
};

export default ActionButton;
