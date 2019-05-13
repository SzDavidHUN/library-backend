const fs = require('fs');
const express = require('express');
const router = express.Router();

router.get('/:table', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.status(404).send('Table not found\n');
    } else {
        res.status(200).send(fs.readFileSync(tableFile));
    }
});

router.get('/:table/:id', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let found = false;
    JSON.parse(fs.readFileSync(tableFile)).forEach((value) => {
        if (+value.id === +req.params['id']) {
            res.status(200).send(value);
            found = true;

        }
    });
    if (!found) {
        res.status(404).send('ID not found\n');
    }
});

router.get('/:table/:attr/:val', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let found = false;
    let table = JSON.parse(fs.readFileSync(tableFile));
    Object.keys(table[0]).forEach((property) => {
        if (property === req.params['attr']) {
            found = true;

        }
    });
    if (!found) {
        res.status(404).send('Couldn\'t find property');
        return;
    }
    found = false;
    table.forEach((value) => {
        if (found) {
            return;
        }
        if (value[req.params['attr']].toString() === req.params['val'].toString()) {
            res.status(200).send(value);
            found = true;
        }
    });
    if (!found) {
        res.status(404).send('Could not found\n');
    }
});

router.get('/:table/all/:attr/:val', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let found = false;
    let table = JSON.parse(fs.readFileSync(tableFile));
    Object.keys(table[0]).forEach((property) => {
        if (property === req.params['attr']) {
            found = true;

        }
    });
    if (!found) {
        res.status(404).send('Couldn\'t find property');
        return;
    }
    found = false;
    var result = [];
    table.forEach((value) => {
        if (value[req.params['attr']].toString() === req.params['val'].toString()) {
            result.push(value);
            found = true;
        }
    });
    if (found) {
        res.status(200).send(result);
    } else {
        res.status(404).send('Could not found\n');
    }
});

router.put('/:table', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let table = JSON.parse(fs.readFileSync(tableFile));
    let found = false;
    table.forEach((value, index) => {
        if (+value.id === +req.body.id) {
            table[index] = req.body;
            fs.writeFileSync(tableFile, JSON.stringify(table));
            res.status(204).end();
            found = true;
        }
    });
    if (!found) {
        res.status(404).send('ID couldn\'t be found\n');
    }
});

router.put('/:table/:id', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let table = JSON.parse(fs.readFileSync(tableFile));
    if (+req.params.id === -1) {
        let maxId = 0;
        table.forEach((value, index) => {
            if (+value.id > maxId) {
                maxId = +value.id;
            }
        });
        req.body.id = maxId + 1;
        table[maxId] = req.body;
        fs.writeFileSync(tableFile, JSON.stringify(table));
        res.status(200).send(req.body);
        return;
    }
    let found = false;
    table.forEach((value, index) => {
        if (+value.id === +req.params['id']) {
            table[index] = req.body;
            fs.writeFileSync(tableFile, JSON.stringify(table));
            res.status(204).end();
            found = true;
        }
    });
    if (!found) {
        res.status(404).send('ID couldn\'t be found\n');
    }
});

router.post('/:table/new', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let maxId = 0;
    let table = JSON.parse(fs.readFileSync(tableFile));
    table.forEach((value, index) => {
        if (+value.id > maxId) {
            maxId = +value.id;
        }
    });
    table[maxId] = {id: maxId + 1, status: "New"};
    fs.writeFileSync(tableFile, JSON.stringify(table));
    res.status(201).send((maxId + 1).toString());
});

router.delete('/:table/:id', (req, res) => {
    let tableFile = 'data/' + req.params['table'] + '.json';
    if (!fs.existsSync(tableFile)) {
        res.send(404).send('Table not found\n');
        return;
    }
    let table = JSON.parse(fs.readFileSync(tableFile));
    let newtable = table.filter(value => +value.id !== +req.params['id']);
    fs.writeFileSync(tableFile, JSON.stringify(newtable));
    res.status(204).end();
});
module.exports = router;
