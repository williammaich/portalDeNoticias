const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const Posts = require('./Posts.js');

// Configuração do Mongoose
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://williammaich:RinOyHRev14e3XPl@cluster0.u68ut.mongodb.net/dankicode?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function () {
    console.log('conectado ao MongoDB com Mongoose');
}).catch(function (err) {
    console.log(err.message);
});

// Configuração do MongoDB com MongoClient
const uri = "mongodb+srv://williammaich:RinOyHRev14e3XPl@cluster0.u68ut.mongodb.net/dankicode?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Conectar o cliente ao servidor
    await client.connect();
    // Enviar um ping para confirmar a conexão bem-sucedida
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Garantir que o cliente será fechado quando terminar/erro
    await client.close();
  }
}
run().catch(console.dir);

// Configuração do Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/', (req, res) => {
    if (req.query.busca == null) {
       
        Posts.find({}).sort({ '_id': -1 }).exec(function (err, posts) {
         posts = posts.map(function (val) {
             return{
                titulo: val.titulo,
                conteudo: val.conteudo,
                descricaoCurta: val.conteudo.substr(0,100),
                imagem: val.imagem,
                slug: val.slug,
                categoria: val.categoria
             }
         })
            res.render('home', { posts: posts });
        })
    } else {
        res.send('busca', {});
    }
});

app.get('/:slug', (req, res) => {
    res.render('single', {});
});

app.listen(5000, () => {
    console.log('server rodando!');
});
