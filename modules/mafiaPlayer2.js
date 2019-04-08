//________________________________________TOOLS__________________________________________
let delay=async(duration)=>{await new Promise(resolve=>setTimeout(resolve,duration))}; //* for delay inside async function, use it instead setTimeout
let random =(max)=>{ return Math.floor(Math.random()*max);};


//_________________PART MANAGER (OPCIONAL)
exports.RH_IGNORE_TOTAL=false;//add this line to ignore this module 
exports.RH_IGNORE_COMMANDS=false;//add this line to ignore all commands from this module
module.exports.RH_BOOTS=false;//add this line to ignore all boots from this module
module.exports.RH_IGNORE_EVENTS=false;//add this line to ignore all events from this module
module.exports.RH_IGNORE_EVENTS_PRIMITIVE=false;//add this line to ignore all events_primitive from this module


module.exports.e={
    game_leader_role_name:'mafia_leader'
   ,game_role_name:'mafia_game'

};

//_________________________________________BOOTS_PART___________________________________________________
module.exports.boots = {}; 

module.exports.boots.someBoot={run:async(client)=>{try{
    //code to execut bot on loading
    if(!client.sub1) return;
    client.sub1.on("message",async (message) => {try{
    if(message.author.bot) return;
if(client.sub2&&client.sub2.user.id==message.author.id) return;
      
     let dm = message.channel.type=='dm';
      //if(!dm&&message.channel.name!='текстовая мафия') return;
      if(!dm&&message.guild.id!=client.SERVER_ID) return;
       if(message.author.id==client.sub1.user.id) return;
       
       let author_mmb=await client.guilds.get(client.SERVER_ID).fetchMember(message.author.id).then(mmb=>{return mmb}).catch(err=>{return false;});
       let isLeader=author_mmb.roles.find(r=>r.name==module.exports.e.game_leader_role_name);
       if(dm&&!isLeader) return;
      
       
       if(!dm&&message.mentions.members.length==0) return;
       if(!dm&&!message.mentions.members.get(client.sub1.user.id)) return;
       if((/лалка/).test(message.content)) {message.channel.send('сам лалка');};
      if((/тест/).test(message.content)) {
        /*
          let result=await message.channel.search({
             content: 'да'
           }).then(res => {
  const hit = res.messages[0].find(m => m.hit).content;
  console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
}).catch(console.error);
console.log(result);
*/
};

       if(message.content.indexOf('?')!=-1) {
           let rnd= random(3);
           let str=(rnd==1)?'да':(rnd==0)?'нет':'не знаю';
            message.reply(str);
          };
       if(!isLeader) return ;
       let s_args=await module.exports.extractArgs(message);
       if(message.content.indexOf('поставь реакцию')!=-1){return module.exports.addReaction(client,message,s_args);};//
       if((/выбери цель/).test(message.content)){return module.exports.chooseAim(client,message,s_args);};//
       if((/выбери/).test(message.content)){return module.exports.chooseOne(message,s_args);};//
       if((/голосуй/).test(message.content)){return module.exports.chooseAimVoite(client,message,s_args);};// 

       }catch(err){console.log(err);}; });//

}catch(err){console.log(err);};}};//

//...
module.exports.boots.someBoot2={run:async(client)=>{try{
    //code to execut bot on loading
    if(!client.sub2) return;
    client.sub2.on("message",async (message) => {try{
      if(message.author.bot) return;
if(client.sub1&&client.sub1.user.id==message.author.id) return;
      let dm = message.channel.type=='dm';
      //if(!dm&&message.channel.name!='текстовая мафия') return;
      if(!dm&&message.guild.id!=client.SERVER_ID) return;
       if(message.author.id==client.sub2.user.id) return;
       let author_mmb=await client.guilds.get(client.SERVER_ID).fetchMember(message.author.id).then(mmb=>{return mmb}).catch(err=>{return false;});
       let isLeader=author_mmb.roles.find(r=>r.name==module.exports.e.game_leader_role_name);
       if(dm&&!isLeader) return;
      
       
       if(!dm&&message.mentions.members.length==0) return;
       if(!dm&&!message.mentions.members.get(client.sub2.user.id)) return;
       if((/лалка/).test(message.content)) {message.channel.send('сам лалка');};
      if((/тест/).test(message.content)) {
        /*
          let result=await message.channel.search({
             content: 'да'
           }).then(res => {
  const hit = res.messages[0].find(m => m.hit).content;
  console.log(`I found: **${hit}**, total results: ${res.totalResults}`);
}).catch(console.error);
console.log(result);
*/
};

       if(message.content.indexOf('?')!=-1) {
           let rnd= random(3);
           let str=(rnd==1)?'да':(rnd==0)?'нет':'не знаю';
            message.reply(str);
          };
       if(!isLeader) return ;
       let s_args=await module.exports.extractArgs(message);
       if(message.content.indexOf('поставь реакцию')!=-1){return module.exports.addReaction(client,message,s_args);};//
       if((/выбери цель/).test(message.content)){return module.exports.chooseAim(client,message,s_args);};//
       if((/выбери/).test(message.content)){return module.exports.chooseOne(message,s_args);};//
       if((/голосуй/).test(message.content)){return module.exports.chooseAimVoite(client,message,s_args);};// 

       }catch(err){console.log(err);}; });//

}catch(err){console.log(err);};}};//

