<template>
	<div>
		<div class="grid grid-cols-2">
			<div class="border-r border-black pr-20">
				<div v-if="topicsFetch.data?.length">
					<a href="#" class="hover:opacity-80" draggable="false">
						<span class="relative">
							<img
								class="block h-auto w-full select-none object-contain"
								draggable="false"
								:src="topicsFetch.data[0].image_url"
							/>
						</span>

						<span class="category-decorate relative my-3 block text-center text-xs">
							{{ topicsFetch.data[0].category }}
						</span>
						<span class="block py-5 text-center text-xl font-bold">{{ topicsFetch.data[0].title }}</span>
						<span class="break-all text-sm" v-html="topicsFetch.data[0].content"></span>
					</a>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-8 pl-20">
				<div v-for="(topic, index) in topicsFetch.data?.slice(1)" :key="index">
					<a href="#" class="hover:opacity-70" draggable="false">
						<span class="relative">
							<img class="block h-auto w-full select-none object-contain" draggable="false" :src="topic.image_url" />
						</span>

						<span class="category-decorate relative my-3 block text-center text-xs">{{ topic.category }}</span>
						<span class="break-all text-left text-sm">{{ topic.title }}{{ topic.content }}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Topic } from '~/types';

const topicsFetch = reactive(await useFetch<Topic[]>('/api/topics'));
</script>

<style>
.category-decorate::after {
	content: '';
	position: absolute;
	width: 40px;
	height: 1px;
	bottom: -6px;
	left: 50%;
	background-color: black;
	transform: translateX(-50%);
}
</style>
