import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { makeCoreGetRequest } from "../../../utils/api";
import { formatErrorMessage } from "../../../utils/formatting";
import { useNotification } from "../../../hooks";
import { getUserRoles } from "../../../utils/authService";

export const getTitle = () => {
  const { showNotification } = useNotification();
  const userRoles = getUserRoles()

  const errorHandler = (error) => {
    showNotification({
      message: `${formatErrorMessage(error)}`,
      type: 'error'
    });
  };

  const fetchShopName = async () => {
    return await makeCoreGetRequest('/shop-reception-mobile/home/shop-name', null);
  };

  const fetchHubName = async () => {
    return await makeCoreGetRequest('/shop-reception-mobile/home/hub-name', null);
  };

  const fetchDepositName = async () => {
    return await makeCoreGetRequest('/shop-reception-mobile/home/deposit-name', null);
  };

  const { data: shopName } = useQuery('shop-name', fetchShopName, {
    enabled: userRoles?.includes('GG_RO_HQ_SHOP_RECEPTION_STORE') && !sessionStorage.getItem("title"),
    onError: (error) => errorHandler(error),
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem("title", data.value);
      }
    }
  });


  const { data: hubName } = useQuery('hub-name', fetchHubName, {
    enabled: userRoles?.includes('GG_RO_HQ_SHOP_RECEPTION_HUB') && !sessionStorage.getItem("title"),
    onError: (error) => errorHandler(error),
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem("title", data.value);
      }
    }
  });

  const { data: depositName } = useQuery('deposit-name', fetchDepositName, {
    enabled: userRoles?.includes('GG_RO_HQ_SHOP_RECEPTION_WAREHOUSE') && !sessionStorage.getItem("title"),
    onError: (error) => errorHandler(error),
    onSuccess: (data) => {
      if (data) {
        sessionStorage.setItem("title", data.value);
      }
    }
  });

  return useMemo(() => {
    return sessionStorage.getItem("title");
  }, [shopName, hubName, depositName]);
};
