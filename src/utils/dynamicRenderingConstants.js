import { Box, Container } from '@mui/material'
import { Percent } from '@mui/icons-material'
import { Autocomplete, Checkbox, DatePicker, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { StaticAutocomplete } from 'components/core-ui/StaticAutocomplete'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { Button } from 'components/core-ui/Button'
import { Card } from 'components/core-ui/Card'
import { ContainerBox } from 'components/core-ui/ContainerBox'
import { CountyCitySelect } from 'components/core-ui/CountyCitySelect'
import { DescriptionText } from 'components/core-ui/DescriptionText'
import { PrintModal } from 'components/core-ui/PrintModal'
import { FloatingButton } from 'components/core-ui/FloatingButton'
import { Grid } from 'components/core-ui/Grid'
import { Link } from 'components/core-ui/Link'
import { PageForm } from 'components/core-ui/PageForm'
import { PageFormRadio } from 'components/core-ui/PageFormRadio'
import { PageInfo } from 'components/core-ui/PageInfo'
import { PdfViewer } from 'components/core-ui/PdfViewer'
import { PlusMinusNumberInput } from 'components/core-ui/PlusMinusNumberInput'
import { PriceSpan } from 'components/core-ui/PriceSpan'
import { ReceiptInvoiceFinalized } from 'components/core-ui/ReceiptInvoiceFinalized'
import { ReceiptBarcodeScanner } from 'components/core-ui/ReceiptBarcodeScanner'
import { SimpleKeyValuePairs } from 'components/core-ui/SimpleKeyValuePairs'
import { ShoppingCart } from 'components/core-ui/ShoppingCart'
import { Switch } from 'components/core-ui/Switch'
import { Table } from 'components/core-ui/Table'
import { FiltersWithResultsTable } from 'components/core-ui/FiltersWithResultsTable'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { IconCell } from 'components/core-ui/IconCell'
import { TableSearch } from 'components/core-ui/TableSearch'
import { Tabs } from 'components/core-ui/Tabs'
import { TitleText } from 'components/core-ui/TitleText'
import { UserModal } from 'components/bakery/UsersManagement/UserModal'
import { FileUpload } from 'components/core-ui/FileUpload'
// import DynamicTable from 'components/core-ui/Table/DynamicTable'
// import GroupTable from 'components/core-ui/Table/GroupTable'
import { ImageCell } from 'components/core-ui/ImageCell'
import { ProductView } from 'components/core-ui/ProductView'
// import PrintPreviewTable from 'components/core-ui/Table/PrintPreviewTable'

export const Components = {
  // MUI components
  Box,
  Container,
  // MUI icons
  Percent,
  // Carrefour lib components
  Autocomplete,
  DatePicker,
  Typography,
  Checkbox,
  IconCell,
  // Local components
  AsyncAutocomplete,
  StaticAutocomplete,
  BooleanIcon,
  BooleanText,
  Button,
  Card,
  ContainerBox,
  CountyCitySelect,
  DescriptionText,
  PrintModal,
  FloatingButton,
  Grid,
  Link,
  MultivalueCell,
  PageForm,
  PageFormRadio,
  PageInfo,
  PdfViewer,
  PlusMinusNumberInput,
  PriceSpan,
  ReceiptInvoiceFinalized,
  ReceiptBarcodeScanner,
  SimpleKeyValuePairs,
  ShoppingCart,
  Switch,
  Table,
  FiltersWithResultsTable,
  TableSearch,
  Tabs,
  TitleText,
  UserModal,
  FileUpload,
  // DynamicTable,
  // GroupTable,
  ImageCell,
  ProductView
  // PrintPreviewTable
}
