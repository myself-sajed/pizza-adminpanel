import { ReactElement } from "react";

interface IDashboardListItem {
    name: string,
    address: string,
    price: string,
    status: string
}

const colors: { [key: string]: ReactElement } = {
    "Preparing": <span className={`bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>Preparing</span>,
    "On the way": <span className={`bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>On the way</span>,
    "Delivered": <span className={`bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`}>Delivered</span>,
};


const DashboardListItem = ({ name, address, price, status }: IDashboardListItem) => {
    return (
        <div className="grid grid-cols-3">
            <div className="flex flex-col col-span-2">
                <span className="font-medium">{name}</span>
                <span className="text-gray-500 text-sm">{address}</span>
            </div>
            <div className="grid grid-cols-2">
                <span className="font-bold">₹ {price}</span>
                <div>
                    {colors[status]}
                </div>
            </div>
        </div>
    )
}

export default DashboardListItem
