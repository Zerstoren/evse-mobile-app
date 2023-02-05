import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";

import { checkStatus } from "../../../api/fetchData";
import { colors } from "../../system/styles/colors";
import { getItem, setItem, StorageKeys } from "../../../api/storage";
import { useOnAutoSearch } from "../../system/helpers/autoSearchBox";
import { AppButton } from "../../system/AppButton";

const styles = StyleSheet.create({
  boxAddressTextInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
  },

  boxAddressCheck: {
    padding: 8,
    textAlign: "center",
    color: colors.success,
  },

  boxAddressCheckFailed: {
    color: colors.error,
  },

  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export const Network = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<boolean | null>(null);
  const [address, setAddress] = useState<string>("");
  const [showButtonForSearch, setShowButtonForSearch] = useState<boolean>(false);
  const [searchTextStatus, setSearchTextStatus] = useState<string>("");
  const fnSearch = useOnAutoSearch();

  const onCheckUrl = async () => {
    const checkResult = await checkStatus(address);
    setSearchTextStatus("");

    if (checkResult) {
      setChecked(checkResult);
      await setItem(StorageKeys.NETWORK_IP, address);
    }
  };

  const onAutoSearch = async () => {
    const ip = await fnSearch((text, status) => {
      setSearchTextStatus(text);
      setShowButtonForSearch(status);
    });

    if (ip) {
      setAddress(ip);
      setChecked(true);
      setShowButtonForSearch(false);
      setSearchTextStatus("");
    }
  };

  useEffect(() => {
    (async () => {
      const addressItem = await getItem(StorageKeys.NETWORK_IP);
      if (addressItem) {
        setAddress(addressItem);
      } else {
        setShowButtonForSearch(true);
        onAutoSearch();
      }
    })();
  }, []);

  return (
    <View>
      <View>
        <View style={styles.boxAddressTextInput}>
          <TextInput
            keyboardType="url"
            placeholder={t("EVSE box IP address") as string}
            value={address}
            onChangeText={(text) => {
              setAddress(text);

              if (checked !== null) {
                setChecked(null);
              }
            }}
          />
        </View>
        <View style={styles.buttonBlock}>
          {showButtonForSearch && (
            <View style={{ marginRight: 2 }}>
              <AppButton title={t("Auto search")} onPress={onAutoSearch} />
            </View>
          )}
          <View>
            <AppButton title={t("Test & Save")} onPress={onCheckUrl} />
          </View>
        </View>
      </View>
      {checked !== null && (
        <Text style={[styles.boxAddressCheck, !checked && styles.boxAddressCheckFailed]}>
          {checked ? <Trans>Successful connected and saved</Trans> : <Trans>EVSE not found</Trans>}
        </Text>
      )}
      {searchTextStatus && (
        <Text style={[styles.boxAddressCheck, !checked && styles.boxAddressCheckFailed]}>{searchTextStatus}</Text>
      )}
    </View>
  );
};
