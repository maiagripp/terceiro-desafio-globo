function createNews(noticias) {
  document.getElementById('news').innerHTML = '';
  let html = '';
  // html += `<div class="container">`
  noticias.forEach((noticia) => {
    html += '<div class="noticia">';
    html += `<img class="imagem" src="${noticia.linkImagem}">`;
    html += '<div class="noticia-texto">';
    html += `<h2 class="subTitulo">${noticia.subTitulo}</h2>`;
    html += `<a class="titulo" href="${noticia.linkNoticia}">${noticia.titulo}</a>`;
    html += '<ul class="lista">';
    noticia.noticiasRelacionadas.forEach((noticiaRelacionada) => {
      html += `<li class="lista-item"><a href="${noticiaRelacionada.linkNoticia}">${noticiaRelacionada.titulo}</a></li>`;
    });
    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '<hr>';
  });
  document.getElementById('news').innerHTML += html;
}

async function getJson() {
  const response = await fetch('paginaG1.json').then();
  const noticias = await response.json();
  return noticias;
}

const result = getJson().then((noticias) => {
  createNews(noticias);
});
