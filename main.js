
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
	        petal_width: +d.petal_width
	    };
	}).then((data) => {
	    const MAX_X = d3.max(data, (d) => {
	        return d.sepal_width;
	    });

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
          .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); }) 
          .attr("cy", (d) => { return (X_SCALE(d.x) + MARGINS.top); }) 
          .attr("r", 20)
          .attr("class", "point");

      });

}
build_scatterplot_length();


function build_scatterplot_width() {

	 d3.csv("data/iris.csv", (d) => {
	    return {
	        sepal_length: +d.sepal_length,
	        petal_length: +d.petal_length
	    };
	}).then((data) => {
	    const MAX_X1 = d3.max(data, (d) => {
	        return d.sepal_length;
	    });

	    const X_SCALE = d3.scaleLinear()
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
          .attr("cx", (d) => { return (X_SCALE1(d.x) + MARGINS.left); }) 
          .attr("cy", (d) => { return (X_SCALE1(d.x) + MARGINS.top); }) 
          .attr("r", 20)
          .attr("class", "point");

      });

}

build_scatterplot_width();