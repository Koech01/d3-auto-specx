import * as d3 from 'd3';
import css from './index.module.css';
import { GroupedCircleData } from '../Types';
import { carMakeColors } from '../CarMakeColors';
import { useRef, useEffect, useState } from 'react';


type GroupedCircleProps = {
  width         : number;
  height        : number;
  data          : GroupedCircleData[];
  onCircleHover : (carData: GroupedCircleData | null) => void;
};


const GroupedCircle = ({ width, height, data, onCircleHover }: GroupedCircleProps) => {
  const [windowSize, setWindowSize]           = useState({ width: 0, height: 0 });
  const [hoveredCircle, setHoveredCircle]     = useState<string | null>(null);
  const [hoveredCarData, setHoveredCarData]   = useState<GroupedCircleData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [columnNo, setColumnNo]               = useState<number>(0);

  
  useEffect(() => {
    const handleResize = () => { setWindowSize({ width: window.innerWidth, height: window.innerHeight }); };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isMobileScreen = windowSize.width <= 767;
  const isTabletScreen = windowSize.width <= 1023;
  const circlesRef     = useRef<SVGCircleElement[]>([]);
  const svgRef         = useRef<SVGSVGElement | null>(null);
  const [circlePositions, setCirclePositions] = useState<{ [carMake: string]: { x: number; y: number } }>({});

  
  useEffect(() => {
    const carMakes = Array.from(new Set(data.map((car) => car.CarMake)));
    let columns    : number; 
    const positions: { [carMake: string]: { x: number; y: number } } = {};

    if      (isMobileScreen) {columns = 4;} 
    else if (isTabletScreen) {columns = 6;} 
    else    {columns = 8; }


    carMakes.forEach((carMake, index) => {
      const column = index % columns;
      const row    = Math.floor(index / columns);

      let x;
      if   (isMobileScreen) { x = 40 + column * (width / columns); } 
      else { x = 50 + column * (width / columns); } 

      let y;
      if      (isMobileScreen) { y = 30 + row * 100; } 
      else if (isTabletScreen) { y = 50 + row * 100; } 
      else    { y = 50 + row * 120; }

      positions[carMake] = { x, y };
    });

    setColumnNo(columns);
    const delaySetCirclePositions = setTimeout(() => {  setCirclePositions(positions);  }, 300); 
    return () => {  clearTimeout(delaySetCirclePositions);  };

  }, [data, width, height, isMobileScreen, isTabletScreen]);


  useEffect(() => {
    const simulation = d3
    .forceSimulation(data.map((d)  => ({ ...d, x: (width / 2), y : (height / 2) } as d3.SimulationNodeDatum)))
      .force('x', d3.forceX((d: any) => circlePositions[d.CarMake]?.x || (width / 2)).strength(0.5))
      .force('y', d3.forceY((d: any) => circlePositions[d.CarMake]?.y || (height / 2)).strength(0.1))
      .force("charge", d3.forceManyBody().strength(1))
      .force("collide", d3.forceCollide().strength(.1).radius(7).iterations(1)) 


      if (simulation.nodes().length === 0) {
        // console.error('Simulation has no nodes.');
        return;
      }

      
      simulation.on('tick', () => {
        const nodes = simulation.nodes();
        if (nodes) {
          circlesRef.current.forEach((circle, index) => {
            const { x, y } = nodes[index];
            d3.select(circle)
            .transition()
            .duration(300)
            .ease(d3.easeSinOut)
            .attr('cx', x || (width / 2))
            .attr('cy', y || (height / 2));
          });
        }
      });

      
      function initDragHandlers() {
        const mydrag = d3
          .drag<SVGCircleElement, GroupedCircleData, GroupedCircleData>()
          .on('start', function (event, d) {  d3.select(this).classed('active', true);  })
          .on('drag', function (event, d) {
            d3.select(this)
              .attr('cx', (d.fx = event.x))
              .attr('cy', (d.fy = event.y));
          
          })
          .on('end', function (event, d) {
            d3.select(this).classed('active', false);
      
            if (!event.active) {
              const nodes = simulation.nodes();
              if (nodes) {
                circlesRef.current.forEach((circle, index) => {
                  const { x, y } = nodes[index];
                  d3.select(circle).transition().duration(1500)
                  .ease(d3.easeExpOut).attr('cx', x || (width / 2)).attr('cy', y || (height / 2));
                });
              }
            }
          });
      
        d3.selectAll<SVGCircleElement, GroupedCircleData>('.circleNode')
          .datum((d, i) => { return data[i]; })
          .call(mydrag);
      }

      initDragHandlers()
    return () => { simulation.stop(); };
    
  }, [data, circlePositions, width, height]);


  const getColumnNumber = (carMake: string): { column: number; row: number } => {
    const carMakes = Array.from(new Set(data.map((car) => car.CarMake)));
    const index    = carMakes.indexOf(carMake);
    const column   = index % columnNo + 1;
    const row      = Math.floor(index / columnNo) + 1;
    return { column, row };
  };

  
  const handleMouseOver = (carMake: string, carModel: string, position: { x: number; y: number }) => {
    setHoveredCircle(carMake);
    const carData = data.find((car) => car['CarMake'] === carMake && car['CarModel'] === carModel) || null;

    let adjustedX         = position.x;
    let adjustedY         = position.y;
    const { column, row } = getColumnNumber(carMake);

    if (columnNo === 8) {
      if      (column === 1 && row <= 2)  { adjustedX += 10; }
      else if (column === 1 && row === 3) { adjustedX += 30; }
      else if (column === 1 && row >= 4)  { adjustedX += 10; adjustedY -= 80; }

      if      (column === 2 && row <= 4)  { adjustedX += 30; }
      else if (column === 2 && row === 5) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 3 && row <= 4)  { adjustedX += 13; adjustedY -= 20; }
      else if (column === 3 && row === 5) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 4 && row <= 4)  { adjustedX += 15; }
      else if (column === 4 && row === 5) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 5 && row === 1) { adjustedX += 35; adjustedY -= 20; }
      else if (column === 5 && row <= 3)  { adjustedX += 15; }
      else if (column === 5 && row === 4) { adjustedX += 20; adjustedY -= 60; }
      else if (column === 5 && row === 5) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 6 && row <= 4)  { adjustedX -= 300; adjustedY -= 20; }
      else if (column === 6 && row === 5) { adjustedX -= 300; adjustedY -= 100; }

      if      (column === 7 && row <= 2)  { adjustedX -= 360; adjustedY -= 20; }
      else if (column === 7 && row === 3) { adjustedX -= 390; }
      else if (column === 7 && row === 4) { adjustedX -= 290; adjustedY -= 50; }
      else if (column === 7 && row === 5) { adjustedX -= 320; adjustedY -= 80; }
      else if (column === 8 && row <= 4)  { adjustedX -= 360; adjustedY -= 20; }
      else if (column === 8 && row === 5)  { adjustedX -= 360; adjustedY -= 80; }
    }

    if (columnNo === 6) {
      if      (column === 1 && row <= 5)  { adjustedX += 10; adjustedY -= 20; }
      else if (column === 1 && row === 6) { adjustedX += 30; adjustedY -= 20; }
      else if (column === 1 && row === 7) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 2 && row <= 5)  { adjustedX += 30; adjustedY -= 20; }
      else if (column === 2 && row === 6) { adjustedX += 30; adjustedY -= 20; }
      else if (column === 2 && row === 7) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 3 && row <= 5)  { adjustedX += 30; adjustedY -= 20; }
      else if (column === 3 && row === 6) { adjustedX += 30; adjustedY -= 20; }
      else if (column === 3 && row === 7) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 4 && row <= 4)  { adjustedX += 30; adjustedY -= 20; }
      else if (column === 4 && row === 5) { adjustedX -= 400; adjustedY -= 20; }
      else if (column === 4 && row === 6) { adjustedX += 30; adjustedY -= 20; }
      else if (column === 4 && row === 7) { adjustedX += 30; adjustedY -= 80; }

      if      (column === 5 && row <= 3)  { adjustedX -= 350; adjustedY -= 20; }
      else if (column === 5 && row === 4) { adjustedX -= 400; adjustedY -= 30; }
      else if (column === 5 && row >= 5)  { adjustedX -= 350; adjustedY -= 20; }
     
      if      (column === 6 && row <= 6)  { adjustedX -= 350; adjustedY -= 20; }
    }

    if (columnNo === 4) {
      if      (column === 1 && row === 1) { adjustedX += 10;  }
      else if (column === 1 && row === 2) { adjustedX -= 30; adjustedY += 100; }
      else if (column === 1 && row <= 5)  { adjustedX -= 40; adjustedY += 100; }
      else if (column === 1 && row >= 6)  { adjustedX -= 40; adjustedY -= 150; }

      if      (column === 2 && row <= 5) { adjustedX -= 100; adjustedY += 100; }
      else if (column === 2 && row >= 6) { adjustedX -= 100; adjustedY -= 150; }

      if      (column === 3 && row <= 5) { adjustedX -= 250; adjustedY += 100; }
      else if (column === 3 && row >= 6) { adjustedX -= 250; adjustedY -= 150; }

      if      (column === 4 && row <= 5) { adjustedX -= 330; adjustedY += 100; }
      else if (column === 4 && row >= 6) { adjustedX -= 330; adjustedY -= 150; }
    }

    setHoveredCarData(carData);
    setTooltipPosition({ x: adjustedX, y: adjustedY });
    onCircleHover(carData);
  };


  const handleMouseLeave = () => {
    setHoveredCircle(null);
    setHoveredCarData(null);
    setTooltipPosition(null);
    onCircleHover(null);
  };


  return (
    <>
     {hoveredCarData && tooltipPosition && (
        <foreignObject 
          width  = {width} 
          height = {height}
          x      = {tooltipPosition.x + 30}
          y      = {tooltipPosition.y + 0} 
        >
        <div className={css.scatterMarkStatsDiv}>
          <table className={css.scatterMarkTable}>
            <tbody className={css.scatterMarkTableBody}>
              <tr className={css.scatterMarkRows}>
                <td className={css.scatterMarkColumnsLabels}>{hoveredCarData.CarMake}</td>
                <td className={css.scatterMarkColumns}>{hoveredCarData.CarModel}</td>
              </tr>

              <tr className={css.scatterMarkRows}>
                <td className={css.scatterMarkColumnsLabels}>Horsepower</td>
                <td className={css.scatterMarkColumns}>{hoveredCarData.Horsepower} Hp</td>
              </tr>

              <tr className={css.scatterMarkRows}>
                <td className={css.scatterMarkColumnsLabels}>Torque</td>
                <td className={css.scatterMarkColumns}>{hoveredCarData['Torque(Nm)']} Nm</td>
              </tr>

              <tr className={css.scatterMarkRows}>
                <td className={css.scatterMarkColumnsLabels}>0-60(mph)</td>
                <td className={css.scatterMarkColumns}>{hoveredCarData['0-60(mph)']} sec</td>
              </tr>

              <tr className={css.scatterMarkLastRows}>
                <td className={css.scatterMarkColumnsLabels}>Price</td>
                <td className={css.scatterMarkColumns}>$ {hoveredCarData['Price(USD)']}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </foreignObject>
      )}

      <svg
        className = {`groupedCircleSvg ${css.groupedCircleSvg}`}
        ref       = {svgRef}
        width     = {width}
        height    = {isMobileScreen ? height + 350 : (isTabletScreen ? height + 130 : height + 10)}
        style     = {{ 
          display       : 'flex',
          flexDirection : 'column',
          zIndex        : 1
        }}
      >

        <g>
          {data.map((car, index) => {
            const carMake       = car['CarMake'];
            const fillColor     = carMakeColors[car.CarMake] || '#CB1DD1';
            const position      = circlePositions[car.CarMake] || { x: (width / 2), y: (height / 2) };
            const isHovered     = hoveredCircle === carMake || !hoveredCircle;
            const uniqueCarMake = data.findIndex(item => item['CarMake'] === carMake) === index;
            
            return (
              <>
                <circle
                  className    = {`circleNode ${css.circleNode} ${isHovered ? '' : css.scatterMarkDimmed}`}
                  key          = {`${index}-${car['CarModel']}`}
                  ref          = {(el) => (circlesRef.current[index] = el as SVGCircleElement)}
                  r            = {5}
                  strokeWidth  = {1}
                  opacity      = {0.8}  
                  cx           = {position.x}
                  cy           = {position.y}
                  fill         = {fillColor}
                  stroke       = {fillColor}
                  fillOpacity  = {isHovered ? 0.4 : 0.2}
                  onMouseOver  = {() => handleMouseOver(carMake, car['CarModel'], position)}
                  onMouseLeave = {handleMouseLeave}
                >
                </circle>

                {uniqueCarMake && (
                  <text
                    key = {index + 205 }
                    className = {`
                      ${css.circleNodeLabel}
                      ${css.fadeIn}
                      ${hoveredCircle === carMake ? css.showText : css.hideText}`
                    }
                    x     = {position.x - 20} 
                    y     = {position.y + 55}
                    style = {{ pointerEvents: 'none' }} 
                  >
                  {carMake}
                  </text>
                )}                
              </>
            );
          })}
        </g>
      </svg>
    </>
  );
};

export default GroupedCircle;