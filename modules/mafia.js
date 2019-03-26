exports.active=true;
exports.commands={};
//________________________c0
exports.createList=async(client,title,arr_of_strings)=>{try{
//return list generated from arr joined by new line tag
       let str = title+'\n';
       str+=arr_of_strings.join('\n');
       console.log(str);
       return str;
}catch(err){console.log(err);};};//createList end

//(name data1+\n+data2)
//________________________c1
exports.rndOrder=async(client,arr)=>{
try{
  
   //let arr=arr.slice();
   let new_arr = [];
    let len = arr.length;
   for (let i = 0;i<len;i++){
     let xrnd_ = Math.ceil(Math.random() * arr.length-2);
   //  console.log(xrnd_);
   let el = await arr.splice(xrnd_,1).join('');
     new_arr.push(el);
       };//for end
    return new_arr;

}catch(err){console.log(err);};
};//rndRole end
//_________________________________________COMMANDS_PART_________________________________________________
//____________c0
module.exports.commands.mafHelp={ on:true, aliase:'mafHelp', run:async(client,message,args)=>{try{
               await require('./mafiaVoiting.js').commands.mafHelp.run(client,message);
               await require('./mafiaGameRoles.js').commands.mafHelp.run(client,message);
               await require('./mafiaDmRedirect.js').commands.mafHelp.run(client,message);
                await require('./mafiaPlayer2.js').commands.mafHelp.run(client,message);

}catch(err){console.log(err);};}};//
//____________c1