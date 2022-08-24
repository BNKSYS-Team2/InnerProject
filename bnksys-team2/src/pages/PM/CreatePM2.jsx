import React, { useEffect } from 'react';
import Editor from './svgedit/Editor.js';
// import Editor from 'svgedit';

import './CreatePM2.css';
import { useState } from 'react';
import * as Api from '../../api';

function CreatePM2(props) {
    const [utNo, setUtNo] = useState(null);

    const config = {
        allowInitialUserOverride: false,
        extensions: [],
        noDefaultExtensions: false,
        userExtensions: [/* { pathName: './react-extensions/react-test/dist/react-test.js' } */],
        imgPath: `${Api.getServerUrl()}images`,
        noStorageOnLoad: true

        // dimensions: [width,height],
    };

    let svgstr = '';
    
    const getTemplateData = async (temNo) => {
        const res = await Api.get(`api/template/loadString/${temNo}`);
        // console.log('fileString', res.data.fileString);
        svgstr=res.data.fileString
        return res.data.fileString;
      };
    
    const saveSvg = async() => {
        const svgstringval = svgEditor.svgCanvas.svgCanvasToString();
        console.log('utNo', utNo);
        const res = await Api.post('api/pm/saveString', {
            svgString: svgstringval,
            userNo: sessionStorage.getItem('userNo'),
            title: 'untitle.svg',
            utNo: utNo
        });

        if (res.data.success == 'True') {
            location.href = '/mymp';
        } else {
            console.log('파일 저장 실패');
        }
    }

    
    
    useEffect(() => {
        //쿼리스트링 확인
        const params = new URLSearchParams(location.search);
        const pwidth = params.get('w');
        const pheight = params.get('h');
        setUtNo(params.get('utNo'));
        const temNo = params.get('temNo');

        console.log(pwidth);
        console.log(pheight);
        console.log(utNo);
        console.log(temNo);
        

        //너비 높이 설정 추가
        if (pwidth != null && pheight != null) {
            config.dimensions = [pwidth, pheight];
        }

        //svgEdit 추가
        const svgEditor = new Editor(document.getElementById('svgeditcontainer'));
        svgEditor.init();
        svgEditor.setConfig(config);

        //템플릿 불러오기
        if (temNo != null) {
            getTemplateData(temNo).then((svgString) => {
                svgEditor.loadSvgString(svgString);
            });
        }

    }, []);
        
    return(
        <div>
            <button id = 'svgSaveBnt' onClick={saveSvg}>저장하기</button>
            
            <div id="svgeditcontainer" style={{ height: 'calc(100vh - 70px)'}} ></div>
        </div>
    );
}
 
export default CreatePM2;