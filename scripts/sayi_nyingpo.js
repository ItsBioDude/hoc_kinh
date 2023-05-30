import * as fs from 'fs';
// import { readFile, writeFile } from 'node:fs';
// const fs = require('fs');
for (let i = 1; i < 14; i++) {
	fs.readFile(`data/sayi_nyingpo/p${i}.txt`, 'utf8', (err, data) => {
		if (err) throw err;
		let outputData = data.split('\r\n'),
			output = { word: [], para: outputData };
		// output.para = outputData;
		// outputData.forEach((e, i) => {
		// 	output.word.push(e.split(' '));
		// });

		fs.writeFileSync(
			`static/data/sayi_nyingpo/p${i}.json`,
			JSON.stringify(output),
			'utf8'
		);
	});
}

// fs.readFile('data/sayi_nyingpo/p1.txt', 'utf8', (err, data) => {
// 	if (err) throw err;
// 	console.log(typeof data);
// 	let outputData = data.split('\r\n'),
// 		output = [];
// 	outputData.forEach((e, i) => {
// 		output.push(e.split(' '));
// 	});

// 	fs.writeFileSync('p1.json', JSON.stringify(output), 'utf8');
// });
// console.log(fs.readFileSync('/src/data/sayi_ningpo.txt'));
// data.push(
// )x
