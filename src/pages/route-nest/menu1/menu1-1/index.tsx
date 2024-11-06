import {
  AutoComplete,
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Select,
  Space,
  Table,
  theme,
} from 'antd'
import type { AutoCompleteProps, TableColumnsType } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import amazon_data from './data.json'
import { useProductStore } from '#src/store/product.js'
import ChatBotWidget from '#src/components/chatbot-widget/ChatBotWidget.js'

export interface DataType {
  image: string
  key: React.Key
  brand_name: string
  price: string
  id: string
}

const data: DataType[] = amazon_data

const brand_names_data = [...new Set(data.map(e => e.brand_name))].map(
  (elem) => {
    return { value: elem, label: elem }
  },
)

export default function Menu1And1() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const changeProductId = useProductStore(state => state.changeProductId)
  const {
    token: { colorBgLayout },
  } = theme.useToken()

  const [id_value, set_id_value] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const [id_options, set_id_options] = useState<AutoCompleteProps['options']>(
    [],
  )
  const [table_data, set_table_data] = useState<DataType[]>([])

  const handleChange_platform = (value: string) => {
    console.log(`selected platform ${value}`)
  }

  const handleChange_category = (value: string) => {
    console.log(`selected category ${value}`)
  }
  const handleChange_brand_name = (value: string) => {
    console.log(`selected brand_name ${value}`)
    set_table_data(data.filter(elem => elem.brand_name == value))
  }

  const handleSelect_id = (value: string) => {
    console.log(`selected id ${value}`)
    set_table_data(table_data.filter(elem => elem.id == value))
  }

  const handleChange_id = (data: string) => {
    set_id_value(data)
  }

  const handleSearch = () => {
    // maybe not needed
  }

  const search_by_id = (searchText: string) => {
    if (!searchText) {
      return []
    }
    else {
      return data
        .filter(elem => elem.id.startsWith(searchText))
        .map((elem) => {
          return { value: elem.id }
        })
    }
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      )
      changeProductId(selectedRows[0].id)
    },
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Brand Name',
      dataIndex: 'brand_name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (url: string) => <Image width={200} src={url} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate('/route-nest/menu1/menu1-2')}>Check accessories</Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    set_table_data(data)
  }, [])

  return (
    <Row gutter={[0, 20]} style={{ backgroundColor: colorBgLayout }}>
      <Col span={24}>
        <Card title={t('product.selection')}>
          <Row>
            <Col span={3}>
              <Descriptions title={t('product.platform')}></Descriptions>
              <Select
                // defaultValue="Amazon"
                style={{ width: 120 }}
                onChange={handleChange_platform}
                options={[
                  { value: 'Amazon', label: 'Amazon' },
                  { value: 'Ebay', label: 'Ebay' },
                ]}
              />
            </Col>
            <Col span={3}>
              <Descriptions title={t('product.category')}></Descriptions>
              <Select
                style={{ width: 120 }}
                onChange={handleChange_category}
                options={[
                  { value: 'Mop', label: 'Mop' },
                  { value: 'Vacuum Parts', label: 'Vacuum Parts' },
                ]}
              />
            </Col>
            <Col span={3}>
              <Descriptions title={t('product.brand_name')}></Descriptions>
              <Select
                style={{ width: 120 }}
                onChange={handleChange_brand_name}
                options={brand_names_data}
                allowClear
                onClear={() => set_table_data([])}
              />
            </Col>
            <Col span={3}>
              <Descriptions title={t('product.id')}></Descriptions>
              <AutoComplete
                value={id_value}
                options={id_options}
                style={{ width: 120 }}
                onSelect={handleSelect_id}
                onSearch={text => set_id_options(search_by_id(text))}
                onChange={handleChange_id}
                placeholder=""
                allowClear
                onClear={() => set_table_data([])}
              />
            </Col>
            <Col span={4}>
              <Button type="primary" className="mt-11" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title={t('product.table')}>
          <Table
            rowSelection={{
              type: 'checkbox',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={table_data}
          />
        </Card>
      </Col>
      <ChatBotWidget
        apiKey="sk-Z2Vc7pUs3P9OAaTqt7NFla1ytpfiIEdE1HTDUO98rZpjcAbZ"
        baseURL="https://api.chatanywhere.cn/v1/chat/completions"
        model="gpt-4o-mini"
        chatIcon={<div>chat</div>}
        chatbotName="chatbot"
        isTypingMessage="Typing..."
        IncommingErrMsg="Oops! Something went wrong !"
        primaryColor="#eb4034"
        inputMsgPlaceholder="Send a Message"
        conversation={messages}
        handleNewMessage={setMessages}
      />
    </Row>
  )
}
