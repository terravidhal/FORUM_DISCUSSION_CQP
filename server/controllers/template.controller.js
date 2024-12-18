const Template = require("../models/templates.model");
const fs = require('fs');
const path = require('path');

//
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");





module.exports.findAllTemplates = async (req, res) => {
  try {
    const allTemplates = await Template.find({ isDeleted: false });
    res.json(allTemplates);
  } catch (err) {
    res.status(400).json(err);
  }
};


module.exports.uploadNewTemplate2 = async (req, res) => {
  const { filename } = req.file; // "file" object here pass to the query by multer
  const templatesName = filename;

  try {
    const template = new Template({
      templateName : templatesName,
    });

    await template.save();

    res.json(template);
  } catch (error) {
    res.status(400).json(error);
  }
};





module.exports.uploadNewTemplate = async (req, res) => {
  const { filename } = req.file; // "file" object here pass to the query by multer
  const templatesName = filename;

  try {

    // Étape 4 : Sauvegarder le template avec l'aperçu dans la base de données
    const template = new Template({
      templateName: templatesName,
      previewImage: "",
    });

    await template.save();

    res.json(template);

    // Load the contents of the .hbs file
    const templatePath = path.join(__dirname, "../template", templatesName);
    const templateContent = fs.readFileSync(templatePath, "utf-8");
    const templatess = Handlebars.compile(templateContent);
    
    // Generate HTML from template with dummy data
    const previewData = {
      name: "John Doe",
      course: "Web Development",
      dateOfCertif: "15 December 2024",
    };
    const renderedHtml = templatess(previewData);

    // Generate a preview image with Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(renderedHtml, { waitUntil: "load" });

    const previewImagePath = path.join(
      __dirname,
      "../upload/templatesImages",
      `${path.basename(templatesName, ".hbs")}.png`
    );
    await page.screenshot({ path: previewImagePath });
    await browser.close();

    // Update the template with the preview in the database
    await Template.findOneAndUpdate(
      { _id: template._id },
      { previewImage: path.basename(previewImagePath) }
    );
  } catch (error) {
    console.error("Erreur lors de l'upload du template :", error);
    res.status(400).json(error);
  }
};







module.exports.deleteTemplate = async (req, res) => {
  const templateId = req.params.templateId;

  try {
    const template = await Payment.findById(templateId);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // delete file template
    const templatePath = path.join(__dirname, '..template', template.templateName);
    fs.unlink(templatePath, (err) => {
      if (err) {
        console.error("delete template error :", err);
      }
    });

    // Delete payment
    const result = await template.deleteOne({ _id: templateId });

    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

