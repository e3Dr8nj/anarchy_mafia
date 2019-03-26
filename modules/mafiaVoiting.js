exports.active=false;
exports.events={};
exports.commands={};
exports.boots={};
exports.d={
    voiting_for:['!voiting for','!голосует за']
   ,voite_for:['voite for','голосую']
   ,voiting_list:['!voiting list','!текущее голосование']
   ,voiting_total:['!voiting total','!итоги голосования']
   ,voiting_start:['!voiting start','!голосование началось']
   ,voiting_stop:['!voiting stop','!голосование окончено']
   ,becouse_of:['becouse of','потому что']
   ,mmb_list:['!list of members','!список участников']
   ,role_added:['game role was added to members','роль доступа роздана участникам']
   ,mmb_list_not_found:['list оf members not fount','списoк участников не найден']
};//d end
exports.e={
  // voite_channel_name:'game11'
  voite_channel_name:'голосование'
  , voite_prefix:'!!!'
  ,b_marker:'---'
  ,mafia_game_role_name:'mafia_game'
  ,mafia_game_leader_role_name:'mafia_leader'
};//e end

//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.message={ on:true, run:async(client,message)=>{try{
             if(message.channel.type=='dm') return;
             let v_chnl=message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
//__________________________
             if(message.author.id==client.user.id){return;};
            // message.reply('message event triggered from module103030');
             //if(message.content.startsWith('+тест')){message.reply('тест!');};
             let has_mention=!!message.mentions.members.first();
             let mmb_has_game_role=!!message.member.roles.find(r=>r.name==exports.e.mafia_game_role_name);
             let mmb_mentioned_has_game_role=!!has_mention&&message.mentions.members.first().roles.find(r=>r.name==exports.e.mafia_game_role_name);
             let same=has_mention&&(message.mentions.members.first().user.id==message.member.user.id);
             let voite_prefix=!!message.content.startsWith(module.exports.e.voite_prefix);
            let voite_for=message.content.toLowerCase().indexOf(module.exports.d.voite_for[client.lang])!=-1;
              //console.log(message.content.indexOf(module.exports.d.voite_for[client.lang]));
              //console.log(voite_prefix+' '+voite_for);
             //let voiting_msg=(voite_prefix||voite_for)&&message.mentions.members.first()&&!same;
     
            let voiting_msg=(voite_prefix||voite_for)&&has_mention&&!same&&mmb_has_game_role&&mmb_mentioned_has_game_role;
//_____      
             if(voiting_msg){
                  let str='';
                  let has_becouse_marker=!!message.content.indexOf(module.exports.e.b_marker)!=-1;
                  let has_becouse_phrase=!!message.content.indexOf(module.exports.d.becouse_of[client.lang])!=-1;
                    console.log('d-------------------------------------------------------- '+has_becouse_phrase);
                  if(!!has_becouse_marker){
                        str = message.content.slice().split(module.exports.e.b_marker)[1];
                  };
                  if(!str&&!!has_becouse_phrase){ 
                          str = message.content.slice().split(module.exports.d.becouse_of[client.lang])[1];
                            
                  };
                 
                  let ini = '```ini\n '+module.exports.d.becouse_of[client.lang]+' ['+str+' ]\n```';
                  str=(!str)?' ':ini;
                  
 v_chnl.send( message.member+" "+module.exports.d.voiting_for[client.lang]+" "+message.mentions.members.first() +' '+str);
                return  module.exports.commands.scan.run(client,message);
             };//if voited_message repost to special channel
//____________________________
              if (message.channel.id===v_chnl.id){
                          let code = !!message.content.startsWith('```');
                          if(!code&&message.content.toLowerCase().indexOf(module.exports.d.voiting_stop[client.lang])!=-1){
                                      return module.exports.commands.scan.run(client,message);
                            };//if message content apply
              };//if channel apply
