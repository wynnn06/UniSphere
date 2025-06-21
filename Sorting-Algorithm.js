//!!!!!!!!!!NOT CONNECTED YET 

/*  Algorithm used: Quick Sort 
    Pivot selected: Last element
    Sort by key (Organization Name): Ascending and Descending
*/


//Function Declartion of Quick Sort Algorithm
function quicksort(array, key){
    if (array.length<=1) 
        return array; //Base Case 

    const pivot = array[array.length - 1]; //Pivot is last element
    const left = [];
    const right =[];

    //Compare each item with the pivot 
    for (let i = 0; i < array.length-1; i++){

        //Convert organization names to lowercase 
        if (array[i][key].toLowerCase() < pivot[key].toLowerCase()){
            left.push(array[i]); //Put smaller values in the left array
        }else{
            right.push(array[i]);//Put larger or equal values (to the pivot) in the right array
        }
    }

    // Recursively sort left and right arrays, and combine them with pivot
        const sortedArray = [...quicksort(left, key), pivot, ...quicksort(right, key)];
        console.log("Sorted result:", sortedArray); 
        return sortedArray;
}





