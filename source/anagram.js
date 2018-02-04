'use strict';

const unique = arr => {
	let map = new Map();
	let output = new Array();
	arr.forEach(function(item, i, array) { 
		if (!map.has(item)) { 
			map.set(item, true); 
			output.push(item); 
		} 
	});
	return output;
}


const anagram = input => {
	let anagrams = new Map();
	input.forEach( function(word, i, array) {
		word = word.toLowerCase();
		var sorted = word.split("").sort().join();
		if (anagrams[sorted] != null) { 
			anagrams[sorted].push(word) 
		} else { 
			anagrams[sorted] = [ word ];
		}; 
	});

	let output = new Array();
	for (let group of Object.values(anagrams) ){
		group = unique(group);
		if ( group.length > 1 ){ 
			output.push( group.sort() ); 
		}
	}
	return output.sort(); 
};
