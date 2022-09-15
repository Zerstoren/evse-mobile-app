import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import "./src/i18n";
import { store } from "./src/store/configuredStore";
import { Navigation, Tab, TabNames } from "./src/components/system/Navigation";
import { SystemState } from "./src/components/SystemState/SystemState";
import { Adjustment } from "./src/components/Adjustment/Adjustment";
import { Limits } from "./src/components/Limits/Limits";
import { Statistic } from "./src/components/Statistic/Statistic";
import { Settings } from "./src/components/Settings/Settings";
import { Schedule } from "./src/components/Schedule/Schedule";
import { useFetchData } from "./src/api/fetchData";

import "./src/background";

export default function App() {
  const { t } = useTranslation();
  useFetchData();

  const translate = {
    [TabNames.SystemState]: t("State"),
    [TabNames.Statistic]: t("Statistic"),
    [TabNames.Adjustment]: t("Adjustment"),
    [TabNames.Limits]: t("Limits"),
    [TabNames.Schedule]: t("Schedule"),
    [TabNames.Settings]: t("Settings"),
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation>
          <Tab.Screen name={translate[TabNames.SystemState]} component={SystemState} />
          <Tab.Screen name={translate[TabNames.Limits]} component={Limits} />
          <Tab.Screen name={translate[TabNames.Schedule]} component={Schedule} />
          <Tab.Screen name={translate[TabNames.Adjustment]} component={Adjustment} />
          <Tab.Screen name={translate[TabNames.Statistic]} component={Statistic} />
          <Tab.Screen name={translate[TabNames.Settings]} component={Settings} />
        </Navigation>
      </NavigationContainer>
    </Provider>
  );
}
