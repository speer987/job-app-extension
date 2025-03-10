console.log("Side panel working");
import config from "./config.js";

const SPREADSHEET_ID = config.SPREADSHEET_ID;
const API_KEY = config.GOOGLE_SHEETS_API_KEY;
const RANGE = "A:A";

let milestones_current = 0;

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

      const progressBarDaily = document.getElementById("progressBarDaily");
      progressBarDaily.value = date_count;

      if (date_count >= 15) {
        const content = document.getElementById("content");
        content.innerHTML = `
        <div id="center">
          <div id="spacing-div"></div>
          <div id="cta-text">
            <h2 id="purple-text">You applied to 15 jobs or more today!</h2>
            <p>Take a break! You deserve it.</p>
          </div>
          <img id="break-image" src="undraw_relaxed-reading.svg">
        </div>`;
      }

      const progressBarTotal = document.getElementById("progressBarTotal");
      progressBarTotal.value = data_len % 1000;
      document.getElementById("dataLen").textContent = data_len;

      const milestones_reached = Math.floor(data_len / 1000);
      for (
        let count = milestones_current;
        count < milestones_reached;
        count++
      ) {
        let milestone_circle = document.createElement("span");
        milestone_circle.className = "milestone_circ";
        milestone_circle.textContent = "1K";
        document.getElementById("milestones").appendChild(milestone_circle);
      }
      milestones_current = milestones_reached;
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

setInterval(fetchData, 180000);

fetchData();
