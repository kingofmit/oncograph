import React, { createContext, useContext, useMemo } from "react";

export interface OncoGraphConfig {
  apiBaseUrl: string;
}

const OncoGraphContext = createContext<OncoGraphConfig>({
  apiBaseUrl: "http://localhost:3737",
});

export function OncoGraphProvider({
  apiBaseUrl,
  children,
}: {
  apiBaseUrl?: string;
  children: React.ReactNode;
}) {
  const config = useMemo(
    () => ({ apiBaseUrl: apiBaseUrl ?? "http://localhost:3737" }),
    [apiBaseUrl],
  );
  return (
    <OncoGraphContext.Provider value={config}>
      {children}
    </OncoGraphContext.Provider>
  );
}

export function useOncoGraphConfig(): OncoGraphConfig {
  return useContext(OncoGraphContext);
}
