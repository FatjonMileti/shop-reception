import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'configureStore'
import { DataStoreActions } from 'reducers/dataStoreSlice'
import { get } from 'lodash'


const useDataStore = () => {
  const dataStore = useSelector((state: RootState) => state.dataStore)

  const dispatch = useDispatch()

  const restoreText = (text: string) => {
    Array.from(text.matchAll(/§{(.*)}/g), match => {
      let key = match[1]
      // console.log("key:", key, "| value:", get(dataStore, key))
      text = text.replace(match[0], get(dataStore, key) || '')
    });
    return text
  }

  const restore = (JSONSchema: any) => {
    if (!JSONSchema) return ''

    const { children, ...rest } = JSONSchema

    return { ...rest, children: children && (typeof children === 'string' ? restoreText(children) : children.map(c => restore(c))) || undefined }
  }

  const storeData = (key: string, data: any) => {
    dispatch(DataStoreActions.setData({ [key]: data }))
  }

  const retrieveData = (key: string) => {
    return get(dataStore, key) || ''
  }

  return { restore, storeData, retrieveData } as const
}

export default useDataStore
