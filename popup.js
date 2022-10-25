/* global browser */

const today = document.getElementById('today');
const yesterday = document.getElementById('yesterday');
const twodaysago = document.getElementById('twodaysago');
const threedaysago = document.getElementById('threedaysago');

async function getVisitsCountSinceBeginningOfXDaysAgo(X){
    let d = new Date();
    d.setDate(d.getDate() - X); // back in time
    d.setHours(0,0,0,0);  // set to midnight
    const startTime = d.getTime();
    return getVisitsCountSince(startTime);
}

// startTime Epoch
async function getVisitsCountSince(startTime) {

    const uniqURLs = new Set();
    const endTime = Date.now();
    //console.debug('Hours: ', (endTime-startTime)/1000/60/60);

    const uniq_visit_history_items = (await browser.history.search({
        text: "",  // retrieve all history.HistoryItem objects that meet all the other criteria
        startTime,
        endTime
    })).filter( (element) => {
        if ( uniqURLs.has(element.url) ){
            return false;
        }
        uniqURLs.add(element.url);
        return true;
    });
    return uniq_visit_history_items.length;
}

(async () => {
    today.innerText = await getVisitsCountSinceBeginningOfXDaysAgo(0);
    yesterday.innerText = await getVisitsCountSinceBeginningOfXDaysAgo(1);
    twodaysago.innerText = await getVisitsCountSinceBeginningOfXDaysAgo(2);
    threedaysago.innerText = await getVisitsCountSinceBeginningOfXDaysAgo(2);
})();

