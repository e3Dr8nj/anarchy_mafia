exports.active=true;
exports.events={};
exports.commands={};
//exports.commands={};
//exports.boots={};
exports.d={
};//d end
exports.e={
   //voite_channel_name:'game11'
  redirect_channel_name:'текстовая_мафия'
   ,mafia_game_leader_role_name:'mafia_leader'
   ,mafia_game_role_name:'mafia_game'
};//e end

//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.message={ on:true,  run:async(client,message)=>{try{
 
              if(message.author.id==client.user.id) return;
              if(message.channel.type=='dm') {
                       let server = client.guilds.get(client.SERVER_ID);
                       let v_chnl = await server.channels.find(ch=>ch.name==module.exports.e.redirect_channel_name);
                 if(message.content.startsWith('!')){
                          let nickname = 'кто-то';
                          let args=message.content.split(' ');
                          if(args[0].length>1){nickname=args[0].slice(1);};
                           args.shift();
                         // v_chnl.send('`'+nickname+':` '+args.join(' '));
                          return;
                  };//redirect to chat
                       let leader_role = server.roles.find(r=>r.name==module.exports.e.mafia_game_leader_role_name);
                       if(!leader_role){
                            await message.channel.send('Error:mafia_leader role not found DMmsg is not redirected');
                            return;
                        };//if leader_role is apsend
                //console.log(leader_role.members.length==undefined);
                       if(leader_role.members.keyArray().length<1){
                           await message.channel.send('Error:mafia_leader role has no mmbs => DMmsg is not redirected');
                            return;
                       };//if leader_role has no mmbs
                       leader_role.members.map(m=>{
                         m.user.send(message.channel.recipient.id+" "+message.channel.recipient.username+ ": "+message.content);
                      });
                      message.channel.send('ok');
               };//if end

}catch(err){console.log(err);};}};//

//___________________________________________EVENTS_PART_END______________
//_________________________________________COMMANDS_PART_________________________________________________
//____________c0
module.exports.commands.mafHelp={ on:true, aliase:'mafDmRedirectHelp', run:async(client,message,args)=>{try{
              let px=client.prefix;
              let str='';
              str+='['+px+'mafSetLeader <упоминание участника>] - установить ведущего игры \n';
              str+='[!+<ник> сообщение/! сообщение ](лс  боту) - отправить сообщение в чат игры под вымышленным ником/ананимно \n';
             message.channel.send(str,{code:'ini'});

}catch(err){console.log(err);};}};//
//____________c1
module.exports.commands.mafSetLeader={ on:true, aliase:'mafSetLeader', run:async(client,message,args)=>{try{
              let server = client.guilds.get(client.SERVER_ID); 
              let mmb=message.mentions.members.first();
              //let v_chnl = await server.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
              if(!mmb){await message.channel.send('mmb not defined');return;};
              let leader_role = server.roles.find(r=>r.name==module.exports.e.mafia_game_leader_role_name);
              await leader_role.members.map(m=>m.removeRole(leader_role));
              await mmb.addRole(leader_role);
              message.channel.send('leader setted DMmsg will redirect to that person');
             

}catch(err){console.log(err);};}};//
//_______________________________________COMMANDS_PART________________________________________
