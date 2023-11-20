import { createStore } from "vuex";
import { createClient } from "@supabase/supabase-js";

export default createStore({
    state: {
        supabase: createClient(import.meta.env.VITE_APP_SUPABASE_URL, import.meta.env.VITE_APP_SUPABASE_PUBLIC_KEY)
    }
});