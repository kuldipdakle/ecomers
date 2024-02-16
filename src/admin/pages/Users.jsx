import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdDelete, MdEditSquare } from "react-icons/md"
import { getAllUser, getUsersOrder, updateStatus } from "../../redux/actions/adminActions"
import { useState } from "react"
import { toast } from "react-toastify"
import { invalidate } from "../../redux/slices/adminSlice"

const Users = () => {

    return <>
        <UserTable />
    </>
}

const UserTable = () => {

    const dispatch = useDispatch()
    const { users, userOrders, statusUpdated } = useSelector(state => state.admin)
    const [selectedUser, setSelectedUser] = useState()
    const [status, setStatus] = useState()
    useEffect(() => {
        dispatch(getAllUser())

    }, [])
    useEffect(() => {
        if (selectedUser) {
            dispatch(getUsersOrder(selectedUser))
        }
    }, [selectedUser])

    useEffect(() => {
        if (statusUpdated) {
            toast.success("Status Updated")
            dispatch(invalidate())
        }
    }, [statusUpdated])

    return <>
        <div className=' grid grid-col-1 md:grid-cols-2'>
            <div>
                {users && users.map(item => <div onClick={e => setSelectedUser(item.id)} className={`p-4 border-2  border-gray-200 m-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ${selectedUser === item.id && "hover:bg-slate-100 border-green-400"}`} key={item.id}>
                    <h1 className='text-lg font-bold'>{item.name}</h1>
                    <p className='text-gray-400'>{item.email}</p>

                </div>)}
            </div>
            <div className="border-2 my-2">
                {
                    userOrders && userOrders.map(item => <div onClick={e => setSelectedUser(item.id)} className="p-4 border-2  border-gray-200 m-2 cursor-pointer hover:bg-slate-100 transition-all duration-100" key={item.id}>
                        {item.products.map(p => <h1 >{p.name}</h1>)}

                        <h1 className='text-lg font-bold'>{item.status}</h1>
                        <select onChange={e => setStatus(e.target.value)} >
                            <option value="Placed">Placed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                        <button onClick={e => dispatch(updateStatus({ id: item.id, status }))} className="btn btn-sm btn-secondary">Update status</button>

                    </div>)
                }

            </div>

        </div>




        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>

                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Mobile</th>
                        <th>Account</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userOrders && userOrders.map((item, i) => <tr key={item.name}>
                            <td> {i + 1} </td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.mobile}</td>
                            <td>
                                <div className="form-control w-28">
                                    <label className="cursor-pointer label ">
                                        <span className="label-text">Active</span>
                                        <input type="checkbox" className="toggle toggle-primary" />
                                    </label>
                                </div>
                            </td>
                            <td>
                                <button className="btn btn-outline btn-warning mx-1"><MdEditSquare /></button>
                                <button className="btn btn-outline btn-error mx-1"><MdDelete /></button>
                            </td>

                        </tr>)
                    }
                </tbody>

            </table>
        </div>
    </>
}

export default Users


