export const getIndexOf = ({ array, key1, key2 }) => {
    return array.indexOf( array.filter((l) => l[key1] === key2)[0] );
};