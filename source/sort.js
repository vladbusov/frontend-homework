'use strict';

const sort = str => {
	const uniSort = (a, b) => Intl.Collator().compare(a, b);
	//const arr = str.split(' ');
	return str.split(' ').map( word => {
		let output = word.split('').sort(uniSort).join('');
		output = output.charAt(0).toUpperCase() + output.substr(1).toLowerCase();
		return output;
	}).sort(uniSort).join(' ');
}