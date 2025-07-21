//tham lam 
// từ mảng lấy ra lựa chọn tối ưa nhất
/*
    Thuật toán tham lam là một chiến lược giải bài toán bằng cách luôn chọn
     phương án tối ưu nhất tại từng bước hiện tại,
     với hy vọng rằng kết quả cuối cùng cũng là tối ưu.
    

     chú ý :Không xét toàn cục, chỉ nhìn cái "ngon nhất hiện tại".

    Để Greedy đảm bảo kết quả đúng, bài toán phải có 2 tính chất:
        - Tính chất chọn lựa tham lam (Greedy choice property): Chọn cái tốt nhất trước không ảnh hưởng đến kết quả cuối.
        - Tính chất con (Optimal substructure): Bài toán con cũng là bài toán cùng kiểu và có lời giải tối ưu.
*/
/*
    vị dụ 1 : đổi tiền

*/
function changeMoney(amount, coins) {
    const result = [];
    coins.sort((a, b) => b - a); // Sắp giảm dần
    for (const coin of coins) {
        while (amount >= coin) {
            amount -= coin;
            result.push(coin);
        }
    }
    return result;
}
function fractionalKnapsack(items, maxWeight) {
    // Tính tỉ lệ value/weight và sắp xếp giảm dần
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    let totalValue = 0;
    let currentWeight = 0;
    for (const item of items) {
        if (currentWeight + item.weight <= maxWeight) {
            // lấy toán bộ vặt trong balo
            totalValue += item.value;
            currentWeight += item.weight;
        }
        else {
            // lấy một phần vật pẩm
            const remain = maxWeight - currentWeight;
            totalValue += (item.value / item.weight) * remain;
            break;
        }
    }
    return totalValue;
}
function activitySelection(activities) {
    //Sắp xếp thời gian kết thúc tăng dần.
    activities.sort((a, b) => a.end - b.end);
    const result = [];
    let lastEndTime = 0;
    for (const activity of activities) {
        if (activity.start >= lastEndTime) {
            result.push(activity);
            lastEndTime = activity.end;
        }
    }
    return result;
}
function jobScheduling(jobs) {
    jobs.sort((a, b) => b.profit - a.profit);
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const slots = new Array(maxDeadline).fill(null);
    for (const job of jobs) {
        for (let i = job.deadline - 1; i >= 0; i--) {
            if (!slots[i]) {
                console.log(job);
                slots[i] = job.id;
                break;
            }
        }
    }
    return slots.filter(Boolean);
}
// Tạo cây Huffman
function buildHuffmanTree(text) {
    const freqMap = new Map();
    // Bước 1: Đếm tần suất
    for (const char of text) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    // Bước 2: Tạo danh sách các node
    let nodes = Array.from(freqMap.entries()).map(([char, freq]) => ({
        char,
        freq,
    }));
    // Bước 3: Xây cây Huffman bằng Greedy
    while (nodes.length > 1) {
        // Sắp xếp tăng dần theo freq
        nodes.sort((a, b) => a.freq - b.freq);
        const left = nodes.shift();
        const right = nodes.shift();
        const merged = {
            freq: left.freq + right.freq,
            left,
            right,
        };
        nodes.push(merged);
    }
    return nodes[0]; // Trả về gốc cây
}
function generateCodes(node, path = "", map = new Map()) {
    if (!node.left && !node.right && node.char) {
        map.set(node.char, path);
    }
    if (node.left)
        generateCodes(node.left, path + "0", map);
    if (node.right)
        generateCodes(node.right, path + "1", map);
    return map;
}
// Mã hóa chuỗi
function encode(text) {
    const tree = buildHuffmanTree(text);
    const codes = generateCodes(tree);
    const encoded = text.split("").map(char => codes.get(char)).join("");
    return { encoded, codes, tree };
}
//decode
function decode(encoded, tree) {
    let result = "";
    let current = tree;
    for (const bit of encoded) {
        if (bit === "0") {
            current = current.left;
        }
        else {
            current = current.right;
        }
        // Nếu tới nút lá, lấy ký tự
        if (!current.left && !current.right && current.char) {
            result += current.char;
            current = tree; // Quay lại gốc để đọc tiếp
        }
    }
    return result;
}
// Thử nghiệm
const input = "hoanganh0901";
const result = encode(input);
console.log("Ký tự -> Mã hóa:");
for (const [char, code] of result.codes.entries()) {
    console.log(`${char} -> ${code}`);
}
console.log("\nChuỗi gốc:", input);
console.log("Mã hóa Huffman:", result.encoded);
const decoded = decode(result.encoded, result.tree);
console.log("\nGiải mã:", decoded);
