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
	AutoComplete,
	Button,
} from "antd";
import type { TableColumnsType, AutoCompleteProps } from "antd";
import React, { useEffect, useState } from "react";
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

const brand_names_data = [...new Set(data.map((e) => e.brand_name))].map(
	(elem) => {
		return { value: elem, label: elem };
	}
);

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

	const [id_value, set_id_value] = useState("");
	const [id_options, set_id_options] = useState<AutoCompleteProps["options"]>(
		[]
	);
	const [table_data, set_table_data] = useState<DataType[]>([]);

	const handleChange_platform = (value: string) => {
		console.log(`selected platform ${value}`);
	};

	const handleChange_category = (value: string) => {
		console.log(`selected category ${value}`);
	};
	const handleChange_brand_name = (value: string) => {
		console.log(`selected brand_name ${value}`);
		set_table_data(data.filter((elem) => elem.brand_name == value));
	};

	const handleSelect_id = (value: string) => {
		console.log(`selected id ${value}`);
		set_table_data(table_data.filter((elem) => elem.id == value));
	};

	const handleChange_id = (data: string) => {
		set_id_value(data);
	};

	const handleSearch = () => {
		//maybe not needed
	};

	const search_by_id = (searchText: string) => {
		if (!searchText) {
			return [];
		} else {
			return data
				.filter((elem) => elem.id.startsWith(searchText))
				.map((elem) => {
					return { value: elem.id };
				});
		}
	};

	useEffect(() => {
		set_table_data(data);
	}, []);
	return (
		<Row gutter={[0, 20]} style={{ backgroundColor: colorBgLayout }}>
			<Col span={24}>
				<Card title={t("product.selection")}>
					<Row>
						<Col span={3}>
							<Descriptions title={t("product.platform")}></Descriptions>
							<Select
								// defaultValue="Amazon"
								style={{ width: 120 }}
								onChange={handleChange_platform}
								options={[
									{ value: "Amazon", label: "Amazon" },
									{ value: "Ebay", label: "Ebay" },
								]}
							/>
						</Col>
						<Col span={3}>
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
						<Col span={3}>
							<Descriptions title={t("product.brand_name")}></Descriptions>
							<Select
								style={{ width: 120 }}
								onChange={handleChange_brand_name}
								options={brand_names_data}
								allowClear
								onClear={() => set_table_data([])}
							/>
						</Col>
						<Col span={3}>
							<Descriptions title={t("product.id")}></Descriptions>
							<AutoComplete
								value={id_value}
								options={id_options}
								style={{ width: 120 }}
								onSelect={handleSelect_id}
								onSearch={(text) => set_id_options(search_by_id(text))}
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
				<Card title={t("product.table")}>
					<Table
						rowSelection={{
							type: "checkbox",
							...rowSelection,
						}}
						columns={columns}
						dataSource={table_data}
					/>
				</Card>
			</Col>
		</Row>
	);
}
