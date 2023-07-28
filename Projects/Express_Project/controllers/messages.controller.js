const path = require('path');

function postMessages(req, res) {
    res.send('posting to messages...');
}

function getMessages(req, res) {
    // res.send('<ul><li>Hello Adhiesh!</li></ul>');
    // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'IMG_2888.jpg'));
    res.render('messages', {
        title: 'Messages',
        friend: 'Prajwal Nadagouda'
    })
}

module.exports = {
    postMessages,
    getMessages, 
};