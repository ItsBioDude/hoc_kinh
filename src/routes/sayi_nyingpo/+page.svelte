<script lang="ts">
	import { presetUno } from 'unocss';
	import { base } from '$app/paths';
	import { onMount } from 'svelte/internal';
	import { slide } from 'svelte/transition';
	// import { createForm } from 'felte';
	// import { DateInput } from 'date-picker-svelte';
	// import dayjs from 'dayjs';
	import Card from '$lib/Card.svelte';
	import { RanInt } from '$lib/util.ts';
	import { timeoutFnStore, hotKeyAction } from 'svelte-legos';
	const defaultLabelText = 'Vui lòng chờ 30s';
	let labelText: string = defaultLabelText;
	const { isPending, start, stop } = timeoutFnStore(() => {
		labelText = 'Kinh Văn';
	}, 30000);
	import MainLayout from '$lib/MainLayout.svelte';
	import OpenMenu from '$lib/OpenMenu.svelte';
	// export let data;
	let selectedData = {
		para: [],
		word: [],
	};
	const initSelectedFile = RanInt(13) + 1;
	onMount(async () => {
		// const fileName = `${base}/data/sayi_nyingpo/p${RanInt(13) + 1}.json`;
		const res = await fetch(
			`${base}/data/sayi_nyingpo/p${initSelectedFile}.json`
		);
		selectedData = await res.json();
	});

	const handleClick = async () => {
		let i = RanInt(13) + 1;
		while (i == initSelectedFile) {
			i = RanInt(13) + 1;
		}
		const res = await fetch(`${base}/data/sayi_nyingpo/p${i}.json`);
		selectedData = await res.json();
		console.log(selectedData);
		labelText = defaultLabelText;
		start();
		isOpen = false;
	};
	// slice
	$: RanNum = RanInt(selectedData.para.length - 3);
	$: selectedPara = selectedData.para.slice(RanNum, RanNum + 4);
	$: console.log(selectedPara);
	// let reportsOpen: boolean = false;
	let isOpen: boolean = false;
	const toggle = () => (isOpen = !isOpen);
</script>

<!-- TODO: https://unocss.dev/presets/wind#breakpoints - Add breakpoints -->
<svelte:head>
	<title>Kinh Địa Tạng Bồ Tát Bổn Nguyện</title>
</svelte:head>

