/* eslint-disable import/first */
// @ts-expect-error: ok
global.__DEV__ = true;

import "./mocks/asyncStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../i18n";
import i18next from "i18next";

import * as API from "../api/fetchData";

jest.spyOn(API, "fetchData").mockImplementation(() => Promise.resolve());

beforeAll(async () => {
  await i18next.changeLanguage("test");
});

beforeEach(async () => {
  await AsyncStorage.clear();
  jest.clearAllMocks();
});
