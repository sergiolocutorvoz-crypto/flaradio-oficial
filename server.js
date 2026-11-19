const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DB = path.join(__dirname, 'data.json');
const adminUser = process.env.ADMIN_USER || 'admin';
const adminPass = process.env.ADMIN_PASSWORD || 'ChangeMe-123!';
const starter = {
 settings:{siteName:'FlaRádio Oficial',slogan:'A voz da Nação Rubro-Negra',radioName:'FlaRádio Oficial',radioNow:'A voz da Nação',streamUrl:'',streamStatusText:'STREAM PRONTO PARA CONECTAR',radioDescription:'Acompanhe a programação, as notícias e a resenha rubro-negra.',heroTitle:'O FLAMENGO SE VIVE. SE OUVE.',heroText:'A emoção rubro-negra, com informação, debate e voz de torcedor.',heroImage:'',featureImage:'',featureTitle:'A paixão não tem intervalo.',featureSubtitle:'Fique por dentro do universo rubro-negro.',featureButtonText:'Confira as notícias',featureButtonUrl:'#noticias',youtubeUrl:'',instagramUrl:'',whatsappUrl:'',twitterUrl:'',tiktokUrl:'',tickerText:'A voz da Nação Rubro-Negra • Informação, debate e paixão',bannerInterval:8},
 match:{competition:'FUTEBOL • FLAMENGO',status:'PRÓXIMO JOGO',homeName:'FLAMENGO',homeBadge:'CRF',homeScore:0,awayName:'ADVERSÁRIO',awayBadge:'ADV',awayScore:0,clock:'--:--',time:'--:--',venue:'Acompanhe a cobertura na FlaRádio'},
 banners:[],news:[{id:1,title:'FlaRádio Oficial está chegando!',category:'NOVIDADE',summary:'Em breve, muita informação, debate e emoção rubro-negra.',image:'',date:new Date().toISOString().slice(0,10),url:''}],
 programs:[{id:1,name:'Pré-Jogo',time:'A definir',description:'Esquenta e análise antes da bola rolar.'},{id:2,name:'Resenha Rubro-Negra',time:'A definir',description:'Debate, notícias e opinião.'}],team:[{id:1,name:'Sua equipe',role:'Narradores e comentaristas',bio:'Cadastre os integrantes da equipe pelo painel administrativo.'}]
};
function loadData(){try{return JSON.parse(fs.readFileSync(DB,'utf8'))}catch{fs.writeFileSync(DB,JSON.stringify(starter,null,2));return JSON.parse(JSON.stringify(starter))}}
let data=loadData();function save(){fs.writeFileSync(DB,JSON.stringify(data,null,2))}
app.use(express.json({limit:'2mb'}));
app.use(session({secret:process.env.SESSION_SECRET||'replace-with-a-long-random-secret-before-deployment',resave:false,saveUninitialized:false,cookie:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',maxAge:8*60*60*1000}}));
app.use(express.static(path.join(__dirname,'public')));
const auth=(req,res,next)=>req.session.loggedIn?next():res.status(401).json({error:'Faça login'});
app.post('/api/login',(req,res)=>{const {username,password}=req.body||{};if(username===adminUser&&password===adminPass){req.session.loggedIn=true;return res.json({ok:true})}res.status(401).json({error:'Usuário ou senha inválidos'})});
app.post('/api/logout',(req,res)=>req.session.destroy(()=>res.json({ok:true})));
app.get('/api/public',(req,res)=>res.json(data));
app.get('/api/admin/data',auth,(req,res)=>res.json(data));
app.put('/api/admin/data',auth,(req,res)=>{const incoming=req.body;if(!incoming||!incoming.settings||!incoming.match||!Array.isArray(incoming.banners)||!Array.isArray(incoming.news)||!Array.isArray(incoming.programs)||!Array.isArray(incoming.team))return res.status(400).json({error:'Dados inválidos'});data=incoming;save();res.json({ok:true})});
app.get('/admin',(req,res)=>res.sendFile(path.join(__dirname,'public','admin.html')));
app.listen(PORT,()=>console.log(`FlaRadio site running at port ${PORT}`));
