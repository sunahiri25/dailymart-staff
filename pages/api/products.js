import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Products';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handler(req, res) {
    const { method } = req
    await mongooseConnect();
    await isAdminRequest(req, res)

    if (method !== 'GET') {
        res.status(405).end(`Method ${method} Not Allowed`)
        return;
    }
    if (req.query?.id) {
        res.json(await Product.findOne({ _id: req.query.id }));
    } else {
        res.json(await Product.find({}).populate('category').populate('brand').sort({ title: 1 }));
    }
}