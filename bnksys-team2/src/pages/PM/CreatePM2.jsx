import React, { useEffect } from 'react';
import Editor from './svgedit/Editor.js';
// import Editor from 'svgedit';

import './CreatePM2.css';
import { useState } from 'react';
import * as Api from '../../api';

function CreatePM2(props) {
    const [utNo, setUtNo] = useState(null);
    const [pmNo, setPmNo] = useState(null);

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
    
    const getPromotionMaterialData = async (pmNo) => {
        const res = await Api.get(`api/pm/loadString/${pmNo}`);
        // console.log('fileString', res.data.fileString);
        svgstr=res.data.fileString
        return res.data.fileString;
      };
    
    const saveSvg = async() => {
        const svgstringval = svgEditor.svgCanvas.svgCanvasToString();
        console.log('utNo', utNo);
        const title = prompt("제목을 입력 해주세요", "untitle");
        if (pmNo == null) {
            const res1 = await Api.post('api/pm/saveString', {
                svgString: svgstringval,
                userNo: sessionStorage.getItem('userNo'),
                title: title,
                utNo: utNo
            });
            if (res1.data.success == 'True') {
                location.href = '/mypm';
            } else {
                console.log('파일 저장 실패');
            }
        } else {//저작물 불러온 경우엔 동일 pmNo로 저장 시켜야 함
            const res2 = await Api.post('api/pm/updateString', {
                svgString: svgstringval,
                userNo: sessionStorage.getItem('userNo'),
                title: title,
                utNo: utNo,
                pmNo: pmNo,
                fileExtension:'svg'
            });
            if (res2.data.success == 'True') {
                location.href = '/mypm';
            } else {
                console.log('파일 저장 실패');
            }
        }
        
    }

    useEffect(() => {
        //쿼리스트링 확인
        const params = new URLSearchParams(location.search);
        setUtNo(params.get('utNo'));
        setPmNo(params.get('pmNo'));
        
        const pwidth = params.get('w');
        const pheight = params.get('h');
        const temNo = params.get('temNo');
        

        console.log(pwidth);
        console.log(pheight);
        console.log(utNo);
        console.log(temNo);
        console.log(pmNo);
        console.log(params.get('pmNo'));
        
        

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
        } else if (params.get('pmNo') != null) {//저작물 불러오기
            getPromotionMaterialData(params.get('pmNo')).then((svgString) => {
                svgEditor.loadSvgString(svgString);
            });
        }

        scrollhidden();

        return () => {
            scrollshow();
        }
    }, []);

    function scrollhidden(){
        document.body.style.overflow='hidden';
    }
    function scrollshow(){
        document.body.style.overflow='auto';
    }




    const saveSvgToPng = async() => {
        const svgstringval = svgEditor.svgCanvas.svgCanvasToString();
        svgToPng(svgstringval,(imgData)=>{
            const pngImage = document.createElement('img');
            document.body.appendChild(pngImage);
            pngImage.src = imgData;
            
            const a = document.createElement('a');
            a.href = imgData;
            a.download = 'untitle';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            document.body.removeChild(pngImage);
        });
       
    }
    
    // 이미지 변환
    function svgToPng(svg, callback) {
        const url = getSvgUrl(svg);
        svgUrlToPng(url, (imgData) => {
            callback(imgData);
            URL.revokeObjectURL(url);
        });
    }
    function getSvgUrl(svg) {
        return  URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    }
    function svgUrlToPng(svgUrl, callback) {
        const svgImage = document.createElement('img');
        // imgPreview.style.position = 'absolute';
        // imgPreview.style.top = '-9999px';
        document.body.appendChild(svgImage);
        svgImage.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = svgImage.clientWidth;
            canvas.height = svgImage.clientHeight;
            const canvasCtx = canvas.getContext('2d');
            canvasCtx.drawImage(svgImage, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            callback(imgData);
            // document.body.removeChild(imgPreview);
        };
        svgImage.src = svgUrl;
        document.body.removeChild(svgImage);
    }
    
    
    return(
        <div>
            <button id = 'svgSaveBnt' onClick={saveSvg}>서버저장하기</button>
            <button id = 'svgSaveBnt2' onClick={saveSvgToPng}>PNG저장하기</button>
            <div id="svgeditcontainer" style={{ height: 'calc(100vh - 70px)'}} ></div>
        </div>
    );
}
 
export default CreatePM2;