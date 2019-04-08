const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.status(200).type('application/json').send(fs.readFileSync('data/members.json'));
});

router.get('/:id', (req, res) => {
    let id = req.params['id'];
    console.log('ID: ' + id);
    let toBeFiltered = JSON.parse(fs.readFileSync('data/members.json'));
    toBeFiltered.forEach((val) => {
        if(+val.id === +id) {
            console.log('HIT!');
            res.type('application/json').send(JSON.stringify(val));
        }
    });
    res.status(404).end();
});

router.post('/edit/:id', (req, res) => {
    let members = JSON.parse(fs.readFileSync('data/members.json'));
    var found = false;
    members.forEach((member, i) => {
        if(+member.id === +req.params['id']){
            members[i] = req.body;
            fs.writeFileSync('data/members.json', JSON.stringify(members));
            res.status(200).end();
        }
    })
    if(!found) {
        res.status(404).end();
    }
});

module.exports = router;
