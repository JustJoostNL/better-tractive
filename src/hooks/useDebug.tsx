import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface IDebugContext {
  debugState: boolean;
  debugData: IDebugData;
  setDebugData: (data: IDebugData) => void;
  toggleDebug: () => void;
}

interface IDebugData {
  [key: string]: any;
}

interface ISetDebugData {
  key: string;
  value: any;
  condition: boolean;
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

export function useSetDebugData(data: ISetDebugData | ISetDebugData[]) {
  const { setDebugData, debugData } = useDebug();

  useEffect(() => {
    if (Array.isArray(data)) {
      const newData: IDebugData = { ...debugData };

      data.forEach((item) => {
        if (item.condition) {
          newData[item.key] = item.value;
        } else {
          delete newData[item.key];
        }
      });

      setDebugData(newData);
    } else {
      const newData = { ...debugData };

      if (data.condition) {
        newData[data.key] = data.value;
      } else {
        delete newData[data.key];
      }

      setDebugData(newData);
    }
  }, [data, setDebugData, debugData]);
}

export const DebugProvider: FC<IProps> = ({ hotkey = "shift+d", children }) => {
  const [debugState, setDebugState] = useState(false);
  const [debugData, setDebugData] = useState<IDebugData>({});

  const toggleDebug = useCallback(() => {
    setDebugState((prev) => !prev);
  }, []);

  useHotkeys(hotkey, toggleDebug);

  return (
    <DebugContext.Provider
      value={{ debugState, debugData, setDebugData, toggleDebug }}
    >
      {children}
    </DebugContext.Provider>
  );
};
