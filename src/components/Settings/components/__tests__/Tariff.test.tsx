import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Tariff } from "../Tariff";
import { ReduxContext } from "../../../../tests/ReduxContext";
import { setInitData, setMainData } from "../../../../api/fetchData";
import { dataCreator, dataInitCreate } from "../../../../tests/data";
import * as PostData from "../../../../api/postData";
import { TariffVersion142, TariffVersion144 } from "../../../../tests/data/tariff/TariffVersion142";
import { InitBase142 } from "../../../../tests/data/init/initBase";

describe("Tariff", () => {
  test("Test load and save tariff in version 1.42", async () => {
    jest.spyOn(PostData, "postData").mockImplementation(() => Promise.resolve());

    setMainData(dataCreator([TariffVersion142]));
    setInitData(dataInitCreate([InitBase142]));

    render(
      <ReduxContext>
        <Tariff />
      </ReduxContext>,
    );

    expect(screen.getByTestId("tariff-1").props.value).toBe("1.68");
    expect(screen.getByTestId("tariff-2").props.value).toBe("0.84");
    expect(screen.getByTestId("tariff-3").props.value).toBe("0.42");

    fireEvent.changeText(screen.getByTestId("tariff-1"), "2");
    fireEvent.changeText(screen.getByTestId("tariff-2"), "1");
    fireEvent.changeText(screen.getByTestId("tariff-3"), "0.5");

    expect(PostData.postData).toHaveBeenCalledTimes(3);

    expect(PostData.postData).toHaveBeenNthCalledWith(1, ["tarif", 2.00001]);
    expect(PostData.postData).toHaveBeenNthCalledWith(2, ["tarif_2", 1.00001]);
    expect(PostData.postData).toHaveBeenNthCalledWith(3, ["tarif_3", 0.50001]);
  });

  test("Test load and save tariff in version 1.44", async () => {
    jest.spyOn(PostData, "postData").mockImplementation(() => Promise.resolve());

    setMainData(dataCreator([TariffVersion144]));
    setInitData(dataInitCreate([]));

    render(
      <ReduxContext>
        <Tariff />
      </ReduxContext>,
    );

    expect(screen.getByTestId("tariff-1").props.value).toBe("1.68");
    expect(screen.getByTestId("tariff-2").props.value).toBe("0.84");
    expect(screen.getByTestId("tariff-3").props.value).toBe("0.42");

    fireEvent.changeText(screen.getByTestId("tariff-1"), "2");
    fireEvent.changeText(screen.getByTestId("tariff-2"), "1");
    fireEvent.changeText(screen.getByTestId("tariff-3"), "0.5");

    expect(PostData.postData).toHaveBeenCalledTimes(3);

    expect(PostData.postData).toHaveBeenNthCalledWith(1, ["tarif", 200]);
    expect(PostData.postData).toHaveBeenNthCalledWith(2, ["tarif_2", 100]);
    expect(PostData.postData).toHaveBeenNthCalledWith(3, ["tarif_3", 50]);
  });
});
