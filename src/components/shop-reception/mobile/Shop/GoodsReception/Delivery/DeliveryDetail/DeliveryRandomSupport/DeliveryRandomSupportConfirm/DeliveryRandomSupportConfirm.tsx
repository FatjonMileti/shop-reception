import { TitleHeader } from '../../../../../../Common/TitleHeader'
import { Typography } from '@fullscreendigital/carrefour-dex-fe'
import { Grid } from '../../../../../../../Common/Grid'
import { useState } from "react";
import { useLocation } from "react-router-dom";

const DeliveryRandomSupportConfirm = () => {
  const location = useLocation();
  const truckId = location.state?.truckId;

  const [sgrProductList, setSgrProductList] = useState([]);
  const [hasProducts, setHasProducts] = useState(false);

  const storedData = localStorage.getItem(`myData-${truckId}`);
  if (storedData && !hasProducts) {
    const parsedData = JSON.parse(storedData);
    const productList = Object.keys(parsedData).map(key => {
      return {
        supportCode: key,
        sgrProducts: parsedData[key].sgrProducts,
      };
    });
    setSgrProductList(productList);
    setHasProducts(true);
  }
  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='Produse SGR' />,
        hasProducts ? (
          <Grid
            hasPaper={true}
            spacing={1}
            items={sgrProductList.map(productList => (
              <div key={productList.supportCode}>
                <Typography variant='medium' component='p'>Cod Suport {productList.supportCode}</Typography>
                <ul>
                  {productList.sgrProducts.map((product, i) => (
                    <Typography key={i} variant="mono" component='li' style={{ color: "black" }}>{product}</Typography>
                  ))}
                </ul>
              </div>
            ))}
            itemsPerRow={1}
          />
        ) : (
          <Typography variant='medium' component='p'>Nu exista produse Sgr disponibile pentru acest camion.</Typography>
        )
      ]}
      itemsPerRow={1}
    />
  );
}
export default DeliveryRandomSupportConfirm;