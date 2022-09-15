import "./mocks/asyncStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as API from "../api/fetchData";

jest.spyOn(API, "fetchData").mockImplementation(() => Promise.resolve());

beforeEach(async () => {
  await AsyncStorage.clear();
});
