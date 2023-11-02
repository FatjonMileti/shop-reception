import { Tabs } from 'components/core-ui/Tabs'

const ProductTabs = (props: any) => {
  const { value, product, ...rest } = props

  console.log('debug', value, product, rest)
  return product.title ? <Tabs {...rest} /> : null
}

export default ProductTabs
