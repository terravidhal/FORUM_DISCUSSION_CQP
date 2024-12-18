const pupp = require("puppeteer");
const hbs = require("handlebars");
const path = require("path");
const fs = require("fs-extra");
//const fss = require("fs");



const compile = async function (templateName, data) {
  const templateFilePath = path.join(
    process.cwd(),
    "template",
    `${templateName}.hbs`
  );
  const html = await fs.readFile(templateFilePath, "utf-8");
  return hbs.compile(html)(data);
};


module.exports.pdfGenerator2 = async (fileName, data) => {
    try {
      const browser = await pupp.launch({
        args: ["--no-sandbox"],
       // headless: "new"
        headless: "true"
      });
      const page = await browser.newPage();
  
      const content = await compile("page3", data);
  
      await page.setContent(content, { waitUntil: "networkidle0" });
      await page.emulateMediaType("screen");

     // await page.setViewport({ width: 1250, height: 590 }); // 3783, 2527
  
      const downloadPath = path.join(
        process.cwd(),
        "generatedFile",
        `${fileName}-${Date.now()}.pdf`
      );
  
      let buffer = await page.pdf({
        path: downloadPath,
        printBackground: true,
        format: "A4", // Taille standard A4
        margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" }
      });
  
      await browser.close();
  
      return Promise.resolve(buffer);
    } catch (error) {
      return Promise.reject("error ", error);
    }
  };


const pdfGenerator = async (fileName, data) => {
    try {
      const browser = await pupp.launch({
        args: ["--no-sandbox"],
        headless: "new"
      });
      const page = await browser.newPage();
  
      const content = await compile("page", data);
  
      await page.setContent(content);
      await page.emulateMediaType("screen");

     // await page.setViewport({ width: 1250, height: 590 }); // 3783, 2527
  
      const downloadPath = path.join(
        process.cwd(),
        "generatedFile",
        `${fileName}-${Date.now()}.pdf`
      );
  
      let buffer = await page.pdf({
        path: downloadPath,
       // format: "A4",
      // width: "1250px",
      // height: "570px",
      // height: "590px",
       // margin: { top: 20 },
        printBackground: true,
      });
  
      await browser.close();
  
      return Promise.resolve(buffer);
    } catch (error) {
      return Promise.reject("error ", error);
    }
  };


  module.exports.createCertificate =  async (req, res) => {
    const {name, linkVerif, course, dateOfConductStart, dateOfConductEnd, dateOfCertif} = req.body;
    const data = {
      name,
      linkVerif, 
      course,
      dateOfConductStart,
      dateOfConductEnd,
      dateOfCertif,
  };
    const fileName = "test_certif";
    try {
      let buffer = await pdfGenerator(fileName, data);
      console.log("PDF généré avec succès!", buffer);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
    }
};









 