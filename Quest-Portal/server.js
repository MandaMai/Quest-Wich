var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
  
var db = mongo.connect("mongodb://localhost:27017/Quest-Portal", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
var Schema = mongo.Schema;  
 
//Schemas for Application so far
var QuestSchema = new Schema(
    {      
    id: { type: Number },
    title: { type: String },       
    description: { type: String },  
    createdDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    totalMissions: { type: Number },
    totalSidetracks: { type: Number },
    progress: { type: Number },
    icon: { type: String },
    totalCampaigns: { type: Number } 
    }
    ,{ versionKey: false });  

var TaskSchema = new Schema(
    {
    id: { type: Number },      
    title: { type: String },       
    description: { type: String },  
    createdDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    relatedQuest: { type: String },
    type: { type: String },
    progress: { type: Number },
    icon: { type: String },
    relatedSkills: { type: String },
    relatedTraits: { type: String } 
    }
    ,{ versionKey: false });  

var ListSchema = new Schema(
    {
    id: { type: Number },  
    type: { type: String }, //skill or trait list
    name: { type: String } //not sure if I should define by this instead since skill is used in item 
    }
    ,{ versionKey: false });

var ItemSchema = new Schema(
    {
    id: { type: Number },  
    type: { type: String }, //skill or trait
    name: { type: String },
    description: { type: String }
    }
    ,{ versionKey: false });

var UserSchema = new Schema(
    {      
    id: {type: Number },
    firstName: { type: String },  
    lastName: { type: String },
    birthdate: { type: Date },
    email: { type: String },
    password: { type: String },
    status: { type: Boolean },
    nickname: { type: String },
    biography: { type: String },  
    createdDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    progress: { type: Number },
    picture: { type: String },
    skillListId: { type: String },
    traitListId: { type: String } 
    }
    ,{ versionKey: false });  
  
//Model Variables for existing schemas    list item user
var questModel = mongo.model('quests', QuestSchema, 'quests'); 
var taskModel = mongo.model('tasks', TaskSchema, 'tasks'); 
var listModel = mongo.model('lists', ListSchema, 'lists');
var itemModel = mongo.model('items', ItemSchema, 'items');
var userModel = mongo.model('users', UserSchema, 'users');
  
//api code for quests
app.post("/api/saveQuest",function(req,res)
{   
    var questMod = new questModel(req.body);  
    if(req.body.mode =="Save")  
    {  
        questMod.save(function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send({data:"Record has been Inserted..!!"});  
        }  
    });  
    } else   
        {  
        questModel.findQuestByIdAndUpdate(
        req.body.id, 
        { 
            title: req.body.title, 
            description: req.body.description,
            createdDate: req.body.createdDate, 
            endDate: req.body.endDate, 
            totalMissions: req.body.totalMissions, 
            totalSidetracks: req.body.totalSidetracks, 
            progress: req.body.progress,
            icon: req.body.icon, 
            totalCampaigns: req.body.totalCampaigns
        },  
        function(err,data) 
            {  
            if (err) { res.send(err); }  
            else { res.send({data:"Record has been Updated..!!"}); }  
            });  
        }  
})  
  
app.post("/api/deleteQuest",function(req,res)
    {      
    questModel.remove({ _id: req.body.id }, function(err) 
        {    
        if(err){ res.send(err); }    
        else{ res.send({data:"Record has been Deleted..!!"}); }    
        });    
    })  
  
app.get("/api/getQuest",function(req,res)
    {  
    questModel.find({},function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send(data); }  
        });  
    })  

//api code for tasks
app.post("/api/saveTask",function(req,res)
{   
    var taskMod = new taskModel(req.body);  
    if(req.body.mode =="Save")  
    {  
        taskMod.save(function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send({data:"Record has been Inserted..!!"});  
        }  
    });  
    } else   
        {  
        taskModel.findTaskByIdAndUpdate(
        req.body.id, 
        { 
            title: req.body.title, 
            description: req.body.description,
            createdDate: req.body.createdDate, 
            endDate: req.body.endDate, 
            relatedQuest: req.body.relatedQuest, 
            type: req.body.type, 
            progress: req.body.progress,
            icon: req.body.icon, 
            relatedSkills: req.body.relatedSkills,
            relatedTraits: req.body.relatedTraits
        },  
        function(err,data) 
            {  
            if (err) { res.send(err); }  
            else { res.send({data:"Record has been Updated..!!"}); }  
            });  
        }  
})  
  
