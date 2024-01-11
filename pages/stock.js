import Layout from "@/components/Layout";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StockPage() {
    const [stock, setStock] = useState([]);
    const [store, setStore] = useState();
    const session = useSession();
    useEffect(() => {
        axios.get('/api/staffs?email=' + session?.data?.user?.email).then(res => {
            if (res.data?.store) setStore(res.data.store);
        })
    }, [session]);
    useEffect(() => {
        if (store !== undefined) axios.get('/api/stock?store=' + store?._id).then(res => setStock(res.data));
    }, [store]);
    return (
        <Layout>
            <h1>Stock</h1>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Product</td>
                        <td>Quantity</td>
                        <td>Date</td>

                    </tr>
                </thead>
                <tbody>
                    {stock.length > 0 && stock.map(stock => (
                        <tr key={stock._id}>
                            <td>{stock.product?.title}</td>
                            <td>{stock.quantity}</td>
                            <td>{new Date(stock.date).toLocaleDateString('vi')}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}