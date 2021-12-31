const mongoose = require('mongoose')
const { DBURL } = require('../config.json')

module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`Je suis connecter à ${client.user.username}`)

        if(!DBURL) return
        mongoose.connect(DBURL, {
        }).then(() => {
            console.log('🟢 | La Database est bien connecté')
        }).catch((err)=> {
            console.log(err)
        })

        var compteurStatus = 1
        setInterval(async () => {
            status =  [`Jouyeux Noel`]
            compteurStatus = (compteurStatus + 1) % (status.length);
            client.user.setPresence({
                activities: [{
                    name: `${status[compteurStatus]}`,
                    type: "STREAMING",
                    url: "https://www.twitch.tv/"
                  }],
                  status: "online"})
        }, 5000);
    }
}