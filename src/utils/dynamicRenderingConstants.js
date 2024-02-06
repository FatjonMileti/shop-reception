import { Box, Container } from '@mui/material'
import { Percent } from '@mui/icons-material'
import { Autocomplete, Checkbox, DatePicker, Typography } from '@fullscreendigital/carrefour-dex-fe'
import { AsyncAutocomplete } from 'components/core-ui/AsyncAutocomplete'
import { BooleanIcon } from 'components/core-ui/BooleanIcon'
import { BooleanText } from 'components/core-ui/BooleanText'
import { Card } from 'components/core-ui/Card'
import { CountyCitySelect } from 'components/core-ui/CountyCitySelect'
import { DescriptionText } from 'components/core-ui/DescriptionText'
import { PrintModal } from 'components/core-ui/PrintModal'
import { FloatingButton } from 'components/core-ui/FloatingButton'
import { Link } from 'components/core-ui/Link'
import { ReceiptBarcodeScanner } from 'components/core-ui/ReceiptBarcodeScanner'
import { Switch } from 'components/core-ui/Switch'
import { Table } from 'components/core-ui/Table'
import { MultivalueCell } from 'components/core-ui/MultivalueCell'
import { IconCell } from 'components/core-ui/IconCell'
import { Tabs } from 'components/core-ui/Tabs'
import { FileUpload } from 'components/core-ui/FileUpload'
import { ImageCell } from 'components/core-ui/ImageCell'

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
  BooleanIcon,
  BooleanText,
  Card,
  CountyCitySelect,
  DescriptionText,
  PrintModal,
  FloatingButton,
  Link,
  MultivalueCell,
  ReceiptBarcodeScanner,
  Switch,
  Table,
  Tabs,
  FileUpload,
  ImageCell
}
