// LeftNavBar.js
import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MainContent from './MainContent';
import RemoveUserPage from './RemoveUser';
import RemoveExpertPage from './RemoveExpertPage';

const LeftNavBar = ({ setCurrentView }) => {


    return (
        <div className="left-nav-bar">
          
          <Link to="/home"> <img className='adblogo' src={require("../../imgANDvid/images/logo2.png")} alt="" /></Link>
            <h2 className='adbheading'><pre>     Graduates World</pre></h2>
            <ul className='adbul'>
                <button onClick={() => setCurrentView('dashboard')} className="btdb">
                    <li className='adbli'>Dashboard</li>
                </button>
                <br />

                <button onClick={() => setCurrentView('team')} className='btdb' >
                    <li className='adbli'>Team
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="lightgreen" class="bi bi-person-hearts" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566ZM9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z" />
                    </svg>
                    </li>
                    </button>
                <br />

                <button onClick={() => setCurrentView('removeuser')} className='btdb'>
                    <li className='adbli'> Remove a User
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgreen"
                            class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                    </li>
                </button>
                <br />

                <button onClick={() => setCurrentView('removeexpert')} className='btdb'>
                    <li className='adbli'>Remove an expert
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgreen"
                            className="bi bi-person-x-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z" />
                        </svg></li>
                </button>
                <br />
                <button onClick={() => setCurrentView('searchexpert')} className='btdb'>
                    <li className='adbli'>Search an Expert
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgreen"
                            class="bi bi-send-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg></li>
                </button>
                <br />
                <button onClick={() => setCurrentView('selectexpert')} className='btdb'>
                    <li className='adbli'> Select an Expert
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgreen"
                            class="bi bi-send-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg></li>
                </button>
                <br />
                <button onClick={() => setCurrentView('addajob')} className='btdb'>
                    <li className='adbli'> Add a job
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgreen"
                            class="bi bi-send-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg></li>
                </button>
                <br/>
                <button onClick={() => setCurrentView('myjobs')} className='btdb'>
                    <li className='adbli'> Edit Jobs <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgreen"
                            class="bi bi-send-fill" viewBox="0 0 16 16">
                            <path
                                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        </svg></li>
                </button>
                <br/>
                <button onClick={() => setCurrentView('joblocations')} className='btdb'>
                    <li className='adbli'> Job Locations</li>
                </button>

            </ul>

        </div>
    );
};

export default LeftNavBar;
