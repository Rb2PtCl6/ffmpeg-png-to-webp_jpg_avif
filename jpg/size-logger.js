const fs=require('fs');
const path = require('path');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

function csv(data){
	const keys = Object.keys(data);
	const headers = Object.keys(data[keys[0]]);
	var rows = [];

	// Добавляем заголовки в массив rows
	rows.push(['q', ...headers]);

	// Добавляем значения в массив rows
	keys.forEach((key) => {
		const row = [key, ...headers.map((header) => data[key][header])];
		rows.push(row);
	});

	// Создание CSV-строки
	var csvContent = rows.map(row => row.join(',')).join('\n');

	// Запись данных в файл
	fs.writeFile('img_q_jpg_b.csv', csvContent, (err) => {
		if (err) throw err;
		console.log('Conversion completed. CSV file saved as img_q_jpg_b.csv');
	});
}

var img_q={}
var img_name=getFiles("originals")
for (var q=2;q<32;q++){
    img_q[`${q}q`]={}
}
//console.log(img_q)

var keys=new Array;
var keys_counter=0;
for (var name of img_name){
    keys[keys_counter]=path.basename(name, path.extname(name))
    keys_counter++
}
//console.log(keys)
for (var key of keys){
    var files=getFiles(`rezult-${key}`)
    for (var file of files){
        for (var q=2;q<32;q++){
            if (file.indexOf(`-${q}q.jpg`)>0){
                img_q[`${q}q`][key]=(fs.statSync(file)).size
                console.log(file)
            }
        }
    }
}
//console.log(img_q)
//img_q['quality']={}
//for (var key of keys){
    //img_q['quality'][key]=key
//}
console.log(img_q)
var img_q_keys=Object.keys(img_q)
console.log(img_q_keys)

fs.appendFileSync("img_q_jpg_b.json",JSON.stringify(img_q))
fs.appendFileSync("img_q_keys_jpg.json",JSON.stringify(img_q_keys))

csv(img_q)