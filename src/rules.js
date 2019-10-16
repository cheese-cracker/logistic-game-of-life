export default function rules(arr, newArr, rows, cols, prev_count, r, K){
    let count = 0;
    let selected = [];
    let removed = [];
    // let r = 0.2;
    // let K = rows*cols/5;
    // console.log('grow', r, K);
    // Logistic Growth 
    let growth;
    growth = r * (1 - prev_count/K) * prev_count;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            var adjacent = 0;

            // adjacent - left and right
            if (i !== 0){
                adjacent += arr[i - 1][j] ? 1 : 0;
            }
            if (i !== rows - 1){
                adjacent += arr[i + 1][j]?  1 : 0;
            }

            // adjacent - top and bottom
            if (j !== 0){
                adjacent += arr[i][j - 1] ? 1 : 0;
            }
            if (j !== cols - 1){
                adjacent += arr[i][j + 1] ? 1 : 0;
            }

            // diagonals
            if (i !== 0 && j !== 0){
                adjacent += arr[i - 1][j - 1] ? 1 : 0;
            }
            if (i !== 0 && j !== cols - 1){
                adjacent += arr[i - 1][j + 1] ? 1 : 0;
            }
            if (i !== rows - 1 && j !== 0){
                adjacent += arr[i + 1][j - 1]? 1 : 0;
            }
            if (i !== rows - 1 && j !== cols - 1){
                adjacent += arr[i + 1][j + 1]? 1 : 0;
            }


             // check rules for life and create/destroy
            if(arr[i][j]){
                if (adjacent < 2 || adjacent > 3){
                    newArr[i][j] = false;
                }else{
                    count++;
                    removed.push([i, j]);
                }
            }

            if(!(arr[i][j])){
                if(adjacent === 3){
                    count++;
                    newArr[i][j] = true;
                }else if(adjacent === 2){
                    selected.push([i, j]);
                }
            }

        }
    }
    console.log('count_old', count);
    let boost;
    if(r){
        boost = prev_count + growth - count;
    }else{
        boost = 0;
    }
    // console.log(boost);
    let treshold = 0;
    if (boost > 0){
        treshold = boost/selected.length;
        selected.forEach((el) => {
            let simulated = Math.random();
            if(simulated < treshold){
                newArr[el[0]][el[1]] = true;
                count++;
            }
        });
    }else if (boost < 0){
        treshold = - boost/removed.length;
        removed.forEach((el) => {
            let simulated = Math.random();
            if(simulated < treshold){
                newArr[el[0]][el[1]] = false;
                count--;
            }
        });
    }
    // console.log(selected.length, removed.length);
    return [newArr, count];
};
