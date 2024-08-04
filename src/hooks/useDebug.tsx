import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface IDebugContext {
  debugState: boolean;
  debugData: IDebugData;
  setDebugData: (data: IDebugData) => void;
  updateDebugData: (key: string, value: any) => void;
  toggleDebug: () => void;
}

interface IDebugData {
  [key: string]: any;
}

interface IProps {
  hotkey?: string;
  children: ReactNode;
}

const DebugContext = createContext<IDebugContext | undefined>(undefined);

export function useDebug() {
  const context = useContext(DebugContext);

  if (context === undefined) {
    throw new Error("useDebug must be used within a DebugProvider");
  }

  return context;
}

export const DebugProvider: FC<IProps> = ({ hotkey = "shift+d", children }) => {
  const [debugState, setDebugState] = useState(false);
  const [debugData, setDebugData] = useState<IDebugData>({});

  const toggleDebug = useCallback(() => {
    setDebugState((prev) => !prev);
  }, []);

  const updateDebugData = useCallback((key: string, value: any) => {
    setDebugData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useHotkeys(hotkey, toggleDebug);

  return (
    <DebugContext.Provider
      value={{
        debugState,
        debugData,
        setDebugData,
        toggleDebug,
        updateDebugData,
      }}
    >
      {children}
    </DebugContext.Provider>
  );
};
