const bcrypt = require('bcrypt');
const db = require('../db.js');

module.exports = {
  /**
  * Create a new user in the data base.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  createUser: (req, res) => {
    const { username, password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    db.any('INSERT INTO userinfo(key, username, password, email) VALUES (uuid_generate_v4(), $1, $2, $3);', [username, hash, email])
      .then((data) => {
        // success;
        // console.log('createUser Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log('createUser:', error);
        res.sendStatus(404);
      });
  },

  /**
  * Validate if a user and password exists in the database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  getUser: (req, res) => {
    const { username, password } = req.body;

    db.any('SELECT * FROM userinfo WHERE username = $1;', [username])
      .then((data) => {
        // success;
        // Check if password is correct.
        if (data.length === 0) {
          throw new Error('Wrong username or password.');
        } else {
          const hash = data[0].password;
          bcrypt.compare(password, hash, (err, result) => {
            if (result === true) {
              console.log('login success at server: ', data[0].username, data[0].email);
              return res.json(data[0]);
            }
            // console.log('Login failed.');
            // return res.sendStatus(400);
            throw new Error('Wrong username or password.');
          });
        }
        // console.log('Login failed.');
        // return res.sendStatus(400);
        // throw new Error('Wrong username or password.');
      })
      .catch((error) => {
        // error;
        console.log('getUser:', error);
        res.sendStatus(400);
      });
  },

  /**
  * Get all listings from the database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  getListing: (req, res) => {
    db.any('SELECT * FROM listing;')
      .then((data) => {
        // success;
        // console.log('getListing Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log('getListin:', error);
        res.sendStatus(404);
      });
  },

  /**
  * Create a listing in the database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  postListing: (req, res) => {
    const {
      userId, title, brand, condition, size, price, imgurl,
    } = req.body;

    db.any('INSERT INTO listing(key, poster_uid, title, brand, condition, size, price, imgurl, listdate) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, now());', [userId, title, brand, condition, size, price, imgurl])
      .then((data) => {
        // success;
        // console.log('postListing Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log('postListing:', error);
        res.sendStatus(404);
      });
  },

  /**
  * Get listings by brand from database
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  filterByBrand: (req, res) => {
    const { brand } = req.params;

    db.any('SELECT * FROM listing WHERE brand = $1;', [brand])
      .then((data) => {
        // success;
        // console.log('filterByBrand Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log('filterByBrand:', error);
        res.sendStatus(404);
      });
  },

  /**
  * Get listings by brand from the database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  filterByCondition: (req, res) => {
    const { condition } = req.params;

    db.any('SELECT * FROM listing WHERE condition = $1;', [condition])
      .then((data) => {
        // success;
        console.log('filterByConditionSuccess.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log(error);
        res.sendStatus(404);
      });
  },

  /**
  * Get listings by user from the database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  filterByUser: (req, res) => {
    const { uid } = req.params;

    db.any('SELECT * FROM listing WHERE uid = $1;', [uid])
      .then((data) => {
        // success;
        console.log('filterByUser Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log(error);
        res.sendStatus(404);
      });
  },

  /**
  * Get listings by size from the database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  filterBySize: (req, res) => {
    const { size } = req.params;

    db.any('SELECT * FROM listing WHERE size = $1;', [size])
      .then((data) => {
        // success;
        console.log('filterBySize Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log(error);
        res.sendStatus(404);
      });
  },

  /**
  * Save image info to database.
  * DID NOT IMPLEMENT.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  imageParser: (req, res) => {
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    res.redirect('/');

    // Save image info in database.
  },

  /**
  * Get categories for filter type from database.
  * @param {object} req - the request object from the server.
  * @param {object} res - the request object from the server.
   */
  getCategories: (req, res) => {
    const { filter } = req.params;

    db.any(`SELECT DISTINCT ${filter} FROM listing`)
      .then((data) => {
        // success;
        console.log(' getCategories Success.');
        res.json(data);
      })
      .catch((error) => {
        // error;
        console.log(error);
        res.sendStatus(404);
      });
  },
};
