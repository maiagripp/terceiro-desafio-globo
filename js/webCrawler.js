const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

api = axios.create({
    baseURL: "https://g1.globo.com/",
});
const PATH_JSON_FILE = "../paginaG1.json"

async function getPage() {
    try {
        const response = await api.get(`/`)
        return response.data
    } catch (err) {
        console.log(err)
    } 
}

function writeFile(json) {
    const data = JSON.stringify(json,null,2)
    const filePath = path.join(__dirname, PATH_JSON_FILE)
    fs.writeFile(filePath, data, "utf-8", (err)=>{
        if (err) {
            console.log(err)
        }        
    })
}

function getNoticias($){
    noticias =[]
    
    $('.feed-post').each((i, el) => {               
        noticiasRelacionadas = []
        subTitulo = $(el).find('.feed-post-header-chapeu').text()
        titulo = $(el).find('.feed-post-link').text()
        linkNoticia = $(el).find('.feed-post-link').attr('href')
        linkImagem = $(el).find('.bstn-fd-picture-image').attr('src')
        $(el).find('.feed-post-body-title ').each((index, elemento) => {
            noticiaRelacionada = {
                linkNoticia: $(elemento).attr('href'),
                titulo: $(elemento).text()
            }
            if (titulo != noticiaRelacionada.titulo)
                noticiasRelacionadas.push(noticiaRelacionada)
        })

        
        noticia = {
            subTitulo,
            linkNoticia,
            linkImagem,
            titulo,
            noticiasRelacionadas
        }
        noticias.push(noticia)
    })
    return noticias
}

async function main() {
    const html = await getPage()
    const $ = cheerio.load(html)

    noticias = getNoticias($)
    writeFile(noticias)
}

main()
