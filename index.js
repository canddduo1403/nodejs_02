
const async = require('async')
const request = require('request')
const cheerio = require('cheerio')

const fs = require('fs');

const items = [
    {
        name: "zuka",
        url: "http://rov.wikia.com/wiki/Zuka"
    },
    {
        name: "murad",
        url: "http://rov.wikia.com/wiki/Murad"
    },
    {
        name: "preyta",
        url: "http://rov.wikia.com/wiki/Praeyta"
    }

]



const q = async.queue((task, callback) => {

    request(task.url, (err, res, body) => {
        $ = cheerio.load(body)
        //console.log($('#mw-content-text').text())
        if(err){
            console.log(err)
            callback()
        } 

        const text = $('#mw-content-text p').text();
        fs.writeFile(task.name + ".txt", text, (err) => {
            if (err) {
                console.log(err)
                callback()
            }
            console.log("Save file complete")
            callback()
        })

    })

    // request(url, (err, res, body) => {

    //     fs.writeFile("web" + i + ".html", body, (err) => {
    //         if (err) {
    //             console.log(err)
    //             callback()
    //         }
    //         console.log("Save file complete")
    //         callback()
    //     })
    // })
})

q.drain = () => {
    console.log('all items have been process');
}

q.push(items, (err) => {
    console.log('finised process itens')
})