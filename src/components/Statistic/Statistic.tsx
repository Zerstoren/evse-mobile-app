import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";

import { useSelector } from "react-redux";
import { AppButton } from "../system/AppButton";
import { getLastMonth, StatisticData } from "../../api/storage/statistic";
import { colors } from "../system/styles/colors";
import { CurrentDate } from "./components/CurrentDate";
import { TimeTransform } from "../system/TimeTransform";
import { getCurrencySymbolSelector } from "../../store/tariff/select";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tableHead: {
    height: 40,
    backgroundColor: colors.primary,
    elevation: 8,
  },

  tableHeadText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primaryText,
  },

  tableRow: {
    flexDirection: "row",
  },

  tableRowPair: {
    backgroundColor: colors.background,
  },

  tableCell: {
    textAlign: "center",
  },

  tableCellText: {
    textAlign: "center",
  },

  textWhite: {
    color: colors.primaryText,
  },
});

const calculateTotal = (data: StatisticData[]) => {
  return data.reduce(
    (prev, current) => {
      return {
        start: 0,
        time: prev.time + current.time,
        energy: prev.energy + current.energy,
        money: prev.money + current.money,
      };
    },
    { time: 0, energy: 0, money: 0, start: 0 } as StatisticData,
  );
};

const StatisticRaw = () => {
  const { t } = useTranslation();
  const currency = useSelector(getCurrencySymbolSelector);
  const [data, setData] = useState<StatisticData[]>([]);
  const [dataSummary, setDataSummary] = useState<StatisticData | null>(null);
  const headDate = [t("Date"), t("Time"), t("Energy"), t("Money")];

  useEffect(() => {
    getLastMonth().then((value) => {
      setData(value);
      setDataSummary(calculateTotal(value));
    });
  }, []);

  return (
    <View>
      <View style={[styles.container, styles.buttonGroup]}>
        <AppButton small title={t("Custom")} />
        <AppButton small title={t("Current year")} />
        <AppButton small title={t("Previous month")} />
      </View>

      <View>
        <Table>
          <Row
            data={[
              <Text style={[styles.tableHeadText, styles.textWhite]}>
                <Trans>Summary:</Trans>
              </Text>,
              <TimeTransform white time={dataSummary?.time || 0} />,
              <Text style={[styles.tableCellText, styles.textWhite]}>
                {dataSummary?.energy} <Trans>kW/h</Trans>
              </Text>,
              <Text style={[styles.tableCellText, styles.textWhite]}>
                {dataSummary?.money} {currency}
              </Text>,
            ]}
            style={styles.tableHead}
            textStyle={styles.tableHeadText}
          />

          <Row data={headDate} style={styles.tableHead} textStyle={styles.tableHeadText} />

          <ScrollView>
            {data.map((rowData, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableWrapper
                style={{ flexDirection: "row", backgroundColor: index % 2 === 0 ? colors.background : "" }}
                key={rowData.start}
              >
                <Cell data={<CurrentDate dateNumber={rowData.start} />} />
                <Cell data={<TimeTransform time={rowData.time} />} />
                <Cell
                  data={
                    <Text style={styles.tableCellText}>
                      {rowData.energy} <Trans>kW/h</Trans>
                    </Text>
                  }
                />
                <Cell
                  data={
                    <Text style={styles.tableCellText}>
                      {rowData.money} {currency}
                    </Text>
                  }
                />
              </TableWrapper>
            ))}
          </ScrollView>
        </Table>
      </View>
    </View>
  );
};

export const Statistic = React.memo(StatisticRaw);
