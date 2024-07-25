import ky from "ky";
import {
	Card,
	Col,
	Descriptions,
	Row,
	Select,
	Table,
	theme,
	Image,
} from "antd";
import type { TableColumnsType } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import amazon_data from "./data.json";

// const json:any = await ky
// 	.post("https://jsonplaceholder.typicode.com/posts", {
// 		json: {
// 			title: "foo",
// 			body: "bar",
// 			userId: 1,
// 		},
// 	})
// 	.json();

export interface DataType {
	image: string;
	key: React.Key;
	brand_name: string;
	price: string;
	id: string;
}

const columns: TableColumnsType<DataType> = [
	{
		title: "Brand Name",
		dataIndex: "brand_name",
		render: (text: string) => <a>{text}</a>,
	},
	{
		title: "ID",
		dataIndex: "id",
	},
	{
		title: "Price",
		dataIndex: "price",
	},
	{
		title: "Image",
		dataIndex: "image",
		render: (url: string) => <Image width={200} src={url} />,
	},
];

const data: DataType[] = amazon_data;

// rowSelection object indicates the need for row selection
const rowSelection = {
	onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
		console.log(
			`selectedRowKeys: ${selectedRowKeys}`,
			"selectedRows: ",
			selectedRows
		);
	},
};

export default function Menu1And1() {
	const { t } = useTranslation();
	const {
		token: { colorBgLayout },
	} = theme.useToken();

	const handleChange_platform = (value: string) => {
		console.log(`selected platform ${value}`);
	};

	const handleChange_category = (value: string) => {
		console.log(`selected category ${value}`);
	};

	return (
		<Row gutter={[0, 20]} style={{ backgroundColor: colorBgLayout }}>
			<Col span={24}>
				<Card title={t("product.selection")}>
					<Row>
						<Col span={3}>
							<Descriptions title={t("product.platform")}></Descriptions>
							<Select
								// defaultValue="Amazon"
								style={{ width: 160 }}
								onChange={handleChange_platform}
								options={[
									{ value: "Amazon", label: "Amazon" },
									{ value: "Ebay", label: "Ebay" },
								]}
							/>
						</Col>
						<Col span={6}>
							<Descriptions title={t("product.category")}></Descriptions>
							<Select
								style={{ width: 120 }}
								onChange={handleChange_category}
								options={[
									{ value: "Mop", label: "Mop" },
									{ value: "Vacuum Parts", label: "Vacuum Parts" },
								]}
							/>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col span={24}>
				<Card title={t("product.table")}>
					<Table
						rowSelection={{
							type: "checkbox",
							...rowSelection,
						}}
						columns={columns}
						dataSource={data}
					/>
				</Card>
			</Col>
		</Row>
	);
}
