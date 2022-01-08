require('dotenv').config();
const DiscordJS = require('discord.js')

const {Client, Intents} = require('discord.js');
const command = require('./command');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', ()=>{
    console.log('The bot is ready');

    const guildId = '927300411411542059'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if(guild){
      commands = guild.commands
    }else{
      commands = client.application?.commands;
    }
    // commands?.create({
    //   name:'ping',
    //   description:'Replies with pong.'
    // });
    commands?.create({
      name:'add',
      description:'Adds two numbers',
      options:[
        {
          name:'num1',
          description:'First Number',
          required: true,
          type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        },
        {
          name:'num2',
          description:'Second Number',
          required: true,
          type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }
      ]
    });
    
});
client.on('messageCreate',(message)=>{
    if(message.author.bot) return;
    if(message.content === 'مروان بابلو'){
        message.reply({
            content:'يلا يانجم',
        });
    }
    if(message.content
        .match(/(^|\s)(a7a|A7a|khawal|khawlana|kosomak|kosom|bdan|3ars|m3aras|sharmoot|sharmata|labwa|momes|zanya|yaebn|mara|yel3an|555|زب|كس|زبر|فحل|مهبل|خخخ|عرص|زبر|كسم)(\s|$)/)){
        message.reply({
            content:'متشتمش ياسطا',
        });
        // setTimeout(function(){ 
        //     message.delete();
        // }, 1000);
    }
    
    if(message.content === 'صلي علي النبي'){
        message.reply({
            content:'عليه افضل الصلاة و السلام',
        });
    }
    command(client, 'kick', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.permissions.has('ADMINISTRATOR') ||
          member.permissions.has('KICK_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${tag} That user has kicked`)
          } else {
            message.channel.send(`${tag} Please specify someone to kick.`)
          }
        } else {
          message.channel.send(
            `${tag} You do not have permission to use this command.`
          )
        }
    })
    

    
});
client.on('interactionCreate', async(interaction)=>{
  if(!interaction.isCommand()){
    return
  }
  const { commandName, options } = interaction
  if(commandName === 'ping'){
    interaction.reply({
      content:'pong',
    })
  }else if(commandName === 'add'){
    const num1 = options.getNumber('num1')
    const num2 = options.getNumber('num2')
      interaction.reply({
        content:`The sum is ${num1 + num2}`,
      })
    }
})


client.login(process.env.DISCORDJS_BOT_TOKEN);
