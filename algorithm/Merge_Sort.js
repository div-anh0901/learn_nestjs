function mergeSort(arr) {
    if (arr.length <= 1)
        return arr;
    var mid = Math.floor(arr.length / 2);
    var left = mergeSort(arr.slice(0, mid));
    var right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
function merge(left, right) {
    var result = [];
    var i = 0, j = 0;
    //So sánh từng phần từ và trộn lại
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j])
            result.push(left[i++]);
        else
            result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}
var arr = [5, 2, 9, 1, 3, 6];
console.log("Sorted:", mergeSort(arr)); // [1, 2, 3, 5, 6, 9]
