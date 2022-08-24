import React, { useEffect } from 'react';
import './SelectTemplate.scss';
import * as Api from '../../api';
import { useState } from 'react';
import UseTypeList from '../../components/PM/useTypeList.jsx';
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
            {selectedUseType != null ? 
            // Main 컴포넌트 호출 시 isLogin 이라는 props 값을 전달
            <TemplateList/>: 
            <div></div>}
        </div>
    );
}
 
export default SelectTemplate;