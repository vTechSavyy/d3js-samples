const soccerVizInit = () => {
  d3.csv("../data/worldcup.csv", (err, data) => {
    if (err) console.error(err);
    else {
      createSoccerViz(data);
    }
  });
};

const createSoccerViz = (incomingData) => {
  console.log(incomingData);

  // Get the keys for the buttons:
  const dataKeys = Object.keys(incomingData[0]).filter(
    (d) => d !== "team" && d !== "region"
  );

  const handleButtonClick = (e) => {
    console.log(`e is ${e}`);
    let min_feature = d3.min(incomingData, (d) => parseFloat(d[e]));
    let max_feature = d3.max(incomingData, (d) => parseFloat(d[e]));
    let radiusScale = d3
      .scaleLinear()
      .domain([min_feature, max_feature])
      .range([2, 20]);

    d3.selectAll("g.teams")
      .select("circle")
      .transition()
      .duration(1000)
      .attr("r", (d) => radiusScale(parseFloat(d[e])));
  };

  // Create the buttons:
  d3.selectAll(".controls")
    .data(dataKeys)
    .enter()
    .append("button")
    .attr("class", "controls")
    .on("click", handleButtonClick)
    .html((d) => d);

  // Create a circle for each team:
  let team_group = d3
    .select("svg")
    .selectAll("g")
    .data(incomingData)
    .enter()
    .append("g")
    .attr("class", "teams")
    .attr("transform", (d, i) => "translate(" + (50 + i * 80) + "," + 50 + ")");

  team_group.append("circle").attr("r", 20).attr("fill", "purple");

  team_group
    .append("text")
    .attr("x", -30)
    .attr("y", 30)
    .text((d) => d.team);
};
