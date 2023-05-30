<script lang="ts">
	import { presetUno } from 'unocss';
	import { base } from '$app/paths';
	import { onMount } from 'svelte/internal';
	import { slide } from 'svelte/transition';
	// import { createForm } from 'felte';
	// import { DateInput } from 'date-picker-svelte';
	// import dayjs from 'dayjs';

	import { RanInt } from '$lib/util.ts';
	import { timeoutFnStore, hotKeyAction } from 'svelte-legos';
	const defaultLabelText = 'Vui lòng chờ 30s';
	let labelText: string = defaultLabelText;
	const { isPending, start, stop } = timeoutFnStore(() => {
		labelText = 'Kinh Văn';
	}, 30000);
	import StatisticPage from '$lib/StatisticPage.svelte';
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

<div class="h-screen sm:overflow-hidden">
	<StatisticPage pictureName="sayi_nyingpo.jpg">
		<!-- TODO: Check back on fixing view width -->
		<div
			class="flex flex-col gap-2 md:gap-4 m-2 p-2
            md:(px-4 py-4) md:(mt-4 mr-10)"
		>
			<!-- scrollbar scrollbar-rounded dark:(scrollbar-track-color-gray-700 scrollbar-thumb-color-gray-600) -->
			<article class="bg-gray-100 p-4 rounded">
				{#each selectedPara as e}
					{#if e != ''}
						<p class={e.toUpperCase() == e ? 'font-bold text-xl' : 'text-base'}>
							{e}
						</p>
					{/if}
				{/each}
			</article>
			<!-- Expand Area -->
			<div class="p-4 bg-gray-100 rounded">
				<button
					on:click={toggle}
					aria-expanded={isOpen}
					use:hotKeyAction={{
						code: 'Escape',
						cb: () => (isOpen = false),
					}}
					disabled={$isPending}
					class="border-none bg-transparent flex items-center text-base gap-2 mb-2 {$isPending
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
						class="ml-6 overflow-y-scroll max-h-40vh scrollbar scrollbar-rounded dark:(scrollbar-track-color-gray-700 scrollbar-thumb-color-gray-600) p-2 rounded"
					>
						<!-- {#each [1, 2, 3] as item}
							<p>{item}</p>
						{/each} -->
						{#each selectedData.para as e, i}
							<!-- DATA: ['SAY','HELLO','TO','WORLD'] -->
							{#if e != ''}
								<p
									class="{e.toUpperCase() == e
										? 'font-bold text-xl'
										: 'text-base'}
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
			</div>

			<!-- Refetch data -->
			<button
				on:click={handleClick}
				use:hotKeyAction={{
					code: 'Space',
					cb: handleClick,
				}}
				class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block cursor-pointer font-bold text-xl flex-shrink w-max"
			>
				<span
					class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"
				/>
				<span class="relative group-hover:text-white">Thay Đổi</span>
			</button>
		</div>
	</StatisticPage>
	<OpenMenu />
</div>

<style>
	button {
		/* border: none;
		background: none;
		display: block;
		color: inherit;
		font-size: 36px; */
		/* cursor: pointer; */
		/* margin: 0;
		padding-bottom: 0.5em;
		padding-top: 0.5em; */
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
