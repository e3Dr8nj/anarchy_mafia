exports.active=true;
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
   //voite_channel_name:'game11'
  voite_channel_name:'голосование'
  , voite_prefix:'!!!'
  ,b_marker:'---'
  ,mafia_game_leader_role_name:'mafia_leader'
  ,mafia_game_role_name:'mafia_game'
};//e end

//_________________________________________EVENTS_PART_________________________________________________
module.exports.events.message={ on:true,  run:async(client,message)=>{try{
              //console.log(message.content);
}catch(err){console.log(err);};}};//

//_______________________________________EVENTS_PART_END___________________________________________________
//_________________________________________COMMANDS_PART_________________________________________________
//____________c0
module.exports.commands.mafHelp={ on:true, aliase:'mafGameRolesHelp', run:async(client,message,args)=>{try{
              let px=client.prefix;
              let str='';
             // str+='['+px+'mafCreateMsg <текст сообщения>___] - создать сообщение от имени бота с заданым текстом(___-конец ввода)\n';
              str+='['+px+'mafRolesMmbs <id сообщения с ролями><id сообщения с упоминаниями участников>] - сформировать список участников и игровых ролей (роли в квадратных скобочках) \n';
              str+='['+px+'mafRndRoles <id сообщения с упоминаниями участников и игровыми ролями>] - рандомно раздать игровые роли участникам в лс и отправить список автору данной комманды в лс\n';
             // str+='['+px+'mafScanVoiting] - опубликовать текущую сводку голосования\n';
             // str+='[голосование началось] - открыть голосование\n';
             // str+='[голосование окончено] - закрыть голосование\n';
             // str+='[гoлосую за <упоминание участника>]/[!!!<упоминание участника>] - проголосовать за участника\n';
             // str+='[...потому что <причина голосования>]/[...---<причина голосования>] - указать причину голосвания\n';
            //  str+='поставить эможди под списком участников - записаться на игру \n';
            //  str+='убрать эможди под списком участников - вычеркнуть себя из списка (засчитывается последнее действие) ';
             message.channel.send(str,{code:'ini'});

}catch(err){console.log(err);};}};//
//____________c1
module.exports.commands.mafRolesMmbs={ on:true, aliase:'mafRolesMmbs', run:async(client,message,args)=>{try{
             
             
             //apply game roles to mmb who has discord role game
              if(!args[1]) return;
              let msg_id=args[1];
              if(!args[2]) return;
              let msg2_id=args[2];
              //let v_chnl=message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);

              let msg_roles= await  message.channel.fetchMessage(msg_id).then(message=>{return message; }).catch(err=>{console.log(err);});
              if(!msg_roles) return;
              let game_roles_arr=msg_roles.content.split('['); game_roles_arr=game_roles_arr.map(e=>e.split(']')[0]); game_roles_arr.shift();
              
              let msg_mmbs= await  message.channel.fetchMessage(msg2_id).then(message=>{return message; }).catch(err=>{console.log(err);});
              if(!msg_mmbs) return;
              let game_mmbs_arr=msg_mmbs.mentions.members;

              let str='\nсписок участников \n';
              game_mmbs_arr.map(m=>str+=m+'\n');
              str+='```ini\nсписок ролей \n';
              game_roles_arr.map(r=>str+='['+r+']\n');
              str+='```';
              message.channel.send(str);

}catch(err){console.log(err);};}};//
//_______c2
module.exports.commands.mafRndRoles={ on:true, aliase:'mafRndRoles', run:async(client,message,args)=>{try{
              let mafia=require('./mafia.js');
              if(!args[1]) return;
              let msg_id=args[1];
             
              //let v_chnl=message.guild.channels.find(ch=>ch.name==module.exports.e.voite_channel_name);

              let list_msg= await  message.channel.fetchMessage(msg_id).then(message=>{return message; }).catch(err=>{console.log(err);});
              if(!list_msg) return;

              let game_roles_arr=list_msg.content.split('['); game_roles_arr=game_roles_arr.map(e=>e.split(']')[0]); game_roles_arr.shift();
              //let rnd = Math.floor(Math.random()*game_roles_arr.length);
              //message.reply(rnd);
              let new_order_game_roles_arr=await mafia.rndOrder(client,game_roles_arr);
              let game_mmbs_arr=list_msg.mentions.members;
              let str='\nCписок ролей и участников \n'; let i=0;
              game_mmbs_arr.map(m=>{
                   m.user.send('Твоя роль: '+ new_order_game_roles_arr[i]);
                   str+='['+new_order_game_roles_arr[i++]+']  ['+m.user.username+']\n';
              });//map mmbs
               message.member.user.send(str,{code:'ini'});
           
              

}catch(err){console.log(err);};}};//
//_______________________________________COMMANDS_PART_END___________________________________________________


//_________________________________________BOOT_PART_________________________________________________

//_______________________________________BOOT_PART_END___________________________________________________
/*
```ini
cписок ролей
[Магистр Йода(скан)]
[Квай-Гон Джинн(док)]
[Оби-Ван Кеноби(киллер)]
[Энакин Скайуокер (вор)]
[Ки-Ади-Мунди (свидетель)] 
[Граф Дуку (хамелеон)] 
[Дарт Сидиус (стан)]
[Дарт Мол(киллер)]
[Боба Фетт(нейтрал)]
```
```ini
[Игра началась]
```___
*/
