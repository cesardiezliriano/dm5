

import { useState, useEffect, useCallback } from 'react';
import { HistoryItem } from '../types';

const HISTORY_STORAGE_KEY = 'creativeHistory';
const MAX_HISTORY_ITEMS = 5;

export const useHistoryStorage = (): [
    HistoryItem[], 
    (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void, 
    () => void
] => {
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
            if (storedHistory) {
                setHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to load history from localStorage:", error);
            localStorage.removeItem(HISTORY_STORAGE_KEY);
        }
    }, []);

    const addHistoryItem = useCallback((newItemData: Omit<HistoryItem, 'id' | 'timestamp'>) => {
        setHistory(prevHistory => {
            const newHistoryItem: HistoryItem = {
                ...newItemData,
                id: `hist-${Date.now()}`,
                timestamp: Date.now(),
            };
            
            // Avoid adding exact duplicates of the most recent item
            if (prevHistory.length > 0) {
              const latestItem = prevHistory[0];
              const isDuplicate = 
                latestItem.platform === newHistoryItem.platform &&
                latestItem.formatId === newHistoryItem.formatId &&
                latestItem.creativeIdea === newHistoryItem.creativeIdea &&
                latestItem.campaignObjective === newHistoryItem.campaignObjective &&
                latestItem.inclusions === newHistoryItem.inclusions &&
                latestItem.exclusions === newHistoryItem.exclusions;

              if (isDuplicate) return prevHistory;
            }

            const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
            
            try {
                localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
            } catch (error) {
                console.error("Failed to save history to localStorage:", error);
            }
            return updatedHistory;
        });
    }, []);

    const clearHistory = useCallback(() => {
        setHistory([]);
        try {
            localStorage.removeItem(HISTORY_STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear history from localStorage:", error);
        }
    }, []);

    return [history, addHistoryItem, clearHistory];
};
