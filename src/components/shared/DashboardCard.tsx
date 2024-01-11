import { Card, Flex } from "antd"
import { ReactElement } from "react"


interface IDashboardCard {
    title: string,
    subtitle?: string,
    icon: ReactElement,
    children?: ReactElement
}

const DashboardCard = ({ title, subtitle, icon, children }: IDashboardCard) => {

    return (
        <Card loading={false} style={{ width: '100%' }}>
            <Flex align="start" gap={25}>
                {icon}
                <div className="flex items-start flex-col">
                    <h1 className="text-lg">{title}</h1>
                    <h1 className="text-3xl">{subtitle}</h1>
                </div>
            </Flex>
            {
                children && <div className="mt-2">
                    {children}
                </div>
            }

        </Card>
    )
}

export default DashboardCard
