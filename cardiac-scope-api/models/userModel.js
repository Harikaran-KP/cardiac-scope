const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

//From controller, it comes here. For executing SQL calls to db.
//Update, create for user, reference ranges fetching query
const createUser = async (first_name, last_name, email, hashedPassword) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

//for login
const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in findUserByEmail:", error);
    throw error;
  }
};

//for profile/home page
const getUserById = async (id) => {
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email, city, country, hospital_name, mri_scanner, analysis_software, phone_number, publication_preference FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
};

const updateUser = async (id, updates) => {
  //console.log("Received profile data for update:", req.body);
  const {
    first_name,
    last_name,
    email,
    city,
    country,
    hospital_name,
    mri_scanner,
    analysis_software,
    phone_number,
    publication_preference
  } = updates;
  const query = `
      UPDATE users
      SET first_name = $2, last_name = $3, email = $4, city = $5, country = $6, 
          hospital_name = $7, mri_scanner = $8, analysis_software = $9, 
          phone_number = $10, publication_preference = $11
      WHERE id = $1
      RETURNING *;
  `;
  const values = [
    id,
    first_name,
    last_name,
    email,
    city,
    country,
    hospital_name,
    mri_scanner,
    analysis_software,
    phone_number,
    publication_preference
  ];

  console.log("SQL Query:", query); // Log the query
  console.log("Parameters:", values); // Log the parameters

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const updateUserPreferences = async (userId, publicationId) => {
  const query = 'UPDATE users SET publication_preference = $1 WHERE id = $2';
  const values = [publicationId, userId];
  try {
    await pool.query(query, values);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

const getUserPreferences = async (userId) => {
  const query = 'SELECT publication_preference FROM users WHERE id = $1';
  const values = [userId];
  try {
    const result = await pool.query(query, values);
    return result.rows[0].publication_reference;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

const getReferenceRanges = async (publicationId, gender, age) => {
  // const { publicationId, gender, age } = req.query;
  // console.log(`Received params - publicationId: ${publicationId}, age: ${age}, gender: ${gender}`);

  try {
      const result = await pool.query(`
          SELECT * FROM references_table 
          WHERE publication_ref_id = $1 AND gender_id = $2 
          AND age_lower <= $3 AND age_upper >= $3
      `, [publicationId, gender, age]);

      // res.json(result.rows);
      return result.rows
  } catch (error) {
      console.error('Error fetching references:', error);
      throw error;
  }
};

const getCmrTechniques = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM cmr_techniques`
    )
    return result.rows
  }
  catch (error) {
    console.error('Error fetching CMR techniques:', error);
    throw error;
  }
}

const getCmrTechniqueReferences = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM strain_references`
    )
    return result.rows
  }
  catch (error) {
    console.error('Error fetching CMR technique reference values:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  updateUser,
  getReferenceRanges,
  updateUserPreferences,
  getUserPreferences,
  getCmrTechniques,
  getCmrTechniqueReferences
};
