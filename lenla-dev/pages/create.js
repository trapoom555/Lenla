import React, {useState, useEffect} from 'react';
import Navbar from "../components/navbar";
import PreviewButton from "../components/previewButton";
import ShareButton from "../components/shareButton";
import Profile from "../components/profile";
import Workspace from "../components/workspace";
import Inspector from "../components/inspector";
import Selector from "../components/selector";
import Diagram from '../components/Diagram';

export default function Create({ user, setUser }) {
    const initialElements = [
        {
            id "1",
            type: 'blk_constant',
            position: { x: 100, y: 100 },
            data: { type : 'Constant', data: 10, portsOut : ['num']},
        },
        {
            id: "2",
            type: 'blk_constant',
            position: { x: 100, y: 100 },
            data: { type : 'Constant', data: 5, portsOut : ['num']},
        },
        {
            id: "3",
            type: 'blk_plus',
            position: { x: 100, y: 100 },
            data: {portsIn : ['num', 'num'], portsOut : ['num']},
        },
        {
            id: "4",
            type: 'blk_gauge',
            position: { x: 100, y: 100 },
            data: {portsIn : ['num']},
        },
    
    ];
    const [elements, setElements] = useState(initialElements);

    return (
        <>
            <div className="flexPage">
                <div className="flexNav">
                    <Navbar />
                    <ShareButton />
                    <PreviewButton />
                    <Profile name={user.username} url={user.profileImage} />
                </div>
                <div className="flexContent">
                    <Diagram elements = {elements} setElements = {setElements} />
                    <Inspector elements = {elements} setElements = {setElements} />
                </div>
                <Selector />
            </div>
        </>
    );
}
