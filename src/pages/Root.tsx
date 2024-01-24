import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import getSelf from '../utility/getSelf'
import { useEffect } from 'react'
import { useAuthStore } from '../store'
import Loader from '../components/sections/Loader'
import { AxiosError } from 'axios'

const Root = () => {

    const { setUser } = useAuthStore()

    const { data, isLoading } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        retry: (failureCount: number, error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return false
            }
            return failureCount < 3
        }

    })

    useEffect(() => {
        if (data && data["id"]) {
            setUser(data)
        } else {
            setUser(null)
        }
    }, [data, setUser])


    return (
        <div>
            {
                isLoading ? <Loader title="Authenticating User" /> : <Outlet />
            }
        </div>
    )
}

export default Root
