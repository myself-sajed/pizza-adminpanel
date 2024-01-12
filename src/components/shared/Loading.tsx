import { Spin } from 'antd'

const Loading = ({ title }: { title: string }) => {
    return (
        <div className='flex items-center justify-center my-10'>
            <Spin tip={title} />
        </div>
    )
}

export default Loading
