import { CarData } from '../Types';
import css from './index.module.css';


interface ScatterMobileMenuProps {
  selectedAxisX       : string;
  selectedAxisY       : string;
  showAxisXOptions    : boolean;
  showAxisYOptions    : boolean;
  setSelectedAxisX    : (axis: string) => void;
  setSelectedAxisY    : (axis: string) => void;
  setShowAxisXOptions : (show: boolean) => void;
  setShowAxisYOptions : (show: boolean) => void;
  hoveredData         : CarData | null;
}

const ScatterMobileMenu: React.FC<ScatterMobileMenuProps> = ({
  selectedAxisX,
  selectedAxisY,
  showAxisXOptions,
  showAxisYOptions,
  setSelectedAxisX,
  setSelectedAxisY,
  setShowAxisXOptions,
  setShowAxisYOptions,
  hoveredData
}) => {
  return (
    <>
      <div className={`${css.scatterMobileTable} ${showAxisXOptions || showAxisYOptions ? css.hiddenTableBorder : ''}`}>
        <table className={css.scatterMobileModelTable}>
          <tbody className={css.scatterMobileModelTableBody}>

            <tr className={`${css.scatterMobileModelRow} ${showAxisXOptions || showAxisYOptions ? css.hiddenBorderColor : ''}`}>
              <td className={`${css.scatterMobileItemlKey} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                {hoveredData ? hoveredData['CarMake'] : ' Brand '}
              </td>
              <td className={`${css.scatterMobileItemlVal} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                {hoveredData ? hoveredData['CarModel'] : '-'}
              </td>
            </tr>

            <tr className={`${css.scatterMobileModelRow} ${showAxisXOptions || showAxisYOptions ? css.hiddenBorderColor : ''}`}>
              <td className={`${css.scatterMobileItemlKey} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                Horsepower
              </td>
              <td className={`${css.scatterMobileItemlVal} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                {hoveredData ? hoveredData['Horsepower'] + ' Hp' : '-'} 
              </td>
            </tr>

            <tr className={`${css.scatterMobileModelRow} ${showAxisXOptions || showAxisYOptions ? css.hiddenBorderColor : ''}`}>
              <td className={`${css.scatterMobileItemlKey} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                Torque
              </td>
              <td className={`${css.scatterMobileItemlVal} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                {hoveredData ? hoveredData['Torque(Nm)'] + ' Nm' : '-'} 
              </td>
            </tr>

            <tr className={`${css.scatterMobileModelRow} ${showAxisXOptions || showAxisYOptions ? css.hiddenBorderColor : ''}`}>
              <td className={`${css.scatterMobileItemlKey} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                0-60(mph)
              </td>
              <td className={`${css.scatterMobileItemlVal} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
              {hoveredData ? hoveredData['0-60(mph)'] + ' sec' : '-'} 
              </td>
            </tr>

            <tr className={`${css.scatterMobileModelRow} ${showAxisXOptions || showAxisYOptions ? css.hiddenBorderColor : ''}`}> 
              <td className={`${css.scatterMobileItemlKey} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                Year
              </td>
              <td className={`${css.scatterMobileItemlVal} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                {hoveredData ? hoveredData['Year'] : '-'}
              </td>
            </tr>

            <tr className={`${css.scatterMobileModelRowLast} ${showAxisXOptions || showAxisYOptions ? css.hiddenBorderColor : ''}`}>
              <td className={`${css.scatterMobileItemlKey} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                Price(USD)
              </td>
              <td className={`${css.scatterMobileItemlVal} ${showAxisXOptions || showAxisYOptions ? css.hiddenTextColor : ''}`}>
                {
                  hoveredData ?
                  parseFloat(hoveredData['Price(USD)'])
                  .toLocaleString('en-US', { 
                  style    : 'currency',
                  currency : 'USD', maximumFractionDigits: 0 
                  }) : '-'
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={css.scatterMobileChildMenu}>
        <div className={css.scatterMobileDropdownParent}>
          <div className={css.scatterMobileYParent}>
            {showAxisYOptions && (
              <div className={`${css.scatterMobileYOptionDiv} ${css.fadeIn}`}>
                <div 
                  className = {`${css.scatterMobileYOptionText} ${selectedAxisY === 'EngineSize(L)' ? css.scatterMobileYSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisX !== 'EngineSize(L)') { setSelectedAxisY('EngineSize(L)'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  EngineSize(L)
                </div>
      
                <div 
                  className = {`${css.scatterMobileYOptionText} ${selectedAxisY === 'Horsepower' ? css.scatterMobileYSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisX !== 'Horsepower') { setSelectedAxisY('Horsepower'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  Horsepower
                </div>

                <div 
                  className = {`${css.scatterMobileYOptionText} ${selectedAxisY === 'Price(USD)' ? css.scatterMobileYSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisX !== 'Price(USD)') { setSelectedAxisY('Price(USD)'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  Price(USD)
                </div>

                <div 
                  className = {`${css.scatterMobileYOptionText} ${selectedAxisY === 'Torque(Nm)' ? css.scatterMobileYSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisX !== 'Torque(Nm)') { setSelectedAxisY('Torque(Nm)'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  Torque(Nm)
                </div>

                <div 
                  className = {`${css.scatterMobileYOptionText} ${selectedAxisY === '0-60(mph)' ? css.scatterMobileYSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisX !== '0-60(mph)') { setSelectedAxisY('0-60(mph)'); }
                    setShowAxisYOptions(false);
                  }}
                >
                  0-60(mph)
                </div>
              </div>
            )}

            <div 
              className = {`${css.scatterMobileYDefault} ${css.fadeIn}`}
              onClick   = {() => {
                setShowAxisYOptions(!showAxisYOptions);
                if (showAxisXOptions) { setShowAxisXOptions(false); }
              }}
            >{selectedAxisY}</div>
          </div> 

          <div className={css.scatterMobileXParent}>
            {showAxisXOptions && (
              <div className={`${css.scatterMobileXOptionDiv} ${css.fadeIn}`}>
                <div 
                  className = {`${css.scatterMobileXOptionText} ${selectedAxisX === 'EngineSize(L)' ? css.scatterMobileXSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisY !== 'EngineSize(L)') { setSelectedAxisX('EngineSize(L)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  EngineSize(L)
                </div>
      
                <div 
                  className = {`${css.scatterMobileXOptionText} ${selectedAxisX === 'Horsepower' ? css.scatterMobileXSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisY !== 'Horsepower') { setSelectedAxisX('Horsepower'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  Horsepower
                </div>

                <div 
                  className = {`${css.scatterMobileXOptionText} ${selectedAxisX === 'Price(USD)' ? css.scatterMobileXSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisY !== 'Price(USD)') { setSelectedAxisX('Price(USD)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  Price(USD)
                </div>

                <div 
                  className = {`${css.scatterMobileXOptionText} ${selectedAxisX === 'Torque(Nm)' ? css.scatterMobileXSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisY !== 'Torque(Nm)') { setSelectedAxisX('Torque(Nm)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  Torque(Nm)
                </div>

                <div 
                  className = {`${css.scatterMobileXOptionText} ${selectedAxisX === '0-60(mph)' ? css.scatterMobileXSelectedTxt : ''}`}
                  onClick   = {() => {
                    if (selectedAxisY !== '0-60(mph)') { setSelectedAxisX('0-60(mph)'); }
                    setShowAxisXOptions(false);
                  }}
                >
                  0-60(mph)
                </div>
              </div>
            )}

            <div 
              className = {`${css.scatterMobileXDefault} ${css.fadeIn}`}
              onClick   = {() => {
              setShowAxisXOptions(!showAxisXOptions);
              if (showAxisYOptions) { setShowAxisYOptions(false); }
              }}
            >{selectedAxisX}</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ScatterMobileMenu;