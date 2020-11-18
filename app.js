// 引入express模块
const express = require("express");
const server = express();
// 引入cors模块
const cors = require("cors");
// 引入mysql模块
const mysql = require("mysql");
// 引入body-parser中间件
const bodyPaser = require("body-parser");
// 引入md5模块
const md5 = require("md5");
// 创建连接池并配置
const pool = mysql.createPool({
  // mysql数据库服务器地址
  host: "127.0.0.1",
  // 端口号
  port: 3306,
  // 数据库用户的用户名
  user: "root",
  // 数据库用户的密码
  password: "",
  // 数据库名称
  database: "twocar",
  // 最大连接数
  connectionLimit: 15,
});
// 使用body-parser中间件
server.use(
  bodyPaser.urlencoded({
    extended: false,
  })
);
// 使用cors解决跨域问题
server.use(
  cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
  })
);
//服务器监听接口
server.listen(3000, () => {
  console.log("server is runing...");
});

// home 页面轮播图接口
server.get("/carousel", (req, res) => {
  let sql = "SELECT img from twocar_home_carousel";
  pool.query(sql, (err, result) => {
    if (err) throw err;

    res.send({ message: "查询成功", code: 1, result: result });
  });
});
