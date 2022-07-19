import { NavBar } from '../NavBar';

import "./defaultPage.css";

export function DefaultPage() {
    return (
        <div className='bodyContent'>
            <NavBar />
            <div className='defaultPageWrapper'>
                {/* <img src="https://tse4.mm.bing.net/th/id/OIP.mVLuON_t2heTuQRdUzLysAHaEh?pid=ImgDet&rs=1" alt=""/> */}
                <h1>Every <span>Developer</span> has a tab open to Stack Overflow</h1>
                <div className='ratingContainer'>
                    <div>
                        <div className='rating'>100+ Million</div>
                        <div className='ratingtext'>Montly visitors to Stack Overflow and Stack Exchange</div>
                    </div>
                    <div>
                        <div className='rating'>45.1+ Billion</div>
                        <div className='ratingtext'>Times a Developer got help since 2008</div>
                    </div>
                    <div>
                        <div className='rating'>179% ROI</div>
                        <div className='ratingtext'>From Companies using Stack Overflow for Teams</div>
                    </div>
                    <div>
                        <div className='rating'>5,000+</div>
                        <div className='ratingtext'>Stack Overflow for Teams instances active every day</div>
                    </div>
                </div>
                <div>
                    <h2>Thousands of Organizations around the globe use Stack Overflow for Teams</h2>
                    <div className='companies'>
                        <div className='microsoft'>Microsoft</div>
                        <div className='logitech'>logitech</div>
                        <div className='intercom'>INTERCOM</div>
                        <div className='instacart'>instacart</div>
                        <div className='bloomberg'>Bloomberg</div>
                    </div>
                </div>
            </div>
        </div>
    );
}