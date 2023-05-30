<script lang="ts">
	import { fly } from 'svelte/transition';
	import 'virtual:uno.css';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';
	import { hotKeyAction, mediaQuery } from 'svelte-legos';
	// import { storage } from 'svelte-legos';
	// import { writable } from 'svelte/store';

	import { browser } from '$app/environment';

	let allowToSee: boolean;
	if (browser) {
		// localStorage.allowToSee === 'true' ||
		if (!('allowToSee' in localStorage)) {
			allowToSee = false;
		} else {
			allowToSee = true;
		}
	}
	const handleClick = () => {
		localStorage.setItem('allowToSee', 'true');
		allowToSee = true;
	};
	// const allowToSee = storage(writable(false), 'allowToSee');
	const isSmallScreen = mediaQuery('(max-width: 1024px)');
	// $: allowToSee = false;
	$: allowToSee;
	export let data: LayoutData;

	// $: ({ supabase, session } = data);
	// import type { LayoutData } from './$types';
</script>

<svelte:head
	><link
		rel="apple-touch-icon"
		sizes="180x180"
		href="{base}/apple-touch-icon.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="32x32"
		href="{base}/favicon-32x32.png"
	/>
	<link
		rel="icon"
		type="image/png"
		sizes="16x16"
		href="{base}/favicon-16x16.png"
	/>
	<link rel="manifest" href="{base}/site.webmanifest" />
	<link rel="mask-icon" href="{base}/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" /></svelte:head
>
<!-- <svelte:body  /> -->
<!-- {#key data.pathname} -->
{#if !allowToSee && $isSmallScreen}
	<div
		class="fixed top-0 left-0 h-screen w-screen backdrop-blur backdrop-brightness-80 z-100 flex justify-center items-center font-title"
	>
		<div class="bg-white border rounded p-6 text-lg flex-col flex-center gap-2">
			Small screen devices (Phones, Tablet) is not Supported!
			<button
				on:click={handleClick}
				use:hotKeyAction={{
					code: 'Escape',
					cb: handleClick,
				}}
				class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block cursor-pointer font-bold text-base flex-shrink w-max"
			>
				<span
					class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"
				/>
				<span class="relative group-hover:text-white">Bỏ Qua</span>
			</button>
		</div>
	</div>
{/if}

{#key data.url}
	<!-- transition:fade -->
	<div
		in:fly={{ y: -100, duration: 500, delay: 500 }}
		out:fly={{ y: 100, duration: 500 }}
		class="max-h-screen font-content dark:bg-gray-800 dark:text-white"
	>
		<slot />
	</div>
{/key}

<!-- {/key} -->
