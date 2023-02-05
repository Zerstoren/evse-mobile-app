import React, { FC, PropsWithChildren } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useLoadDataFromStore } from "./hooks/useLoadDataFromStore";

export const Tab = createMaterialTopTabNavigator();

export enum TabNames {
  SystemState = "State",
  Statistic = "Statistic",
  Adjustment = "Adjustment",
  Limits = "Limits",
  Schedule = "Schedule",
  Settings = "Settings",
}

export const Navigation: FC<PropsWithChildren> = ({ children }) => {
  useLoadDataFromStore(TabNames.Settings);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarItemStyle: { marginTop: 28 },
        tabBarIcon: ({ focused }) => {
          const color = "#3071A9";
          const size = 24;

          switch (route.name) {
            case TabNames.SystemState:
              return (
                <Ionicons
                  name={focused ? "information-circle" : "information-circle-outline"}
                  size={size}
                  color={color}
                />
              );

            case TabNames.Statistic:
              return (
                <Ionicons name={focused ? "md-stats-chart" : "md-stats-chart-outline"} size={size} color={color} />
              );

            case TabNames.Adjustment:
              return <Ionicons name={focused ? "aperture" : "aperture-outline"} size={size} color={color} />;

            case TabNames.Limits:
              return <Ionicons name={focused ? "bonfire" : "bonfire-outline"} size={size} color={color} />;

            case TabNames.Schedule:
              return <Ionicons name={focused ? "timer" : "timer-outline"} size={size} color={color} />;

            case TabNames.Settings:
              return <Ionicons name={focused ? "settings" : "settings-outline"} size={size} color={color} />;

            default:
              return <Ionicons name="add" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#3071A9",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {children}
    </Tab.Navigator>
  );
};
