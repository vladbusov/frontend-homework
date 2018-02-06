'use strict';

/**
 * Получения двумерный массив анаграмм из произвольного массива слов
 * @param   {string[]} input
 * @returns {Array.<string.<string>>}
 */
const anagram = input => {
	const anagrams = new Map();
	input.forEach(word => {
		let sorted = word.toLowerCase().split('').sort().join();
		if (anagrams.has(sorted)) {
			anagrams.get(sorted).push(word);
		} else { 
			anagrams.set(sorted,new Array(word));
		}; 
	});

	const output = new Array();
	for (let group of anagrams.values() ){
		group = Array.from(new Set(group));
		if ( group.length > 1 ){ 
			output.push( group.sort() ); 
		}
	}

	return output.sort(); 
};
