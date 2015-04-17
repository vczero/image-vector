


var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: '矢量数据服务' });
});

module.exports = router;
