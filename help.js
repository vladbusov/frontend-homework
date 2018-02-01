'use strict';

const co = require('co');
const promisify = require('promisify-node');
const exec = require('child_process').exec;
const fs = promisify('fs');
const descs = require('./descs');

const e = function (cmd) {
	return new Promise(function (resolve, reject) {
		console.log('> $ ' + cmd);

		exec(cmd, function (err, stdout, stderr) {
			if (err) {
				reject(err);
			}
			console.log('\t\t\t\t\t...OK!');
			resolve(stdout);
		});
	});
};


const createVariant = function *({ desc: description, name, number }, names, readme, index) {
	console.log(`\n\n\n####################################`);
	console.log(`Process variant-${number}`);


	yield e(`git checkout master`);
	yield e(`git reset --hard`);
	yield e(`git checkout -b variant-${number}`);

	yield fs.writeFile('index.html', index
		.replace(/{{{VAR}}}/ig, number.toString)
		.replace(/{{{NAME}}}/ig, name),
	);
	yield fs.writeFile('README.md', readme
		.replace(/{{{VAR}}}/ig, number.toString)
		.replace('{{{TASK}}}', description),
	);

	const filesToRemove = names
		.filter(n => ![name, 'max'].includes(n))
		.map(n => `tests/${n}.js`)
		.join(' ');

	console.log(filesToRemove);


	yield e('rm ' + filesToRemove);
	yield e('rm descs.js');
	yield e('rm help.js');
	// yield e('rm -rf node_modules/');

	yield e(`git add .`);
	yield e(`git add --all`);
	yield e(`git commit -am "Подготовка варианта ${number}"`);
	yield e(`git push -u origin variant-${number}:variant-${number}`);
};

co(function *() {
	const readme = yield fs.readFile('README.md', 'utf-8');
	const index = yield fs.readFile('index.html', 'utf-8');

	const names = [];

	const variants = descs.map((desc, number) => {
		const name = desc.match(/`(.+)`/i)[ 1 ];
		names.push(name);
		return { name, desc, number: number + 1 };
	});

	for (const variant of variants) {
		yield *createVariant(variant, names, readme, index);
	}
}).catch(console.error);
