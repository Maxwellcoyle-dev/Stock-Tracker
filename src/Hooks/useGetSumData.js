import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { searchContext } from "../Helper/searchContext";

const fetchSumData = async (ticker) => {
  const options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
    params: { symbol: ticker },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_SECRET,
      "X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
    },
  };

  return await axios.request(options).then((response) => response.data);
};

export const useGetSumData = () => {
  const { searchTicker } = useContext(searchContext);

  const {
    data: sumData,
    isLoading,
    refetch: refetchSum,
  } = useQuery(["sumData", searchTicker], () => fetchSumData(searchTicker), {
    enabled: searchTicker !== "",
  });

  return { sumData, isLoading, refetchSum };
};
