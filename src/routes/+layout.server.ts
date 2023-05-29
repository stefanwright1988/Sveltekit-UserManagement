import { PRIVATE_SUPABASE_ANON_KEY, PRIVATE_SUPABASE_URL, VERCEL_COMMIT_REF } from '$env/static/private';
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
    return {
        supabaseAnonKey: PRIVATE_SUPABASE_ANON_KEY,
        supabaseUrl: PRIVATE_SUPABASE_URL,
        commitRef: VERCEL_COMMIT_REF,
        session: await getSession(),
    }
}