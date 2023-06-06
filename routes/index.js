const express = require("express");
const router = express.Router();
const memberModel = require("../model/mem");
const timeModel = require("../model/time");
const sitModel = require("../model/membersit");
const pointModel = require("../model/point");
const lostModel = require("../model/lost");
const LinkModel = require("../model/link");
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
//const bcrypt = require("bcrypt");

const articleModel = require('../model/article');
const newsModel = require('../model/news');
const cloudModel = require('../model/cloud');
const villageModel = require('../model/village');
const newpeopleModel = require('../model/newpeople');
const muslinModel = require('../model/muslin');
const marketModel = require('../model/market');
const buyModel = require('../model/buy');
const childModel = require('../model/child');
const chinModel = require('../model/chin');
const parkModel = require('../model/park');
const createModel = require('../model/create');

const {
	parse
} = require("dotenv");
const multer = require('multer'); 
const { error } = require("console");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // 獲取文件夾路徑
//     const dir = path.resolve(__dirname, '../public/photos');
//     // 創建文件夾
//     const parentDir = path.dirname(dir);
//     if (!fs.existsSync(parentDir)) {
//       fs.mkdirSync(parentDir);
//     }
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir);
//     }
//     // 將圖片儲存到指定文件夾
//     cb(null, './public/photos');
//   },
//   filename: function (req, file, cb) {
//     // 將圖片命名為原檔名
//     cb(null, file.originalname);
//   }
// });

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/photos');
	},
	filename: function (req, file, cb) {
		// 將圖片命名為原檔名
		cb(null, file.originalname);
		}
	// filename: function (req, file, cb) {
	// 	var str = file.originalname.split('.');
	// 	cb(null, Date.now() + '.' + str[1]);
	// }
});

//創建 multer 中間件的實例
const upload = multer({
	storage: storage
});

// router.post('/upload', upload.single('image'), async (req, res, next) => {
//   //console.log(req.file.path); // 顯示文件路徑				
//   //console.log(req.file.originalname); // 顯示文件名
//   try {
//     // 創建一個新的 PointDate 文檔
//     const _dir = path.resolve(__dirname, '../public/photos');
//     const lostdate = new lostModel({

//       // 設置圖片屬性
//       photos: req.file.originalname
//       //data: req.file.buffer, // 使用 buffer 儲存圖片
//       //contentType: req.file.mimetype // 使用 mimetype 儲存圖片類型

//     });

//     // 將 PointDate 文檔保存到數據庫中
//     await lostdate.save();
//     const lostitems = await lostModel.find();
//     // 傳遞變數到 EJS 文件
//     res.render('lost', {
//       lostitems: lostitems
//     });
//     console.log(lostdate);
//     console.log('圖片上傳成功');
//   } catch (error) {
//     res.render('lost');
//     console.log('圖片上傳失敗');
//     res.render('lostupdate');
//   }


// });






// router.get('/upload', (req, res) => {
// 		// console.log(req.session.name)
// 	})
// 	// .post('./upload', upload.single("file"),  (req, res)  => {
// 	// 	console.log(req.session.name)
// 	// 	console.log(req.body)
// 	// })

//這裡是單純儲存圖片
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

	
// 	//photoss = req.file.filename
// 	//next();
// 	// console.log(req.body)
	
		
		
// 		// if(err) {
			
// 		// 	res.json({msg: 'Database server shut down'});
// 		// 	return;
// 		// };
// 		var _article = new articleModel({
// 			photos: req.file.filename
// 		});

// 		//data.photos.push(req.file.filename)

// 		// _article.save(function (err, data) {
// 		// 	if (err) {
// 		// 		res.json({ "status": 1, "msg": "error" });
// 		// 	}
// 		// 	else {
// 		// 		res.json({
// 		// 			"status": 0, "msg": "success",
// 		// 			"photos": data.photos
// 		// 		});
// 		// 	}
// 		// });

		
	
	
// });


