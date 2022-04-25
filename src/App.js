import "./styles.css";
import * as Plot from "@observablehq/plot";
import { useRef, useEffect, useState } from "react";
import { data } from "./data";
import { athletes } from "./athletes";
import { Dropdown } from "./dropdown";

function MyPlot({ data }) {
  const ref = useRef();
  const [sort, setSort] = useState("Alphabetical");

  useEffect(() => {
    const barChart = Plot.plot({
      marks: [
        Plot.ruleY([1 / 26], { stroke: "orange", strokeWidth: 3 }),
        Plot.barY(data, {
          x: "letter",
          y: "frequency",
          sort:
            sort === "Alphabetical"
              ? null
              : { x: "y", reverse: sort.startsWith("Desc") },
        }),
        Plot.ruleY([0]),
      ],
      y: {
        grid: true,
      },
      marginLeft: 50,
      marginTop: 50,
      marginBottom: 50,
    });
    ref.current.append(barChart);
    return () => barChart.remove();
  }, [data, sort]);

  return (
    <div>
      <Dropdown
        title="Sort by"
        onChange={(event) => setSort(event.target.value)}
        options={[
          "Alphabetical",
          "Descending frequency",
          "Ascending frequency",
        ]}
      />
      <div ref={ref}></div>
    </div>
  );
}

function DotPlot({ data }) {
  const ref = useRef();
  useEffect(() => {
    const dotPlot = Plot.plot({
      marks: [
        Plot.dot(data, {
          x: "Weight",
          y: "Height",
          stroke: "Sex",
        }),
      ],
      marginLeft: 50,
      marginTop: 50,
      marginBottom: 50,
    });
    /*const dotPlot = Plot.dot(data, {
      x: "Weight",
      y: "Height",
      stroke: "Sex",
      marginLeft: 50,
      marginTop: 50,
      marginBottom: 500,
    }).plot();*/
    ref.current.append(dotPlot);
    return () => dotPlot.remove();
  }, [data]);
  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
}

function Histogram({ data }) {
  const ref = useRef();
  useEffect(() => {
    const histogram = Plot.plot({
      grid: true,
      facet: {
        data: athletes,
        y: "Sex",
      },
      marks: [
        Plot.rectY(
          athletes,
          Plot.binX({ y: "count" }, { x: "Weight", fill: "Sex" })
        ),
        Plot.ruleY([0]),
      ],
      marginLeft: 50,
      marginTop: 50,
      marginBottom: 50,
    });
    ref.current.append(histogram);
    return () => histogram.remove();
  }, [data]);
  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello DataViz!</h1>
      <div>
        {" "}
        <MyPlot data={data} />
      </div>

      <div className="dotPlot">
        {" "}
        <DotPlot data={athletes} class="atheletePlot" />
      </div>
      <div>
        <Histogram data={athletes} />
      </div>
    </div>
  );
}
