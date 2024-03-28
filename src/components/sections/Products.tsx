import Breds from "../shared/Breds"
import ProductFilter from "../utility/ProductFilter"

const Products = () => {
    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Products", link: "null" }]} />

            <div className="mt-5">
                <ProductFilter showDrawer={() => { }} getFilterData={() => { }} />
            </div>
        </div>
    )
}

export default Products
