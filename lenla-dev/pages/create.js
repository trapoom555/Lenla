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
