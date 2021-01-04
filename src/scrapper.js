const puppeteer = require('puppeteer');
const util = require('./util');

exports.scrape = async (address, options, callback) => {

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: { width: 1024, height: 780, isMobile: false },
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    try {
        await page.evaluateOnNewDocument(() => {
            navigator.geolocation.getCurrentPosition = (cb) => {
                setTimeout(() => {
                    cb({
                        'coords': {
                            accuracy: 21,
                            altitude: null,
                            altitudeAccuracy: null,
                            heading: null,
                            latitude: 5.603717,
                            longitude: -0.186964,
                            speed: null
                        }
                    })
                }, options.timeout)
            }
        });

        await page.goto('https://ghanapostgps.com/map');

        await page.waitForFunction('document.querySelector("#location-detail > div > .da-code").innerText.length > 0');

        const searchValue = await page.$eval('#location-detail > div > .da-code', el => el.innerText);

        await page.click("#addrsearch");
        await page.keyboard.type(address);

        await page.keyboard.press('Enter');

        await page.waitForFunction(`document.querySelector("#location-detail > div > .da-code").innerText != '${searchValue}'`, { timeout: options.timeout || 10000 });


        const streetName = await page.$eval('.address-list > li.row:nth-child(2) > .col > .text-warning', el => el.innerText);
        const region = await page.$eval('.address-list > li.row:nth-child(3) > .col > .text-warning', el => el.innerText);
        const district = await page.$eval('.address-list > li.row:nth-child(4) > .col > .text-warning', el => el.innerText);
        const areaCode = await page.$eval('.address-list > li.row:nth-child(5) > .col > .text-warning', el => el.innerText);
        const postCode = await page.$eval('.address-list > li.row:nth-child(6) > .col > .text-warning', el => el.innerText);
        const latLng = await page.$eval('.address-list > li.row:nth-child(7) > .col > .text-warning', el => el.innerText);

        const data = {
            'digitalAddress': address,
            "streetName": streetName,
            "region": region,
            "district": district,
            "postCode": postCode,
            "area": areaCode,
            "latLng": util.parseLatLng(latLng)
        };

        await browser.close();

        // return data;
        callback(undefined, data);

    } catch (e) {
        await browser.close();
        console.log(e);

        // Return an error
        callback(
            {
                'success': false,
                'message': 'Something went wrong. Try again later'
            }, undefined
        );
    }
}