//____________________________          
}catch(err){console.log(err);};}};//module.exports.events.message end
//______________________________e1
module.exports.events.messageReactionAdd={ on:true, run:async(client,messageReaction,user)=>{try{
             
              let v_chnl=messageReaction.message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
              let voite_chnl=v_chnl.id==messageReaction.message.channel.id; console.log(voite_chnl);
              if(!voite_chnl) return;
              let msg_cnt=messageReaction.message.content.toLowerCase();
              let mmb_list=msg_cnt.indexOf(module.exports.d.mmb_list[client.lang])!=-1;
              
             //console.log(message.content); console.log('del');
            console.log(messageReaction.emoji.name);
             if(messageReaction.message.author.bot&&mmb_list&&voite_chnl){
                let target_msg = await messageReaction.message.channel.fetchMessage(messageReaction.message.id).then(message=>{return message;}).catch(err=>console.log(err)); 
                 let mmb=messageReaction.message.member.guild.members.get(user.id);
                 let str =target_msg.content.split('___\n')[0]+'___\n';
                  messageReaction.message.mentions.members.map(m=>{
                      str+=m+'\n';
                 });
                 (!messageReaction.message.mentions.members.get(user.id))?str=str+mmb+'\n':str;
                 target_msg.edit(str);
             };//if 
}catch(err){console.log(err);};}};//mdoule.exports.events.message end
//_____________________________e2
module.exports.events.messageReactionRemove={ on:true, run:async(client,messageReaction,user)=>{try{
             
                let v_chnl=messageReaction.message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
              let voite_chnl=v_chnl.id==messageReaction.message.channel.id; console.log(voite_chnl);
              if(!voite_chnl) return;
              let msg_cnt=messageReaction.message.content.toLowerCase();
              let mmb_list=msg_cnt.indexOf(module.exports.d.mmb_list[client.lang])!=-1;
              
             //console.log(message.content); console.log('del');
            console.log(messageReaction.emoji.name);
             if(messageReaction.message.author.bot&&mmb_list&&voite_chnl){
                let target_msg = await messageReaction.message.channel.fetchMessage(messageReaction.message.id).then(message=>{return message;}).catch(err=>console.log(err)); 
                 let mmb=messageReaction.message.member.guild.members.get(user.id);
                 let str =target_msg.content.split('___\n')[0]+'___\n';
                  messageReaction.message.mentions.members.map(m=>{
                     if(m.id!==user.id) str+=m+'\n';
                 });
                 //(!messageReaction.message.mentions.members.get(user.id))?str=str+mmb+'\n':str;
                 target_msg.edit(str);
             };//if 
            
}catch(err){console.log(err);};}};//mdoule.exports.events.message end
//_______________________________________EVENTS_PART_END___________________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//____________c0
module.exports.commands.mafHelp={ on:true, aliase:'mafVoitingHelp', run:async(client,message,args)=>{try{
              let px=client.prefix;
              let str='';
              str+='['+px+'mafCreateMsg <текст сообщения>___] - создать сообщение от имени бота с заданым текстом(___-конец ввода)\n';
              str+='['+px+'mafGiveRoleMsg <id сообщения>] - дать роль доступа к игре всем упоминающимся в сообщении \n';
              str+='['+px+'mafRemoveRole] - забрать роль доступа у всех\n';
              str+='['+px+'mafGiveRoleMmb @mention] - дать роль доступа к игре участнику\n';
              str+='['+px+'mafRemoveRoleMmb @mention] - снять роль доступа к игре у участника\n';
              str+='['+px+'mafScanVoiting] - опубликовать текущую сводку голосования\n';
              str+='[!голосование началось] - открыть голосование\n';
              str+='[!голосование окончено] - закрыть голосование\n';
              str+='[гoлосую за <упоминание участника>]/[!!!<упоминание участника>] - проголосовать за участника\n';
              str+='[...потому что <причина голосования>]/[...---<причина голосования>] - указать причину голосвания\n';
              str+='поставить эможди под списком участников - записаться на игру \n';
              str+='убрать эможди под списком участников - вычеркнуть себя из списка (засчитывается последнее действие) ';
              message.channel.send(str,{code:'ini'});

}catch(err){console.log(err);};}};//
//____________c1
module.exports.commands.mafGiveRoleMsg={ on:true, aliase:'mafGiveRoleMsg', run:async(client,message,args)=>{try{
               if(!args[1]) return;
               let msg_id=args[1];
             //let v_chnl=message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
              let msg= await  message.channel.fetchMessage(msg_id).then(message=>{return message; }).catch(err=>{console.log(err);});
              if(!msg) return;
              let role = message.guild.roles.find(r=>r.name==module.exports.e.mafia_game_role_name);
              if(!role) return;
              msg.mentions.members.map(m=>{m.addRole(role);console.log('role add to mmb '+m.user.username);});
              message.reply('game role apply to all members');
             console.log(args);
}catch(err){console.log(err);};}};//
//____________c2
module.exports.commands.mafRemoveRole={ on:true, aliase:'mafRemoveRole', run:async(client,message,args)=>{try{
             
              let role=message.guild.roles.find(r=>r.name==module.exports.e.mafia_game_role_name);
              role.members.map(mmb=>mmb.removeRole(role));
}catch(err){console.log(err);};}};//
//____________c3
module.exports.commands.mafCreateMsg={ on:true, aliase:'mafCreateMsg', run:async(client,message,args)=>{try{
              args.shift(); let str=args.join(' ');
              message.channel.send(str);
}catch(err){console.log(err);};}};//
//____________c4

