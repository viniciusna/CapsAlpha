const PostgresDB = require("./index");
const { BadRequest, InternalServerError } = require("../error/errors");

class UserDocuments extends PostgresDB {
  async getDocuments(id) {
    try {
      const client = await this.pool.connect();
      const query = `                
           SELECT documents.id, documents.title, users.name as owner, documents.created_at, documents.updated_at 
           FROM documents
            INNER JOIN users_documents on users_documents.document_id = documents.id
            INNER JOIN users on users.id = documents.owner
           WHERE users_documents.user_id = $1
           ORDER BY documents.updated_at DESC;

           `;
      const values = [id];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return false;
      }
      return result.rows;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async set(userId, documentId) {
    try {
      const client = await this.pool.connect();
      const query = `                
            INSERT INTO users_documents(user_id, document_id)
            VALUES($1,$2);
        `;
      const values = [userId, documentId];
      const result = await client.query(query, values);
      client.release();
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }
  
  async find(userId, documentId) {
    try {
      const client = await this.pool.connect();
      const query = `                
            SELECT * FROM users_documents
            WHERE document_id = $1 and user_id = $2;
        `;
      const values = [documentId, userId];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return false;
      }
      return result.rows;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }
}

module.exports = UserDocuments;
