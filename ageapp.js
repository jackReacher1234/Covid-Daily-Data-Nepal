const DISTRICT = "kathmandu";

const request = require("request-promise");
const xlsx = require("xlsx");
const moment = require("moment");
const { default: Axios } = require("axios");

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
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let fetchResults = async () => {
  console.log("Please wait we are gathering information");
  let finalArray = [];

  for (let i = 0; i <= days; i++) {
    let url = `https://portal.edcd.gov.np/rest/api/fetch?filter=casesBetween&type=aggregate&sDate=${startDate}&eDate=${afterDate}&disease=COVID-19`;

    const { data } = await Axios.get(url);

    let resultObj = data.reduce(
      (acc, val) => {
        //   _______________________________NULL_______________________________________--
        if (
          val.Age === null &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Unknown Age Male"] = acc["Unknown Age Male"] + 1;
        }
        if (
          val.Age === null &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Unknown Age Female"] = acc["Unknown Age Female"] + 1;
        }

        //   ________________________________0 to 10______________________________________--

        if (
          val.Age == "0 - 10" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Zero To Ten Male"] =
            acc["Zero To Ten Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "0 - 10" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Zero To Ten Female"] =
            acc["Zero To Ten Female"] + parseInt(val.Value);
        }

        //   ________________________________10 to 20______________________________________--

        if (
          val.Age == "11 - 20" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Ten To Twenty Male"] =
            acc["Ten To Twenty Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "11 - 20" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Ten To Twenty Female"] =
            acc["Ten To Twenty Female"] + parseInt(val.Value);
        }

        //   ________________________________20 to 30______________________________________--

        if (
          val.Age == "21 - 30" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Twenty To Thirty Male"] =
            acc["Twenty To Thirty Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "21 - 30" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Twenty To Thirty Female"] =
            acc["Twenty To Thirty Female"] + parseInt(val.Value);
        }

        //   ________________________________30 to 40______________________________________--

        if (
          val.Age == "31 - 40" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Thirty To Forty Male"] =
            acc["Thirty To Forty Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "31 - 40" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Thirty To Forty Female"] =
            acc["Thirty To Forty Female"] + parseInt(val.Value);
        }

        //   ________________________________40 to 50______________________________________--

        if (
          val.Age == "41 - 50" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Forty To Fifty Male"] =
            acc["Forty To Fifty Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "41 - 50" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Forty To Fifty Female"] =
            acc["Forty To Fifty Female"] + parseInt(val.Value);
        }

        //   ________________________________50 to 60______________________________________--

        if (
          val.Age == "51 - 60" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Fifty To Sixty Male"] =
            acc["Fifty To Sixty Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "51 - 60" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Fifty To Sixty Female"] =
            acc["Fifty To Sixty Female"] + parseInt(val.Value);
        }

        //   ________________________________60 to 70______________________________________--

        if (
          val.Age == "61 - 70" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Sixty To Seventy Male"] =
            acc["Sixty To Seventy Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "61 - 70" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Sixty To Seventy Female"] =
            acc["Sixty To Seventy Female"] + parseInt(val.Value);
        }

        //   ________________________________70 to 80______________________________________--

        if (
          val.Age == "71 - 80" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Seventy To Eighty Male"] =
            acc["Seventy To Eighty Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "71 - 80" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Seventy To Eighty Female"] =
            acc["Seventy To Eighty Female"] + parseInt(val.Value);
        }

        //   ________________________________80+______________________________________--

        if (
          val.Age == "80+" &&
          (val.Sex == "Male" || val.Sex == "male") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Eighty Plus Male"] =
            acc["Eighty Plus Male"] + parseInt(val.Value);
        }

        if (
          val.Age == "80+" &&
          (val.Sex == "Female" || val.Sex == "female") &&
          val.District.toLowerCase().includes(DISTRICT)
        ) {
          acc["Eighty Plus Female"] =
            acc["Eighty Plus Female"] + parseInt(val.Value);
        }

        return acc;
      },
      {
        date: startDate,
        "Unknown Age Male": 0,
        "Unknown Age Female": 0,
        "Zero To Ten Male": 0,
        "Zero To Ten Female": 0,
        "Ten To Twenty Male": 0,
        "Ten To Twenty Female": 0,
        "Twenty To Thirty Male": 0,
        "Twenty To Thirty Female": 0,
        "Thirty To Forty Male": 0,
        "Thirty To Forty Female": 0,
        "Forty To Fifty Male": 0,
        "Forty To Fifty Female": 0,
        "Fifty To Sixty Male": 0,
        "Fifty To Sixty Female": 0,
        "Sixty To Seventy Male": 0,
        "Sixty To Seventy Female": 0,
        "Seventy To Eighty Male": 0,
        "Seventy To Eighty Female": 0,
        "Eighty Plus Male": 0,
        "Eighty Plus Female": 0,
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
  xlsx.writeFile(wb, "kathmanduAge.xlsx");
};

fetchResults();
