import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res)

    if (method !== 'GET') {
        res.status(405).end(`Method ${method} Not Allowed`)
        return;
    }
    if (req.query?.id) {
        res.json(await Category.findOne({ _id: req.query.id }).populate('parent'));
    } else {
        res.json(await Category.find({}).populate('parent').sort({ parent: 1 }));
    }
}
