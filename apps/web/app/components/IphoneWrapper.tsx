import phone_video from '../../videos/full_phone.MP4.json';
import BackgroundVideo from 'next-video/background-video';
// @ts-ignore
import {Asset} from "next-video/dist/assets";

export default function IphoneVideoWrapper() {
    return (
        <div style={{ position: 'relative', width: '360px', height: '800px' }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    marginTop:40,
                    width: '100%',
                    height: '700px',
                    overflow: 'hidden',
                    borderRadius: '40px',
                    zIndex: 1,
                }}
            >
                <BackgroundVideo
                    disableTracking
                    maxResolution="720p"
                    src={phone_video as Asset}
                    autoPlay
                    controls={false}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        backgroundColor: 'transparent',
                    }}
                />
            </div>

            <div className="iphone-x" style={{ height: "700px",zIndex: 2, position: 'relative' }}>
                <i></i>
                <b></b>
                <s></s>
            </div>
        </div>
    );
}
