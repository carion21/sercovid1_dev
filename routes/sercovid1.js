var express = require('express');
var router = express.Router();

var http = require("http")

const Individu = require('../models/Individu')
const PositionIndividu = require('../models/PositionIndividu')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:apikey/register_position/:latitude/:longitude/', (req, res, next) => {
    var apikey = req.params.apikey
    var latitude = req.params.latitude
    var longitude = req.params.longitude

    var urlApi = "http://localhost:1515/individus/"+latitude+"/"+longitude

    Individu.findByOneField('cle_api', apikey, (futindividu) => {
        if (futindividu.length === 1) {
            var position = {
                codePositionIndividu: PositionIndividu.genCodePositionIndividu(),
                codeIndividu: futindividu[0].codeIndividu,
                latitude: latitude,
                longitude: longitude
            }
            PositionIndividu.create(position, (msg) => {
                console.log(msg)
            })
            /*
            http.get(urlApi, (resp) => {
                console.log("Le serveur master est averti")
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            })*/
            var result = {
                status: 1
            }
        } else {
            var result = {
                status: 0,
                error: "cle api invalide"
            }
        }

        res.json(result)
    })

})


module.exports = router;
