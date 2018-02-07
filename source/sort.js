'use strict';

const sort = str => {
	const uniSort = (a, b) => Intl.Collator().compare(a, b);
	return str.split(' ').map( word => {
		// ((...args) => args)(...str) так ?
		let output = word.split('').sort(uniSort).join('');
		output = output.charAt(0).toUpperCase() + output.substr(1).toLowerCase();
		return output;
	}).sort(uniSort).join(' ');
	/*
	*	str.split(' ').reduce( (arr, word) => {
	*		let output = word.split('').sort(uniSort).join('');
	*		output = output.charAt(0).toUpperCase() + output.substr(1).toLowerCase();
	*		return arr.push(output);
	*	}, new Array() ).sort(uniSort).join(' ');
	*/
}