/* global browser */

const today = document.getElementById('today');
const yesterday = document.getElementById('yesterday');
const twodaysago = document.getElementById('twodaysago');
const threedaysago = document.getElementById('threedaysago');
const fourdaysago = document.getElementById('fourdaysago');
const fivedaysago = document.getElementById('fivedaysago');
const sixdaysago = document.getElementById('sixdaysago');
const sevendaysago = document.getElementById('sevendaysago');

async function getVisitsCountXDaysAgo(X){
    // go to the day we are interested in
    let start = new Date();
    start.setDate(start.getDate() - X); // back in time
    start.setHours(0,0,0,0);  // set to midnight

    let end = new Date();
    if(X > 0){
         // to next days beginning
        end.setDate(start.getDate() + 1);
        end.setHours(0,0,0,0);
    }
    return getVisitsCountInRange(start,end);
}

// startTime Epoch
async function getVisitsCountInRange(startTime,endTime) {
    const uniqURLs = new Set();
    (await browser.history.search({
        maxResults:Number.MAX_SAFE_INTEGER, // can not be set to -1 so we use a very high number
        text: "",  // retrieve all history.HistoryItem objects that meet all the other criteria
        startTime,
        endTime
    })).forEach( (item) => {
        if ( !uniqURLs.has(item.url) ){
            uniqURLs.add(item.url);
        }
    });
    return uniqURLs.size;
}

(async () => {
    today.innerText = await getVisitsCountXDaysAgo(0);
    yesterday.innerText = await getVisitsCountXDaysAgo(1);
    twodaysago.innerText = await getVisitsCountXDaysAgo(2);
    threedaysago.innerText = await getVisitsCountXDaysAgo(3);
    fourdaysago.innerText = await getVisitsCountXDaysAgo(4);
    fivedaysago.innerText = await getVisitsCountXDaysAgo(5);
    sixdaysago.innerText = await getVisitsCountXDaysAgo(6);
    sevendaysago.innerText = await getVisitsCountXDaysAgo(7);
})();

