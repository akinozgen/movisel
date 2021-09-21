import { createStore } from "vuex";
import { createClient } from "@supabase/supabase-js";

export default createStore({
    state: {
        supabase: createClient(process.env.VUE_APP_SUPABASE_URL, process.env.VUE_APP_SUPABASE_PUBLIC_KEY)
    }
});