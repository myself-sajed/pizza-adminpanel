
interface IDashboardListItem {
    name: string,
    address: string,
    price: string,
    status: string
}

const colors: { [key: string]: string } = {
    "Preparing": "blue",
    "On the way": "red",
    "Delivered": "green",
};


const DashboardListItem = ({ name, address, price, status }: IDashboardListItem) => {
    return (
        <div className="grid grid-cols-3">
            <div className="flex flex-col col-span-2">
                <span className="font-medium">{name}</span>
                <span className="text-gray-500 text-sm">{address}</span>
            </div>
            <div className="flex items-start  gap-5">
                <span className="font-bold">₹ {price}</span>
                <span className={`bg-${colors[status]}-100 text-${colors[status]}-700 rounded-full py-1 px-4 text-sm font-medium`}>{status}</span>
            </div>
        </div>
    )
}

export default DashboardListItem
