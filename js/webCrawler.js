const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const api = axios.create({
  baseURL: 'https://g1.globo.com/',
});
const PATH_JSON_FILE = '../paginaG1.json';

async function getPage() {
  try {
    const { data } = await api.get('/');

    return data;
  } catch (err) {
    console.log(err);
  }
}

function writeFile(json) {
  const data = JSON.stringify(json, null, 2);
  const filePath = path.join(__dirname, PATH_JSON_FILE);
  fs.writeFile(filePath, data, 'utf-8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getNoticias($) {
  const noticias = [];

  $('.feed-post').each((i, el) => {
    const noticiasRelacionadas = [];
    const subTitulo = $(el).find('.feed-post-header-chapeu').text();
    const titulo = $(el).find('.feed-post-link').text();
    const linkNoticia = $(el).find('.feed-post-link').attr('href');
    const linkImagem = $(el).find('.bstn-fd-picture-image').attr('src');
    $(el).find('.feed-post-body-title ').each((index, elemento) => {
      const noticiaRelacionada = {
        linkNoticia: $(elemento).attr('href'),
        titulo: $(elemento).text(),
      };
      if (titulo !== noticiaRelacionada.titulo) { noticiasRelacionadas.push(noticiaRelacionada); }
    });

    const noticia = {
      subTitulo,
      linkNoticia,
      linkImagem,
      titulo,
      noticiasRelacionadas,
    };
    noticias.push(noticia);
  });
  return noticias;
}

async function main() {
  const html = await getPage();
  const $ = cheerio.load(html);

  const noticias = getNoticias($);
  writeFile(noticias);
}

main();
module.exports = main