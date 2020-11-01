const axios = require('axios');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class News {
  getAll(req, res) {
    //console.log('Query params: ', req.query.test);
    const url = `${apiUrl}everything?q=bitcoin&sortBy=publishedAt&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      res.send(response.data.articles);
    }).catch(e => {
      res.send('Oops! Failed!')
      res.end();
    })
  }

  getById(req, res) {
    res.send('Traer la noticia ' + req.params.noticiaID);
  }
  getTopHeadlines(req,res){
    const url = `${apiUrl}top-headlines?country=${req.params.country||'mx'}&apiKey=${apiKey}`;
    axios.get(url).then(response => {
      if(req.params.country){
        res.send(response.data.articles);
      }else{
        res.redirect(req.originalUrl +'/mx');
      }
    }).catch(e => {
      res.send('Oops! Failed!')
      res.end();
    })
  }

  getNews(req,res){
    let url = `${apiUrl}everything?q=${req.query.q}&apiKey=${apiKey}`;
    if(req.query.sources){
      url = url.concat(`&sources=${req.query.sources}`);
    }
    axios.get(url).then(response => {
      res.send(response.data.articles);
    }).catch(e => {
      res.send('Oops! Failed!');
      res.end();
    })
  }

  getSources(req,res){
    const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
    axios.get(url).then(response =>{
      res.send(response.data.sources);
    }).catch(e =>{
      res.send('Oops! Failed!');
      res.end();
    })
  }
}


module.exports = new News();

