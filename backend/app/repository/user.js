const PostgresDB = require("./index");
const { BadRequest, InternalServerError } = require("../error/errors");

class User extends PostgresDB {
  async create(user) {
    try {
      const client = await this.pool.connect();
      const query = `          
            INSERT INTO users(email, password, name)
            VALUES($1,$2,$3)
            RETURNING id;
          `;
      const values = [user.email, user.password, user.name];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return null;
      }
      return result.rows[0].id;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async findByEmail(email) {
    try {
      const client = await this.pool.connect();
      const query = `          
          SELECT id, password
          FROM users
          WHERE email = $1;
        `;
      const values = [email];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async update(id, name, email, password) {
    try {
      const client = await this.pool.connect();
      const query = `                          
        UPDATE users 
        SET name = $2, email = $3 , password = $4 updated_at = now()
        WHERE id = $1
        RETURNING *;
        `;
      const values = [id, name, email, password];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async find(id) {
    try {
      const client = await this.pool.connect();
      const query = `          
          SELECT id, name, email, created_at 
          FROM users
          WHERE id = $1;
        `;
      const values = [id];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return false;
      }
      return result.rows[0];
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }
}

module.exports = User;
