import React, { createContext, useContext, useState, ReactNode } from 'react';

// 定义 Context 类型
interface IsPlayingContextType {
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}

// 创建一个带类型的 Context
const IsPlayingContext = createContext<IsPlayingContextType | undefined>(undefined);

// 创建一个 Provider 组件来提供状态和修改方法
interface IsPlayingProviderProps {
  children: ReactNode;
}

export const IsPlayingProvider: React.FC<IsPlayingProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <IsPlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </IsPlayingContext.Provider>
  );
};

// 自定义 Hook 来简化获取 Context 的过程
export const useIsPlaying = (): IsPlayingContextType => {
  const context = useContext(IsPlayingContext);
  if (!context) {
    throw new Error('useIsPlaying must be used within an IsPlayingProvider');
  }
  return context;
};