// 這裡是單純儲存文章
router.post('/lostupdate', function (req, res) {
		
		
		// if(err) {
			
		// 	res.json({msg: 'Database server shut down'});
		// 	return;
		// };
	
	console.log(req.body)
	var newarticle = new articleModel({
		title: req.body.title,
		content: req.body.content,
		postdate: new Date(),
		ipth: req.body.ipth,
		aaa: req.body.aaa,
		yt: req.body.yt
		//photos: req.file.filename
	});
	
	newarticle.save(function (err, data) {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			res.json({ "status": 0, "msg": "success", "data": data });
		}
	});
});


router.get('/getArticle', function (req, res) {
	// var type = (req.query.type != undefined) ?
	//             req.query.type : "";
	// var account = (req.query.account != undefined) ?
	//               req.query.account : "";
	var title = (req.query.title != undefined) ?
		req.query.title : "";
	articleModel.find({
		// "account": account != "" ? account :
		//           { $regex: '.*' + account + '.*' },
		// "type": {$regex: '.*' + type + '.*' },
		"title": { $regex: '.*' + title + '.*' }
	}, function (err, data) {
		if (err) {
			console.log(err);
		}
		res.json({ "data": data });
	});
});
router.get('/getArticleById', function (req, res) {
	articleModel.find({ _id: req.query._id }, function (err, data) {
		if (data == undefined) {
			res.json({ "status": 1, "msg": "查無文章" });
		}
		else {
			if (err) {
				res.json({ "status": 1, "msg": "error" });
			}
			else {
				memberModel.find({ id: data[0].id },
					function (err, mem) {
						res.json({
							"status": 0, "msg": "success", "data": {
								// account: data[0].account,
								// type: data[0].type,
								title: data[0].title,
								content: data[0].content,
								// like: data[0].like,
								// comment: data[0].comment,
								postdate: data[0].postdate,
								photos: data[0].photos,
								ipth: data[0].ipth,
								aaa: data[0].aaa,
								yt: data[0].yt
							}
						});
					});
			}
		}
	});
});
// -------------------------------news-------------------------------------------------
router.post('/upload', upload.single("file"), function (req, res, next) {
	
	console.log('----1111------')
	console.log(req.file)

		var _news = new newsModel({
			photos: req.file.filename
		});

		_news.save(function (err, data) {
			if (err) {
				res.json({ "status": 1, "msg": "error" });
			}
			else {
				res.json({
					"status": 0, "msg": "success",
					"photos": data.photos
				});
			}
		});

	
	
});
router.post('/newsupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newnews = new newsModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newnews.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getnews', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
newsModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getnewsById', function (req, res) {
newsModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-------------------cloud-----------------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _cloud = new cloudModel({
// 			photos: req.file.filename
// 		});

// 		_cloud.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/cloudupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newcloud = new cloudModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newcloud.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getcloud', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
cloudModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getcloudById', function (req, res) {
cloudModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-----------village---------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _village = new villageModel({
// 			photos: req.file.filename
// 		});

// 		_village.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/villageupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newvillage = new villageModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newvillage.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getvillage', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
villageModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getvillageById', function (req, res) {
villageModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-----------------newpeople---------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _newpeople = new newpeopleModel({
// 			photos: req.file.filename
// 		});

// 		_newpeople.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/newpeopleupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newnewpeople = new newpeopleModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa,
	//photos: req.file.filename
});

newnewpeople.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getnewpeople', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
newpeopleModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getnewpeopleById', function (req, res) {
newpeopleModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa,

						}
					});
				});
		}
	}
});
});
//-------------------------muslin-----------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _muslin = new muslinModel({
// 			photos: req.file.filename
// 		});

// 		_muslin.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/muslinupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newmuslin = new muslinModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newmuslin.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getmuslin', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
muslinModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getmuslinById', function (req, res) {
muslinModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-----------------market---------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _market = new marketModel({
// 			photos: req.file.filename
// 		});

// 		_market.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/marketupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newmarket = new marketModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newmarket.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getmarket', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
marketModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getmarketById', function (req, res) {
marketModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//--------------buy-------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _buy = new buyModel({
// 			photos: req.file.filename
// 		});

// 		_buy.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/buyupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newbuy = new buyModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa,
	price: req.body.price
	//photos: req.file.filename
});

newbuy.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getbuy', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
buyModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getbuyById', function (req, res) {
buyModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa,
							price: data[0].price

						}
					});
				});
		}
	}
});
});
//-----------------child-----------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _child = new childModel({
// 			photos: req.file.filename
// 		});

