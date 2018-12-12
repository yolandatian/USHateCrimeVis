var table17, table16;
var padding = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
var motivationArray = [],
  targetArray = [],
  incidentsArray = [];
var motivationArray2 = [],
  targetArray2 = [],
  incidentsArray2 = [];
var motivationArray3 = [],
  targetArray3 = [],
  incidentsArray3 = [];
var condition = 0;

var heightVis = 500;

var allignDataset=incidentsArray3;
var allignDatasetforCondition2=[];
// function preload() {
//     // load the CSV data into our `table` variable and clip out the header row
//     table17 = loadTable("dataset/2017HCbyBiasMotivation.csv", "csv", "header");
//     table16 = loadTable("dataset/2016HCbyBiasMotivation.csv", "csv", "header");
// }


var svg = d3.selectAll("#viz") //.append("div").attr("class", "column")
  .append("svg")
  .attr("id", "firstData")
  .attr("height", heightVis)

  //.attr("min-width",'300')
  //.attr("width", '33.3%')
  .attr("width", '380')
  //.style("display", "inline")
  //  .attr("x",0)
  .style("left", '0')
//.style('background', 'lightgrey');
//.attr("viewBox", "0 0 300 300");

var svg2 = d3.selectAll("#viz") //.append("div").attr("class", "column")
  .append("svg")
  .attr("id", "secondData")
  .attr("height", heightVis)
  //.attr("width", "33.3%")
  //.attr("min-width",'300')
  //.style("left", "33.3%")
  //.style("display", "inline")
  .attr("width", '380')
  .style("left", "380")

//.style('background', 'lightgrey');

var svg3 = d3.selectAll("#viz") //.append("div").attr("class", "column")
  .append("svg")
  .attr("id", "thirdData")
  .attr("height", heightVis)
  //.attr("width", "33.3%")
  //.attr("min-width",'300')
  //.style("left", '66.6%')
  .attr("width", '380')
  .style("left", "760")

//.style("position","absolute")
//.style('background', 'lightgrey');




d3.csv("dataset/2015HCbyBiasMotivation.csv", function(error, data) {
  if (error) throw error;
  table17 = data;

  for (var i = 0; i < data.length; i++) {
    targetArray.push(data[i].target);
    motivationArray.push(data[i].motivation);
    incidentsArray.push(Number(data[i].incidents));

  }

  d3.csv("dataset/2016HCbyBiasMotivation.csv", function(error, data) {
    if (error) throw error;
    table17 = data;

    for (var i = 0; i < data.length; i++) {
      targetArray2.push(data[i].target);
      motivationArray2.push(data[i].motivation);
      incidentsArray2.push(Number(data[i].incidents));
    }


  });

  d3.csv("dataset/2017HCbyBiasMotivation.csv", function(error, data) {
    if (error) throw error;
    table17 = data;

    for (var i = 0; i < data.length; i++) {
      targetArray3.push(data[i].target);
      motivationArray3.push(data[i].motivation);
      incidentsArray3.push(Number(data[i].incidents));
    }

    conditionOne(incidentsArray3, 130, svg3);


    conditionOne(incidentsArray2, 130, svg2);

      conditionOne(incidentsArray, 130, svg);

  });




});





//console.log(condition);


//condition one*********************************************
function conditionOne(inArray, x1, svgPic) {
  let sumOfInci1 = d3.sum(inArray);
  // let sumOfInci2= d3.sum(inArray2);
  // let sumOfInci3= d3.sum(inArray3);
  let y = 150;
  this.x1 = x1;
  this.svgPic = svgPic;

  //console.log(sumOfInci1);

  var reSumOfInci = d3.scaleLinear()
    .domain([5600, 7500])
    .range([80, 120]);
  // .range([window.innerWidth*.33*.266,window.innerWidth*.33*.4]);
  console.log(reSumOfInci(sumOfInci1));
  svgPic.selectAll("g").remove();
  svgPic.selectAll("circle").remove();
  svgPic.selectAll("text").remove();
  d3.selectAll("svg").attr("height", heightVis);

  var circles = svgPic //.selectAll("circle")

  // first data set
  circles.append("g").append("circle")

    .attr("cy", y)
    .attr("cx", x1)
    .attr("r", 0)
    .transition()
    .ease(d3.easeElastic.period(0.8))
    .duration(2000)
    .attr("r", reSumOfInci(sumOfInci1))
    .style("fill", "black");
  //text1
  circles.select("g").append("text")
    .classed('gtext', true)
    .attr("dy", ".35em")
    .attr('font-size', 12)
    .attr('text-anchor', 'middle')
    .style("fill", "white")
    .append("tspan")
    .text(function(d, i) {
      return "Total"
    })
    .attr("y", y)
    .attr("x", function(d) {
      return x1
    });
  svgPic.selectAll("text").append("tspan")
    .text(function(d, i) {
      return sumOfInci1
    })
    .attr("y", y + 15)
    .attr("x", function(d) {
      return x1
    });



};







