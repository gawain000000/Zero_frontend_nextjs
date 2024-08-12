import { useProductStore } from "#src/store/product.js";
import { Space, Table, Image } from 'antd';
import type { TableProps } from 'antd';
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";


interface DataType {
	key: string;
	brand_name: string;
	image: string;
	price: string;
	id: string;
  }
  
  const columns: TableProps<DataType>['columns'] = [
	{
	  title: 'brand_name',
	  dataIndex: 'brand_name',
	  key: 'brand_name',
	  render: (text) => <a>{text}</a>,
	},
	{
	  title: 'price',
	  dataIndex: 'price',
	  key: 'price',
	},
	{
	  title: 'image',
	  dataIndex: 'image',
	  key: 'image',
	  render: (text) => <Image.PreviewGroup
	  items={[
		text,
		'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
		'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
	  ]}
	>
	  <Image
		width={100}
		height={100}
		src={text}
	  />
	</Image.PreviewGroup>
	},
	
  ];
  
export default function Menu1And2() {
	const selectedProductID =  useProductStore(state => state.selectedProductID);
	const [data, setData] = useState<DataType[]>()

	useEffect(() => {
		const data: DataType[] = [
			{
				"image": "https://m.media-amazon.com/images/I/71Ddxdk-B2L._AC_SX450_.jpg",
				"brand_name": "irobot",
				"price": "14.99",
				"id": "B000UU7TZE",
				"key": "B000UU7TZE"
			},
			{
				"image": "https://m.media-amazon.com/images/I/11Pp7LzkEML.__AC_QL70_FMwebp_.jpg",
				"brand_name": "irobot",
				"price": "379.99",
				"id": "B0087JEFSO",
				"key": "B0087JEFSO"
			},
			{
				"image": "https://m.media-amazon.com/images/I/710YuqvbWNL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
				"brand_name": "irobot",
				"price": "35.90",
				"id": "B0099ZUCB4",
				"key": "B0099ZUCB4"
			}
		  ];
		setTimeout(() => {setData(data)}, 1000)
		
	}, [])
	return (
	<Space direction="vertical">
		<Title level={2}>selectedProductID :{selectedProductID}</Title>
		<Table columns={columns} dataSource={data} />
	</Space> 
	)
}
