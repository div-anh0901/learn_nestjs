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

function changeMoney(amount: number, coins: number[]): number[] {
  const result: number[] = [];
  coins.sort((a, b) => b - a); // Sắp giảm dần

  for (const coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      result.push(coin);
    }
  }

  return result;
}

//console.log(changeMoney(1200, [1000, 500, 200, 100]));

/* 
    vị dụ 2 : sắp xếp vật dụng vào balo;
    Bạn có một balo trọng lượng tối đa W.
    Có nhiều vật phẩm với trọng lượng w[i] và giá trị v[i].
    Hỏi nên lấy vật nào để tối đa hóa giá trị, cho phép lấy 1 phần của vật.
*/

type Items ={
    value: number;
    weight: number;
}

function fractionalKnapsack(items: Items[], maxWeight: number):number{
      // Tính tỉ lệ value/weight và sắp xếp giảm dần
      items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));
    
    let totalValue =0;
    let currentWeight  = 0 ;

    for(const item of items){
        if(currentWeight + item.weight <= maxWeight){
          
            // lấy toán bộ vặt trong balo
            totalValue += item.value;
            currentWeight += item.weight;
        }else {
            // lấy một phần vật pẩm
            const remain = maxWeight - currentWeight;
            totalValue += (item.value /item.weight) * remain;
            break;
        }
    }

    return totalValue;
}

/*const items: Items[] = [
    { value: 60, weight: 10 },
    { value: 100, weight: 20 },
    { value: 120, weight: 30 },
  ];
  
const maxWeight = 50;
console.log(fractionalKnapsack(items, maxWeight)); // Output: 240*/


/*
    Ví dụ 3: Activity Selection (Chọn hoạt động không chồng chéo)
    Cho danh sách các hoạt động với thời gian bắt đầu và kết thúc.
    Chọn số hoạt động nhiều nhất, không bị chồng lẫn nhau.

*/

type Activity = {
    start: number;
    end: number;
  };

function activitySelection(activities: Activity[]):Activity[]{
    //Sắp xếp thời gian kết thúc tăng dần.

    activities.sort((a , b) => a.end - b.end);

    const result: Activity[] = [];

    let lastEndTime = 0;

    for(const activity of activities){
        if(activity.start >= lastEndTime){
            result.push(activity);
            lastEndTime = activity.end;
        }


    }

    return result;
}

/*
const activities: Activity[] = [
    { start: 1, end: 3 },
    { start: 0, end: 6 },
    { start: 8, end: 9 },
    { start: 5, end: 9 },
    { start: 5, end: 7 },
    { start: 3, end: 4 },
    { start: 3, end: 5 },
];
  

const selected = activitySelection(activities);
console.log("Selected activities:", selected);*/

/*
    Ví dụ 5: Job Scheduling với Deadline
    Có n công việc, mỗi việc có:

    profit: lợi nhuận khi làm việc đó.
    deadline: thời điểm muộn nhất có thể hoàn thành.

    Mỗi công việc cần đúng 1 đơn vị thời gian.
    Hãy chọn công việc để tối đa hoá lợi nhuận.

*/

type Job = {
    id: string;
    profit: number;
    deadline: number;
}



function jobScheduling(jobs: Job[]): string[] {
    jobs.sort((a, b) => b.profit - a.profit);
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const slots: (string | null)[] = new Array(maxDeadline).fill(null);
    for (const job of jobs) {
      for (let i = job.deadline - 1; i >= 0; i--) {
        if (!slots[i]) {
            console.log(job)
          slots[i] = job.id;
          break;
        }
      }
    }
  
    return slots.filter(Boolean) as string[];
  }

