import React from 'react';
import styles from './CategorySelector.module.css';

const categories = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
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
