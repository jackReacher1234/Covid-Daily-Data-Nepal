const puppeteer = require("puppeteer");
const xlsx = require("xlsx");
const moment = require("moment");
const { insertDate } = require("./functions");

const DISTRICT_NAME = "syangja";
const START_DATE = "2020-07-01";
const END_DATE = "2020-09-01";

let startDate = moment(START_DATE).format("YYYY-MM-DD");
let afterDate = moment(startDate, "YYYY-MM-DD")
  .add(1, "day")
  .format("YYYY-MM-DD");

let startDateForCalc = moment(START_DATE, "YYYY-MM-DD");
let requiredDateForCalc = moment(END_DATE, "YYYY-MM-DD");
let duration = moment.duration(requiredDateForCalc.diff(startDateForCalc));
let days = duration.asDays();

let main = async () => {
  try {
    console.log("PLEASE WAIT, WE ARE WORKING!");
    let finalArray = [];

    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://covid19.mohp.gov.np/");

    for (i = 0; i <= days; i++) {
      let myObject = await insertDate(
        startDate,
        afterDate,
        page,
        DISTRICT_NAME.toUpperCase()
      );
      finalArray.push(myObject);
      startDate = moment(startDate, "YYYY-MM-DD")
        .add(1, "day")
        .format("YYYY-MM-DD");

      afterDate = moment(startDate, "YYYY-MM-DD")
        .add(1, "day")
        .format("YYYY-MM-DD");
    }

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(finalArray);
    xlsx.utils.book_append_sheet(wb, ws);
    xlsx.writeFile(wb, `${DISTRICT_NAME}.xlsx`);

    console.log(`SUCCESSFUL! Check ${DISTRICT_NAME}.xlsx file in this folder.`);
    await browser.close();
  } catch (e) {
    console.log("ERROR", e);
  }
};

main();
