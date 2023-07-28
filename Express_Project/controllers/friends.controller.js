const model = require('../models/friends.model');

function postFriend(req, res) {
    if(!req.body.name) {
        return res.status(400).json({
            error: 'Missing friend name'
        })
    }

    const newFriend = {
        name: req.body.name,
        id: model.length,
    }
    model.push(newFriend);
    
    res.json(newFriend);
}

function getFriends(req, res) {
    res.json(model);
}

function getFriend(req, res) {
    // Express has a parameter syntax which takes in /:Id
    const friendId = Number(req.params.friendId);
    const friend = model[friendId];
    if(friend) {
        res.status(200).json(friend);
    }
    else {
    //ex: /friends/22 a friend that is not present in the route end point of the collections
        res.status(404).json({
            error: 'friend does not exist'
        });

    }
}

module.exports = {
    postFriend,
    getFriends,
    getFriend,
}