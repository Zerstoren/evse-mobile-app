import React, { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";
// @ts-expect-error: No types
import { Collapse, CollapseBody, CollapseHeader } from "accordion-collapse-react-native";

import { colors } from "../system/styles/colors";
import { Network } from "./components/Network";
import { getItem, StorageKeys } from "../../api/storage";
import { EVSESettings } from "./components/EVSESettings";
import { Tariff } from "./components/Tariff";
import { Application } from "./components/Application";

const styles = StyleSheet.create({
  container: {
    paddingTop: 1,
  },

  collapseHeader: {
    backgroundColor: colors.primary,
    padding: 8,
    marginBottom: 2,
  },

  collapseHeaderTitle: {
    fontSize: 18,
    color: colors.primaryText,
    textAlign: "center",
  },

  collapseContent: {
    padding: 16,
  },
});

export const Settings = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    getItem(StorageKeys.NETWORK_IP).then((ip) => {
      if (!ip) {
        setShowSettings(true);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Collapse isExpanded={!showSettings}>
          <CollapseHeader>
            <View style={styles.collapseHeader}>
              <Text style={styles.collapseHeaderTitle}>
                <Trans>EVSE</Trans>
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseContent}>
            <EVSESettings />
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.collapseHeader}>
              <Text style={styles.collapseHeaderTitle}>
                <Trans>Tariff</Trans>
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseContent}>
            <Tariff />
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.collapseHeader}>
              <Text style={styles.collapseHeaderTitle}>
                <Trans>Application</Trans>
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseContent}>
            <Application />
          </CollapseBody>
        </Collapse>

        <Collapse isExpanded={showSettings}>
          <CollapseHeader>
            <View style={styles.collapseHeader}>
              <Text style={styles.collapseHeaderTitle}>
                <Trans>Network</Trans>
              </Text>
            </View>
          </CollapseHeader>
          <CollapseBody style={styles.collapseContent}>
            <Network />
          </CollapseBody>
        </Collapse>
      </ScrollView>
    </View>
  );
};
