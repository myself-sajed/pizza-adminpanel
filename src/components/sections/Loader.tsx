import { Layout, Space } from 'antd'
import PizzaLogo from '../icons/PizzaLogo'

interface LoaderProps {
    title?: string;
}

const Loader: React.FC<LoaderProps> = ({ title }) => {
    return (
        <Layout style={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }} >

            <Layout.Content style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <Space align='center' direction='vertical' >
                    <PizzaLogo />
                    <p>{title || 'Loading Contents'}, Please wait...</p>
                </Space>
            </Layout.Content>

        </Layout>
    )
}

export default Loader
