import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { store } from "../store/configuredStore";

export const ReduxContext: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
