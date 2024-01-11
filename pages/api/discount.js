import { mongooseConnect } from '@/lib/mongoose';
import { Discount } from '@/models/Discount';
import { isAdminRequest } from './auth/[...nextauth]';
import { Category } from '@/models/Category';

export default async function handler(req, res) {
    const { method } = req
    await mongooseConnect();
    await isAdminRequest(req, res)
    if (method !== 'GET') {
        res.status(405).end(`Method ${method} Not Allowed`)
        return;
    }
    if (req.query?.id) {
        res.json(await Discount.findOne({ _id: req.query.id }));
    } else {
        res.json(await Discount.find({}).populate('category').sort({ name: 1 }));
    }
}