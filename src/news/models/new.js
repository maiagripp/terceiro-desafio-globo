const db = require('../../database');

class NoticesRepository {
  async findAll() {
    const rows = db.execute(`
        SELECT id_noticia, subTitulo, linkNoticia, linkImagem, titulo
        FROM noticias
      `);

    return rows;
  }

  async findById(noticiasId) {
    const [row] = await db.execute(`
        SELECT id_noticia, subTitulo, linkNoticia, linkImagem, titulo
        FROM noticias
        WHERE id = $1
      `, [noticiasId]);

    return row;
  }

  // async create({ name }) {
  //   const [row] = await db.execute(`
  //       INSERT INTO notices(name)
  //       VALUES($1)
  //       RETURNING *
  //     `, [name]);

  //   return row;
  // }

  async create(news) {
    const {
      subTitulo, linkNoticia, linkImagem, titulo,
    } = news;

    const sql = `
      INSERT INTO noticias (subTitulo, linkNoticia, linkImagem, titulo) 
      VALUES (?,?,?,?)
      `;

    const [result] = await db.execute(
      sql,
      [subTitulo, linkNoticia, linkImagem, titulo],
    );
    return result;
  }
}

module.exports = new NoticesRepository();
