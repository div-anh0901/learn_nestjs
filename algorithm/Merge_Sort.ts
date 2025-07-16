
function mergeSort(arr: number[]):number[]{
    if(arr.length <= 1)return arr;

    const mid = Math.floor(arr.length /2);
    const left = mergeSort(arr.slice(0, mid));
    const right= mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0 ,j = 0;
    //So sánh từng phần từ và trộn lại
    while(i < left.length && j < right.length){
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}


const arr = [5, 2, 9, 1, 3, 6];
console.log("Sorted:", mergeSort(arr)); // [1, 2, 3, 5, 6, 9]

