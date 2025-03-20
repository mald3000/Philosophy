// 哲学家数据（可以从后端 API 获取）
const philosophers = [
  { id: 1, name: "柏拉图", x: 200, y: 300 },
  { id: 2, name: "亚里士多德", x: 250, y: 350 },
  { id: 3, name: "康德", x: 500, y: 200 },
  { id: 4, name: "尼采", x: 600, y: 400 },
  { id: 5, name: "笛卡尔", x: 400, y: 100 },
];

// 创建 SVG 画布
const svg = d3.select("svg");

// 添加哲学家节点
const nodes = svg
  .selectAll(".philosopher")
  .data(philosophers)
  .enter()
  .append("circle")
  .attr("class", "philosopher")
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("r", 10)
  .on("mouseover", function (event, d) {
    // 显示工具提示
    d3.select("#tooltip")
      .style("display", "block")
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY + 10}px`)
      .html(`<strong>${d.name}</strong>`);
  })
  .on("mouseout", function () {
    // 隐藏工具提示
    d3.select("#tooltip").style("display", "none");
  })
  .on("click", function (event, d) {
    // 点击时获取哲学家详细信息
    fetch(`/philosophers/${d.id}`)
      .then((response) => response.json())
      .then((data) => {
        alert(`书籍: ${data.books.map((book) => book.title).join(", ")}`);
      });
  });
