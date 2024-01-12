import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [store, setStore] = useState();
    const session = useSession();
    const [showMore, setShowMore] = useState(1);

    function handleShowMore() {
        setShowMore(showMore + 1);
    }

    function handleShowLess() {
        setShowMore(1);
    }
    useEffect(() => {
        axios.get('/api/staffs?email=' + session?.data?.user?.email).then(res => {
            if (res.data?.store) setStore(res.data.store);
        })
    }, [session]);
    useEffect(() => {
        if (store) axios.get('/api/customers?store=' + store?._id).then(res => setCustomers(res.data));
    }, [store]);
    return (
        <Layout>
            <h1>Customers</h1>
            <h2 className="text-red-700 text-lg">Number of customers: {customers.length}</h2>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Customer ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Phone</td>
                        <td>Address</td>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0 && customers.slice(0, showMore * 10 < customers.length ? showMore * 10 : customers.length).map(customer => (
                        <tr key={customer._id}>
                            <td>{customer._id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>
                                {customer.address &&
                                    <p>
                                        {customer.address}, {customer.ward}, <br />
                                        {customer.district}, {customer.city}</p>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-5">
                {showMore * 10 < customers.length && customers.length > 10 && (
                    <button onClick={handleShowMore} className="btn-primary mt-2">More</button>
                )}
                {showMore > 1 && (
                    <button onClick={handleShowLess} className="btn-primary mt-2">Hide</button>
                )}
            </div>
        </Layout>
    )
}