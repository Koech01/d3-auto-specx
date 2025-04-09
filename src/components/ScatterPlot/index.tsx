import { csv } from 'd3';
import { CarData } from '../Types';
import css from './index.module.css';
import ScatterMobileMenu from './mobile'; 
import ScatterAxes from '../ScatterAxes';
import turboPng from '../assets/turbo.png';
import { useState, useEffect } from 'react';
import flowerAbstractPng from '../assets/flowerAbstract.png';


const ScatterPlot = () => {
  const [animateFlower, setAnimateFlower]       = useState(true);
  const [animateTurbo, setAnimateTurbo]         = useState(false);
  const [data, setData]                         = useState<CarData[]>([]);
  const [windowSize, setWindowSize]             = useState({ width: 0, height: 0 });
  const [selectedAxisX, setSelectedAxisX]       = useState<string>('Horsepower');
  const [selectedAxisY, setSelectedAxisY]       = useState<string>('Torque(Nm)');
  const [showAxisYOptions, setShowAxisYOptions] = useState(false);
  const [showAxisXOptions, setShowAxisXOptions] = useState(false);
  const [hoveredData, setHoveredData]           = useState<CarData | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData: CarData[] = await csv(
          'https://gist.githubusercontent.com/Koech01/8f148611adb6fdf824c3d0c308fdd21e/raw/593d7c3fd8820e8f07616d21c52d37643aa89c68/autoSpec.csv'
        );
        setData(carData);
      } catch (error) { console.error('Error fetching data:', error); }
    };

    fetchData();

    const animatePngsTimeout = setTimeout(() => { 
      setAnimateFlower(false); 
      setAnimateTurbo(true); 
    }, 4500);

    return () => {clearTimeout(animatePngsTimeout); };

  }, []);


  useEffect(() => {
    const handleResize = () => { setWindowSize({ width : window.innerWidth, height: window.innerHeight }); };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isLaptopScreen = windowSize.width >= 1024 && windowSize.width < 1200;

  
  return (

    <div className={css.scatterPlotParentDiv}>

      <div className={css.scatterPlotDiv}>
        <ScatterAxes 
          data          = {data} 
          selectedAxisX = {selectedAxisX}
          selectedAxisY = {selectedAxisY}
          onCircleHover = {setHoveredData}
        />
      </div>

      <div className={css.scatterSideDiv}>

        <div className={`${css.scatterSideChildDiv} ${isLaptopScreen ? css.scatterSpacedChildDiv : ''}`}>

          <div className={css.scatterAxisYParent}>
            <option 
              className = {`${css.scatterAxisYDefault} ${css.fadeIn}`}
              onClick   = {() => {
                setShowAxisYOptions(!showAxisYOptions);
                if (showAxisXOptions) { setShowAxisXOptions(false); }
              }}
            >
              {selectedAxisY}
            </option>

            {showAxisYOptions && (
              <div className={`${css.scatterAxisYOptionDiv} ${css.fadeIn}`}>
                <option  
                  className = {`${css.scatterAxisYOptionText} ${selectedAxisY === 'EngineSize(L)' ? css.scatterAxisYSelectedTxt : ''}`}
                  value     = "EngineSize(L)"
                  onClick   = {() => {
                    if (selectedAxisX !== 'EngineSize(L)') { setSelectedAxisY('EngineSize(L)'); }
                    setShowAxisYOptions(false);
                  }}
                 >
                  EngineSize(L)
                </option>

                <option  
                  className = {`${css.scatterAxisYOptionText} ${selectedAxisY === 'Horsepower' ? css.scatterAxisYSelectedTxt : ''}`}
                  value     = "Horsepower"
                  onClick   = {() => {
                    if (selectedAxisX !== 'Horsepower') { setSelectedAxisY('Horsepower'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  Horsepower
                </option>

                <option  
                  className = {`${css.scatterAxisYOptionText} ${selectedAxisY === 'Price(USD)' ? css.scatterAxisYSelectedTxt : ''}`}
                  value     = "Price(USD)"
                  onClick   = {() => {
                    if (selectedAxisX !== 'Price(USD)') { setSelectedAxisY('Price(USD)'); }
                    setShowAxisYOptions(false);
                  }}
                 >
                  Price(USD)
                </option>

                <option
                  className = {`${css.scatterAxisYOptionText} ${selectedAxisY === 'Torque(Nm)' ? css.scatterAxisYSelectedTxt : ''}`}
                  value     = "Torque(Nm)"
                  onClick   = {() => {
                    if (selectedAxisX !== 'Torque(Nm)') { setSelectedAxisY('Torque(Nm)'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  Torque(Nm)
                </option>

                <option
                  className = {`${css.scatterAxisYOptionText} ${selectedAxisY === '0-60(mph)' ? css.scatterAxisYSelectedTxt : ''}`}
                  value     = "0-60(mph)"
                  onClick   = {() => {
                    if (selectedAxisX !== '0-60(mph)') { setSelectedAxisY('0-60(mph)'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  0-60(mph)
                </option>
              </div>
            )}
          </div>


          <div className={css.scatterAxisXParent}>
            <option 
              className = {`${css.scatterAxisXDefault} ${css.fadeIn}`}
              onClick   = {() => {
                setShowAxisXOptions(!showAxisXOptions);
                if (showAxisYOptions) { setShowAxisYOptions(false); }
              }}
            >
              {selectedAxisX}
            </option>

            {showAxisXOptions && (
              <div className={`${css.scatterAxisXOptionDiv} ${css.fadeIn}`}>
                <option 
                  className = {`${css.scatterAxisXOptionText} ${selectedAxisX === 'EngineSize(L)' ? css.scatterAxisXSelectedTxt : ''}`}
                  value     = "EngineSize(L)"
                  onClick   = {() => {
                    if (selectedAxisY !== 'EngineSize(L)') { setSelectedAxisX('EngineSize(L)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  EngineSize(L)
                </option>

                <option 
                  className = {`${css.scatterAxisXOptionText} ${selectedAxisX === 'Horsepower' ? css.scatterAxisXSelectedTxt : ''}`}
                  value     = "Horsepower"
                  onClick   = {() => {
                    if (selectedAxisY !== 'Horsepower') { setSelectedAxisX('Horsepower'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  Horsepower
                </option>

                <option 
                  className = {`${css.scatterAxisXOptionText} ${selectedAxisX === 'Price(USD)' ? css.scatterAxisXSelectedTxt : ''}`}
                  value     = "Price(USD)"
                  onClick   = {() => {
                    if (selectedAxisY !== 'Price(USD)') { setSelectedAxisX('Price(USD)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  Price(USD)
                </option>

                <option 
                  className = {`${css.scatterAxisXOptionText} ${selectedAxisX === 'Torque(Nm)' ? css.scatterAxisXSelectedTxt : ''}`}
                  value     = "Torque(Nm)"
                  onClick   = {() => {
                    if (selectedAxisY !== 'Torque(Nm)') { setSelectedAxisX('Torque(Nm)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  Torque(Nm)
                </option>

                <option 
                  className = {`${css.scatterAxisXOptionText} ${selectedAxisX === '0-60(mph)' ? css.scatterAxisXSelectedTxt : ''}`}
                  value     = "0-60(mph)"
                  onClick   = {() => {
                    if (selectedAxisY !== '0-60(mph)') { setSelectedAxisX('0-60(mph)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  0-60(mph)
                </option>
              </div>
            )}
          </div>

        </div>

        {(!showAxisXOptions && !showAxisYOptions) && (
          <div className={css.scatterSpecsParent}>

            {animateFlower ? (
              <img className={css.scatterAbstractPng} src={flowerAbstractPng} alt={flowerAbstractPng} />
            ) : (
              <img className={css.scatterFlowerNoAnime} src={flowerAbstractPng} alt={flowerAbstractPng}/>
            )}
       
            {animateTurbo && ( <img className={`${css.scatterTurboPng} ${css.fadeIn}`} src={turboPng} alt={turboPng}/> )}
            
            <div className={`${css.scatterSpecsCard} ${animateTurbo ? css.cardTilt : ''}`}>
              <table className={`${isLaptopScreen ? css.scatterSpacedTable : css.scatterSpecsTable}`}>
                <tbody className={css.scatterSpacedTableBody}>
                  <tr className={`${isLaptopScreen ? css.scatterSpacedTableRow : ''}`}>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsRow}`}>Horsepower</td>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsValueRow}`}>
                      {hoveredData ? hoveredData['Horsepower'] + ' Hp' : '0Hp'} 
                    </td> 
                  </tr>

                  <tr className={`${isLaptopScreen ? css.scatterSpacedTableRow : ''}`}>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsRow}`}>Torque</td>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsValueRow}`}>
                      {hoveredData ? hoveredData['Torque(Nm)'] + ' Nm' : '0Nm'} 
                    </td> 
                  </tr>

                  <tr className={`${isLaptopScreen ? css.scatterSpacedTableRow : ''}`}>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsRow}`}>0-60(mph)</td>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsValueRow}`}>
                      {hoveredData ? hoveredData['0-60(mph)'] + ' sec' : '0s'} 
                    </td>
                  </tr>

                  <tr className={`${isLaptopScreen ? css.scatterSpacedTableRow : ''}`}>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsRow}`}>Price</td>
                    <td className={`${isLaptopScreen ? css.scatterSpacedRow : css.scatterSpecsValueRow}`}>
                    {
                      hoveredData ?
                      parseFloat(hoveredData['Price(USD)'])
                      .toLocaleString('en-US', { 
                        style    : 'currency',
                        currency : 'USD', maximumFractionDigits: 0 
                      }) : '$ 0'
                    }
                    </td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <div className={css.scatterMobileMenu}>
        <ScatterMobileMenu
          selectedAxisX       = {selectedAxisX}
          selectedAxisY       = {selectedAxisY}
          showAxisXOptions    = {showAxisXOptions}
          showAxisYOptions    = {showAxisYOptions}
          setSelectedAxisX    = {setSelectedAxisX}
          setSelectedAxisY    = {setSelectedAxisY}
          setShowAxisXOptions = {setShowAxisXOptions}
          setShowAxisYOptions = {setShowAxisYOptions}
          hoveredData         = {hoveredData}
        />
      </div>

    </div>
  );
};

export default ScatterPlot;