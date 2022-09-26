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

  async delete(userId, documentId) {
    try {
      const client = await this.pool.connect();

      const queryDelUserDocuments = `                          
        DELETE FROM users_documents WHERE document_id = $1 AND user_id = $2
        RETURNING document_id;
      `;
      const valuesUserDocuments = [documentId, userId];
      const resultDelUserDocuments = await client.query(
        queryDelUserDocuments,
        valuesUserDocuments
      );

      const queryUsersDocument = `                          
        SELECT * 
        FROM users_documents WHERE document_id = $1 ;
      `;
      const valuesUsersDocuments = [documentId];
      const resultUsersDocument = await client.query(
        queryUsersDocument,
        valuesUsersDocuments
      );

      if (resultUsersDocument.rows.length === 0) {
        // Delete if anyone have the link to this document
        const query = `                          
          DELETE FROM documents WHERE id = $1
          RETURNING id ;
        `;
        const values = [documentId];
        const result = await client.query(query, values);
      }

      client.release();
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async update(documentId, title, content) {
    try {
      const client = await this.pool.connect();
      const query = `                          
        UPDATE documents 
        SET title = $2, content = $3 , updated_at = now()
        WHERE id = $1
        RETURNING *;
        `;
      const values = [documentId, title, content];
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

  async updateContent(documentId, content) {
    try {
      const client = await this.pool.connect();
      const query = `                          
        UPDATE documents 
        SET content = $2 , updated_at = now()
        WHERE id = $1
        RETURNING *;
        `;
      const values = [documentId, content];
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

  async get(id) {
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
      return result.rows[0];
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async updateTitle(documentId, title) {
    try {
      const client = await this.pool.connect();
      const query = `                          
        UPDATE documents 
        SET title = $2, updated_at = now()
        WHERE id = $1
        RETURNING *;
        `;
      const values = [documentId, title];
      const result = await client.query(query, values);
      client.release();
      if (result.rows.length == 0) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }

  async getTitle(documentId) {
    try {
      const client = await this.pool.connect();
      const query = `                          
        SELECT title FROM documents
        WHERE id = $1
        `;
      const values = [documentId];
      const result = await client.query(query, values);
      client.release();
      return result.rows[0].title;
    } catch (e) {
      console.log(e);
      throw new InternalServerError("Service temporarily unavailable");
    }
  }
}

module.exports = Document;
