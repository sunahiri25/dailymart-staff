import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DiscountPage() {
    const [discounts, setDiscounts] = useState([]);
    useEffect(() => {
        axios.get('/api/discount').then(response => {
            setDiscounts(response.data);
        });
    }, []);
    useEffect(() => {
        axios.get('/api/categories')
    }, []);
    return (
        <Layout>
            <h1>Discounts</h1>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Discount Name</td>
                        <td>Category</td>
                        <td>Value</td>
                        <td>Start</td>
                        <td>End</td>
                        <td>Max Discount</td>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map(discount => (
                        <tr key={discount._id}>
                            <td>{discount.name}</td>
                            <td>
                                {discount.category?.name}
                            </td>
                            <td>{discount.value}{discount.unit}</td>
                            <td>{new Date(discount.start).toLocaleDateString('vi')}</td>
                            <td>{new Date(discount.end).toLocaleDateString('vi')}</td>
                            <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount.max)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}
