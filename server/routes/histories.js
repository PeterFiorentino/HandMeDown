/*
Histories Route | Server | Hand-Me-Down Web App
GROUP 1: Hupaul Camacho, Douglas MacKrell, Johanne Enama, Peter Fiorentino
*/


/* MODULE INITS */
//    external
const express = require('express');
const router = express.Router();
const db = require('./db')
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (request, file, cb) => {
//         cb(null, './public/images/posts');
//     },
//     filename: (request, file, cb) => {
//         const fileName = Date.now() + "-" + file.originalname;
//         cb(null, fileName);
//     }
// });

// const fileFilter = (request, file, cb) => {
//     if ((file.mimetype).slice(0, 6) === 'image/') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// const upload = multer({ storage, fileFilter });

//    local

const {
    getAllHistoriesByUserId,
    getHistoryByGarmentId,
    createHistory,
    rewriteHistory
} = require('../queries/histories');

/* ROUTE HANDLES */
//    getHistoryByGarment: get entire history of a garment.
router.get("/garment/:garment_id", async (req, res, next) => {
    try {
        const garmentId = req.params.garment_id
        const allHistoryByGarment = await getHistoryByGarmentId(garmentId);
        res.json({
            status: "success",
            message: `all history of garment ${garmentId} retrieved`,
            payload: allHistoryByGarment
        });
    } catch (err) {
        res.json({
            status: "failure",
            message: "Oops! All Errors!",
            payload: null
        })
        throw err;
    }
});

//    allHistoryByUser: get all of a single user's history.
router.get("/user/:user_id", async (req, res, next) => {
    try {
        const userId = req.params.user_id
        const allHistoryByUser = await getAllHistoriesByUserId(userId);
        res.json({
            status: "success",
            message: `all history of user ${userId} retrieved`,
            payload: allHistoryByUser
        });
    } catch (err) {
        res.json({
            status: "failure",
            message: "Oops! All Errors!",
            payload: null
        })
        throw err;
    }
});


//    createHistory: create a single historic event for a garment
router.post("/", async (req, res, next) => {
    try {
        const userId = req.body.user_id;
        const garmentId = req.body.garment_id;
        const location = req.body.location;
        const body = req.body.body;
        const imageUrl = req.body.img_url;
        const isPublic = req.body.isPublic;

        const response = await createHistory({
            userId,
            garmentId,
            location,
            body,
            imageUrl,
            isPublic
        });
        res.json({
            status: "success",
            message: "new history created",
            payload: response
        });
    } catch (err) {
        res.json({
            status: "failure",
            message: "Oops! All Errors!",
            payload: null
        })
        throw err;
    }
});

//    rewriteHistory: edit a history by id
// router.patch("/api/:history_id", async (req, res, next) => {
//     try {        
//         let query = `UPDATE history SET `
//         if (req.body.user_id) {
//             query += `user_id = ${req.body.user_id},`
//         }
//         if (req.body.garment_id) {
//             query += `garment_id= ${req.body.garment_id},`
//         }
//         if (req.body.location) {
//             query += `location = ${req.body.location},`
//         }
//         if (req.body.body) {
//             query += `body = ${req.body.body},`
//         }
//         if (req.body.img_url) {
//             query += `image_url = ${req.body.img_url},`
//         }
//         if (req.body.isPublic) {
//             query += `isPublic = ${req.body.isPublic},`
//         }
        
//         query = query.slice(0, query.length -1);
//         // if(req.body.logout){
//         //     query += ` loggedIn = ${false}`
//         // }
//         query+= ` WHERE id = ${req.params.history_id} RETURNING *`
//         console.log(query)
    
//         let editedHistory = await  db.one(query)

//         res.json({
//             status: "Successfully edited history",
//             payload: editedHistory,
//             error: null

//         })

//     } catch (err) {
//         res.json({
//             status: "failure",
//             message: "Oops! All Errors!",
//             payload: null
//         })
//         throw err;
//     }
// });



/* EXPORT */
module.exports = router;
