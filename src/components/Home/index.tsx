import { useState } from 'react';
import css from './index.module.css';
import ScatterPlot from '../ScatterPlot';
import GroupedCircularPacking from '../GroupedCircularPacking';


const Home = () => {
  const [activeContent, setActiveContent] = useState('scatterPlot'); 
  const handleTabChange = (tab: string) => { setActiveContent(tab); };

  
  return (

    <div className={css.homeParentDiv}>

      <div className={css.homeNavbarDiv}>
        <div className={css.homeNavbarParent}>
          <label className={`${css.homeNavbarLabel} ${activeContent === 'scatterPlot' ? css.active : ''}`}>
            <input
            type     = "radio"
            name     = "homeNavbarInput"
            checked  = {activeContent === 'scatterPlot'}
            onChange = {() => handleTabChange('scatterPlot')}
            />
            <span>Scatter Plot</span>
          </label>

          <label className={`${css.homeNavbarLabel} ${activeContent === 'circularPacking' ? css.active : ''}`}>
            <input
            type     = "radio"
            name     = "homeNavbarInput"
            checked  = {activeContent === 'circularPacking'}
            onChange = {() => handleTabChange('circularPacking')}
            />
            <span>Circular Packing</span>
          </label>
        </div>
      </div>
      
      <div className={css.homeContentDiv}>
        {activeContent === 'scatterPlot' && <ScatterPlot/>}
        {activeContent === 'circularPacking' && <GroupedCircularPacking/>}
      </div>

    </div>
  );
};

export default Home;