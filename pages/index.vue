<template>
	<div>
		<CarouselTopSlides></CarouselTopSlides>
		<div class="pb-12 pt-9 text-center">
			<a href="#" class="text-lg">製品に関する大切なお知らせ</a>
		</div>

		<div class="pb-12">
			<div class="my-10 text-center">おすすめアイテム</div>
			<CarouselProduct :products="recommendProductFetch.data" class="mx-auto max-w-[1300px]"></CarouselProduct>
		</div>

		<div class="pb-12">
			<div class="my-10 text-center">オンラインストア限定</div>
			<CarouselProduct :products="onlineLimitedProductFetch.data" class="mx-auto max-w-[1300px]"></CarouselProduct>
		</div>

		<div class="mx-auto max-w-[1400px] px-5 py-24">
			<div class="my-10 text-center">ナビコンテンツ</div>
			<NavIContents></NavIContents>
		</div>

		<div class="mx-auto max-w-[80vw] py-24">
			<div class="my-10 text-center">トピックス</div>
			<Topics></Topics>
		</div>

		<div class="pt-24">
			<div class="my-24 text-center">プレミアムラインナップ</div>
			<a href="#" draggable="false">
				<span class="relative block bg-[url('/images/pc/top_bnr_premium02.jpg')] bg-cover bg-center py-16">
					<span class="ml-[13%] block text-white">
						<span class="mb-6 block text-2xl">
							良い音で、
							<br class="block lg:hidden" />
							大人はもっと楽しくなる。
						</span>
						<span class="mb-6 block">
							WIRED EARPHONES/ HEADPHONES
							<br class="block lg:hidden" />
							PREMIUM LINEUP
						</span>
						<span class="mb-10 block">
							自分の価値観や美意識にこだわりをもって暮らす方々の
							<br />
							良い音の楽しみ方を公開中！
						</span>

						<span class="text-sm">MORE</span>
					</span>
				</span>
			</a>
		</div>

		<div class="bg-gray-200 py-24">
			<div class="my-10 text-center">新製品</div>
			<CarouselProductNew :products="newItemProductFetch.data" class="mx-auto max-w-[1300px]"></CarouselProductNew>
		</div>

		<div class="mx-auto max-w-[1260px] py-24">
			<div class="my-24 text-center">ニュース</div>
			<News></News>
		</div>

		<div class="relative mx-auto flex w-[65vw] max-w-[1020px] py-24">
			<div class="absolute left-1/2 top-[36px] h-24 w-24 -translate-x-1/2 bg-white px-4">
				<PiniaIcon class="h-full w-full"></PiniaIcon>
			</div>

			<a href="#" class="w-full border border-black pb-10 pt-12 text-center text-2xl">製品に関する大切なお知らせ ></a>
		</div>

		<div class="mx-auto flex max-w-[1260px] flex-col items-center py-24">
			<div class="my-3">Connect with Audio-Technica</div>
			<Connect></Connect>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { SimplifiedProduct } from '~/types';

definePageMeta({
	name: 'home',
});

const recommendProductFetch = reactive(
	await useFetch<SimplifiedProduct[]>('/api/product/promote', {
		params: { type: 'recommend' },
	})
);

const onlineLimitedProductFetch = reactive(
	await useFetch<SimplifiedProduct[]>('/api/product/promote', {
		params: { type: 'online_limited' },
	})
);

const newItemProductFetch = reactive(
	await useFetch<SimplifiedProduct[]>('/api/product/promote', {
		params: { type: 'new_item' },
	})
);
</script>
