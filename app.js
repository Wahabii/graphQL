const express=require('express');
const graphHTTP=require('express-graphql');
const mongoose=require('mongoose');
const schema=require('./schema/schema');

const app=express();



//connect to mlab database

mongoose.connect('mongodb+srv://malikovic:123456789m@cluster0-rkwtx.azure.mongodb.net/test?retryWrites=true&w=majority')

,{ useUnifiedTopology: true };
mongoose.connection.once('open',()=> 
{console.log('connected with database ')})

app.use('/graphql',graphHTTP({
schema,
graphiql:true

}))

app.listen(4000,()=> console.log('listen with port 4000'));