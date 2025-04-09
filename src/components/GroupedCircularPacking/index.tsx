import { csv } from 'd3';
import css from './index.module.css';
import { useState, useEffect } from 'react';
import { GroupedCircleData } from '../Types';
import GroupedCircle from '../GroupedCircle';


const GroupedCircularPacking = () => {

  const [data, setData]               = useState<GroupedCircleData[]>([]);
  const [windowSize, setWindowSize]   = useState({ width: 0, height: 0 });
  const isMobileScreen                = windowSize.width <= 767;
  const isTabletScreen                = windowSize.width <= 1023;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData: GroupedCircleData[] = await csv(
          'https://gist.githubusercontent.com/Koech01/8f148611adb6fdf824c3d0c308fdd21e/raw/593d7c3fd8820e8f07616d21c52d37643aa89c68/autoSpec.csv'
        );
        setData(carData);
      } catch (error) { console.error('Error fetching data:', error); }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const handleResize = () => { setWindowSize({ width : window.innerWidth, height: window.innerHeight }); };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const width  = (windowSize.width * 100) / 100;
  const height = (windowSize.height * 100) / 100;

  
  return (
    <div className={css.circularPackingParentDiv}>
      <svg 
        width  = {width} 
        height = {isMobileScreen ? height + 310 : (isTabletScreen ? height + 130 : height + 10)}
      >
        <GroupedCircle data={data} width={width} height={height} onCircleHover={() => {}}/>
      </svg>
    </div>
  );
};

export default GroupedCircularPacking;