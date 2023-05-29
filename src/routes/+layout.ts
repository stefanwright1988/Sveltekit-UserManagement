import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
    depends('supabase:auth')

    const supabase = createSupabaseLoadClient({
        supabaseUrl: data.supabaseUrl,
        supabaseKey: data.supabaseAnonKey,
        event: { fetch },
        serverSession: data.session,
    })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    const commitRef = data.commitRef

    return { supabase, session, commitRef }
}