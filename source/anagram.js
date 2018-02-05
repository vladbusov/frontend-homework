'use strict';

/**
 * Получения двумерный массив анаграмм из произвольного массива слов
 * @param   {string[]} input
 * @returns {Array<[string, string]>}
 */
const anagram = input => {
	let anagrams = new Map();
	input.forEach( word => {
		word = word.toLowerCase();
		var sorted = word.split("").sort().join();

		if (anagrams.has(sorted)) {
			anagrams.get(sorted).push(word);
		} else { 
			anagrams.set(sorted, new Array(word) );
		}; 
		
	});
	
	let output = new Array();
	for (let group of anagrams.values() ){
		group = Array.from(new Set(group));
		if ( group.length > 1 ){ 
			output.push( group.sort() ); 
		}
	}

	return output.sort(); 
};
