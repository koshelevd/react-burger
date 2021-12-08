import { useCallback, useRef, useState, RefObject } from 'react';
import { IUseTopType } from '../utils/types';

export const useTopType = (
  items: Array<RefObject<HTMLElement>>,
): IUseTopType => {
  const listRef = useRef<HTMLDivElement>(null);
  const [topType, setTopType] = useState<string>('bun');

  const onScroll = useCallback(() => {
    const listTop = (listRef.current as HTMLElement)?.getBoundingClientRect().top;   
    let id = '';
    let minDiff = Number.MAX_VALUE;
    for (let item of items) {
      const diff = Math.abs(
        (item.current as HTMLElement)?.getBoundingClientRect().top - listTop,
      );
      if (diff >= 0 && minDiff > diff) {
        minDiff = diff;
        id = (item.current as HTMLElement)?.id;
      }
    }
    if (id && id !== topType) setTopType(id);
  }, [items, topType]);

  return { listRef, onScroll, topType };
};
