import * as d3 from 'd3';
import { ScaleLinear } from 'd3';
import { CarData } from '../Types';
import css from './index.module.css';
import { carMakeColors } from '../CarMakeColors';
import { useRef, useEffect, useState } from 'react';


type ScatterMarksProps = {
  data          : CarData[];
  xScale        : ScaleLinear<number, number>;
  yScale        : ScaleLinear<number, number>;
  minXValue     : number;
  selectedAxisX : string;
  selectedAxisY : string;
  onCircleHover : (carData: CarData | null) => void;
};

const ScatterMarks = ({ 
  data,
  xScale,
  yScale,
  minXValue,
  selectedAxisX,
  selectedAxisY,
  onCircleHover
  }: ScatterMarksProps) => {
  const circlesRef                        = useRef<SVGCircleElement[]>([]);
  const [hoveredCircle, setHoveredCircle] = useState<string | null>(null);


  useEffect(() => {
    const circles = circlesRef.current;
  
    circles.forEach((circle, i) => {
      const xValueKey = selectedAxisX as keyof CarData;
      const yValueKey = selectedAxisY as keyof CarData;
  
      const xValue = parseFloat(data[i][xValueKey].replace(',', ''));
      const yValue = parseFloat(data[i][yValueKey].replace(',', ''));
  
      if (isNaN(xValue) || isNaN(yValue)) { return; }
  
      d3.select(circle)
        .transition()
        .delay(i * 3)
        .duration(1000)
        .attr('cx', xScale(xValue))
        .attr('cy', yScale(yValue));
    });
  }, [data, xScale, yScale, selectedAxisX, selectedAxisY]);


  const handleMouseOver = (carMake: string, carModel: string) => {
    setHoveredCircle(carMake);
    const hoveredCarData = data.find(car => car['CarMake'] === carMake && car['CarModel'] === carModel) || null;
    onCircleHover(hoveredCarData);
  };


  const handleMouseLeave = () => { 
    setHoveredCircle(null); 
    onCircleHover(null);
  };

  
  return (
    <g style={{margin : '0px', padding : '0px'}}>
      {data.map((car, index) => {
        const yValueKey = selectedAxisY as keyof CarData;
        const xValueKey = selectedAxisX as keyof CarData;
      
        const yValue = parseFloat(car[yValueKey].replace(',', ''));
        const xValue = parseFloat(car[xValueKey].replace(',', ''));

        if (isNaN(xValue) || isNaN(yValue)) { return null; }

        const carMake   = car['CarMake'];
        const fillColor = carMakeColors[carMake] || '#CB1DD1';
        const isHovered = hoveredCircle === carMake || !hoveredCircle;

        return (
          <circle
            className    = {`${css.scatterMark} ${isHovered ? '' : css.scatterMarkDimmed}`}
            key          = {index}
            ref          = {(el) => (circlesRef.current[index] = el as SVGCircleElement)}
            cx           = {xScale(minXValue)}
            cy           = {yScale(yValue)}
            r            = {5}
            opacity      = {0.8} 
            stroke       = {fillColor}
            fill         = {fillColor}
            fillOpacity  = {isHovered ? 0.4 : 0.2}
            strokeWidth  = {1}
            onMouseOver  = {() => handleMouseOver(carMake, car['CarModel'])}
            onMouseLeave = {handleMouseLeave}
          >
            <title>{car['CarMake']} - {car['CarModel']} | {car['Year']}</title>
          </circle>
        );
      })}
    </g>
  );
};

export default ScatterMarks;