/*const jobs: Job[] = [
    { id: 'a', profit: 100, deadline: 2 },
    { id: 'b', profit: 19, deadline: 1 },
    { id: 'c', profit: 27, deadline: 2 },
    { id: 'd', profit: 25, deadline: 4 },
    { id: 'e', profit: 15, deadline: 6 },
  ];
  
  console.log("Selected jobs:", jobScheduling(jobs)); */


  /**
   
        Huffman Encoding xây dựng một cây nhị phân sao cho:
        Ký tự có tần suất cao sẽ có mã nhị phân ngắn hơn.
        Ký tự ít xuất hiện sẽ có mã nhị phân dài hơn.
        Tổng độ dài mã hóa toàn bộ dữ liệu là nhỏ nhất có thể.
   */

type HuffmanNode = {
    char?: string; // Nếu là nút lá
    freq: number;
    left?: HuffmanNode;
    right?: HuffmanNode;
};

// Tạo cây Huffman
function buildHuffmanTree(text: string): HuffmanNode {
    const freqMap = new Map<string, number>();

    // Bước 1: Đếm tần suất
    for (const char of text) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    // Bước 2: Tạo danh sách các node
    let nodes: HuffmanNode[] = Array.from(freqMap.entries()).map(([char, freq]) => ({
        char,
        freq,
    }));

    // Bước 3: Xây cây Huffman bằng Greedy
    while (nodes.length > 1) {
        // Sắp xếp tăng dần theo freq
        nodes.sort((a, b) => a.freq - b.freq);

        const left = nodes.shift()!;
        const right = nodes.shift()!;

        const merged: HuffmanNode = {
        freq: left.freq + right.freq,
        left,
        right,
        };

        nodes.push(merged);
    }

    return nodes[0]; // Trả về gốc cây
}
function generateCodes(node: HuffmanNode, path = "", map = new Map<string, string>()): Map<string, string> {
    if (!node.left && !node.right && node.char) {
        map.set(node.char, path);
    }

    if (node.left) generateCodes(node.left, path + "0", map);
    if (node.right) generateCodes(node.right, path + "1", map);

    return map;
}


// Mã hóa chuỗi
function encode(text: string): { encoded: string; codes: Map<string, string>; tree: HuffmanNode } {
    const tree = buildHuffmanTree(text);
    const codes = generateCodes(tree);
  
    const encoded = text.split("").map(char => codes.get(char)).join("");
  
    return { encoded, codes, tree };
  }
//decode
  function decode(encoded: string, tree: HuffmanNode): string {
    let result = "";
    let current = tree;
  
    for (const bit of encoded) {
      if (bit === "0") {
        current = current.left!;
      } else {
        current = current.right!;
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
/*
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
*/





/*

    Tại một ga tàu, có nhiều chuyến tàu đến và rời đi vào các thời điểm khác nhau.
    Mỗi tàu cần một platform (sân đỗ) riêng để tránh va chạm.

    Câu hỏi:
    Tính số platform tối thiểu cần thiết tại ga để không có hai chuyến tàu nào đến và rời cùng lúc.
*/


function findMinimumPlatforms(arrival: number[],departure: number[]): number{
    const n = arrival.length;


    //Sắp xếp thòi gian đếm;
    arrival.sort((a, b) => a - b);
    departure.sort((a,b)=> a - b);

    let platformsNeeded = 0;
    let maxPlatforms = 0;

    let i =0; // con tro den
    let j = 0; // con tro di


    //duyen tung su kien den va di
    while(i < n && j < n){
        if(arrival[i] < departure[j]){
            platformsNeeded++;
            if(maxPlatforms <= platformsNeeded)
            {
                maxPlatforms = platformsNeeded

            }
            console.log("platforms: " + maxPlatforms)
            i++
        }else {
            platformsNeeded--;
            j++
        }
    }

    return maxPlatforms;
}


// vi du;
const arrival = [900, 910, 930, 1000, 1020, 1040, 1050, 1060, 1070];
const departure = [940, 950, 1010, 1030, 1100, 1110, 1110,1110, 1110];

const result = findMinimumPlatforms(arrival, departure);
console.log("Số sân ga tối thiểu cần thiết:", result); // Kết quả: 3

console.log(Math.max(5, 1))

