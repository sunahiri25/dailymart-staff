import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditOrderPage() {
    const [orderInfo, setOrderInfo] = useState(null);
    const [paid, setPaid] = useState(false);
    const [goToOrder, setGoToOrder] = useState(false);
    const [processing, setProcessing] = useState('pending');
    const [vat, setVat] = useState(0);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/orders?id=' + id).then(
            response => {
                setOrderInfo(response.data);
                setPaid(response.data.paid);
                setProcessing(response.data.processing);
            }
        )

    }, [id]);
    useEffect(() => {
        axios.get('/api/categories').then(
            response => {
                setVat(response.data);
            }
        )
    }, [orderInfo]);
    function saveOrder(e) {
        e.preventDefault();
        axios.put('/api/orders', { paid, processing, id });
        setGoToOrder(true);
    }
    if (goToOrder) {
        router.push('/orders');
    };
    return (
        <Layout>
            <h1>Edit Order</h1>
            <form onSubmit={saveOrder}>
                <div >
                    <label >Name</label>
                    <input type="text" id="name" value={orderInfo?.name} />
                </div>
                <div >
                    <label >Phone</label>
                    <input type="text" id="phone" value={orderInfo?.phone} />
                </div>
                <div >
                    <label>Email</label>
                    <input type="text" id="email" value={orderInfo?.email} />
                </div>
                {orderInfo?.address && (
                    <div>
                        <label >Address</label>
                        <input type="text" id="address" value={orderInfo?.address + ", " + orderInfo?.ward + ", " + orderInfo?.district + ", " + orderInfo?.city} />
                    </div>
                )}
                <div>
                    <label>Paid</label>
                    <select id="paid" value={paid} onChange={(e) => setPaid(e.target.value)}  >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </div>
                <div >
                    <label className="text-lg">Items</label>
                    {orderInfo?.line_items.map(item => (
                        <div key={item.price_data.product_data.id} className="flex gap-2">
                            <div>
                                <label className='text-sm text-gray-600' >Product</label>
                                <input type="text" id="product" value={item.price_data.product_data.name} />
                            </div>
                            <div>
                                <label className='text-sm text-gray-600'>Price</label>
                                <input type="text" id="price" value={item.price_data.unit_amount} />
                            </div>
                            <div>
                                <label className='text-sm text-gray-600' >VAT</label>
                                <input type="text" id="vat" value={item.price_data.vat} />
                            </div>
                            <div>
                                <label className='text-sm text-gray-600'>Quantity</label>
                                <input type="text" id="quantity" value={item.quantity} />
                            </div>

                        </div>
                    ))}
                </div>
                <div >
                    <label >Total</label>
                    <input type="text" id="total" value={orderInfo?.total} />
                </div>
                <div>
                    <label>Processing</label>
                    <select id="processing" value={processing} onChange={(e) => setProcessing(e.target.value)}  >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="finished">Finished</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <button className="btn-primary">Save</button>
            </form>
        </Layout>
    )
}