import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((prevValue: T | null) => T)) => void;

function useLocalStorage<T>(key: string, initialValue?: T): [T | null, SetValue<T>] {
    const [value, setValue] = useState<T | null>(null);

    // Load from localStorage after mount (client-side only)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            try {
                setValue(JSON.parse(storedValue));
            } catch {
                setValue(storedValue as unknown as T);
            }
        } else if (initialValue !== undefined) {
            setValue(initialValue);
            localStorage.setItem(key, JSON.stringify(initialValue));
        }
    }, [key, initialValue]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setValue(event.newValue ? JSON.parse(event.newValue) : null);
            }
        };

        const handleManualChange = () => {
            const newValue = localStorage.getItem(key);
            setValue(newValue ? JSON.parse(newValue) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('localStorageChange', handleManualChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('localStorageChange', handleManualChange);
        };
    }, [key]);

    const setStoredValue: SetValue<T> = (newValue) => {
        if (typeof window === 'undefined') return;

        const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
        setValue(valueToStore);
        localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new Event('localStorageChange'));
    };

    return [value, setStoredValue] as const;
}

export default useLocalStorage;

// import { useState, useEffect } from 'react';

// type SetValue<T> = (value: T | ((prevValue: T | null) => T)) => void;

// function useLocalStorage<T>(key: string, initialValue?: T): [T | null, SetValue<T>] {
//     // Initialize state from localStorage or fallback to initialValue
//     const [value, setValue] = useState<T | null>(() => {
//         const storedValue = localStorage.getItem(key);
//         return storedValue !== null ? JSON.parse(storedValue) : initialValue ?? null;
//     });

//     useEffect(() => {
//         const handleStorageChange = (event: StorageEvent) => {
//             if (event.key === key) {
//                 setValue(event.newValue ? JSON.parse(event.newValue) : null);
//             }
//         };

//         const handleManualChange = () => {
//             const newValue = localStorage.getItem(key);
//             setValue(newValue ? JSON.parse(newValue) : null);
//         };

//         window.addEventListener('storage', handleStorageChange);
//         window.addEventListener('localStorageChange', handleManualChange);

//         return () => {
//             window.removeEventListener('storage', handleStorageChange);
//             window.removeEventListener('localStorageChange', handleManualChange);
//         };
//     }, [key]);

//     const setStoredValue: SetValue<T> = (newValue) => {
//         const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
//         setValue(valueToStore);
//         localStorage.setItem(key, JSON.stringify(valueToStore));
//         window.dispatchEvent(new Event('localStorageChange')); // Trigger event for same-tab updates
//     };

//     return [value, setStoredValue] as const;
// }

// export default useLocalStorage;
