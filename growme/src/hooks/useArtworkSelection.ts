import { useState, useCallback } from 'react';
import type { Artwork } from '../types/artwork';

export interface SelectionState {
    selectedIds: Set<number>;
    deselectedIds: Set<number>;
    bulkCount: number;
}

export const useArtworkSelection = () => {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());
    const [bulkCount, setBulkCount] = useState<number>(0);

    const isSelected = useCallback((id: number, globalIndex: number) => {
        if (deselectedIds.has(id)) return false;
        if (globalIndex < bulkCount) return true;
        return selectedIds.has(id);
    }, [selectedIds, deselectedIds, bulkCount]);

    const toggleRow = useCallback((id: number, globalIndex: number) => {
        let currentlySelected: boolean;
        if (deselectedIds.has(id)) currentlySelected = false;
        else if (globalIndex < bulkCount) currentlySelected = true;
        else currentlySelected = selectedIds.has(id);

        if (currentlySelected) {
            if (globalIndex < bulkCount) {
                setDeselectedIds(prev => {
                    const next = new Set(prev);
                    next.add(id);
                    return next;
                });
                if (selectedIds.has(id)) {
                    setSelectedIds(prev => {
                        const next = new Set(prev);
                        next.delete(id);
                        return next;
                    });
                }
            } else {
                setSelectedIds(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            }
        } else {
            if (globalIndex < bulkCount) {
                setDeselectedIds(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            } else {
                setSelectedIds(prev => {
                    const next = new Set(prev);
                    next.add(id);
                    return next;
                });
            }
        }
    }, [selectedIds, deselectedIds, bulkCount]);

    const togglePage = useCallback((works: Artwork[], pageIndex: number, limit: number, shouldSelect: boolean) => {
        works.forEach((work, i) => {
            const globalIndex = pageIndex * limit + i;
            const willBeSelected = shouldSelect;

            if (willBeSelected) {
                setDeselectedIds(prev => {
                    const next = new Set(prev);
                    if (next.has(work.id)) next.delete(work.id);
                    return next;
                });

                if (globalIndex >= bulkCount) {
                    setSelectedIds(prev => {
                        const next = new Set(prev);
                        if (!next.has(work.id)) next.add(work.id);
                        return next;
                    });
                }
            } else {
                setSelectedIds(prev => {
                    const next = new Set(prev);
                    if (next.has(work.id)) next.delete(work.id);
                    return next;
                });

                if (globalIndex < bulkCount) {
                    setDeselectedIds(prev => {
                        const next = new Set(prev);
                        if (!next.has(work.id)) next.add(work.id);
                        return next;
                    });
                }
            }
        });
    }, [bulkCount]);

    const selectBulk = useCallback((n: number) => {
        setBulkCount(n);
        setSelectedIds(new Set());
        setDeselectedIds(new Set());
    }, []);

    return {
        isSelected,
        toggleRow,
        togglePage,
        selectBulk,
        bulkCount,
        computeSelectedOnPage: (works: Artwork[], pageIndex: number, limit: number) => {
            return works.filter((w, i) => isSelected(w.id, pageIndex * limit + i));
        },
        totalSelectedCount: bulkCount - deselectedIds.size + selectedIds.size
    };
};
