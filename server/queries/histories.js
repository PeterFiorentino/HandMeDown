/*
Histories Route Queries | Server | Hand-Me-Down Web App
GROUP 1: Hupaul Camacho, Douglas MacKrell, Johanne Enama, Peter Fiorentino
*/


// DATABASE CONNECTION
const db = require('../routes/db');


const getHistoryByGarmentId = async (garmentId) => {
  // try {
  //   const getQuery = `
  //     SELECT *
  //     FROM history
  //     WHERE garment_id = $1;
  //   `;
  //   let history = await db.any(getQuery, garmentId);
  // } catch(err) {
  //   throw(err);
  // }
  const getQuery = `SELECT * FROM history WHERE garment_id = $1;`;
  let history = await db.any(getQuery, [garmentId]);

  return history
}

const getAllHistoriesByUserId = async (userId) => {
  // try {
  //   const getQuery = `
  //     SELECT *
  //     FROM history
  //     WHERE user_id = $1;
  //   `;
  //   return await db.one(getQuery, userId);
  // } catch(err) {
  //   throw(err);
  // }
  const getQuery = `SELECT * FROM history WHERE user_id = $1;`;
  let history =  await db.any(getQuery, [userId]);
  return history
}

const createHistory = async (bodyObj) => {
  // try {
  //   const postQuery = `
  //     INSERT INTO history (
  //         user_id,
  //         garment_id,
  //         location,
  //         body,
  //         img_url,
  //         isPublic
  //     ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
  //   `;
    
  // } catch(err) {
  //   throw(err);
  // }
  const postQuery = `
      INSERT INTO history (
          user_id,
          garment_id,
          location,
          body,
          img_url,
          isPublic
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;

  let history = await db.one(postQuery, [bodyObj.userId, bodyObj.garmentId, bodyObj.location, bodyObj.body, bodyObj.image_url, bodyObj.isPublic]);

  return history
}
// to do
const rewriteHistory = async (bodyObj) => {
  try {
    const patchQuery = `
      UPDATE history
      SET location = $/location/
        , body = $/body/
        , img_url = $/imgUrl/
        , isPublic = $/isPublic/
      WHERE id = $/id/
      RETURNING *;
    `;
    return await db.one(patchQuery, bodyObj);
  } catch(err) {
    if (err.message === "No data returned from the query.") {
      throw new Error(`404__error: post ${bodyObj.id} by owner ${
        bodyObj.currUserId} does not exist`);
    }
    throw(err);
  }
}


/* EXPORT */
module.exports = {
  getHistoryByGarmentId,
  getAllHistoriesByUserId,
  createHistory,
  rewriteHistory
}