//*********************************************
function conditionTwo(inArray, moArray, svgPic) {

  svgPic.selectAll("g").remove();
  svgPic.selectAll("text").remove();
  svgPic.selectAll("circle").remove();

  d3.selectAll("svg").attr("height", heightVis);


  let xP = 130;

  this.inArray = inArray;
  this.svgPic = svgPic;

  var ethni = [],
    reli = [],
    orien = [],
    disab = [],
    gend = [],
    identi = [],
    multi = 0;
  var allEthni, allReli, allOrien, allDisab, allGend, allIdenti;
  var motivAll = [];
  var moName = ["Ethnicity", "Religion", "Orientation", "Disability", "Gender", "Identity", "Multiple"];
  for (var a = 0; a < inArray.length; a++) {
    if (moArray[a] == "Ethnicity") {
      ethni.push(inArray[a]);
    } else if (moArray[a] == "Religion") {
      reli.push(inArray[a]);
    } else if (moArray[a] == "Orientation") {
      orien.push(inArray[a]);;
    } else if (moArray[a] == "Disability") {
      disab.push(inArray[a]);
    } else if (moArray[a] == "Gender") {
      gend.push(inArray[a]);
    } else if (moArray[a] == "Identity") {
      identi.push(inArray[a]);
    } else if (moArray[a] == "Multiple") {
      multi = inArray[a];
    };
    //console.log(a+"sssssssssss");
  };



  var reIncidentsArray = d3.scaleLinear()
    .domain([0, 4200])
    .range([5, 100]);


  motivAll.push(d3.sum(ethni), d3.sum(reli), d3.sum(orien), d3.sum(disab), d3.sum(gend), d3.sum(identi), multi);
  //motivAll.push()
  // console.log(motivAll + ' aaa');
  // console.log(allEthni + ' aaa');
allignDatasetforCondition2.push(motivAll)
    console.log(allignDatasetforCondition2);




  circleoffset = 20;
  privousValue = 0;
  var circles = svgPic.selectAll("circle")
    .data(motivAll)
    .enter()
    .append("g");
  circles.append("circle")
    //.classed('ctext',true)
    .attr("cx", xP)
    .attr("cy", function(d) {
      return reIncidentsArray(d)
    })
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("opacity", 1)
        .attr("r", reIncidentsArray(d) + 5);
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .attr("opacity", .8)
        .attr("r", reIncidentsArray(d));
    })
    .style("opacity", 0)
    .attr("r", 0)
    .transition()
    .ease(d3.easeElastic.period(.7))
    .duration(1000)
    .style("opacity", .8)
    .delay(function(d, i) {
      return i * 25
    })
    //.style("opacity", .8)
    .attr("cy", function(d, i) {
      if (i > 0) {
        privousValue = allignDatasetforCondition2[0][i - 1];
      }
      circleoffset += reIncidentsArray(allignDatasetforCondition2[0][i]) + reIncidentsArray(privousValue) + 30
      return circleoffset;
    })

    .attr("r", function(d, i) {
      return reIncidentsArray(d)
    })
    .style("fill", function(d, i) {
      if (moName[i] == "Ethnicity") {
        return "rgba(200,0,0,.6)";
      } else if (moName[i] == "Religion") {
        return "rgba(255,0,255,.6)";
      } else if (moName[i] == "Orientation") {
        return "rgba(255,100,155,.6)";
      } else if (moName[i] == "Disability") {
        return "rgba(55,200,55,.6)";
      } else if (moName[i] == "Gender") {
        return "rgba(255,0,155,.6)";
      } else if (moName[i] == "Identity") {
        return "rgba(0,100,155,.6)";
      }
    });
  //text Target--
  circleoffset = 20;
  privousValue = 0;
  // svg.selectAll("text")
  //     .data(incidentsArray).enter()
  circles.append("text")
    .classed('gtext', true)
    .attr("x", function(d) {
      return xP + reIncidentsArray(d) + 5
    })
    //.attr("y",0)
    .attr("dy", ".35em")
    .attr('font-size', 0)
    .attr('font-size', 12)
    .attr("y", function(d, i) {
      if (i > 0) {
        privousValue = motivAll[i - 1];
      }
      circleoffset += reIncidentsArray(d) + reIncidentsArray(privousValue) + 30;
      return circleoffset;
    })
    .style("opacity", 0)
    .transition()
    .ease(d3.easeQuad)
    //.delay(100)
    .duration(1000)
    .style("opacity", .5)

    //.attr('text-anchor', 'middle')

    .text(function(d, i) {
      return moName[i]
    });
  //  .append("br")
  //  .text(function(d, i){ return targetArray[i] +incidentsArray[i]}) ;
  //text Incidents--------------------------
  circleoffset = 20;
  privousValue = 0;
  circles.append("text")
    .classed('gtext', true)
    .attr("y", function(d, i) {
      if (i > 0) {
        privousValue = motivAll[i - 1];
      }
      circleoffset += reIncidentsArray(d) + reIncidentsArray(privousValue) + 30;
      return circleoffset + 15;
    })
    .attr("x", function(d) {
      return xP + reIncidentsArray(d) + 5
    })
    .attr("dy", ".35em")
    .attr('font-size', 10)
    .style("opacity", 0)
    .transition()
    .ease(d3.easeQuad)
    .delay(400)
    .duration(1000)
    .style("opacity", .4)
    .text(function(d, i) {
      return motivAll[i]
    });

}
//********************************************************************
function conditionThree(inArray, svgPic) {



  this.inArray = inArray;
  this.svgPic = svgPic;
  let xP = 130;
  svgPic.selectAll("g").remove();
  svgPic.selectAll("text").remove();
  svgPic.selectAll("circle").remove();

  d3.selectAll("svg").attr("height", heightVis);

  //remap the incidents data
  //var maxOfInci= incidentsArray.sort(d3.descending);
  var maxOfInci = d3.max(inArray);
  console.log(inArray[1]);
  console.log(maxOfInci);
  var circleoffset = 20;
  var privousValue = 0;
  var reIncidentsArray = d3.scaleLinear()
    .domain([0, 2050])
    .range([1, 60]);
  var circles = svgPic.selectAll("circle")
    .data(inArray)
    .enter()
    .append("g");
  circles.append("circle")
    //.classed('ctext',true)
    .attr("cx", xP)
    // .attr("cy", function(d) {
    //   return reIncidentsArray(d)
    // })
    .attr("cy", function(d) {
      return reIncidentsArray(d)
    })
    .on("mouseover", function(d) {
      d3.select(this)
        .attr("opacity", 1)
        .attr("r", reIncidentsArray(d) + 5);
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .attr("opacity", .8)
        .attr("r", reIncidentsArray(d));
    })
    .transition()
    .ease(d3.easeElastic.period(.7))
    .duration(2000)
    .delay(function(d, i) {
      return i * 25
    })
    .style("opacity", .8)
    // .attr("cy", function(i, d) {
    //   for(var a=0; a<incidentsArray3.length;a++){
    //   if (a > 0) {
    //     privousValue = incidentsArray3[a - 1];
    //   }
    //   circleoffset += reIncidentsArray(incidentsArray3[a]) + reIncidentsArray(privousValue) + 30
    //       return circleoffset;
    //   }
    //
    // })
    .attr("cy", function(d, i) {
      if (i > 0) {
        privousValue = allignDataset[i - 1];
      }
      circleoffset += reIncidentsArray(allignDataset[i]) + reIncidentsArray(privousValue) + 30
          return circleoffset;
      //}

    })
    .attr("r", 0)
    // .transition()
    // .ease(d3.easeElastic)
    // .duration(2000)

    .attr("r", function(d, i) {
      return reIncidentsArray(d)
    })
    //.style("fill","rgba(200,0,0,.6)")


    .style("fill", function(d, i) {
      if (motivationArray[i] == "Ethnicity") {
        return "rgba(200,0,0,.6)";
      } else if (motivationArray[i] == "Religion") {
        return "rgba(255,0,255,.6)";
      } else if (motivationArray[i] == "Orientation") {
        return "rgba(255,100,155,.6)";
      } else if (motivationArray[i] == "Disability") {
        return "rgba(55,200,55,.6)";
      } else if (motivationArray[i] == "Gender") {
        return "rgba(255,0,155,.6)";
      } else if (motivationArray[i] == "Identity") {
        return "rgba(0,100,155,.6)";
      }
    });



  //text Target--
  circleoffset = 20;
  privousValue = 0;
  // svg.selectAll("text")
  //     .data(incidentsArray).enter()
  circles.append("text")
    .classed('gtext', true)
    .attr("x", function(d) {
      return xP + reIncidentsArray(d) + 5
    })
    //.attr("y",0)
    .attr("dy", ".35em")
    .attr('font-size', 0)
    .attr('font-size', 12)
    .attr("y", function(d, i) {
      if (i > 0) {
        privousValue = allignDataset[i - 1];
      }
      circleoffset += reIncidentsArray(allignDataset[i]) + reIncidentsArray(privousValue) + 30;
      return circleoffset;
    })
    .style("opacity", 0)
    .transition()
    .ease(d3.easeQuad)
    //.delay(100)
    .duration(1000)
    .style("opacity", .5)

    //.attr('text-anchor', 'middle')

    .text(function(d, i) {
      return targetArray[i]
    });
  //  .append("br")
  //  .text(function(d, i){ return targetArray[i] +incidentsArray[i]}) ;
  //text Incidents--------------------------
  circleoffset = 20;
  privousValue = 0;
  circles.append("text")
    .classed('gtext', true)
    .attr("y", function(d, i) {
      if (i > 0) {
        privousValue = allignDataset[i - 1];
      }
      circleoffset += reIncidentsArray(allignDataset[i]) + reIncidentsArray(privousValue) + 30;
      return circleoffset + 15;
    })
    .attr("x", function(d) {
      return xP + reIncidentsArray(d) + 5
    })
    .attr("dy", ".35em")
    .attr('font-size', 10)
    .style("opacity", 0)
    .transition()
    .ease(d3.easeQuad)
    .delay(400)
    .duration(1000)
    .style("opacity", .4)
    .text(function(d, i) {
      return inArray[i]
    });
};

