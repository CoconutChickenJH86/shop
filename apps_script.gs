function doPost(e) {
  addToOrders(JSON.parse(e.postData.contents));
}

function addToOrders(data) {
  const sheet = SpreadsheetApp.openById("idOfGoogleSheets").getSheets()[0];
  let i = 2;
  while (true) {
    if (!(sheet.getRange("A" + String(i)).getValue() === "")) {
      i++;
    } else {
      break;
    }
  }
  const formResults = data["Form Results"];
  sheet.getRange("A" + String(i)).setValue(Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd"));
  sheet.getRange("B" + String(i)).setValue(formResults["Name"]);
  let cartItems = [];
  for (const [key, value] of Object.entries(data["Cart"])) {
    cartItems.push("- " + key + ": " + value);
  }
  sheet.getRange("C" + String(i)).setValue(cartItems.join("\n"));
  sheet.getRange("D" + String(i)).setValue(data["Total"]);
  sheet.getRange("E" + String(i)).setValue(formResults["Delivery Date"]);
  sheet.getRange("F" + String(i)).setValue(formResults["Email"]);
  sheet.getRange("G" + String(i)).setValue(formResults["Age"]);
  sheet.getRange("H" + String(i)).setValue(formResults["Place of Delivery"]);
}
