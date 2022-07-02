const express = require('express');
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser')
app.use(bodyParser());
const fs = require('fs')
const path = require('path')
const port = 3000;
app.use(express.static('./'))
app.use(express.static('/'))
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Content-Type",'application/json');
    // Pass to next layer of middleware
    next();
  });
app.listen(port,()=>{
    console.log(`server is listening on the port ${port}`)
})


 

//db section
var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database:"blood"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to  auth!");
  });
  
//end db section

app.get('/',(req,res,next)=>{
    res.send('Welcome to deda')
})
// auth section
app.get('/auth',(req,res,next)=>{
    res.send('This is auth section')
    })
    
    app.post('/auth/login', function(req, res, next) {
      console.log(req.body)
      if(!req.body){res.json({msg:'Internal Error occurred',variant:'danger'})};
      con.query(`SELECT * from blood.auth WHERE username='${req.body.username}'`,(err,resu)=>{
        if(err){
          console.log('err at auth db',err)
        } else{
          if(!!(resu.length==0)){
            res.json({msg:'No Login found',variant:'primary'})
            console.log('no data found');
          }else{
          resu.forEach(element => {
              if(element=req.body.password){
                res.json({msg:'Successful login',variant:'success',data:{ID:element.id,Name:element.name}})
                console.log('successful login')
              }else{
                res.json({msg:'Unsuccessful Login',variant:'danger'});
                console.log('Unsuccessful login')
              }
          });
          
          }
        }
      })  
    });
    
 
app.post('/dashboard/delete',(req,res,next)=>{
 // console.log({res:!!req.body.postId})
if(!!req.body.postId){
      con.query(`DELETE FROM postmade WHERE postId=${req.body.postId}`,(e1,r1)=>{
        if(e1) throw e1;
        if(r1){
          res.send({msg:'Successfully Deleted',variant:'success'})
        }
      })
        }else{
         res.send({msg:'500 Internal Error',variant:'danger'})
        }
})
app.get('/register',(req,res)=>{
res.json('hey i am working')
})
app.post('/register',(req,res,next)=>{
if(!req.body){
  res.json({msg:'Internal Error'})
}else{
  const image = req.body.image;
  const image_name=req.body.image_name;
  console.log({image:req.body})
  var dir = `./public/studentData`;
  var base64Data = image.replace(/^data:image\/\w+;base64,/, '')
  var ext = path.extname(image_name);
  filePath = path.join(dir, `${req.body.roll}.${ext}`);
  fs.exists(path.join(filePath), exists => {
    console.log(exists ? "The directory already exists" 
                      : "Not found!");
                      if(exists){
                        fs.writeFile(filePath, base64Data,{encoding: 'base64'}, function(err, data) {
                          if (err) {
                                    console.log('error at writing file',err)
                                  }else{
                                    console.log('written file')
                                  }
                                    })
                      }else{
                        try {
                          fs.mkdir(dir,{recursive: true},(err)=>{
                            console.log(err)
                          });
                          fs.writeFile(filePath, base64Data,{encoding: 'base64'}, function(err, data) {
                            if (err) {
                                      console.log('error at writing file',err)
                                    }else{
                                      console.log('written file')
                                    }
                                      })
                        } catch(e) {
                          if (e.code != 'EEXIST') 
                          console.log(e);
                        }
                      }
  });

  con.query('INSERT INTO studentdata (name,photo,dep,b_type,last_d,time_d,gender,contact) VALUES (?,?,?,?,?,?,?,?)',[req.body.name,filePath,req.body.dep,req.body.btype,req.body.last_d,req.body.time_d,req.body.gender,req.body.roll],(err,result)=>{
    if(err){
      res.json({message:'Error at feeding DataBase',variant:'danger'})
      console.log({'databse error':err})
    }
    if(result){
      res.json({msg:'successfully registed at database',variant:'success'})
      console.log({'databse result':result})
    }
  })
}
})
app.post('/getdata',(req,res,next)=>{
  console.log({searchdata:req.body})
  if(!!req.body.search){
    con.query(`SELECT * from studentdata where name='%${req.body.search}%'`,(err,result)=>{
      if(err){
        res.json({msg:'Error Occurred'})
      }
      if(result){
        res.json({msg:'Successfully Fetched',result:Object.values(JSON.parse(JSON.stringify(result)))})
      }
    })
  }else if(!!req.body.b_type){
    con.query(`SELECT * from studentdata where b_type='%${req.body.b_type}%'`,(err,result)=>{
      if(err){
        res.json({msg:'Error Occurred'})
      }
      if(result){
        res.json({msg:'Successfully Fetched',result:Object.values(JSON.parse(JSON.stringify(result)))})
      }
    })
  }else{
    con.query(`SELECT * from studentdata`,(err,result)=>{
      if(err){
        res.json({msg:'Error Occurred'})
      }
      if(result){
        res.json({msg:'Successfully Fetched',result:Object.values(JSON.parse(JSON.stringify(result)))})
      }
    })
  }

})


 