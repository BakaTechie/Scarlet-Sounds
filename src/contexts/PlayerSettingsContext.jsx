import { createContext, useContext } from 'react';
import useRefStateStorage from '../hooks/useRefStateStorage.js';

// 创建上下文对象
export const PlayerSettingsContext = createContext(null);

// Provider 组件
export function PlayerSettingsProvider({ children }) {
    const [useMirror, , setUseMirror] = useRefStateStorage(false, 'song-use-mirror');

    return (
        <PlayerSettingsContext.Provider value={{ useMirror, setUseMirror }}>
            {children}
        </PlayerSettingsContext.Provider>
    );
}

// 自定义 hook 简化使用
export function usePlayerSettings() {
    return useContext(PlayerSettingsContext);
}
