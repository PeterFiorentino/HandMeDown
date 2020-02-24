/*
Histories Route | Server | Hand-Me-Down Web App
GROUP 1: Hupaul Camacho, Douglas MacKrell, Johanne Enama, Peter Fiorentino
*/


/* MODULE INITS */
//    external
const express = require('express');
const router = express.Router();
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
router.get("/api/garment/:garment_id", async (req, res, next) => {
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
router.get("/api/user/:user_id", async (req, res, next) => {
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
router.post("/api/", async (req, res, next) => {
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
router.patch("/api/:history_id", async (req, res, next) => {
    try {
        const userId = req.body.user_id;
        const garmentId = req.body.garment_id;
        const location = req.body.location;
        const body = req.body.body;
        const imageUrl = req.body.img_url;
        const isPublic = req.body.isPublic;

        const response = await rewriteHistory({ userId, garmentId, location, body, imageUrl, isPublic });
        res.json({
            status: "success",
            message: `post ${postId} edited`,
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


/* EXPORT */
module.exports = router;
