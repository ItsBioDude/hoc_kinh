<script lang="ts">
	import { fly } from 'svelte/transition';
	import { base } from '$app/paths';
	import { clickOutsideAction } from 'svelte-legos';
	import ThemeSwitch from '$lib/ThemeSwitch.svelte';
	let menuVisible: boolean = false;
	// export let menuVisible;
</script>

<div
	use:clickOutsideAction
	on:clickoutside={() => (menuVisible = false)}
	class="z-100"
>
	{#if menuVisible}
		<nav
			class="fixed gap-1 bottom-16 text-xs md:(text-sm bottom-21) right-2 rounded-md cursor-pointer p-4 flex flex-col border-gray-900 shadow border-2 min-w-[8rem] bg-white dark:bg-gray-500 z-100"
			transition:fly
		>
			<a
				href="{base}/"
				class="py-2 px-4 cursor-pointer rounded-md flex items-center border-none gap-2 hover:border-gray bg-white decoration-none hover:border-gray-900 hover:shadow transition-all ease-in dark:bg-gray-500 text-dark-600 dark:text-white"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M4 21V9l8-6l8 6v12h-6v-7h-4v7H4Z"
					/></svg
				>Home</a
			>
			<a
				href="{base}/sayi_nyingpo"
				class="py-2 px-4 cursor-pointer rounded-md flex items-center border-none gap-2 hover:border-gray bg-white decoration-none hover:border-gray-900 hover:shadow transition-all ease-in dark:bg-gray-500 text-dark-600 dark:text-white"
				>Kinh Địa Tạng</a
			>
			<ThemeSwitch />
		</nav>
	{/if}

	<div class="fixed bottom-1 right-1 sm:right-2 py-3 sm:max-w-xl mx-auto z-100">
		<nav>
			<button
				class="rounded-full text-gray-500 w-10 h-10 md:w-14 md:h-14 relative focus:outline-none bg-white cursor-pointer"
				on:click={() => (menuVisible = !menuVisible)}
			>
				<span class="sr-only">Open main</span>
				<div
					class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
				>
					<span
						aria-hidden="true"
						class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {menuVisible
							? 'rotate-45'
							: ' -translate-y-1.5'}"
					/>
					<span
						aria-hidden="true"
						class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {menuVisible
							? 'opacity-0'
							: ''}"
					/>
					<span
						aria-hidden="true"
						class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out {menuVisible
							? '-rotate-45'
							: ' translate-y-1.5'}"
					/>
				</div>
			</button>
		</nav>
	</div>
</div>

<!-- <Theme /> -->
