'use strict';

const   fs = require('fs'),
        request = require('request'),
        cheerio = require('cheerio'),
        download = require('image-downloader'),
        userArgs = process.argv.slice(2);

let url = (userArgs.length === 0) ? 'https://azurecharts.com/overview' : userArgs[0];

getHtml();

function getHtml() {   
    var options = {
        url: url,
        header: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
            "Accept": "*/*"
        }
    };
    
    request(options, function (err, resp, body) {
        parseData(body);
    });
}

function parseData(html) {
    const $ = cheerio.load(html);
    const output = [];
    // get header info
    const headers = $('table.table th');
    for (var i = 0;i < headers.length; i++) {
        const categoryName = headers[i].children[0].data.trim();
        if (categoryName) {
            output.push({ 
                id: i + 1,
                category: categoryName, 
                services: [],
                className: ''
            });
        }
    }
    console.log('Category total: ', headers.length - 1);

    const serviceTds = $('table.table td');
    let counter = 0;

    for (var i = 0; i < serviceTds.length; i++) {
        let serviceTd = serviceTds[i];
        if (counter < headers.length && serviceTd.children[3]) {
            const serviceData = serviceTd.attribs.title.replace(/<h6>(.*?)<\/h6>/g, '').replace(/<[^>]*>/g, '').replace('[Click to open 360&deg; view]', '');
            const serviceName = serviceTd.children[3].data.trim();
            const className = serviceTd.attribs.class.split(' ')[0];
            const imgSrc = serviceTd.children[1].attribs.src;
            const imgFileName = serviceTd.children[1].attribs.src.split("/").pop();
            // console.log(serviceName, counter);
            output[counter].className = className;
            output[counter].services.push({ 
                id: i + 1,
                name: serviceName,
                desciption: serviceData,
                image: imgFileName
                // imgSrc
            });
            downloadImage(imgSrc, __dirname + '/public/images');
        }
        counter++;
        if (counter >= headers.length) {
            counter = 0;
        }
    }

    console.log('Total Azure Services: ', serviceTds.length);
    console.log('Creating data/services.json');
    fs.writeFileSync(__dirname + '/public/data/services.json', JSON.stringify(output, '', 2));

}

function downloadImage(url, filepath) {
    return download.image({
        url,
        dest: filepath 
     });
}


    /*for (var i = 0; i < data.length; i++) {
    	var item =  data[i];
    	var text = (item.excerptText !== undefined) ? item.excerptText : '';
  		outputHtml += '<li class="flipBoardItem">' +
  		              '<a class="flipBoardLink" href="' + 
  		              item.sourceURL + '">' + 
  					  item.title + 
  					  '</a></li>';
    };

    //Write output to file
    fs.appendFile('flipBoard.html', '<ul class="flipBoardItems">' + outputHtml + '</ul>', 
    	function (err) {
		  if (err) throw err;
		  console.log('Saved file!');
	});
    */



