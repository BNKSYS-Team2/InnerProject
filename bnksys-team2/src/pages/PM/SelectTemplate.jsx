import React, { useEffect } from 'react';
import './SelectTemplate.scss';
import * as Api from '../../api';
import { useState } from 'react';
import UseTypeList from '../../components/PM/UseTypeList.jsx';
import TemplateList from '../../components/PM/TemplateList.jsx';


function SelectTemplate(props) {
    const [selectedUseType, setSelectedUseType] = useState(null);

    useEffect(() => {
        console.log(selectedUseType);
        if (selectedUseType != null) {
            
        }
    }, [selectedUseType]);
    
    return(
        <div>
            <UseTypeList setSelectedUseType={setSelectedUseType} />
            {selectedUseType != null ? <TemplateList utNo={selectedUseType} /> : <div></div>}
        </div>
    );
}
 
export default SelectTemplate;