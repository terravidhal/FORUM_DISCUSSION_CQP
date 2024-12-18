require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {seedAdmin} = require("./seeders/superAdmin.seeder"); 
const PORT = process.env.SERVER_PORT || 8000
const path = require('path');
const app = express();
const QRCode = require('qrcode');


app.use(express.json(), express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use(cookieParser());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "./template/assets")));
app.use(express.static("upload/templatesImages")); //Accès aux images du template côté serveur 
app.use(express.static("upload/images")); //Accès aux images côté serveur 
//app.use(express.static(path.join(__dirname, '../upload/images')));


require("./config/mongoose.config");

const AllMyFieldsRoutes = require("./routes/field.routes");
AllMyFieldsRoutes(app);

const AllMySessionsRoutes = require("./routes/session.routes");
AllMySessionsRoutes(app);

const AllMyStudentsRoutes = require("./routes/student.routes");
AllMyStudentsRoutes(app);

const AllMyCertifsRoutes = require("./routes/certif.routes");
AllMyCertifsRoutes(app);

const AllMyTemplatesRoutes = require("./routes/templates.routes");
AllMyTemplatesRoutes(app);

const AllMyChartsRoutes = require("./routes/chart.routes");
AllMyChartsRoutes(app);

const AllMyAudLogRoutes = require("./routes/logCertif.routes");
AllMyAudLogRoutes(app);

const AllMyPaymentRoutes = require("./routes/payment.routes");
AllMyPaymentRoutes(app);

const AllMyUsersRoutes = require("./routes/user.routes");
AllMyUsersRoutes(app);




const { pdfGenerator2 } = require("./controllers/certif.controller");

// Basé sur les données de création du modèle page.hbs
let data = {
    name: "Terra Vidhal",
    linkVerif: "https://example.com/verification-link", // Lien de vérification
    course: "SevenGps Kids Code Course",
    dateOfConductStart: "2023-01-01",
    dateOfConductEnd: "2023-01-10",
    dateOfCertif: "2023-01-15"
};

const fileName = "test_certif";

/*
(async () => {
    try {
        let buffer = await pdfGenerator2(fileName, data);
        console.log("PDF généré avec succès!", buffer);
    } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
    }
})();  */





// start server after execution seeder
async function startServer() {
  try {
    await seedAdmin(); 
    app.listen(PORT, () => console.log(`The server is all fired up on port ${PORT}`));
  } catch (err) {
    console.error("Error during server startup:", err);
    process.exit(1);
  }
}

startServer();







