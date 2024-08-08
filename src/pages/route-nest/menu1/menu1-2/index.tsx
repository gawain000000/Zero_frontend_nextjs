import { useProductStore } from "#src/store/product.js";

export default function Menu1And2() {
	const selectedProductID =  useProductStore(state => state.selectedProductID);

	return <h1>selectedProductID : {selectedProductID}</h1>;
}
