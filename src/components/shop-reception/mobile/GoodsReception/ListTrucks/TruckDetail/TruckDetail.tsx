import React from 'react';
import { Button, IconButton, Input, Typography } from '@fullscreendigital/carrefour-dex-fe'
import {useEffect, useMemo, useState} from 'react'
import { getValidationSchema, initialValues } from './helpers'
import { useFormik } from 'formik'
import { formatErrorMessage } from '../../../../../../utils/formatting'
import { useNotification } from '../../../../../../hooks'
import { TitleHeader } from '../../../TitleHeader'
import { CameraAlt as CameraIcon } from '@mui/icons-material'
import { Container, Grid } from '@mui/material'
import s from './TruckDetail.modules.scss'
import { WebcamCapture } from 'components/core-ui/WebcamCapture'
import {makeCoreGetRequest, makeCorePostRequest} from "../../../../../../utils/api";
import {useParams} from "react-router-dom";

const TruckDetail = () => {
  const [showSealCamera, setShowSealCamera] = useState(false)
  const [sealImage, setSealImage] = useState('')
  const [truck, setTruck] = useState(null);
  const { showNotification } = useNotification()
  let { id } = useParams();

  const validationSchema = useMemo(() => getValidationSchema(), [])

  const formik = useFormik({
    enableReinitialize: false,
    validateOnChange: false,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log('approving')
      // try {
      //   const payload = formik.values
      //   await approveTruck(payload);
      // } catch (error) {
      //   showNotification({
      //     message: `Error while submitting. ${formatErrorMessage(error)}`,
      //     type: 'error'
      //   })
      // }
    }
  })

  const onSealImageCapture = imageSrc => {
    console.log(imageSrc)
    setSealImage(imageSrc)
    setShowSealCamera(false)
  }

  const getTruckById = (): any => {
    return makeCoreGetRequest('/rm-api/truck/' + id, null)
  }

  const approveTruck = (params): any => {
    return makeCorePostRequest('/rm-api/truck/approve', params)
  }

  useEffect(() => {
    getTruckById()
        .then(truck => {
          setTruck(truck);
        })
        .catch(error => {
          showNotification({
            message: `Error while fetching data. ${formatErrorMessage(error)}`,
            type: 'error'
          })
        });
  }, [])

  return (
    <Container>
      {!showSealCamera && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TitleHeader title="DETALIU CAMION" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="medium" component="p">
              Numǎr înmatriculare: {truck?.truckNumber}
            </Typography>
            { truck?.ticketCodeList.length > 0 &&
              <Typography variant="medium" component="p">
                Bon livrare: {truck?.ticketCodeList.map((ticket, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span>/</span>}
                    {ticket}
                  </React.Fragment>
              ))}
              </Typography>
            }
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Confirm Sigiliu"
              variant="standard"
              width="100%"
              value={formik.values.seal}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('seal', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.seal}
              helperText={formik.errors.seal as string}
            />
            <IconButton onClick={() => setShowSealCamera(true)}>
              <CameraIcon />
            </IconButton>
            {sealImage && (
              <img src={sealImage}  alt='seal image'/>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="medium" component="p">
              Confirm documentele pentru depozit {truck?.depositName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Aviz/BL"
              variant="standard"
              width="100%"
              value={formik.values.notice}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('notice', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.notice}
              helperText={formik.errors.notice as string}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Scrisoare de transport/CMR"
              variant="standard"
              width="100%"
              value={formik.values.transportNote}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('transportNote', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.transportNote}
              helperText={formik.errors.transportNote as string}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              type="select"
              label="Conformitate termodiagrama"
              variant="standard"
              width="100%"
              value={formik.values.thermodiagram}
              values={[
                {
                  value: 'none',
                  label: 'DA'
                }
              ]}
              onChange={event =>
                formik.setFieldValue('thermodiagram', (event.target as HTMLInputElement).value)
              }
              error={!!formik.errors.thermodiagram}
              helperText={formik.errors.thermodiagram as string}
            />
            <IconButton>
              <CameraIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              label="APROBǍ CAMION"
              onClick={() => formik.handleSubmit()}
            />
          </Grid>
        </Grid>
      )}
      {showSealCamera && (
        <WebcamCapture
          // onImageCapture={onSealImageCapture}
          // videoConstraints={{
          //   width: 400,
          //   height: 225,
          //   facingMode: 'user'
          // }}
        />
      )}
    </Container>
  )
}

export default TruckDetail
