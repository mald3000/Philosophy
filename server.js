const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// 静态文件服务
app.use(express.static("public"));

// 获取哲学家列表
app.get("/philosophers", (req, res) => {
  const philosophers = [
    { id: 1, name: "柏拉图", x: 200, y: 300 },
    { id: 2, name: "亚里士多德", x: 250, y: 350 },
    { id: 3, name: "康德", x: 500, y: 200 },
    { id: 4, name: "尼采", x: 600, y: 400 },
    { id: 5, name: "笛卡尔", x: 400, y: 100 },
  ];
  res.json(philosophers);
});

// 获取哲学家详细信息
app.get("/philosophers/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "data", "philosopher", `${id}.json`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "哲学家未找到" });
    }
    res.json(JSON.parse(data));
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
