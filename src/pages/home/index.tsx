import type { ColProps } from "antd";
import { Col, Row, theme } from "antd";

import LineChart from "./components/line-chart";
import BarChart from "./components/bar-chart";
import PieChart from "./components/pie-chart";
import CardList from "./components/card-list";
import { Helmet } from "react-helmet";

const wrapperCol: ColProps = {
	xs: 24,
	sm: 24,
	md: 12,
	lg: 12,
	xl: 12,
	xxl: 12,
};
export default function Home() {
	const {
		token: { colorBgLayout },
	} = theme.useToken();

	return (
		<div style={{ height: "100%", backgroundColor: colorBgLayout }}>
			<Row gutter={[20, 20]}>
				<Col span={24}>
					<CardList />
				</Col>
				<Col span={24}>
					<LineChart />
				</Col>
				<Col span={24}>
					<Row justify="space-between" gutter={[20, 20]}>
						<Col {...wrapperCol}>
							<BarChart />
						</Col>
						<Col {...wrapperCol}>
							<PieChart />
						</Col>
					</Row>
				</Col>
				<Helmet defer={false}>
					<script src="http://localhost:8003/copilot/index.js"></script>
				</Helmet>
				<Helmet>
					<script>
						{`window.mountChainlitWidget({chainlitServer: "http://localhost:8003"});`}
					</script>
				</Helmet>
			</Row>
		</div>
	);
}