d3.select("#views").on("click", function() {
  if (condition == 0) {

    heightVis = 1000;

    endingOne();

    setTimeout(function() {
      conditionTwo(incidentsArray, motivationArray, svg);
      conditionTwo(incidentsArray2, motivationArray2, svg2);
      conditionTwo(incidentsArray3, motivationArray3, svg3);
    }, 500)

    condition = 1;

  } else if (condition == 1) {

    heightVis = 1800;
    conditionThree(incidentsArray, svg);
    conditionThree(incidentsArray2, svg2);
    conditionThree(incidentsArray3, svg3);

    condition = 2;
    d3.select("myfooter").style("bottom", 0);
  } else if (condition == 2) {
    //loadingSvg();
    heightVis = 400;

    d3.select("myfooter").style("bottom", 0);
    conditionOne(incidentsArray, 130, svg);
    conditionOne(incidentsArray2, 130, svg2);
    conditionOne(incidentsArray3, 130, svg3);
    //conditionThree(300);
    condition = 0;
    //console.log(condition);
  };
});

function endingOne() {

  // d3.selectAll("circle")
  //     .style("opacity", 1)
  //     .transition()
  //     //.ease(d3.easeElastic.period(0.8))
  //     .duration(2000)
  //     .style("opacity", 0);

  //  d3//.selectAll("g")
  d3.selectAll("g")
    .style("opacity", 1)
    .transition()
    .ease(d3.easeElastic.period(0.8))
    .duration(500)
    .style("opacity", 0);

  // callback(incidentsArray, motivationArray, svg );

}


function scrollWin() {
  window.scrollTo(0, 0);
}

window.onscroll = function() {
  checkScrollPosition()
};

function checkScrollPosition() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    d3.select(".myfooter")
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .style("opacity", 1);
  } else {

    d3.select(".myfooter")
    .transition()
    .duration(1000)
    .style("opacity", 0);
  }

}
