'use strict';

function unique(arr) {
  var obj = {}; /* kortej dlya hraneniya slow */

  for (var i = 0; i < arr.length; i++) { // perebor
    var str = arr[i]; // berem slowo
    obj[str] = true; // sozdanie stroki kak svoystwo ob'ecta
  }

  return Object.keys(obj); // perebor klyuchey
}

function anagram(input){
	// dwa massiva - odin dlya otweta, drugoy dlya anagramm
	var anagrams = {};
	var output = [];

	for (var i in input) {
		var word = input[i];
		// poluchaem slowo
		word = word.toLowerCase();
		// preobrazuem v nijniy register / razbivaem po simvolam / sortiruem simvoli po alfavitu
		var sorted = word.split("").sort().join();
		// soedinyaem obratno v stroku
		if (anagrams[sorted] != null) anagrams[sorted].push(word); 
		// esly v massive est kluch - dobavlyaem slowo
		else anagrams[sorted] = [ word ]; // esly net, to sozdaem massiv
	}

	for (var angm in anagrams){
		anagrams[angm] = unique(anagrams[angm]); // ubiraem is massiva odinakowie slowa
		if ( anagrams[angm].length > 1 ){ // elsli slov v massive bolshe 1
			output.push( anagrams[angm].sort() ); // dobavlyaem otsortirovanniy massiv v otwet
		}
	}
	return output.sort(); // sortiruem i vozvrashaem otwet
};
