const mongoose = require('mongoose');
require("dotenv").config();

const UserModel = require("../models/user.model");
const Subject = require("../models/subject.model");

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        // UserModel.insertMany([
        //     {
        //       name: "Alice",
        //       email: "alice@example.com",
        //       password: "Password@123",
        //       confirmPassword: "Password@123",
        //       role: "participants"
        //     },
        //     {
        //       name: "Bob",
        //       email: "bob@example.com",
        //       password: "Password@123",
        //       confirmPassword: "Password@123",
        //       role: "participants"
        //     },
        //     {
        //       name: "Charlie",
        //       email: "charlie@example.com",
        //       password: "Password@123",
        //       confirmPassword: "Password@123",
        //       role: "participants"
        //     },
        //     {
        //       name: "David",
        //       email: "david@example.com",
        //       password: "Password@123",
        //       confirmPassword: "Password@123",
        //       role: "participants"
        //     },
        //     {
        //       name: "Eve",
        //       email: "eve@example.com",
        //       password: "Password@123",
        //       confirmPassword: "Password@123",
        //       role: "participants"
        //     }
        //   ]);

        // Subject.insertMany([
        //     {
        //       title: "Introduction to Science",
        //       content: "This subject covers basic concepts in science including physics, chemistry, and biology.",
        //       author: "6762a6c6439e6974b2606c54", // L'ID de l'auteur (remplacez-le par un ID valide d'utilisateur)
        //       tags: ["science"],
        //       ratings: [
        //         { user: "6762a6c6439e6974b2606c54", value: 5 }
        //       ]
        //     },
        //     {
        //       title: "Basics of Informatics",
        //       content: "An introductory course on informatics, including programming, algorithms, and data structures.",
        //       author: "6762a6c6439e6974b2606c54", // L'ID de l'auteur (remplacez-le par un ID valide d'utilisateur)
        //       tags: ["informatics"],
        //       ratings: [
        //         { user: "6762a6c6439e6974b2606c54", value: 4 }
        //       ]
        //     },
        //     {
        //       title: "History of the World",
        //       content: "A detailed study of major events in world history from ancient to modern times.",
        //       author: "6762a6c6439e6974b2606c54", // L'ID de l'auteur (remplacez-le par un ID valide d'utilisateur)
        //       tags: ["history"],
        //       ratings: [
        //         { user: "6762a6c6439e6974b2606c54", value: 3 }
        //       ]
        //     },
        //     {
        //       title: "Advanced Electronics",
        //       content: "This subject delves into complex electronics concepts, including circuit design and microelectronics.",
        //       author: "6762a6c6439e6974b2606c54", // L'ID de l'auteur (remplacez-le par un ID valide d'utilisateur)
        //       tags: ["electronics"],
        //       ratings: [
        //         { user: "6762a6c6439e6974b2606c54", value: 4 }
        //       ]
        //     },
        //     {
        //       title: "Modern Physics",
        //       content: "An advanced topic in physics focusing on quantum mechanics, relativity, and particle physics.",
        //       author: "6762a6c6439e6974b2606c54", // L'ID de l'auteur (remplacez-le par un ID valide d'utilisateur)
        //       tags: ["science", "electronics"],
        //       ratings: [
        //         { user: "6762a6c6439e6974b2606c54", value: 5 }
        //       ]
        //     }
        //   ]);
          
        console.log('Established a connection to the database')})
    .catch(err => console.log('Something went wrong when connecting to the database ', err));


 