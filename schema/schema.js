const graphql=require('graphql');
const _=require('lodash');
const Materiel=require('../models/materiel');
const User=require('../models/user');





const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt,
       GraphQLList,
        GraphQLNonNull,
        GraphQLBoolean,
        GraphQLFloat}=graphql;


const MaterielType= new GraphQLObjectType({
name:'Materiel',
fields:()=>({
id:{ type: GraphQLID},
marque:{type:GraphQLString},
reference_model:{type:GraphQLString},
annee:{type:GraphQLInt},
puissance:{type:GraphQLString},
nombre_heures:{type:GraphQLInt},
Etat_general:{type:GraphQLString},
Pneus_avant:{type:GraphQLString},
imgBytedata:{type:GraphQLString},
user:{
 type:UserType,
 resolve(parent,args){
   return User.findById(parent.userId);
 }

}
})
})


const UserType= new GraphQLObjectType({
    name:'User',
    fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    password:{type:GraphQLString},
    isAdmin:{type:GraphQLBoolean},
    materiels:{
      type:new GraphQLList(MaterielType),
      resolve(parent,args){
        return Materiel.find({userId:parent.id})
      }


    }
    })
    })


const RootQuery=new GraphQLObjectType({
name:'RootQueryType',
fields:{

materiel:{
  type:MaterielType,
  args:{id:{type:GraphQLID}},
  resolve(parent,args){
   return Materiel.findById(args.id);

  }
},
user:{
type:UserType ,
args:{id:{type:GraphQLID}},
resolve(parent,args){
 return User.findById(args.id);

}
},
  materiels:{
    type:new GraphQLList(MaterielType),
    resolve(parent,args){
      return Materiel.find({});

    }

  },users:{
    type:new GraphQLList(UserType),
    resolve(parent,args){
     return User.find({});

    }

  }

}

});


const Mutation = new GraphQLObjectType({
name:'Mutation',
fields:{
addUser:{
 type:UserType ,
 args:{
 name:{type:new GraphQLNonNull(GraphQLString)},
 password:{type:new GraphQLNonNull(GraphQLString)},
 isAdmin:{type:new GraphQLNonNull(GraphQLBoolean)},
 }, 
 resolve(parent,args){
  let user=new User({
    name:args.name,
    password:args.password,
    isAdmin:args.isAdmin

  });

  return  user.save();
 }
 },
 updateAuthor:{
  
 },
 addMateriel:{
  type:MaterielType,
   args:{
    marque:{type:new GraphQLNonNull(GraphQLString)},
    reference_model:{type:new GraphQLNonNull(GraphQLString)},
    annee:{type:new GraphQLNonNull(GraphQLInt)},   
    puissance:{type:new GraphQLNonNull(GraphQLString)},
    nombre_heures:{type:new GraphQLNonNull(GraphQLInt)},
    Etat_general:{type:new GraphQLNonNull(GraphQLString)}, 
    Pneus_avant:{type:new GraphQLNonNull(GraphQLString)},
    imgBytedata:{type:new GraphQLNonNull(GraphQLString)},
    userId:{type:new GraphQLNonNull(GraphQLID)}
   },
     resolve(parent,args){
       let materiel=new Materiel({
        marque:args.marque,
        reference_model:args.reference_model,
        annee:args.annee,
        puissance:args.puissance,
        nombre_heures:args.nombre_heures,
        Etat_general:args.Etat_general,
        Pneus_avant:args.Pneus_avant,
        imgBytedata:args.imgBytedata,
        userId:args.userId
       });
      return materiel.save();
     }
 }
}
})


module.exports=new GraphQLSchema({

query:RootQuery,
mutation:Mutation

})