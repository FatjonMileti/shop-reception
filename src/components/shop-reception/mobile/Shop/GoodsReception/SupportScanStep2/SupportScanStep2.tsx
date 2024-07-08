import { Grid } from "../../../../Common/Grid";
import { Button, Input, Table } from "@fullscreendigital/carrefour-dex-fe";
import { TitleHeader } from "../../../Common/TitleHeader";
import { getValidationSchema, initialValues } from "./helpers";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { makeCoreGetRequest, makeCorePostRequest } from "../../../../../../utils/api";
import { formatErrorMessage } from "../../../../../../utils/formatting";
import { useNotification } from "../../../../../../hooks";
import { TableHeaderType } from "@fullscreendigital/carrefour-dex-fe/dist/cjs/components/Table";
import ImageUpload from "../../../Common/ImageUpload/ImageUpload";
import { useLocation, useNavigate } from "react-router-dom";
import AlertModal from "../../../Common/AlertModal/AlertModal";
import { URLS } from "../../../constants";

const SupportScanStep2 = () => {
  const { showNotification } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  // const { supportTypeId, supportId, truckId } = location.state;
  const supportTypeId = "1";
  const supportId = "111";
  const truckId = "111";
  const main = true;

  const [isMissingValuesModalOpen, setIsMissingValuesModalOpen] = useState(false)
  const [MissingValuesModalContent, setMissingValuesModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isMandatorySupportModalOpen, setIsMandatorySupportModalOpen] = useState(false)
  const [MandatorySupportModalContent, setMandatorySupportModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isDifferentNumberModalOpen, setIsDifferentNumberModalOpen] = useState(false)
  const [DifferentNumberModalContent, setDifferentNumberModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isPriorityProductsModalOpen, setIsPriorityProductsModalOpen] = useState(false)
  const [PriorityProductsModalContent, setPriorityProductsModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isSensitiveAndShortDlcModalOpen, setIsSensitiveAndShortDlcModalOpen] = useState(false)
  const [SensitiveAndShortDlcModalContent, setSensitiveAndShortDlcModalContent] = useState({ title: '', description: '', buttons: [] })
  const [isMoreSupportsConfirmModalOpen, setIsMoreSupportsConfirmModalOpen] = useState(false)
  const [MoreSupportsConfirmModalContent, setMoreSupportsConfirmModalContent] = useState({ title: '', description: '', buttons: [] })
  const [getSecondarySupport, setGetSecondarySupport] = useState(false)

  const validationSchema = useMemo(() => getValidationSchema(), [])
  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      let totalSupportNumber = 0;
      let missingValue = false;
      const message = "Există diferențe între cantitatea aşteptată şi cea descărcată pentru ";
      let supportsNotOk = '';
      values.supportType.forEach(support => {
        if (support.received === null) missingValue = true;
        const total = Number(support.received);
        totalSupportNumber += total;
        supportTypeList.forEach(st => {
          if (st.id === support.id && st.received !== total) {
            supportsNotOk = supportsNotOk + st.name + ', ';
          }
        })
      })

      if (missingValue) {
        openMissingValuesModal();
      } else if (totalSupportNumber === 0) {
        openMandatorySupportModal();
      }  else if (supportsNotOk.length > 0) {
        showDifferentNumberConfirmation(values.supportType, message + supportsNotOk);
      } else {
        doSaveSupportTypes(values.supportType);
      }
    }
  })

  const handleError = (error) => {
    showNotification({
      message: `${formatErrorMessage(error)}`,
      type: 'error'
    });
  };

  const { data: supportTypeList, isLoading } = useQuery(
    'SupportPrincipalType',
    async () => {
      const support = await makeCoreGetRequest('/shop-reception-mobile/support/principal/type', null)
      await formik.setFieldValue("supportType", support)
      return support
    },
    {
      initialData: [],
      onError: handleError,
      onSuccess: data => {
        data.forEach((p, i) => {
          if (p.id === Number(supportTypeId)) {
            formik.setFieldValue(`supportType[${i}].received`, 1);
            p.received = 1;
          }
        })
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSuccess = (id) => {
    showNotification({
      message: 'Image uploaded successfully',
      type: 'success'
    });
  };


  const columns: Array<TableHeaderType> = [
    {
      title: 'TIP AMBALAJ',
      field: 'name',
      align: 'left'
    },
    {
      title: 'CANTITATE',
      field: 'received',
      align: 'center',
      render: (rowData: any) => (
        <div style={{display: "flex"}}>
        <Input
          type="number"
          value={rowData.received}
          onChange={(e) => {
           Number((e.target as HTMLInputElement).value) >= 0 && formik.values.supportType.map((support, idx) => {
              if (rowData.id === idx) {
                formik.setFieldValue(`supportType[${idx}].received`, Number((e.target as HTMLInputElement).value))
              }
            })
          }}
          variant='standard'
        />
          {supportTypeList[rowData.id].received != formik.values.supportType[rowData.id].received &&
            <ImageUpload
              uploadUrl={`/shop-reception-mobile/support/shop/upload/` + rowData.id}
              onSuccess={() => handleSuccess(rowData.id)}
              onError={handleError}
            />}
        </div>
      )
    },
  ]

  const rows = formik.values.supportType.map((support, index) => ({
    id: index,
    name: support.name,
    received: support.received,
  }))

  const doSaveSupportTypes = (values) => {
    try {
      makeCorePostRequest(`/shop-reception-mobile/support/shop/list/save/${main}/${truckId}/${supportId}`, values).then(resp => {
        if (resp.priorityProducts?.length > 0) {
          showPriorityProducts(resp.priorityProducts, resp.hasSensitiveProducts, resp.hasProductsWithShortDlc, resp.hasSgrProducts, resp.sgrProductsList);
        }
        else if (resp.hasSensitiveProducts || resp.hasProductsWithShortDlc || resp.hasSgrProducts) {
          showSensitiveAndShortDlcInfo(resp.hasSensitiveProducts, resp.hasProductsWithShortDlc, resp.hasSgrProducts, resp.sgrProductsList);
        } else {
          openMoreSupportsConfirm();
        }
      });
    } catch (error) {
      showNotification({
        message: `Error while submitting. ${formatErrorMessage(error)}`,
        type: 'error'
      })
    }
  }

  const showPriorityProducts = (priorityProducts, hasSensitiveProducts, hasProductsWithShortDlc, hasSgrProducts, sgrProducts) => {
    let productsMessage = '';
    if (priorityProducts.length > 0) {
      priorityProducts.forEach(mess => {
        productsMessage = productsMessage + mess + ', ';
      });
    }
    setPriorityProductsModalContent({
      title: "Există produse prioritare pentru vânzare: ",
      description: productsMessage,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            if (hasSensitiveProducts || hasProductsWithShortDlc || hasSgrProducts) {
              showSensitiveAndShortDlcInfo(hasSensitiveProducts, hasProductsWithShortDlc, hasSgrProducts, sgrProducts);
            }
            else {
              openMoreSupportsConfirm();
            }
            setIsPriorityProductsModalOpen(false);
          },
          color: 'primary'
        },
      ]
    });
    setIsPriorityProductsModalOpen(true);
  };

  const closePriorityProducts = () => {
    setIsPriorityProductsModalOpen(false);
  };

  const { data: secondarySupport} = useQuery(
    'deleteSecondarySupport',
    async () => {
      return await makeCoreGetRequest(`/shop-reception-mobile/support/secondary/delete?supportId=${supportId}`, null)
    },
    {
      enabled: getSecondarySupport,
      onError: handleError,
      onSuccess: (data) => {
        if (data) {
          navigate(URLS.AUTH_SUPPORT_SCAN_STEP_1, {state: {item: {id: truckId}}});
        }
      },
    }
  )

  const openMoreSupportsConfirm = () => {
    setMoreSupportsConfirmModalContent({
      title: "Adaugă alte ambalaje",
      description: '',
      buttons: [
        {
          label: 'Nu',
          onClick: () => {
            setGetSecondarySupport(true)
            setIsMoreSupportsConfirmModalOpen(false);
          },
          color: 'primary'
        },
        {
          label: 'Da',
          onClick: () => {
            setIsMoreSupportsConfirmModalOpen(false);
            navigate(URLS.AUTH_SUPPORT_SCAN_STEP_3, {state: {
              supportId,
              truckId
              }
            })
          },
          color: 'primary'
        }
      ]
    })

    setIsMoreSupportsConfirmModalOpen(true);
  }

  const closeMoreSupportsConfirm = () => {
    setIsMoreSupportsConfirmModalOpen(false);
  };

  const showSensitiveAndShortDlcInfo = (hasSensitiveProducts, hasShortDlcProducts, hasSgrProducts, sgrProducts) => {
    let productsMessage = "";
    if (hasSensitiveProducts) {
      if (hasShortDlcProducts) {
        if (hasSgrProducts) {
          productsMessage = "Pe acest suport există produse sensibile, produse SGR şi produse cu DLC!";
        } else {
          productsMessage = "Pe acest suport există produse sensibile şi produse cu DLC!";
        }
      } else {
        if (hasSgrProducts) {
          productsMessage = "Pe acest suport există produse sensibile şi produse SGR!";
        }
        else {
          productsMessage = "Pe acest suport există produse sensibile!";
        }
      }
    } else {
      if (hasShortDlcProducts) {
        if (hasSgrProducts) {
          productsMessage = "Pe acest suport există produse cu DLC şi produse SGR!";
        } else {
          productsMessage = "Pe acest suport există produse cu DLC!";
        }
      } else {
        if (hasSgrProducts) {
          productsMessage = "Pe acest suport există produse SGR!";
        }
      }
    }
    let message = "";
    sgrProducts.forEach((item) => {
      message += item + ', '
    })

    setSensitiveAndShortDlcModalContent({
      title: productsMessage,
      description: message,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
            setIsSensitiveAndShortDlcModalOpen(false);
            openMoreSupportsConfirm()
          },
          color: 'primary'
        },
      ]
    });
    setIsSensitiveAndShortDlcModalOpen(true);
  };

  const closeSensitiveAndShortDlc = () => {
    setIsSensitiveAndShortDlcModalOpen(false);
  };

  const openMissingValuesModal = () => {
    setMissingValuesModalContent({
      title: 'Atenție!',
      description: "Vă rugăm să completaţi toate valorile din ecran!",
      buttons: [
        {
          label: 'Ok',
          onClick: () => setIsMissingValuesModalOpen(false),
          color: 'primary'
        },
      ]
    });
    setIsMissingValuesModalOpen(true);
  };

  const closeMissingValuesModal = () => {
    setIsMissingValuesModalOpen(false);
  };

  const openMandatorySupportModal = () => {
    setMandatorySupportModalContent({
      title: 'Atenție!',
      description: "Tipul de suport este obligatoriu!",
      buttons: [
        {
          label: 'Ok',
          onClick: () => setIsMandatorySupportModalOpen(false),
          color: 'primary'
        },
      ]
    });
    setIsMandatorySupportModalOpen(true);
  };

  const closeMandatorySupportModal = () => {
    setIsMissingValuesModalOpen(false);
  };

  const showDifferentNumberConfirmation = (values, message) => {
    setDifferentNumberModalContent({
      title: message,
      description: '',
      buttons: [
        {
          label: 'Mai verific',
          onClick: () => setIsDifferentNumberModalOpen(false),
          color: 'primary'
        },
        {
          label: 'Am terminat',
          onClick: () => {
            setIsDifferentNumberModalOpen(false);
            doSaveSupportTypes(values);
          },
          color: 'primary'
        }
      ]
    });
    setIsDifferentNumberModalOpen(true)
  }

  const closeDifferentNumberConfirmation = () => {
    setIsDifferentNumberModalOpen(false);
  };

  return (
    <Grid
      gridContainerStyle={{ marginTop: '20px' }}
      maxWidth='xs'
      items={[
        <TitleHeader title='Cod Suport' />,
        <Table
          columns={columns}
          isLoading={false}
          rows={rows}
          disablePagination={true}
          hideCheckbox={true}
        />,
        <Button
          style={{ width: "100%" }}
          type='button'
          variant='contained'
          label='CONFIRMĂ AMBALAJE'
          onClick={() => formik.handleSubmit()}
        />,
        <AlertModal
          open={isMissingValuesModalOpen}
          handleClose={closeMissingValuesModal}
          title={MissingValuesModalContent.title}
          description={MissingValuesModalContent.description}
          buttons={MissingValuesModalContent.buttons}
        />,
        <AlertModal
        open={isMandatorySupportModalOpen}
        handleClose={closeMandatorySupportModal}
        title={MandatorySupportModalContent.title}
        description={MandatorySupportModalContent.description}
        buttons={MandatorySupportModalContent.buttons}
        />,
        <AlertModal
          open={isDifferentNumberModalOpen}
          handleClose={closeDifferentNumberConfirmation}
          title={DifferentNumberModalContent.title}
          description={DifferentNumberModalContent.description}
          buttons={DifferentNumberModalContent.buttons}
        />,
        <AlertModal
          open={isPriorityProductsModalOpen}
          handleClose={closePriorityProducts}
          title={PriorityProductsModalContent.title}
          description={PriorityProductsModalContent.description}
          buttons={PriorityProductsModalContent.buttons}
        />,
        <AlertModal
          open={isSensitiveAndShortDlcModalOpen}
          handleClose={closeSensitiveAndShortDlc}
          title={SensitiveAndShortDlcModalContent.title}
          description={SensitiveAndShortDlcModalContent.description}
          buttons={SensitiveAndShortDlcModalContent.buttons}
        />,
        <AlertModal
          open={isMoreSupportsConfirmModalOpen}
          handleClose={closeMoreSupportsConfirm}
          title={MoreSupportsConfirmModalContent.title}
          description={MoreSupportsConfirmModalContent.description}
          buttons={MoreSupportsConfirmModalContent.buttons}
        />
      ]}
      itemsPerRow={1}
    />
  )
}

export default SupportScanStep2
