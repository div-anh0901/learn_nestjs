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

function SchedulingDeadline(jobs: Job[]): Job[]{

    const result: Job[] = []
    jobs.sort((a , b) => b.profit - a.profit);
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));

    const slots: (string | null)[] = new Array(maxDeadline).fill(null);

    for(const job of jobs){



    }

    return result;
}