module.exports.commands.scan={ on:true, aliase:'mafScanVoiting', run:async(client,message)=>{try{
                
             let v_chnl=message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
      //__     
      //__
           //  message.reply('been scanned');
           let total=false;  let end=false;
           let resolve= await  v_chnl.fetchMessages({limit:100}).then(collected=>{
                let i=0; let bool=true;
                let obj={};
                  collected.map(e=>{
                    if(bool){
                      let msg_cnt = e.content.toLowerCase();
                      let code = !!msg_cnt.startsWith('```');
                      let author_bot=!!(e.member.user.id===client.user.id);
                      let voiting_msg=msg_cnt.indexOf(module.exports.d.voiting_for[client.lang])!=-1;
                      let voiting_total_msg=msg_cnt.indexOf(module.exports.d.voiting_total[client.lang].toLowerCase())!=-1;
                      let voiting_stop_msg=msg_cnt.indexOf(module.exports.d.voiting_stop[client.lang].toLowerCase())!=-1;
                      let voiting_start_msg=msg_cnt.indexOf(module.exports.d.voiting_start[client.lang].toLowerCase())!=-1;
                      let voiting_list_msg=msg_cnt.indexOf(module.exports.d.voiting_list[client.lang].toLowerCase())!=-1;
                      //console.log(author_bot);
                      if(voiting_total_msg&&code){bool=false;end=true; console.log('voiting_total_msg return');return;};          
                      if(voiting_start_msg&&!voiting_msg){bool=false;console.log('voiting_start_msg return'); return;};
                      if(voiting_stop_msg&&!voiting_msg){bool=true;obj={};total=true; console.log('voiting_stop_msg '); };
                      if(voiting_list_msg&&code){e.delete();console.log('voiting_list_msg ');};
                          let cnd=voiting_msg&&!!e.mentions.members.first()&&author_bot;

                           // let cnd=true;
                             if(cnd){
                                  let x=e.content.split('<@');
                                  let becouseOf=e.content.split(module.exports.d.becouse_of[client.lang])[1];
                                  // console.log(x); 
                                   
                                if(x.length>2){
                                   x.shift();
                                  // let mmb_ing=e.member.guild.members.get(x[0].split('>')[0]).user.username;
                                   let mmb_ing=x[0].split('>')[0]; if(mmb_ing.startsWith('!')){mmb_ing=mmb_ing.slice(1);};
                                   let mmb_ed=x[1].split('>')[0]; if(mmb_ed.startsWith('!')){mmb_ed=mmb_ed.slice(1);};
                                   //console.log(mmb_ing+'---'+mmb_ed);
                                    if(!obj[mmb_ing]){
                                              obj[mmb_ing]={};
                                              obj[mmb_ing].voite=mmb_ed;
                                             // obj[mmb_ing].becouseOf=becouseOf;
                                    };//if end
                                  };//if  x
                             
                          
                            };//if cnd end
                      
                     };//bool end
                       
                   });//map end
                      return obj;
             }).catch(err=>console.log(err));
           console.log(resolve);
       //_____________reverse arr=>gen list=>send
                   let voiting_reverse={};
                   for(let key in resolve){
                       if(!voiting_reverse[resolve[key].voite]){
                            voiting_reverse[resolve[key].voite]=[key];
                       }else{
                            voiting_reverse[resolve[key].voite].push(key);
                       };
                   };//for key in resolve end
                 
     
           if(!end){
                  let voiting_list=await createList(voiting_reverse);
                  v_chnl.send(voiting_list,{code:'ini'});
          };//if not end 
        //________________________

//______________SUB_FUNCTIONS
//_____________________f1

     async function createList(obj){try{

          let voiting_list=(!total)?module.exports.d.voiting_list[client.lang]+' \n':module.exports.d.voiting_total[client.lang]+' \n';
                    for(let key in obj){
                        
       let mmb_ed=(!!message.guild.members.get(key).nickname)?message.guild.members.get(key).nickname:message.guild.members.get(key).user.username;
                       console.log('count '+obj[key].length+" id "+mmb_ed+" members " +obj[key]);
       let mmbs_ing=obj[key].map(e=>{
                   
       let mmb=(!!message.guild.members.get(e).nickname)?message.guild.members.get(e).nickname:message.guild.members.get(e).user.username;
                   return mmb;
                  }); //map  
       let mmbs_ing_str=mmbs_ing.join(" , "); 
             // console.log(mmb_ed+" "+mmbs_ing_str);
           voiting_list+="["+mmbs_ing.length+"] ["+mmb_ed+"] ("+ mmbs_ing_str +")\n";            
                         
                    };//key in obj
                     
                     return voiting_list;
    }catch(err){console.log(err);};};//createList end


//______________SUB_FUNCTIONS_END

}catch(err){console.log(err);};}};//mdoule.exports.commans.scan end

