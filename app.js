let express = require('express');
let app =express();
let cors = require('cors');
//define port no 
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9310;

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let mongoUrl = "mongodb+srv://jami:Venkatsai@cluster0.aiz67sc.mongodb.net/?retryWrites=true&w=majority";
let db;
app.use(cors());
//body-parser is one of package through which post call happens
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //this lines which help to read the data



app.get('/', function(req,res){
    res.send("Hi from Express")
})

//get categories
app.get('/categories', function(req,res){
    db.collection('category').find().toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

// get Details 
app.get('/details', function(req,res){
    db.collection('Details').find().toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//get Best Sellers
app.get('/bestsellers', function(req,res){
    db.collection('BestSellers').find().toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

// get Boneless Cuts
app.get('/bonelesscuts', function(req,res){
    db.collection('Bonelesscuts').find().toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

// get items wrt to category
app.get('/CategoryDetail/:catId', function(req,res){
    console.log(req.params.catId) 
    let catId = Number(req.params.catId)
    let subCatId = req.query.subCatId;
    console.log(req.query.subCatId)
    let query = {};

    if(subCatId){
        query = {
            category_id:catId,
            subCategory_id:subCatId
        }
    }else{
        query = {
            category_id:catId,
        }
    }
    db.collection('Details').find(query).toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//Details of item
app.get('/detail/:itemId', function(req,res){
    console.log(req.params.itemId) 
    let item_id = Number(req.params.itemId)
    db.collection('Details').find({id:item_id}).toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})


//Details of BestSellers item
app.get('/bsDetail/:itemId', function(req,res){
    console.log(req.params.itemId) 
    let item_id = Number(req.params.itemId)
    db.collection('BestSellers').find({id:item_id}).toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//Details of Boneless cuts item
app.get('/bcDetail/:itemId', function(req,res){
    console.log(req.params.itemId) 
    let item_id = Number(req.params.itemId)
    db.collection('Bonelesscuts').find({id:item_id}).toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

// order
app.get('/orders', function(req,res){
    let query = {}
    let email = req.query.email

    if(email){
        query = {email:email}
    }
    db.collection('orders').find(query).toArray((err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

//Item Details

app.post('/product',(req,res)=>{
    if(Array.isArray(req.body.id)){
        db.collection('Details').find({id:{$in:req.body.id}}).toArray((err,data)=>{
            if(err) throw err;
            res.send(data)
        })
    }else{
        res.send("Invalid Input")
    }
})

//place order
app.post('/placeOrder', function(req,res){
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('order Created')
    })
})


//update order

app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

// delete order
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})


//connection with db
MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("Error while Connecting")
    db = client.db('liciousdata') //database name
    app.listen(port, (err)=>{
        if(err) throw err,
        console.log(`server listening on port ${port}`)
    })
})




