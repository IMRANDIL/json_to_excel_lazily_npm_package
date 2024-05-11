const path = require('path');
const ExcelJS = require('exceljs');
const fs = require('fs');
const readline = require('readline');

async function* lazyJsonDataGenerator(filePath) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });

  let chunk = '';
  for await (const line of rl) {
    chunk += line;
    if (line.trim().endsWith(',')) {
      try {
        const jsonArray = JSON.parse(chunk);
        if (!Array.isArray(jsonArray)) {
          throw new Error('JSON content is not an array.');
        }
        yield* jsonArray;
        chunk = '';
      } catch (error) {
        // console.error('Error parsing JSON chunk:', error);
      }
    }
  }
  if (chunk) {
    try {
      const jsonArray = JSON.parse(chunk);
      if (!Array.isArray(jsonArray)) {
        throw new Error('JSON content is not an array.');
      }
      yield* jsonArray;
    } catch (error) {
    //   console.error('Error parsing JSON chunk:', error);
    }
  }
}

async function createExcelFromJson(jsonFilePath, excelFilePath, headers) {
  // Check if JSON file exists
  if (!fs.existsSync(jsonFilePath)) {
    throw new Error('JSON file does not exist.');
  }

  // Check if headers are provided
  if (!Array.isArray(headers) || headers.length === 0) {
    throw new Error('Headers must be provided as an array.');
  }

  // Check file extensions
  if (path.extname(jsonFilePath) !== '.json') {
    throw new Error('JSON file path must have a .json extension.');
  }

  if (path.extname(excelFilePath) !== '.xlsx') {
    throw new Error('Excel file path must have a .xlsx extension.');
  }

  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Data');

  // Add header row
  ws.columns = headers.map(header => ({ header: header.header, key: header.key, width: header.width }));

  // Create the Excel file first
  const stream = fs.createWriteStream(excelFilePath);

  // Then write the data to it
  const fileDataGen = lazyJsonDataGenerator(jsonFilePath);
  let rowCount = 0;
  for await (const jsonData of fileDataGen) {
    const rowData = Object.values(jsonData);
    ws.addRow(rowData);
    rowCount++;
  }

  // Write the workbook to the stream
  await wb.xlsx.write(stream);

  console.log(`Added rows count: ${rowCount}`);
  // Close the stream to ensure data is written
  stream.end();
}

module.exports = {
  createExcelFromJson
};
