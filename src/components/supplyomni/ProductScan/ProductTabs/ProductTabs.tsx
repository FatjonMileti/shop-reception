import { Tabs } from 'components/core-ui/Tabs'

const ProductTabs = (props: any) => {
  const { value, product, ...rest } = props

  return product.title ? <Tabs {...rest} /> : null
}

export default ProductTabs
