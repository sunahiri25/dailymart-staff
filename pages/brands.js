import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Brands() {
    const [brands, setBrands] = useState([]);
    const [showMore, setShowMore] = useState(1);

    useEffect(() => {
        fetchBrands();
    }, []);

    function fetchBrands() {
        axios.get('/api/brands').then(res => {
            setBrands(res.data);
        })
    };



    function handleShowMore() {
        setShowMore(showMore + 1);
    }

    function handleShowLess() {
        setShowMore(1);
    }

    return (
        <Layout>
            <h1>Brands</h1>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Brand Name</td>
                        <td>Brand Active</td>

                    </tr>
                </thead>
                <tbody>
                    {brands.slice(0, showMore * 10 < brands.length ? showMore * 10 : brands.length).map(brand => (
                        <tr key={brand._id}>
                            <td>{brand.name}</td>
                            <td>{brand.active}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex gap-5">
                {showMore * 10 < brands.length && brands.length > 10 && (
                    <button onClick={handleShowMore} className="btn-primary mt-2">More</button>
                )}
                {showMore > 1 && (
                    <button onClick={handleShowLess} className="btn-primary mt-2">Hide</button>
                )}
            </div>
        </Layout>
    )
};