//____________c1
module.exports.commands.mafGiveRole={ on:true, aliase:'mafGiveRoleMmb', run:async(client,message,args)=>{try{
               return module.exports.addMember(client,message);
}catch(err){console.log(err);};}};//
//____________c2
module.exports.commands.mafRemoveRole={ on:true, aliase:'mafRemoveRoleMmb', run:async(client,message,args)=>{try{
               return module.exports.removeMember(client,message);
}catch(err){console.log(err);};}};//
//_______________________________________COMMANDS_PART_END___________________________________________________


//_________________________________________BOOT_PART_________________________________________________
module.exports.boots.scanMessages={ on:true, run:async(client)=>{try{

             let v_chnl=client.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);
            // v_chnl.send('boot runned');
             let msg_arr=await v_chnl.fetchMessages({limit:100}).then(collected=>{return collected;}).catch(err=>console.log(err));
            // msg_arr.map(m=>client.emit('message',m));
}catch(err){console.log(err);};}};//module.exports.events.message end

//_______________________________________BOOT_PART_END___________________________________________________


module.exports.addMember=async(client,message)=>{try{
                
                let role = await client.guilds.get(client.SERVER_ID).roles.find(r=>r.name==module.exports.e.mafia_game_role_name);
                if(message.mentions.members.length==0) return;
                message.mentions.members.first().addRole(role);
                return message.reply('роль добавлена');

}catch(err){console.log(err);};}//

module.exports.removeMember=async(client,message)=>{try{
                
                let role = await client.guilds.get(client.SERVER_ID).roles.find(r=>r.name==module.exports.e.mafia_game_role_name);
                if(message.mentions.members.length==0) return;
                message.mentions.members.first().removeRole(role);
                return message.reply('роль снята');

}catch(err){console.log(err);};}//


