
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50}


// with a scale function

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;


const FRAME1 = d3.select("#scatterplot_length") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const FRAME2 = d3.select("#scatterplot_width")
          .append("svg")
            .attr("height", FRAME_HEIGHT)
            .attr("width", FRAME_WIDTH)
            .attr("class", "frame");

const FRAME3 = d3.select("#barplot")
          .append("svg")
            .attr("height", FRAME_HEIGHT)
            .attr("width", FRAME_WIDTH)
            .attr("class", "frame");


function build_scatterplot_length() {

	 d3.csv("data/iris.csv", (d) => {
	    return {
	        sepal_width: +d.sepal_width,
	        petal_width: +d.petal_width,
	        species: +d.species
	    };
	}).then((data) => {
	    const MAX_X = d3.max(data, (d) => {
	        return d.sepal_width;
	    });

	    const colorScale1 = d3.scaleOrdinal()
  			.domain(["setosa", "versicolor", "virginica"])
  			.range(["red", "green", "blue"]);

	    const X_SCALE = d3.scaleLinear()
	        .domain([0, MAX_X])
	        .range([0, VIS_WIDTH]);
	        
	    const MAX_Y = d3.max(data, (d) => {
	        return d.petal_width;
	    });

	    const Y_SCALE = d3.scaleLinear()
	        .domain([0, MAX_Y])
	        .range([VIS_HEIGHT, 0]);


	    FRAME2.selectAll("points")  
	        .data(data)
	        .enter()       
	        .append("circle")  
	          .attr("cx", (d) => { return (X_SCALE(d.sepal_width) + MARGINS.left); }) 
	          .attr("cy", (d) => { return (X_SCALE(d.petal_width) + MARGINS.top); }) 
	          .attr("r", 20)
	          .attr("class", "point");
	          .attr("fill", (d) => { return colorScale1(d.species); });

      });

}
build_scatterplot_length();


function build_scatterplot_width() {

	 d3.csv("data/iris.csv", (d) => {
	    return {
	        sepal_length: +d.sepal_length,
	        petal_length: +d.petal_length
	        species: +d.species
	    };

	}).then((data) => {
	    const MAX_X1 = d3.max(data, (d) => {
	        return d.sepal_length;
	    });

	    const colorScale2 = d3.scaleOrdinal()
  			.domain(["setosa", "versicolor", "virginica"])
  			.range(["red", "green", "blue"]);

	    const X_SCALE1 = d3.scaleLinear()
	        .domain([0, MAX_X1])
	        .range([0, VIS_WIDTH]);
	        
	    const MAX_Y1 = d3.max(data, (d) => {
	        return d.petal_length;
	    });

	    const Y_SCALE1 = d3.scaleLinear()
	        .domain([0, MAX_Y1])
	        .range([VIS_HEIGHT, 0]);


	    FRAME1.selectAll("points")  
	        .data(data)
	        .enter()       
	        .append("circle")  
	          .attr("cx", (d) => { return (X_SCALE1(d.sepal_length) + MARGINS.left); }) 
	          .attr("cy", (d) => { return (X_SCALE1(d.petal_length) + MARGINS.top); }) 
	          .attr("r", 20)
	          .attr("class", "point")
	          .attr("fill", (d) => { return colorScale2(d.species); });

	      });

}


build_scatterplot_width();

function build_barplot() {
	d3.csv("data/iris.csv", (d) => {
	    const counts = d3.rollups(data, v => v.length, d => d.species);

	 // Set the scales
  	const X_SCALE3 = d3.scaleBand()
	    .domain(counts.map(d => d[0]))
	    .range([MARGINS.left, FRAME_WIDTH - MARGINS.right])
	    .padding(0.1);

  	const Y_SCALE3 = d3.scaleLinear()
    	.domain([0, d3.max(counts, d => d[1])])
	    .range([VIS_HEIGHT - MARGINS.bottom, MARGINS.top]);

	const colorScale = d3.scaleOrdinal()
  		.domain(data.map(d => d.species))
  		.range(['#1f77b4', '#ff7f0e', '#2ca02c']);

    FRAME3.selectAll("rect")
	    .data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', d => X_SCALE3(d.species) + MARGINS.left)
		.attr('y', d => VIS_HEIGHT + MARGINS.top - Y_SCALE(d.count))
		.attr('height', d => Y_SCALE(d.count))
		.attr('width', X_SCALE3.bandwidth())
		.style('fill', (d, i) => colorScale(i));

      });

}

build_barplot();