app.post("/api/deleteTask",function(req,res)
    {      
    taskModel.remove({ _id: req.body.id }, function(err) 
        {    
        if(err){ res.send(err); }    
        else{ res.send({data:"Record has been Deleted..!!"}); }    
        });    
    })  
  
app.get("/api/getTask",function(req,res)
    {  
    taskModel.find({},function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send(data); }  
        });  
    })  

app.post("/api/saveList",function(req,res)
{   
    var listMod = new listModel(req.body);  
    if(req.body.mode =="Save")  
    {  
        listMod.save(function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send({data:"Record has been Inserted..!!"});  
        }  
    });  
    } else   
        {  
        listModel.findListByIdAndUpdate(
        req.body.id, 
        { 
            id: req.body.id, 
            type: req.body.type,
            name: req.body.name
        },  
        function(err,data) 
            {  
            if (err) { res.send(err); }  
            else { res.send({data:"Record has been Updated..!!"}); }  
            });  
        }  
})  
    
app.post("/api/deleteList",function(req,res)
    {      
    listModel.remove({ _id: req.body.id }, function(err) 
        {    
        if(err){ res.send(err); }    
        else{ res.send({data:"Record has been Deleted..!!"}); }    
        });    
    })  
    
app.get("/api/getList",function(req,res)
    {  
    listModel.find({},function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send(data); }  
        });  
    })  

app.post("/api/saveItem",function(req,res)
{   
    var itemMod = new itemModel(req.body);  
    if(req.body.mode =="Save")  
    {  
        itemMod.save(function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send({data:"Record has been Inserted..!!"});  
        }  
    });  
    } else   
        {  
        itemModel.findItemByIdAndUpdate(
        req.body.id, 
        { 
            id: req.body.id, 
            type: req.body.type, 
            description: req.body.description, 
            name: req.body.name
        },  
        function(err,data) 
            {  
            if (err) { res.send(err); }  
            else { res.send({data:"Record has been Updated..!!"}); }  
            });  
        }  
})  
    
app.post("/api/deleteItem",function(req,res)
    {      
    itemModel.remove({ _id: req.body.id }, function(err) 
        {    
        if(err){ res.send(err); }    
        else{ res.send({data:"Record has been Deleted..!!"}); }    
        });    
    })  
    
app.get("/api/getItem",function(req,res)
    {  
    itemModel.find({},function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send(data); }  
        });  
    })  

app.post("/api/saveUser",function(req,res)
{   
    var userMod = new userModel(req.body);  
    if(req.body.mode =="Save")  
    {  
        userMod.save(function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send({data:"Record has been Inserted..!!"});  
        }  
    });  
    } else   
        {  
        userModel.findUserByIdAndUpdate(
        req.body.id, 
        {
            id: req.body.id, 
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            birthdate: req.body.birthdate,
            email: req.body.email,
            password: req.body.password,
            status: req.body.status,
            nickname: req.body.nickname,
            biography: req.body.biography,
            createdDate: req.body.createdDate,
            endDate: req.body.endDate,
            progress: req.body.progress,
            picture: req.body.picture,
            skillListId: req.body.skillListId,
            traitListId: req.body.traitListId
        },  
        function(err,data) 
            {  
            if (err) { res.send(err); }  
            else { res.send({data:"Record has been Updated..!!"}); }  
            });  
        }  
})  
    
app.post("/api/deleteUser",function(req,res)
    {      
    userModel.remove({ _id: req.body.id }, function(err) 
        {    
        if(err){ res.send(err); }    
        else{ res.send({data:"Record has been Deleted..!!"}); }    
        });    
    })  
    
app.get("/api/getUser",function(req,res)
    {  
    userModel.find({},function(err,data)
        {  
        if(err){ res.send(err); }  
        else{ res.send(data); }  
        });  
    })  

//Get 'er started
app.listen(8080, function () {      
console.log('Example app listening on port 8080!')  
})