//_________________________________________COMMANDS_PART_________________________________________________
module.exports.commands = {};
module.exports.commands.mafHelp={ on:true, aliase:'mafPlayerHelp', run:async(client,message,args)=>{try{
              
              let str='playerHelp (доступно с ролью mafia_leader)\n';
              str+='[@\\dm выбери {вариант1,вариант2..} ] - предложить выбрать из вариантов\n';
              str+='[@\\dm выбери цель ] - предложить выбрать из участников роли mafia_game\n';
              str+='[@ голосуй  ] - предложить проголосовать против кого-то из участников роли mafia_game\n';
              str+='[@ поставь реакцию {idсообщения} ] - предложить поставить реакцию под сообщением\n';
              message.channel.send(str,{code:'ini'});

}catch(err){console.log(err);};}};//
module.exports.commands.someCommand={aliase:'sub1', run:async(client,message,args)=>{try{
   //code to execut then this command triggered
    // client.sub1.emit();
}catch(err){console.log(err);};}};//

// ...


//_________________________________________EVENTS_PART_________________________________________________
module.exports.events={};

module.exports.events.someEvent={ run:async(client,event_parametrs)=>{try{
    //code to execut then event occurs
}catch(err){console.log(err);};}};//

// ...
//_________________________________________EVENTS_PART_END__________________________________________

//______________________________EVENTS PRIMITIVE
module.exports.events_primitive={};

module.exports.events_primitive.SOME_EVENT_NAME={run:async(client,event)=>{try{
      //some code here
}catch(err){console.log(err);};}};//

//_________________SUB_COMMANDS
//s0
module.exports.addReaction=async(client,message,s_args)=>{try{
   
    
    let msg = await message.channel.fetchMessage(s_args[0]).then(m=>{return m;}).catch(err=>{ return false;});
          if(msg){
                msg.react('✔');
                message.channel.send('ок, поставил');
           };//
          if(!msg){message.channel.send('не нашел сообщение с таким айди')};
          return;

}catch(err){console.log(err);};}//

module.exports.extractArgs=async(message)=>{try{
          if( message.content.indexOf('{')==-1 ) return false;
          let s_args=message.content.split('{');
          s_args.shift();
          s_args=s_args.map(e=>{e=e.split('}');return e[0];});
          return s_args;
}catch(err){console.log(err);};}//


module.exports.chooseOne=async(message,s_args)=>{try{
                if (!s_args) return message.reply('варианты не указаны');
                let arr1=(s_args[0].indexOf(',')!=-1)?s_args[0].split(','):[s_args[0]];
                let rnd=random(arr1.length);
                
                message.reply(arr1[rnd]);
}catch(err){console.log(err);};}//

module.exports.chooseAim=async(client,message,s_args)=>{try{
               // if (!s_args) return message.reply('название роли не указанно');
                let role = await client.guilds.get(client.SERVER_ID).roles.find(r=>r.name==module.exports.e.game_role_name);
               // if(!role) return message.reply('роли с таким названием нет на сервере');
                let arr=role.members.keyArray(); 
                let rnd=random(arr.length);
                let member =await client.guilds.get(client.SERVER_ID).fetchMember(arr[rnd]).then(mmb=>{return mmb;}).catch(err=>{return false;});
                if(!member) message.reply('error');
                message.reply(member.user.username+"#"+member.user.discriminator);
                return;
}catch(err){console.log(err);};}//

module.exports.chooseAimVoite=async(client,message,s_args)=>{try{
               // if (!s_args) return message.reply('название роли не указанно');
                let role = await client.guilds.get(client.SERVER_ID).roles.find(r=>r.name==module.exports.e.game_role_name);
               // if(!role) return message.reply('роли с таким названием нет на сервере');
                let arr=role.members.keyArray();
                let rnd=random(arr.length);
                let member =await client.guilds.get(client.SERVER_ID).fetchMember(arr[rnd]).then(mmb=>{return mmb;}).catch(err=>{return false;});
                if(!member) message.reply('error');
                message.channel.send('голосую против '+member);
                return;
}catch(err){console.log(err);};}//