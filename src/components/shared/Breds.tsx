import { RightOutlined } from "@ant-design/icons"
import { Breadcrumb } from "antd"
import { Link } from "react-router-dom";

interface NavigationItem {
    title: string;
    link: string | "null";
}

interface NavigationProps {
    items: NavigationItem[];
}

const Breds = ({ items }: NavigationProps) => {

    return (
        <Breadcrumb
            separator={<RightOutlined style={{ fontSize: '10px' }} />}
            items={items.map((item) => {
                return { title: item.link === "null" ? item.title : <Link to={item.link} >{item.title}</Link> }
            })}
        />
    )
}

export default Breds