// 		_child.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/childupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newchild = new childModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newchild.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getchild', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
childModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getchildById', function (req, res) {
childModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-------------------chin-----------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _chin = new chinModel({
// 			photos: req.file.filename
// 		});

// 		_chin.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/chinupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newchin = new chinModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newchin.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getchin', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
chinModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getchinById', function (req, res) {
chinModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-------------------------park------------------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _park = new parkModel({
// 			photos: req.file.filename
// 		});

// 		_park.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/parkupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newpark = new parkModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newpark.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getpark', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
parkModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getparkById', function (req, res) {
parkModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});
//-------------------create-----------------------
// router.post('/upload', upload.single("file"), function (req, res, next) {
	
// 	console.log('----1111------')
// 	console.log(req.file)

// 		var _create = new createModel({
// 			photos: req.file.filename
// 		});

// 		_create.save(function (err, data) {
// 			if (err) {
// 				res.json({ "status": 1, "msg": "error" });
// 			}
// 			else {
// 				res.json({
// 					"status": 0, "msg": "success",
// 					"photos": data.photos
// 				});
// 			}
// 		});

	
	
// });
router.post('/createupdate', function (req, res) {
	console.log('----222------')
console.log(req.body)
var newcreate = new createModel({
	title: req.body.title,
	content: req.body.content,
	postdate: new Date(),
	ipth: req.body.ipth,
	aaa: req.body.aaa
	//photos: req.file.filename
});

newcreate.save(function (err, data) {
	if (err) {
		res.json({ "status": 1, "msg": "error" });
	}
	else {
		res.json({ "status": 0, "msg": "success", "data": data });
	}
});
});

router.get('/getcreate', function (req, res) {
// var type = (req.query.type != undefined) ?
//             req.query.type : "";
// var account = (req.query.account != undefined) ?
//               req.query.account : "";
var title = (req.query.title != undefined) ?
	req.query.title : "";
createModel.find({
	// "account": account != "" ? account :
	//           { $regex: '.*' + account + '.*' },
	// "type": {$regex: '.*' + type + '.*' },
	"title": { $regex: '.*' + title + '.*' }
}, function (err, data) {
	if (err) {
		console.log(err);
	}
	res.json({ "data": data });
});
});
router.get('/getcreateById', function (req, res) {
createModel.find({ _id: req.query._id }, function (err, data) {
	if (data == undefined) {
		res.json({ "status": 1, "msg": "查無文章" });
	}
	else {
		if (err) {
			res.json({ "status": 1, "msg": "error" });
		}
		else {
			memberModel.find({ id: data[0].id },
				function (err, mem) {
					res.json({
						"status": 0, "msg": "success", "data": {
							// account: data[0].account,
							// type: data[0].type,
							title: data[0].title,
							content: data[0].content,
							// like: data[0].like,
							// comment: data[0].comment,
							postdate: data[0].postdate,
							photos: data[0].photos,
							ipth: data[0].ipth,
							aaa: data[0].aaa

						}
					});
				});
		}
	}
});
});


//-------------------------------------------------------------------------------------
const isAuth = (req, res, next) => {
	if (!req.session.isAuth) return res.redirect("login");
	next();
};

router.get('/index', (req, res) => {
	res.render("index");
	console.log("成功");
});

router.get("/login", (req, res) => {
	res.render("login");
	console.log("login成功");
});



//連結
router.get('/connection', (req, res) => {
	res.render("connection");
	console.log("成功");
});
router.get('/news', (req, res) => {
	res.render("news");
	console.log("成功");
});
router.get('/bag', (req, res) => {
	res.render("bag");
	console.log("成功");
});
router.get('/bean', (req, res) => {
	res.render("bean");
	console.log("成功");
});
router.get('/beauty', (req, res) => {
	res.render("beauty");
	console.log("成功");
});
router.get('/black', (req, res) => {
	res.render("black");
	console.log("成功");
});
router.get('/buy', (req, res) => {
	res.render("buy");
	console.log("成功");
});
router.get('/buybag', (req, res) => {
	res.render("buybag");
	console.log("成功");
});
router.get('/buyoriginal', (req, res) => {
	res.render("buyoriginal");
	console.log("成功");
});
router.get('/chicken', (req, res) => {
	res.render("chicken");
	console.log("成功");
});
router.get('/child', (req, res) => {
	res.render("child");
	console.log("成功");
}); 
router.get('/chin', (req, res) => {
	res.render("chin");
	console.log("成功");
});
router.get('/cloud', (req, res) => {
	res.render("cloud");
	console.log("成功");
});
router.get('/cow', (req, res) => {
	res.render("cow");
	console.log("成功");
});
router.get('/create', (req, res) => {
	res.render("create");
	console.log("成功");
});
router.get('/dessert', (req, res) => {
	res.render("dessert");
	console.log("成功");
});
router.get('/france', (req, res) => {
	res.render("france");
	console.log("成功");
});
router.get('/horse', (req, res) => {
	res.render("horse");
	console.log("成功");
});
router.get('/hu', (req, res) => {
	res.render("hu");
	console.log("成功");
});
router.get('/india', (req, res) => {
	res.render("india");
	console.log("成功");
});
router.get('/intro', (req, res) => {
	res.render("intro");
	console.log("成功");
});
router.get('/kulu', (req, res) => {
	res.render("kulu");
	console.log("成功");
});
router.get('/liu', (req, res) => {
	res.render("liu");
	console.log("成功");
});
router.get('/luwai', (req, res) => {
	res.render("luwai");
	console.log("成功");
});
router.get('/manto', (req, res) => {
	res.render("manto");
	console.log("成功");
});
router.get('/market', (req, res) => {
	res.render("market");
	console.log("成功");
});
router.get('/muslin', (req, res) => {
	res.render("muslin");
	console.log("成功");
});
router.get('/newpeople', (req, res) => {
	res.render("newpeople");
	console.log("成功");
});
router.get('/news1', (req, res) => {
	res.render("news1");
	console.log("成功");
});
router.get('/news2', (req, res) => {
	res.render("news2");
	console.log("成功");
});
router.get('/news3', (req, res) => {
	res.render("news3");
	console.log("成功");
});
router.get('/news4', (req, res) => {
	res.render("news4");
	console.log("成功");
});
router.get('/noodle', (req, res) => {
	res.render("noodle");
	console.log("成功");
});
router.get('/old', (req, res) => {
	res.render("old");
	console.log("成功");
});
router.get('/onion', (req, res) => {
	res.render("onion");
	console.log("成功");
});
router.get('/over', (req, res) => {
	res.render("over");
	console.log("成功");
});
router.get('/park', (req, res) => {
	res.render("park");
	console.log("成功");
});
router.get('/pu', (req, res) => {
	res.render("pu");
	console.log("成功");
});
router.get('/ricedry', (req, res) => {
	res.render("ricedry");
	console.log("成功");
});
router.get('/riceline', (req, res) => {
	res.render("riceline");
	console.log("成功");
});
router.get('/river', (req, res) => {
	res.render("river");
	console.log("成功");
});
router.get('/shibin', (req, res) => {
	res.render("shibin");
	console.log("成功");
});
router.get('/slice', (req, res) => {
	res.render("slice");
	console.log("成功");
});
router.get('/spicy', (req, res) => {
	res.render("spicy");
	console.log("成功");
});
router.get('/spicychicken', (req, res) => {
	res.render("spicychicken");
	console.log("成功");
});
router.get('/spicynoodle', (req, res) => {
	res.render("spicynoodle");
	console.log("成功");
});
router.get('/store', (req, res) => {
	res.render("store");
	console.log("成功");
});
router.get('/thailand', (req, res) => {
	res.render("thailand");
	console.log("成功");
});
router.get('/triangle', (req, res) => {
	res.render("triangle");
	console.log("成功");
});
router.get('/village', (req, res) => {
	res.render("village");
	console.log("成功");
});
router.get('/wang', (req, res) => {
	res.render("wang");
	console.log("成功");
});
router.get('/yellow', (req, res) => {
	res.render("yellow");
	console.log("成功");
});
router.get('/news_1', (req, res) => {
	res.render("news_1");
	console.log("成功");
});
router.get('/news_2', (req, res) => {
	res.render("news_2");
	console.log("成功");
});
router.get('/news_3', (req, res) => {
	res.render("news_3");
	console.log("成功");
});
router.get('/news_4', (req, res) => {
	res.render("news_4");
	console.log("成功");
});
router.get('/buyyear', (req, res) => {
	res.render("buyyear");
	console.log("成功");
});
router.get('/buycustomized', (req, res) => {
	res.render("buycustomized");
	console.log("成功");
});
router.get('/buyteach', (req, res) => {
	res.render("buyteach");
	console.log("成功");
});
router.get('/cont', (req, res) => {
	res.render("cont");
	console.log("成功");
});
router.get('/newsupdate', (req, res) => {
	res.render("newsupdate");
	console.log("成功");
});
router.get('/news-in', (req, res) => {
	res.render("news-in");
	console.log("成功");
});
router.get('/cloudupdate', isAuth, (req, res) => {
	res.render("cloudupdate");
	console.log("成功");
});
router.get('/cloud-in', (req, res) => {
	res.render("cloud-in");
	console.log("成功");
});
router.get('/villageupdate', isAuth, (req, res) => {
	res.render("villageupdate");
	console.log("成功");
});
router.get('/village-in', (req, res) => {
	res.render("village-in");
	console.log("成功");
});
router.get('/newpeopleupdate', isAuth, (req, res) => {
	res.render("newpeopleupdate");
	console.log("成功");
});
router.get('/newpeople-in', (req, res) => {
	res.render("newpeople-in");
	console.log("成功");
});
router.get('/muslinupdate', isAuth, (req, res) => {
	res.render("muslinupdate");
	console.log("成功");
});
router.get('/muslin-in', (req, res) => {
	res.render("muslin-in");
	console.log("成功");
});
router.get('/marketupdate', isAuth, (req, res) => {
	res.render("marketupdate");
	console.log("成功");
});
router.get('/market-in', (req, res) => {
	res.render("market-in");
	console.log("成功");
});
router.get('/buyupdate', isAuth, (req, res) => {
	res.render("buyupdate");
	console.log("成功");
});
router.get('/buy-in', (req, res) => {
	res.render("buy-in");
	console.log("成功");
});
router.get('/childupdate', isAuth, (req, res) => {
	res.render("childupdate");
	console.log("成功");
});
router.get('/child-in', (req, res) => {
	res.render("child-in");
	console.log("成功");
});
router.get('/chinupdate', isAuth, (req, res) => {
	res.render("chinupdate");
	console.log("成功");
});
router.get('/parkupdate', isAuth, (req, res) => {
	res.render("parkupdate");
	console.log("成功");
});
router.get('/createupdate', isAuth, (req, res) => {
	res.render("createupdate");
	console.log("成功");
});


// router.post("/login", async (req, res) => {
// 	const {
// 		id,
// 		pw
// 	} = req.body;
// 	const member = await memberModel.findOne({
// 		id
// 	});
// 	if (!member) {
// 		console.log("Member not found!!!");
// 		return res.render("login");
// 	}

// 	const verifyPW = await bcrypt.compare(pw, member.pw);
// 	if (!verifyPW) {
// 		console.log("PW is incorrect!!!");
// 		return res.render("login");
// 	}

// 	req.session.isAuth = true;
// 	req.session.name = member.id;
// 	const id2 = req.session.name;
// 	const todayStr = new Date().toISOString().slice(0, 10);


// 	// 找尋符合條件的所有sit資料
// 	const sits = await sitModel.find({
// 		id: id2
// 	});
// 	// 找尋符合條件的所有point資料
// 	const points = await pointModel.find({
// 		id: id2
// 	});

// 	// 檢查今天是否有sit資料
// 	let todaySits = sits.filter(sit => sit.date === todayStr);
// 	if (sits.length === 0) {
// 		console.log('沒有找到sit資料');
// 		return res.render('members', {
// 			sitSchema: {},
// 			pointSchema: points,
// 			myname: req.session.name,
// 			num: points.length,
// 			docs: 0
// 		});
// 	} else if (todaySits.length === 0) {
// 		console.log(`今天沒有sit資料`);
// 		return res.render('members', {
// 			sitSchema: sits,
// 			pointSchema: points,
// 			myname: req.session.name,
// 			num: points.length,
// 			docs: 0
// 		});
// 	}

// 	// 有今天的sit資料, 顯示members頁面
// 	console.log(`找到 ${todaySits.length} 筆今天的sit資料`);
// 	res.render('members', {
// 		sitSchema: todaySits,
// 		pointSchema: points,
// 		myname: req.session.name,
// 		num: points.length,
// 		docs: todaySits.length
// 	});
// });
router.get('/register', function (req, res) {
	res.render('register');
	console.log("register成功");
});

// router.post("/register", async (req, res) => {
// 	const {
// 		id,
// 		pw,
// 		email
// 	} = req.body;
// 	if (!id || !pw || !email) {
// 		return res.redirect("register");
// 	}
// 	let member = await memberModel.findOne({
// 		id
// 	});
// 	if (member) {
// 		return res.redirect("/register");
// 	}
// 	const hashPW = await bcrypt.hash(pw, 10);
// 	member = new memberModel({
// 		id,
// 		pw: hashPW,
// 		email
// 	});
// 	const result = await member.save();
// 	res.render("login");

// 	console.log(id, email, pw);
// });

router.get("/logout", (req, res) => {
	if (req.session) {
		req.session.destroy((err) => {
			if (err) throw err;
			res.clearCookie("connect.id");
			return res.redirect("/");
		});
	}
});


router.get('/lost', isAuth, async (req, res) => {

	try {
		// 查詢數據庫
		const lostitems = await lostModel.find();
		// 傳遞變數到 EJS 文件
		res.render('lost', {
			lostitems: lostitems
		});

	} catch (error) {
		// 如果發生錯誤，則顯示錯誤信息
		console.error(error);
		res.render('lost');
	}
});

router.get('/lostupdate', isAuth, (req, res) => {
	console.log(req.session);
	res.render('lostupdate');
	console.log("lost成功");
});

router.get("/members", isAuth, async (req, res) => {

	const id2 = req.session.name;
	const todayStr = new Date().toISOString().slice(0, 10);

	// 找尋符合條件的所有sit資料
	const sits = await sitModel.find({
		id: id2
	});
	// 找尋符合條件的所有point資料
	const points = await pointModel.find({
		id: id2
	});

	// 檢查今天是否有sit資料
	let todaySits = sits.filter(sit => sit.date === todayStr);
	if (sits.length === 0) {
		console.log('沒有找到sit資料');
		return res.render('members', {
			sitSchema: {},
			pointSchema: points,
			myname: req.session.name,
			num: points.length,
			docs: 0
		});
	} else if (todaySits.length === 0) {
		console.log(`今天沒有sit資料`);
		return res.render('members', {
			sitSchema: sits,
			pointSchema: points,
			myname: req.session.name,
			num: points.length,
			docs: 0
		});
	}

	// 有今天的sit資料, 顯示members頁面
	console.log(`找到 ${todaySits.length} 筆今天的sit資料`);
	res.render('members', {
		sitSchema: todaySits,
		pointSchema: points,
		myname: req.session.name,
		num: points.length,
		docs: todaySits.length
	});
});

router.post("/members", async (req, res) => {
	// 取得傳送過來的訊息
	var message = req.body.message;

	// 在這裡處理收到的訊息（例如，存入資料庫）

	if (message != null) {
		const now = new Date();
		const nyear = now.getFullYear();
		const nmonth = now.getMonth() + 1; // 月份從 0 開始計算
		const ndate = now.getDate();
		const nhour = now.getHours();
		const nminute = now.getMinutes();
		const {
			id,
			year,
			month,
			date,
			hour,
			minute
		} = req.body;
		let pointdate = await pointModel.findOne({
			id
		});
		pointdate = new pointModel({
			id: req.session.name,
			year: nyear,
			month: nmonth,
			date: ndate,
			hour: nhour,
			minute: nminute
		});

		const result = await pointdate.save();

		console.log(pointdate.id, pointdate.year, pointdate.month, pointdate.date, pointdate.hour, pointdate.minute);
	}
	// 傳送回應

	res.send(message);
});

// router.get('/time', isAuth, async (req, res) => {

// 	pointModel.countDocuments({
// 		id: req.session.name
// 	}, (err, count) => {
// 		if (count > 0) {
// 			if (count % 3 == 0) {
// 				setTimeout(() => {
// 					res.render('time', {
// 						time: 0
// 					});
// 				}, 604800000);
// 			} else {
// 				res.render('time', {
// 					time: 0
// 				});
// 			}
// 		} else {
// 			res.render('time', {
// 				time: 0
// 			});
// 		}
// 	});
// 	console.log(req.session);
// 	console.log("time成功");
// });

// router.post("/time", async (req, res) => {

// 	const {
// 		get_date,
// 		get_region
// 	} = req.body;
// 	if (!get_date || !get_region) {
// 		return res.render("time", {
// 			time: 0
// 		});
// 	}
// 	let time = await timeModel.findOne({
// 		get_date
// 	});

// 	time = new timeModel({
// 		get_date,
// 		get_region
// 	});
// 	const result = await time.save();

// 	req.session.time = time.get_date;
// 	req.session.region = time.get_region;
// 	const date = {
// 		date: req.session.time
// 	};

// 	const region = {
// 		region: req.session.region
// 	};

// 	res.render('sit', {
// 		sit_date: date,
// 		sit_region: region
// 	});

// 	console.log(date, region);
// 	console.log("sit成功");

// 	console.log(get_date, get_region);

// });

// router.get('/sit', isAuth, (req, res) => {

// 	const date = {
// 		date: req.session.time
// 	};

// 	const region = {
// 		region: req.session.region
// 	};

// 	res.render('sit', {
// 		sit_date: date,
// 		sit_region: region
// 	});

// 	console.log(date, region);
// 	console.log("sit成功");

// });


// router.post("/sit", async (req, res) => {

// 	const sitId = req.body.sitId;
// 	console.log(sitId);
// 	req.session.sitid = sitId;

// 	const {
// 		id,
// 		date,
// 		region,
// 		sit
// 	} = req.body;

// 	let memsit = await sitModel.findOne({
// 		id
// 	});

// 	if (!memsit) {
// 		memsit = new sitModel({
// 			id: req.session.name,
// 			date: req.session.time,
// 			region: req.session.region,
// 			sit: req.session.sitid
// 		});
// 	}


// 	let sit2 = await sitModel.findOne({
// 		date: memsit.date,
// 		region: memsit.region,
// 		sit: memsit.sit
// 	});

// 	let sit3 = await sitModel.findOne({
// 		id: memsit.id,
// 		date: memsit.date
// 	});

// 	if (sit3) {
// 		res.render("time", {
// 			time: 2
// 		});
// 		console.log("已被登記");
// 	} else {
// 		if (sit2) {
// 			res.render("time", {
// 				time: 1
// 			});
// 			console.log("已被登記");
// 		} else {
// 			const result = await memsit.save();

// 			const id2 = req.session.name;
// 			const todayStr = new Date().toISOString().slice(0, 10);

// 			// 找尋符合條件的所有sit資料
// 			const sits = await sitModel.find({
// 				id: id2
// 			});
// 			// 找尋符合條件的所有point資料
// 			const points = await pointModel.find({
// 				id: id2
// 			});

// 			// 檢查今天是否有sit資料
// 			let todaySits = sits.filter(sit => sit.date === todayStr);
// 			if (sits.length === 0) {
// 				console.log('沒有找到sit資料');
// 				return res.render('members', {
// 					sitSchema: {},
// 					pointSchema: points,
// 					myname: req.session.name,
// 					num: points.length,
// 					docs: 0
// 				});
// 			} else if (todaySits.length === 0) {
// 				console.log(`今天沒有sit資料`);
// 				return res.render('members', {
// 					sitSchema: sits,
// 					pointSchema: points,
// 					myname: req.session.name,
// 					num: points.length,
// 					docs: 0
// 				});
// 			}

// 			// 有今天的sit資料, 顯示members頁面
// 			console.log(`找到 ${todaySits.length} 筆今天的sit資料`);
// 			res.render('members', {
// 				sitSchema: todaySits,
// 				pointSchema: points,
// 				myname: req.session.name,
// 				num: points.length,
// 				docs: todaySits.length
// 			});
// 		}
// 	}

// });



module.exports = router;
