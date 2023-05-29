import { PRIVATE_SUPABASE_ANON_KEY, PRIVATE_SUPABASE_URL } from '$env/static/private'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PRIVATE_SUPABASE_URL,
        supabaseKey: PRIVATE_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
}