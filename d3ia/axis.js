const axisInit = () => {
  // The data:
  var scatterData = [
    { friends: 5, salary: 22000 },
    { friends: 3, salary: 18000 },
    { friends: 10, salary: 88000 },
    { friends: 0, salary: 180000 },
    { friends: 27, salary: 56000 },
    { friends: 8, salary: 74000 },
  ]

  // Measure the data and create scales: Friends on x-axis and salary on y-axis:
  let maxFriends = d3.max(scatterData, (d) => d.friends)
  let maxSalary = d3.max(scatterData, (d) => d.salary)

  let xScale = d3.scaleLinear().domain([0, maxFriends]).range([50, 600])
  let yScale = d3.scaleLinear().domain([0, maxSalary]).range([560, 40])

  // Append a circle for each datapoint:
  d3.select('svg')
    .selectAll('circle')
    .data(scatterData)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(d.friends))
    .attr('cy', (d) => yScale(d.salary))
    .attr('r', 4.0)

  // Add x-axis:
  let xAxis = d3.axisBottom().scale(xScale)

  d3.select('svg').append('g').attr('id', 'xAxisG').call(xAxis)
  d3.select('#xAxisG').attr('transform', 'translate(0,560)')

  // Add y-axis:
  let yAxis = d3.axisLeft().scale(yScale)

  d3.select('svg').append('g').attr('id', 'yAxisG').call(yAxis)
  d3.select('#yAxisG').attr('transform', 'translate(50,0)')
}
