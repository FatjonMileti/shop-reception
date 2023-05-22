import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Percent } from '@mui/icons-material'
import { Button, Checkbox, DatePicker, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { BarcodeScanner } from 'components/core-ui/BarcodeScanner'
import { ComboBoxTable } from 'components/core-ui/ComboBoxTable'
import { Input } from 'components/core-ui/Input'
import { Link } from 'components/core-ui/Link'
import { ProductStockInfo } from 'components/core-ui/ProductStockInfo'
import { ProductTabs } from 'components/core-ui/ProductTabs'
import { ProductTitle } from 'components/core-ui/ProductTitle'
import { ShoppingCart } from 'components/core-ui/ShoppingCart'
import { Table } from 'components/core-ui/Table'

export const Components = {
  // MUI components
  Box,
  Container,
  Grid,
  // MUI icons
  Percent,
  // Carrefour lib components
  Button,
  DatePicker,
  Link,
  Typography,
  Checkbox,
  // Local components
  AsyncAutocomplete,
  BarcodeScanner,
  ComboBoxTable,
  Input,
  ProductStockInfo,
  ProductTabs,
  ProductTitle,
  ShoppingCart,
  Table
}
