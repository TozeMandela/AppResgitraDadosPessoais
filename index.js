const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const h='.handlebars';
let aux;
const cadastros = require('./Models/tbl');

/* usando o body-parser */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* usando handlebar engine */
app.engine('handlebars', engine({defaultLayout:'main'}));
app.set('View engine', 'handlebars');

/* rota principal */
app.get('/', (req, res)=>{
    res.render('inicio'+h);
});
/* rota que faz add de dados na base de dados */
app.post('/inicio',(req, res)=>{
    if(req.body.nome && req.body.senha ){
        cadastros.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: req.body.senha,
            informacao: req.body.informacao,
            profissao: req.body.profissao,
            data_nasc: req.body.data.replace(/(\d{2})-(\d{2})-([0-9]{4})/gi,'$3-$2-$1')
        }).then(()=>{
        res.redirect('/cadastro'); 
        }).catch((err)=>{
            console.log('erro ao cadastrar...',err);
        })
    }else{
        res.render('preencha os campos nome, senha')
    }
});

/* rota cadastro */
app.post('/cadastro', (req, res)=>{
    res.render('cadastro'+h);
});

app.get('/cadastro', (req, res)=>{
    res.render('cadastro'+h);
});

/* rota login */
app.post('/login', (req, res)=>{
    if(req.body.senha && req.body.nome && req.body.sobrenome){
        
        cadastros.findAll().then((dados)=>{
            dados.forEach(el => {
                if(el.senha === req.body.senha) aux = el.id;
            });
        })
        res.redirect('/informacao');
    };
});

app.get('/login', (req, res)=>{
    res.render('login'+h);
});

/* rota informação */
app.get('/informacao',(req, res)=>{
        if(aux){
                cadastros.findByPk(aux).then((dados)=>{
                let a = [dados]
                console.log(a)
                res.render('informacao'+h,{dados:a.map(d=>d.toJSON())});
            });
        }else{
            res.send(`'<h1 style="text-align: center;">não existe cadastro feito com os dados que passou!!!
            </h1> <a href="/" style="text-align: center;"><h2>voltar</h2></a>'`)
        }
});

/* 
servidor
 */
app.listen(3000, ()=>{
    console.log('servidor api gestão de dados pessoais rodando...');
});