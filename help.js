'use strict';

const co = require('co');
const promisify = require('promisify-node');
const exec = require('child_process').exec;
const fs = promisify('fs');
const help = require('./help');

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

const greet = n => `# frontend-homework-${n}
#### Simple homework for students №${n}

В этом репозитории содержится условие варианта №${n} домашнего задания. Чтобы начать с ним работать, вам необходимо склонировать репозиторий к себе на компьютер и перейти в ветку своего варианта.
`;


const createVariant = function *({desc:description, name, number}, names, readme, index) {
	console.log(`\n\n\n####################################`);
	console.log(`Process variant-${number}`);


	yield e(`git checkout master`);
	yield e(`git reset --hard`);
	yield e(`git checkout -b variant-${number}`);

	yield fs.writeFile('index.html', index
		.replace(`<title>Homework №</title>`, `<title>Homework №${number}</title>`)
		.replace(`<script src="tests/name.js"></script>`, `<script src="tests/${name}.js"></script>`)
	);
	yield fs.writeFile('README.md', readme
		.replace('{{{greet}}}', greet(number))
		.replace('{{{task}}}', description)
	);

	const filesToRemove = names
		.filter(n => n !== name)
		.map(n => `tests/${n}.js`)
		.join(' ');

	console.log(filesToRemove);


	yield e('rm ' + filesToRemove);
	yield e('rm descs.txt');
	yield e('rm help.js');
	yield e('rm -rf node_modules/');
	yield e('rm tests/merge.js');

	yield e(`git add .`);
	yield e(`git add --all`);
	yield e(`git commit -am "Init variant ${number}"`);
	yield e(`git push -u origin variant-${number}:variant-${number}`);
};

co(function *() {
	const descsSource = yield fs.readFile('descs.txt', 'utf-8');
	const readme = yield fs.readFile('README.md', 'utf-8');
	const index = yield fs.readFile('index.html', 'utf-8');
	const descs = descsSource
		.split('\n')
		.filter(s => s)
		.map(s => s.trim().slice(2))
		.sort();

	const names = [];

	const variants = descs.map((desc, number) => {
		const name = desc.match(/`(.+)`/i)[1];
		names.push(name);
		return {name, desc, number: number + 1};
	});

	for (const variant of variants) {
		yield * createVariant(variant, names, readme, index);
	}
}).catch(console.error);
