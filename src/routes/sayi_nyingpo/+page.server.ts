// import { supabase } from '$lib/supabaseClient';
// import type { PageServerLoad } from './$types';

// export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
// 	const session = await getSession();
// 	// console.log(session);
// 	let fileName;
// 	const { data } = await supabase
// 		.from('main')
// 		.select('id, created_at, tara, taras_homage, lay_dai, hang_phuc');
// 	return {
// 		dates: data ?? [],
// 	};
// };
