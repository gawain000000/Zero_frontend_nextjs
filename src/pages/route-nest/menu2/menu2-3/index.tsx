import { Input, Space } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchTest } from '#src/api/product'

import type { AnyDataType } from '#src/api/product'

const { Search } = Input

export default function Menu2And3() {
  const { t } = useTranslation()

  const [data, setData] = useState<AnyDataType[]>([])

  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(value) => {
          fetchTest({ id: value, brand: value }).then(({ result }) => {
            setData(result)
          })
        }}
      />
      <Space direction="vertical">
        {data.map(elem => (
          <>{elem.title}</>
        ))}
      </Space>
    </Space>
  )
}
