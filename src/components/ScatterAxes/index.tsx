import { scaleLinear } from 'd3';
import { CarData } from '../Types';
import { AxisLeft } from '../AxisLeft';
import { AxisBottom } from '../AxisBottom';
import ScatterMarks from '../ScatterMarks';
import { useEffect , useState} from 'react';


interface AxisBasicProps {
  data          : CarData[];
  selectedAxisX : string;
  selectedAxisY : string;
  onCircleHover : (carData: CarData | null) => void;
}


interface AxisValues { [key: string]: { max: number; min: number }; }
const MARGIN = { top: 15, right: 20, bottom: 50, left: 50 };


const axisValues: AxisValues = {
  'EngineSize(L)' : { max: 9, min: 1 },
  'Horsepower'    : { max: 2000, min: 0 },
  'Price(USD)'    : { max: 20000000, min: 0 },
  'Torque(Nm)'    : { max: 2400, min: 0 },
  '0-60(mph)'     : { max: 8, min: 1 },
};


const ScatterAxes = ({
  data,
  selectedAxisX,
  selectedAxisY,
  onCircleHover
}: AxisBasicProps) => {

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const isMobileScreen              = windowSize.width <= 767;
  const isTabletScreen              = windowSize.width > 767 && windowSize.width <= 1023;
  const widthPercentage             = isTabletScreen ? 70 : 80;
  const width                       = (windowSize.width * widthPercentage) / 100;
  const height                      = (windowSize.height * 90) / 100;
  const boundsWidth                 = width - MARGIN.left - MARGIN.right;
  const boundsHeight                = height - MARGIN.top - MARGIN.bottom;
  

  useEffect(() => {
    const handleResize = () => { setWindowSize({ width: window.innerWidth, height: window.innerHeight }); };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const mobileAxisValues: AxisValues = {
    'EngineSize(L)' : { max: 10, min: 0 },
    'Horsepower'    : { max: 2000, min: 0 },
    'Price(USD)'    : { max: 20000000, min: 0 },
    'Torque(Nm)'    : { max: 2400, min: 0 },
    '0-60(mph)'     : { max: 8, min: 0 },
  };


  const currentAxisValues = isMobileScreen ? mobileAxisValues : axisValues;
  const xValue = currentAxisValues[selectedAxisX];
  const yValue = currentAxisValues[selectedAxisY];
  const xScale = scaleLinear().domain([xValue.min, xValue.max]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([yValue.min, yValue.max]).range([boundsHeight, 0]);

  
  return (
    <svg width={width} height={height}>
      <g
        width     = {boundsWidth}
        height    = {boundsHeight}
        overflow  = "visible"
        transform = {`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
        
      >
        <AxisLeft yScale={yScale} pixelsPerTick={60} width={boundsWidth}/>
        
        <text
          dy         = {0}
          fontSize   = {15}
          fill       = "#FAFAFA"
          textAnchor = "middle"
          transform  = {`translate(${-MARGIN.left + 10},${boundsHeight / 2}) rotate(-90)`}
        >
          {selectedAxisY}
        </text>


        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom xScale={xScale} pixelsPerTick={60} height={boundsHeight}/>
          <text
            y          = {47}
            fontSize   = {15}
            fill       = "#FAFAFA"
            textAnchor = "middle"
            x          = {boundsWidth / 2}
          >
            {selectedAxisX}
          </text>
        </g>


        <ScatterMarks
          data          = {data}
          xScale        = {xScale}
          yScale        = {yScale}
          minXValue     = {xValue.min}
          selectedAxisX = {selectedAxisX}
          selectedAxisY = {selectedAxisY}
          onCircleHover = {onCircleHover}
        />
      </g>
    </svg>
  );
};

export default ScatterAxes;