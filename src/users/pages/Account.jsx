import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../../redux/actions/userActions'

const Account = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getUserOrders())
    }, [])
    const getClasses = status => {
        switch (status) {
            case "placed": return "bg-orange-50"
            case "delivered": return "bg-green-100"
            default: return ""
        }
    }
    return <>
        <div className="stats shadow">

            <div className="stat">
                <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-primary">25.6K</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="stat-title">Page Views</div>
                <div className="stat-value text-secondary">2.6M</div>
                <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <div className="avatar online">
                        <div className="w-16 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                </div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>

        </div>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((item, i) => <tr
                            className={getClasses(item.status)}
                            key={item.id}>
                            <td> {item.id} </td>
                            <td>{item.products.map(p => <div
                                className="bg-slate-200 p-4 m-2 flex justify-between">
                                <span className="font-medium">{p.name}</span> <span>{p.qty}</span>
                            </div>)}
                            </td>
                            <td>{item.amount}</td>
                            <td>{item.status}</td>
                        </tr>)
                    }
                </tbody>

            </table>
        </div>

    </>
}

export default Account