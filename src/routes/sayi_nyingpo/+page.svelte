<script lang="ts">
	import { presetUno } from 'unocss';
	import { createForm } from 'felte';
	import { DateInput } from 'date-picker-svelte';
	import dayjs from 'dayjs';

	// import StatisticLineGraph from '$lib/StatisticLineGraph.svelte';
	import StatisticPage from '$lib/StatisticPage.svelte';
	import DateCard from '$lib/DateCard.svelte';
	import { supabase } from '$lib/supabaseClient.ts';

	import SubmitForm from '$lib/SubmitForm.svelte';
	import OpenMenu from '$lib/OpenMenu.svelte';

	// Query Data from Supabase
	let visible = false;
	let menuVisible = false;
	let page = 0;
	let size = 10;
	let created_at = new Date();
	// let dates = [];
	export let data;

	// TODO: Typescript
	let { dates, session } = data;
	$: ({ dates } = data);
	dates.sort((a, b) => b.id - a.id); // b - a for reverse sort
	// console.log(dates);
	let dates_length = dates.length;
</script>

<!-- TODO: https://unocss.dev/presets/wind#breakpoints - Add breakpoints -->
<svelte:head>
	<title>Green Tara</title>
</svelte:head>

<main class="h-screen sm:overflow-hidden">
	<StatisticPage pictureName="sayi_nyingpo-new.jpg">
		<!-- TODO: Check back on fixing view width -->
		<div
			class="scrollbar scrollbar-rounded lg:max-w-60vw dark:(scrollbar-track-color-gray-700 scrollbar-thumb-color-gray-600) overflow-y-scroll max-h-[90vh] flex flex-col gap-2 md:gap-4 m-2 p-2
            md:(px-4 py-4) md:(mt-4 mr-10)"
		/>
	</StatisticPage>
	<OpenMenu bind:menuVisible bind:visible {session} />
</main>
