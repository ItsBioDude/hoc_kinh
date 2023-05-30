// src/routes/+layout.ts
import type { LayoutLoad } from './$types';
// import type { Database } from '../DatabaseDefinitions';

export const prerender = true;
// export const load: LayoutLoad = async ({ fetch, data, depends }) => {
// 	// depends('supabase:auth');

// 	// return { supabase, session };
// };

export function load({ url }) {
	return {
		url: url.pathname,
	};
}