<!-- <div class="h-screen sm:overflow-hidden lt-sm:overflow-x-hidden"> -->
<MainLayout pictureName="sayi_nyingpo.jpg">
	<!-- TODO: Check back on fixing view width -->
	<div
		class="flex flex-col gap-2 md:gap-4 m-2 p-2
            md:(px-4 py-4) md:(mt-4 mr-10)"
	>
		<!-- scrollbar scrollbar-rounded dark:(scrollbar-track-color-gray-700 scrollbar-thumb-color-gray-600) -->
		<article
			class="bg-gray-100 p-4 rounded scrollbar scrollbar-rounded dark:(scrollbar-track-color-gray-700 scrollbar-thumb-color-gray-600)"
		>
			{#each selectedPara as e}
				{#if e != ''}
					<p
						class={e.toUpperCase() == e
							? 'font-bold text-base md:text-xl font-title'
							: 'text-sm md:text-base'}
					>
						{e}
					</p>
				{/if}
			{/each}
		</article>
		<!-- Expand Area -->
		<Card>
			<!-- <div class="p-4 bg-gray-100 rounded"> -->
			<button
				on:click={toggle}
				aria-expanded={isOpen}
				use:hotKeyAction={{
					code: 'Escape',
					cb: () => (isOpen = false),
				}}
				disabled={$isPending}
				class="border-none font-title font-bold text-lg bg-transparent flex items-center text-base gap-1 {$isPending
					? 'cursor-not-allowed'
					: 'cursor-pointer'}"
				><svg
					style="tran"
					width="20"
					height="20"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					viewBox="0 0 24 24"
					stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
				>
				{labelText}
			</button>
			{#if isOpen}
				<article
					transition:slide={{ duration: 300 }}
					class="ml-4 overflow-y-scroll max-h-40vh scrollbar scrollbar-rounded dark:(scrollbar-track-color-gray-700 scrollbar-thumb-color-gray-600) p-2 rounded mt-2"
				>
					<!-- {#each [1, 2, 3] as item}
							<p>{item}</p>
						{/each} -->
					{#each selectedData.para as e, i}
						<!-- DATA: ['SAY','HELLO','TO','WORLD'] -->
						{#if e != ''}
							<p
								class="{e.toUpperCase() == e
									? 'font-bold text-base md:text-xl font-title'
									: 'text-sm md:text-base'}
											{e == selectedPara[0] ||
								e == selectedPara[1] ||
								e == selectedPara[2] ||
								e == selectedPara[3]
									? 'font-bold text-red'
									: ''}"
							>
								{e}
							</p>
						{/if}
					{/each}
				</article>
			{/if}
		</Card>
		<!-- </div> -->

		<!-- Refetch data -->
		<button
			on:click={handleClick}
			use:hotKeyAction={{
				code: 'Space',
				cb: handleClick,
			}}
			class="px-3 py-1.5 sm:(px-4 py-2) relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block cursor-pointer font-bold text-base sm:text-lg flex-shrink w-max"
		>
			<span
				class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"
			/>
			<span class="relative group-hover:text-white flex-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 512 512"
					class="mr-2 refresh_svg"
					><path
						fill="currentColor"
						d="M256 96c38.4 0 73.7 13.5 101.3 36.1l-32.6 32.6c-4.6 4.6-5.9 11.5-3.5 17.4s8.3 9.9 14.8 9.9h112c8.8 0 16-7.2 16-16V64c0-6.5-3.9-12.3-9.9-14.8s-12.9-1.1-17.4 3.5l-34 34C363.4 52.6 312.1 32 256 32c-10.9 0-21.5.8-32 2.3v64.9c10.3-2.1 21-3.2 32-3.2zm-123.9 58.7l32.6 32.6c4.6 4.6 11.5 5.9 17.4 3.5s9.9-8.3 9.9-14.8V64c0-8.8-7.2-16-16-16H64c-6.5 0-12.3 3.9-14.8 9.9s-1.1 12.9 3.5 17.4l34 34C52.6 148.6 32 199.9 32 256c0 10.9.8 21.5 2.3 32h64.9c-2.1-10.3-3.2-21-3.2-32c0-38.4 13.5-73.7 36.1-101.3zM477.7 224h-64.9c2.1 10.3 3.2 21 3.2 32c0 38.4-13.5 73.7-36.1 101.3l-32.6-32.6c-4.6-4.6-11.5-5.9-17.4-3.5s-9.9 8.3-9.9 14.8v112c0 8.8 7.2 16 16 16h112c6.5 0 12.3-3.9 14.8-9.9s1.1-12.9-3.5-17.4l-34-34C459.4 363.4 480 312.1 480 256c0-10.9-.8-21.5-2.3-32zM256 416c-38.4 0-73.7-13.5-101.3-36.1l32.6-32.6c4.6-4.6 5.9-11.5 3.5-17.4s-8.3-9.9-14.8-9.9H64c-8.8 0-16 7.2-16 16v112c0 6.5 3.9 12.3 9.9 14.8s12.9 1.1 17.4-3.5l34-34C148.6 459.4 199.9 480 256 480c10.9 0 21.5-.8 32-2.3v-64.9c-10.3 2.1-21 3.2-32 3.2z"
					/></svg
				>Thay Đổi</span
			>
		</button>
	</div>
</MainLayout>
<OpenMenu />

<!-- </div> -->

<style>
	.group:hover .refresh_svg {
		animation: spin 4s linear;
		animation-iteration-count: infinite;
	}
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
