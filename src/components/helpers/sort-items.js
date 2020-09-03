export function sortItems(array, direction, type){
    return array.sort((a, b) => {
        if(type === "alphabet"){
            // alphabet
            const isDesc = direction === "asc" ? 1 : -1;
            return isDesc * a.name.localeCompare(b.name);
        } else if(type === "count"){
            // number
            // If i where to sort by date's I would use something like : https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
            const isDesc = direction === "asc" ? 1 : -1;
            return isDesc * (a.playcount - b.playcount);
        }
    });
}