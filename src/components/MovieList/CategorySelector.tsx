import React from 'react';
import styles from './CategorySelector.module.css';

import {
  NOW_PLAYING_LABEL,
  POPULAR_LABEL,
  TOP_RATED_LABEL,
  UPCOMING_LABEL
} from '../../constants/textKey';

const categories = [
  { label: NOW_PLAYING_LABEL, value: 'now_playing' },
  { label: POPULAR_LABEL, value: 'popular' },
  { label: TOP_RATED_LABEL, value: 'top_rated' },
  { label: UPCOMING_LABEL, value: 'upcoming' },
];

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const CategorySelector = ({ selected, onChange }: Props) => {
    return (
        <div className={styles.container}>
            {categories.map((cat) => (
                <button
                    key={cat.value}
                    onClick={() => onChange(cat.value)}
                    className={`${styles.button} ${selected === cat.value ? styles.selected : ''}`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    );
};

export default CategorySelector;
