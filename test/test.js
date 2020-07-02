
list = [{"a": [1, 2, 3]}, {"b": [4, 5, 6]}];

data = [];

function handleFetchData(pv)
{
    // console.log(this.list.pv)
    // console.log(pv, typeof (pv))
    for (const i of list) {
        // console.log(i, typeof (i))
        // console.log(i[pv])
        if (i[pv]) {
            console.log(i[pv]);
            data = i[pv]
        }
    }
}

handleFetchData('a');

console.log(data);
