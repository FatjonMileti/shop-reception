import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../utils/api";
import { formatErrorMessage } from "../../../utils/formatting";
import { useNotification } from "../../../hooks";

export const getTitle = () => {
  const { showNotification } = useNotification();
  const [shouldFetchHubName, setShouldFetchHubName] = useState(false);
  const [shouldFetchDepositName, setShouldFetchDepositName] = useState(false);

  const onError = (error) => {
    showNotification({
      message: `${formatErrorMessage(error)}`,
      type: 'error'
    });
  };

  const fetchShopName = async () => {
    return await makeCoreGetRequest('/shop-reception-mobile/getShopName', null);
  };

  const fetchHubName = async () => {
    return await makeCoreGetRequest('/shop-reception-mobile/getHubName', null);
  };

  const fetchDepositName = async () => {
    return await makeCoreGetRequest('/shop-reception-mobile/getDepositName', null);
  };

  const { data: shopName } = useQuery('getShopName', fetchShopName, {
    enabled: !sessionStorage.getItem("title"),
    onError,
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem("title", data.value);
      } else setShouldFetchHubName(true);
    }
  });

  const { data: hubName } = useQuery('getHubName', fetchHubName, {
    enabled: shouldFetchHubName && !sessionStorage.getItem("title"),
    onError,
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem("title", data.value);
      } else setShouldFetchDepositName(true);
    }
  });

  const { data: depositName } = useQuery('getDepositName', fetchDepositName, {
    enabled: shouldFetchDepositName && !sessionStorage.getItem("title"),
    onError,
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem("title", data.value);
      } else setShouldFetchDepositName(true);
    }
  });

  return useMemo(() => {
    return sessionStorage.getItem("title");
  }, [shopName, hubName, depositName]);
};