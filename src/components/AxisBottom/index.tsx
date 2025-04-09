import { ScaleLinear } from "d3";
import { useMemo, useEffect, useState } from "react";


type AxisBottomProps = {
  xScale        : ScaleLinear<number, number>;
  pixelsPerTick : number;
  height        : number;
};


const formatAxisLabel = (value: number, axisType: string): string => {
  if (axisType === 'Price(USD)') {
    if      (value >= 1000000) { return `${value / 1000000}M`; } 
    else if (value >= 1000) { return `${value / 1000}K`; } 
    else    { return `${value}`; }
  }
  return `${value}`;
};


export const AxisBottom = ({ xScale, pixelsPerTick, height }: AxisBottomProps) => {

  const range = xScale.range();
  const [showTicks, setShowTicks] = useState(false);

  
  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale, pixelsPerTick, range]);


  useEffect(() => {
    const delayToShowTicks = setTimeout(() => { setShowTicks(true); }, 1000);
    return () => clearTimeout(delayToShowTicks);
  }, []);

  
  return (
    <>
      {ticks.map(({ value, xOffset }) => (
        <g 
          key   = {value}
          style = {{margin : '0px', padding : '0px'}}
        >
          <line
            x1          = {xOffset}
            x2          = {xOffset}
            y1          = {0}
            y2          = {-height}
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
              transition : "opacity 1s, transform 2s",
              transform  : `translate(${showTicks ? xOffset : 0}px, 0) translateY(20px)`,
              opacity    : showTicks ? 1 : 0, 
            }}
          >
           {formatAxisLabel(value, 'Price(USD)')}
          </text>
        </g>
      ))}
    </>
  );
};