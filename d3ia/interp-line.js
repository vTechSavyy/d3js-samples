const lineInit = () => {
  // Load the data from the csv file:
  d3.csv('../data/interp-line.csv', createLineViz)
}

const createLineViz = (inData) => {
  console.log(inData)

  const blue = '#5eaec5',
    green = '#92c463',
    orange = '#fe9a22'

  let xPixelMin = 50
  let xPixelMax = 750
  let yPixelMin = 50
  let yPixelMax = 550

  // Measure the data:
  let tweetsMax = d3.max(inData, (d) => Number(d.tweets))
  let retweetsMax = d3.max(inData, (d) => Number(d.retweets))

  console.log('Tweets max is:  ', tweetsMax)
  console.log('Reweets max is:  ', retweetsMax)
  console.log('Math max is:  ', Math.max(tweetsMax, retweetsMax))

  // Create scales:
  let xScale = d3.scaleLinear().domain([0, 10.5]).range([xPixelMin, xPixelMax])
  let yScale = d3
    .scaleLinear()
    .domain([0, Math.max(tweetsMax, retweetsMax)])
    .range([yPixelMax, yPixelMin])

  // Create axes:
  let xAxis = d3
    .axisBottom()
    .scale(xScale)
    .tickSize(-(yPixelMax - yPixelMin))

  d3.select('svg')
    .append('g')
    .attr('id', 'xAxisG')
    .attr('transform', 'translate(0, 550)')
    .call(xAxis)

  let yAxis = d3
    .axisLeft()
    .scale(yScale)
    .tickSize(-(xPixelMax - xPixelMin))

  d3.select('svg')
    .append('g')
    .attr('id', 'yAxisG')
    .attr('transform', 'translate(50, 0)')
    .call(yAxis)

  // Create scatter plots:
  d3.select('svg')
    .selectAll('circle.tweets')
    .data(inData)
    .enter()
    .append('circle')
    .attr('class', 'tweets')
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d.tweets))
    .attr('r', 5.0)
    .style('fill', blue)

  d3.select('svg')
    .selectAll('circle.retweets')
    .data(inData)
    .enter()
    .append('circle')
    .attr('class', 'retweets')
    .attr('cx', (d) => xScale(d.day))
    .attr('cy', (d) => yScale(d.retweets))
    .attr('r', 5.0)
    .style('fill', orange)

  // Create lines:
  let tweetLine = d3
    .line()
    .x((d) => xScale(d.day))
    .y((d) => yScale(d.tweets))

  tweetLine.curve(d3.curveCardinal)

  d3.select('svg')
    .append('path')
    .attr('id', 'tweetLine')
    .attr('d', tweetLine(inData))
    .attr('fill', 'none')
    .attr('stroke', blue)
    .attr('stroke-width', 2)

  let retweetLine = d3
    .line()
    .x((d) => xScale(d.day))
    .y((d) => yScale(d.retweets))

  d3.select('svg')
    .append('path')
    .attr('id', 'retweetLine')
    .attr('d', retweetLine(inData))
    .attr('fill', 'none')
    .attr('stroke', orange)
    .attr('stroke-width', 2)
}
