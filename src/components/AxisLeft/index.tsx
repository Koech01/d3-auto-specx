import { useMemo } from "react";
import { ScaleLinear } from "d3";


type AxisLeftProps = {
  yScale        : ScaleLinear<number, number>;
  pixelsPerTick : number;  
  width         : number;
};


const formatAxisLabel = (value: number, axisType: string): string => {
  if (axisType === 'Price(USD)') {
    if (value >= 1000000) { return `${value / 1000000}M`; } 
    else if (value >= 1000) { return `${value / 1000}K`; } 
    else { return `${value}`; }
  }
  return `${value}`;
};


export const AxisLeft = ({ yScale, pixelsPerTick, width }: AxisLeftProps) => {
  const range = yScale.range();

  
  const ticks = useMemo(() => {
    const height              = range[0] - range[1];
    const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

    return yScale.ticks(numberOfTicksTarget).map((value) => ({value, yOffset: yScale(value)}));
  }, [yScale, pixelsPerTick, range]);


  return (
    <>
      {ticks.map(({ value, yOffset }) => (
        <g 
        key       = {value} 
        transform = {`translate(0, ${yOffset})`}
        style     = {{margin : '0px', padding : '0px'}}
        >

          <line            
            x1          = {0}
            x2          = {width} 
            stroke      = "#FAFAFA"
            strokeWidth = {0.1}
            style       = {{margin : '0px', padding : '0px'}}
          />
          
          <text
            key={value}
            style={{
              fill       : "#FAFAFA",
              fontSize   : "11px",
              textAnchor : "middle",
              transform  : "translateX(-20px)",
            }}
          >
            {formatAxisLabel(value, 'Price(USD)')}
          </text>
        </g>
      ))}
    </>
  );
};