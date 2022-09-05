const PostgresDB = require("./index");
const { BadRequest, InternalServerError } = require("../error/errors");

class Document extends PostgresDB {
  async create(user_id, id) {
    try {
      const client = await this.pool.connect();
      const queryCreateDocument = `                                  
          INSERT INTO documents(owner, id)
          VALUES($1,$2)
          RETURNING id;
        `;
      const valuesDocument = [user_id, id];
      const result = await client.query(queryCreateDocument, valuesDocument);
      const documentId = result.rows[0].id;

      const query = `                                  
        INSERT INTO users_documents(user_id, document_id)
        VALUES($1,$2);
      `;
      const values = [user_id, documentId];
      await client.query(query, values);

      client.release();

      return documentId;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async getDocument(id) {
    try {
      const client = await this.pool.connect();
      const query = `                          
            SELECT * FROM documents
            WHERE id = $1;
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
}

module.exports = Document;
