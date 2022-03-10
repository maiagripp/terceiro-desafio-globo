const db = ('./database');

class NoticesRepository {
    findAll() {
      const rows = db.execute(`
        SELECT *
        FROM notices
      `);
  
      return rows;
    }
  
    async findById(noticeId) {
      const [row] = await db.execute(`
        SELECT *
        FROM notices
        WHERE id = $1
      `, [noticeId]);
  
      return row;
    }
  
    async create({ name }) {
      const [row] = await db.execute(`
        INSERT INTO notices(name)
        VALUES($1)
        RETURNING *
      `, [name]);
  
      return row;
    }
  }
  
  module.exports = new NoticesRepository();
