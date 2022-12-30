import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { searchContext } from "../Helper/searchContext";

const fetchSumData = async (ticker, intervalParam, rangeParam) => {
  const options = {
    method: "GET",
    url: `https://yh-finance.p.rapidapi.com/stock/v3/get-chart`,
    params: {
      interval: intervalParam,
      symbol: ticker,
      range: rangeParam,
      includePrePost: "false",
      useYfid: "true",
      includeAdjustedClose: "true",
      events: "capitalGain,div,split",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_SECRET,
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  const round = (number) => {
    return number ? +number.toFixed(2) : null;
  };

  return await axios.request(options).then((response) => {
    let newData = [];
    for (let i = 0; i < response.data.chart.result[0].timestamp.length; i++) {
      newData = [
        ...newData,
        {
          x: new Intl.DateTimeFormat("en-US").format(
            response.data.chart.result[0].timestamp[i] * 1000
          ),
          y: [
            response.data.chart.result[0].indicators.quote[0].open[i],
            response.data.chart.result[0].indicators.quote[0].high[i],
            response.data.chart.result[0].indicators.quote[0].low[i],
            response.data.chart.result[0].indicators.quote[0].close[i],
          ].map(round),
        },
      ];
    }
    return newData;
  });
};

export const useGetPriceData = () => {
  const { searchTicker, stockChartParams } = useContext(searchContext);

  const {
    data: priceData,
    isLoading: priceDataLoading,
    refetch: refetchPrice,
  } = useQuery({
    queryKey: [
      "sumData",
      searchTicker,
      stockChartParams.interval,
      stockChartParams.range,
    ],
    queryFn: () =>
      fetchSumData(
        searchTicker,
        stockChartParams.interval,
        stockChartParams.range
      ),
    enabled: searchTicker !== "",
  });

  return { priceData, priceDataLoading, refetchPrice };
};
