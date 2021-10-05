import SupaBase from "../stores/SupaBase";
import AuthStore from "../stores/AuthStore";

export const getIndexOf = ({ array, key1, key2 }) => {
    return array.indexOf( array.filter((l) => l[key1] === key2)[0] );
};

export const dbSelect = ({ table, match = null, or = null, orderCol = null, asc = false }) => {
    let query = SupaBase
            .state
            .supabase
            .from(table)
            .select();

    if (match !== null) {
        query = query.match(match);
    }

    if (or !== null) {
        query = query.or(or);
    }

    if (orderCol !== null) {
        query = query.order(orderCol, {
            ascending: asc
        });
    }

    return query;
};

export const dbInsert = ({ table, data }) => {
    return SupaBase
        .state
        .supabase
        .from(table)
        .insert(data);
};

export const dbDelete = ({ table, match }) => {
    return SupaBase
        .state
        .supabase
        .from(table)
        .delete()
        .match(match);
};

export const dbUpdate = ({ table, data, match }) => {
    return SupaBase
        .state
        .supabase
        .from(table)
        .update(data)
        .match(match);
}

export const getUser = async ({ user_id }) => {
    const { data: userData, error: userError } = await dbSelect({
        table: 'users',
        match: { user_id }
    });

    if (userError) return null;

    return userData[0];
};

export const isFollowingUser = ({ user_id }) => {
    return AuthStore
        .state
        .userFollows
        .filter((user) => parseInt(user) === parseInt(user_id)).length > 0;
};