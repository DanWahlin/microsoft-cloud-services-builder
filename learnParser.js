'use strict';

const fs = require('fs'),
    axios = require('axios'),
    cheerio = require('cheerio'),
    download = require('image-downloader')

loadServices();

async function loadServices() {
    const services = JSON.parse(fs.readFileSync(__dirname + '/public/data/services.json', 'utf8'));

    for (let service of services) {
        if (service.learnContent) {
            for (let learnContent of service.learnContent) {
                if (learnContent.type === 'path' && !learnContent.modules) {
                    const {title, image, modules} = await getHtml(learnContent.url, service, learnContent); 
                    learnContent.title = title;
                    learnContent.image = image;
                    learnContent.modules = modules;
                }
            }
        }
    }

    fs.writeFileSync(__dirname + '/public/data/services.json', JSON.stringify(services, '', 2));
}

async function getHtml(url, service, learnContent) {   
    const response = await axios.get(url);
    return parseData(response.data, service, learnContent);
}

function parseData(html, service, learnContent) {
    const $ = cheerio.load(html);
    const prefix = 'https://docs.microsoft.com/';

    const modules = [];
    // get header info
    const title = $('h1.title').text();
    const image = prefix + $('img[role="presentation"]').attr('src').replace('/en-us/', '');

    $('div[data-bi-name=module] div.column>a').map((index, element) => {
        const url = element.attribs.href.trim().replace('../../', 'https://docs.microsoft.com/learn/');
        const moduleName = $(element).find('h3').text().trim();
        if (url) {
            modules.push({ 
                name: moduleName,
                url
            });
        }
    });

    console.log(service.name, modules);
    return {title, image, modules};
}

function downloadImage(url, filepath) {
    return download.image({
        url,
        dest: filepath 
    });
}



