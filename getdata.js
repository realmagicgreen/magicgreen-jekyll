// tut here: https://sprintworks.se/blog/data-from-google-drive-in-static-websites/

import GoogleSpreadsheet from "google-spreadsheet";
import async from "async";
import fs from "fs";

const doc = new GoogleSpreadsheet(
	// Using our example spreadsheet: https://docs.google.com/spreadsheets/d/1o_NWrDsVNSVU1jViexKQi08aI6h76fXrMIcvbT9faoM/edit#gid=0
  "1sGXCAVauVfeBdy3d0Jp_RHwbntCeTQI8Lsw1k4GqFPY"
);
let sheet;



async.series([function setAuth(step) {
  const creds = require("./magicgreen-ab82b0150ffc.json");
  doc.useServiceAccountAuth(creds, step);
}, function getInfoAndWorksheets(step) {
  doc.getInfo((err, info) => {
    console.log(
      "Loaded spreadsheet: " + info.title + " by " + info.author.email
    );
    // Using the first sheet
    sheet = info.worksheets[0];
    console.log(
      "sheet 1: " + sheet.title + " " + sheet.rowCount + "x" + sheet.colCount
    );
    step();
  });
}, function getStuff(step) {
  sheet.getRows(
    {
      offset: 1,
      limit: 100,
      orderby: "col1"
    }, function(err, rows) {
      console.log("Read " + rows.length + " rows");
      // Clean companies.yml
      fs.truncate("./_data/companies.yml", 0, () => {
      });
      // Save rows as items in the YAML file
      for (let row of rows) {
        fs.appendFile(
          "./_data/companies.yml",
          "- brand: " +
          row.brand +
          "\n\x20\x20" +
          "products: " +
          row.products +
          "\n\x20\x20" +
          "company: " +
          row.company +
          "\n\x20\x20" +
          "website: " +
          row.website +
          "\n\x20\x20" +
          "ig: " +
          row.instagram +
          "\n\x20\x20" +
          "email: " +
          row.email +
          "\n\x20\x20" +
          "telephone: " +
          row.telephone +
          "\n\x20\x20" +
          "address: " +
          row.address +
          "\n\x20\x20" +
          "location: " +
          row.location +
          "\n\x20\x20" +
          "country: " +
          row.country +
          "\n\n",
          err => {
          }
        );
      }
    }
  );
}
]);
