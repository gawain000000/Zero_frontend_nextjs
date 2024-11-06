import React, { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  theme,
} from 'antd'
import type { FormProps } from 'antd'
import ky from 'ky'
import TextArea from 'antd/es/input/TextArea'

const { Search } = Input

interface FieldType {
  prompt?: string
  numberOfPics?: number
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

export default function Menu2And2() {
  const {
    token: { colorBgLayout },
  } = theme.useToken()
  const [images, set_images] = useState<any>([])
  const [isLoading, setIsloading] = useState(false)
  const url = 'https://2224-210-209-92-145.ngrok-free.app/create-images/'
  const base_url = 'https://2224-210-209-92-145.ngrok-free.app'

  const [form] = Form.useForm()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setIsloading(true)
    ky.post(url, {
      json: values,
      timeout: false,
    })
      .json()
      .then((data: any) => {
        console.log(data)
        set_images(data.map((elem: string) => base_url + elem))
      })
      .finally(() => setIsloading(false))
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
  return (
    <>
      <Row gutter={[0, 20]} style={{ backgroundColor: colorBgLayout }}>
        <Col span={12}>
          {/* <Col span={8}>
							<Space.Compact block>
								<Search
									placeholder="a cat"
									defaultValue="a cat and a tiger"
									enterButton="Create"
									size="middle"
									loading={isLoading}
									onSearch={handleSubmit}
								/>
							</Space.Compact>
						</Col> */}
          <Form
            form={form}
            name="horizontal_login"
            layout="horizontal"
            onFinish={onFinish}
            initialValues={{ prompt: 'a cat', numberOfPics: 4 }}
          >
            <Form.Item<FieldType> label="Prompt" name="prompt">
              <TextArea rows={4} className="w-3/4" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Number of Pictures"
              name="numberOfPics"
            >
              <InputNumber max={9} min={1} />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            {images.map((elem: any) => (
              <Image width={200} height={200} src={elem} key={elem} />
            ))}
          </Image.PreviewGroup>
        </Col>
      </Row>
    </>
  )
}
