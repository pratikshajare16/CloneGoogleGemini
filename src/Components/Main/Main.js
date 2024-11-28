import React, { useContext } from 'react'
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
const Main = () => {

    const { prevPrompt,
        setPrevPrompt,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        onSent,
        showResult,
        resultData,
        loading } = useContext(Context);


    return (
        <div className="main">
            <div className="nav">
                <p> Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                {!showResult ?
                    <>
                        <div className="greet">
                            <p ><span>Hello, Pratiksha.</span></p>
                            {/* <p>How can I help you today?</p> */}
                        </div>
                        {/* <div className="cards">
                            <div className="card">
                                <p>Suggest beautiful places..</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>briefly summrize</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Team bonding activities</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Improve readability</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div> */}
                    </>
                    :
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />

                            <p>{recentPrompt}</p>

                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />

                            {loading ?

                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />

                                </div>


                                :
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Ask Gemini'
                            onChange={(e) => setInput(e.target.value)}
                            value={input}

                        />

                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>Gemini can make mistakes, so double-check it</p>
                </div>
            </div>
        </div>
    )
}

export default Main