const request = require("request-promise");
const xlsx = require("xlsx");
const moment = require("moment");

const START_DATE = "2020-07-01";
const END_DATE = "2020-09-01";

let startDate = moment(START_DATE).format("YYYY-MM-DD");
let afterDate = moment(START_DATE, "YYYY-MM-DD")
  .add(1, "day")
  .format("YYYY-MM-DD");

let startDateForCalc = moment(START_DATE, "YYYY-MM-DD");
let requiredDateForCalc = moment(END_DATE, "YYYY-MM-DD");
let duration = moment.duration(requiredDateForCalc.diff(startDateForCalc));
let days = duration.asDays();

const url =
  "https://bipadportal.gov.np/api/v1/covid19-case/?district=5&expand=district%2Cnationality&limit=-1";

let fetchResults = async () => {
  console.log("Please wait!!");
  const response = await request({
    uri: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      Referer: "https://covid19.ndrrma.gov.np/",
    },
    json: true,
  });

  let results = response.results;

  let finalArray = [];

  for (let i = 0; i <= days; i++) {
    let resultObj = results.reduce(
      (acc, val) => {
        if (val.deathOn == startDate) {
          acc.deaths = acc.deaths + 1;

          if (val.gender == "male" || val.gender == "Male") {
            acc.maleDeath = acc.maleDeath + 1;
          } else if (val.gender == "female" || val.gender == "Female") {
            acc.femaleDeath = acc.femaleDeath + 1;
          } else {
            console.log("___________FINAL ELSE 1 death_____________");
            console.log(val);

            acc.unknownDeath = acc.unknownDeath + 1;
          }
        }
        if (val.recoveredOn == startDate) {
          acc.recovered = acc.recovered + 1;

          if (val.gender == "male" || val.gender == "Male") {
            acc.maleRecovered = acc.maleRecovered + 1;
          } else if (val.gender == "female" || val.gender == "Female") {
            acc.femaleRecovered = acc.femaleRecovered + 1;
          } else {
            console.log("___________FINAL ELSE 2 recovered_____________");
            console.log(val);

            acc.unknownRecovered = acc.unknownRecovered + 1;
          }
        }

        return acc;
      },
      {
        date: startDate,
        deaths: 0,
        recovered: 0,
        maleDeath: 0,
        femaleDeath: 0,
        unknownDeath: 0,
        maleRecovered: 0,
        femaleRecovered: 0,
        unknownRecovered: 0,
      }
    );
    finalArray.push(resultObj);
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
  xlsx.writeFile(wb, "morang.xlsx");
};

fetchResults();
