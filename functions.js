const insertDate = async (startDate, endDate, page, district) => {
  try {
    await page.waitForSelector("input[placeholder='Start date']");
    await page.waitForSelector("input[placeholder='End date']");

    await page.focus("input[placeholder='Start date']");

    await page.keyboard.type(startDate);

    await page.focus("input[placeholder='End date']");
    await page.keyboard.type(endDate);

    await page.mouse.click(132, 103, { button: "left" });

    await page.waitForSelector(".ant-card-grid.ant-card-grid-hoverable");

    let finalArrayWithNull = await page.$$eval(
      ".ant-card-grid.ant-card-grid-hoverable",
      (allCards, district) =>
        allCards.map((card) => {
          if (card.textContent.includes(district)) {
            return card.innerText.split("\n").filter((each) => each !== "");
          }
        }),
      district
    );

    let finalArray = finalArrayWithNull.filter((el) => el !== null);

    let finalArrayObj = finalArray.reduce(
      (acc, val) => {
        acc.district = finalArray[0][0];
        acc.total = parseInt(finalArray[0][1].replace(/^\D+/g, ""));
        acc.male = parseInt(finalArray[0][2].replace(/^\D+/g, ""));
        acc.female = parseInt(finalArray[0][3].replace(/^\D+/g, ""));

        return acc;
      },
      {
        date: startDate,
        district,
        total: 0,
        male: 0,
        female: 0,
      }
    );

    return finalArrayObj;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  insertDate,
};
