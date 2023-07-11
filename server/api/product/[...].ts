import { Product } from '../../models/product';
import { Promote } from '../../models/promote';
import mongoose, { Types } from 'mongoose';
import type { IProduct } from '../../../types';

const router = createRouter();

router.get(
	'/',
	defineEventHandler(async (event) => {
		const query = getQuery(event);

		if (query.scope && query.scope === 'less') {
			return findLiteProducts({});
		} else {
			try {
				const products = await Product.find();
				return products;
			} catch (error) {
				console.error('Get products err', error);
			}
		}
	})
);

router.get(
	'/:id',
	defineEventHandler(async (event) => {
		const productId = event.context.params?.id;
		if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'id is not valid value',
			});
		}

		try {
			const product = await Product.find({ _id: productId });
			return product ? product : [];
		} catch (error) {
			throw createError({
				statusCode: 500,
				statusMessage: `Get product err, ${error}`,
			});
		}
	})
);

router.get(
	'/promote',
	defineEventHandler(async (event) => {
		const query = getQuery(event);

		let promote;
		try {
			promote = await Promote.findOne();
		} catch (error) {
			console.error('get promote err', error);
		}

		switch (query.type) {
			case 'recommend':
				return findLiteProducts({ targets: promote?.recommend });
			case 'online_limited':
				return findLiteProducts({ targets: promote?.recommend });
			case 'new_item':
				return findLiteProducts({ targets: promote?.recommend });
			default:
				return promote;
		}
	})
);

async function findLiteProducts({ targets = undefined }: Partial<{ targets?: Array<Types.ObjectId> }>) {
	try {
		const filter = targets ? { _id: { $in: targets } } : {};

		const products = await Product.find(
			filter,
			'name model route image_url label branches.color branches.image_url branches.model branches.price branches._id'
		);
		return products;
	} catch (error) {
		console.error('Get products err', error);
	}
}

export default useBase('/api/product/', router.handler);