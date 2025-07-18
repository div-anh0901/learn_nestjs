//tham lam 
// từ mảng lấy ra lựa chọn tối ưa nhất
/*
    vị dụ 1 : đổi tiền

*/
function changeMoney(amount, coins) {
    var result = [];
    coins.sort(function (a, b) { return b - a; }); // Sắp giảm dần
    for (var _i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
        var coin = coins_1[_i];
        while (amount >= coin) {
            amount -= coin;
            result.push(coin);
        }
    }
    return result;
}
function fractionalKnapsack(items, maxWeight) {
    // Tính tỉ lệ value/weight và sắp xếp giảm dần
    items.sort(function (a, b) { return (b.value / b.weight) - (a.value / a.weight); });
    var totalValue = 0;
    var currentWeight = 0;
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if (currentWeight + item.weight <= maxWeight) {
            // lấy toán bộ vặt trong balo
            totalValue += item.value;
            currentWeight += item.weight;
        }
        else {
            // lấy một phần vật pẩm
            var remain = maxWeight - currentWeight;
            totalValue += (item.value / item.weight) * remain;
            break;
        }
    }
    return totalValue;
}
function activitySelection(activities) {
    //Sắp xếp thời gian kết thúc tăng dần.
    activities.sort(function (a, b) { return a.end - b.end; });
    var result = [];
    var lastEndTime = 0;
    for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
        var activity = activities_1[_i];
        console.log(activity);
        if (activity.start <= lastEndTime) {
            result.push(activity);
            lastEndTime = activity.end;
        }
    }
    return result;
}
var activities = [
    { start: 1, end: 3 },
    { start: 0, end: 6 },
    { start: 8, end: 9 },
    { start: 5, end: 9 },
    { start: 5, end: 7 },
    { start: 3, end: 4 },
    { start: 3, end: 5 },
];
var selected = activitySelection(activities);
console.log("Selected activities:", selected);
