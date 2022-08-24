import React, { useEffect } from 'react';
import Editor from './svgedit/Editor';
import './CreatePm2.css';
import { useState } from 'react';


function CreatePM2(props) {
    const [svgeditSize, setSvgeditSize] = useState({x:1920,y:1080});


    
    useEffect(() => {

        const svgEditor = new Editor(document.getElementById('svgeditcontainer'));

        svgEditor.init();   
        
        svgEditor.setConfig({
            allowInitialUserOverride: false,
            extensions: [],
            noDefaultExtensions: false,
            userExtensions: [/* { pathName: './react-extensions/react-test/dist/react-test.js' } */],
            dimensions: [svgeditSize.x, svgeditSize.y],
            imgPath: 'http://192.168.0.124:8080/images',
            noStorageOnLoad : true
        });
        
    }, []);
    

    return(
        <div>
            <div id="svgeditcontainer" style={{ height: 'calc(100vh - 70px)'}} ></div>
        </div>
    );
}
 
export default CreatePM2;