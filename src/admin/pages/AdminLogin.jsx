import React from 'react'
import useDymanicForm from '../../hooks/useDymanicForm'
import { useDispatch, useSelector } from "react-redux"
import { adminLogin } from '../../redux/actions/adminActions'
import { useEffect } from 'react'
import { toast } from "react-toastify"
import { invalidate } from '../../redux/slices/adminSlice'
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
    const dispatch = useDispatch()

    const { auth, error, loading } = useSelector(state => state.admin)

    const navigate = useNavigate()

    const handleSubmit = () => {
        dispatch(adminLogin(state))
        navigate("/admin")
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(invalidate())
        }
    }, [error])

    const config = [
        { fieldName: "email", type: "text", },
        { fieldName: "password", type: "password", },
        { fieldName: "submit", type: "submit", onClick: handleSubmit },
    ]

    const [ui, state, pre] = useDymanicForm(config)

    return <>

        <div class="flex flex-col items-center justify-center px-3 py-4 mt-3 mx-auto lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login
                    </h1>
                    <div class="mt-10">
                        <form action="#">
                            {ui}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default AdminLogin