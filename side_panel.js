console.log("Side panel working");
import config from "./config.js";

const SPREADSHEET_ID = config.SPREADSHEET_ID;
const API_KEY = config.GOOGLE_SHEETS_API_KEY;
const RANGE = "A:A";

async function fetchData() {
  console.log("yes");
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  const today = new Date();
  const today_date = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;
  let date_count = 0;

  try {
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    if (data.values) {
      data.values.map((row, index) => {
        const spreadsheet_date = row[0].split(" ")[0];
        console.log(spreadsheet_date);
        console.log(today_date);
        if (spreadsheet_date === today_date) {
          date_count += 1;
        }
      });
      const data_len = data.values.length - 1;
      document.getElementById("dateCount").textContent = date_count;
      document.getElementById("dataLen").textContent = data_len;

      const progressBarDaily = document.getElementById("progressBarDaily");
      progressBarDaily.value = date_count;

      const progressBarTotal = document.getElementById("progressBarTotal");
      progressBarTotal.value = data_len;
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setInterval(fetchData, 30000);

fetchData();
