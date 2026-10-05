function doPost(e) {
  addToOrders(JSON.parse(e.postData.contents));
}

function addToOrders(data) {
  const sheet = SpreadsheetApp.openById("spreadsheetId").getSheets()[0];
  let i = 2;
  while (true) {
    if (!(sheet.getRange("A" + String(i)).getValue() === "")) {
      i++;
    } else {
      break;
    }
  }
  const formResults = data["Form Results"];
  const addToSheet = (l, i, value) => {
    sheet.getRange(l + String(i)).setValue(value);
  };
  addToSheet("A", i, Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"));
  addToSheet("B", i, formResults["Name"]);
  let cartItems = [];
  for (const [key, value] of Object.entries(data["Cart"])) {
    cartItems.push("- " + key + ": " + value);
  }
  addToSheet("C", i, cartItems.join("\n"));
  addToSheet("D", i, data["Total"]);
  addToSheet("E", i, formResults["Delivery Date"]);
  addToSheet("F", i, formResults["Email"]);
  addToSheet("G", i, formResults["Age"]);
  addToSheet("H", i, formResults["Place of Delivery"]);
  addToSheet("I", i, formResults["Comments"]);
}
