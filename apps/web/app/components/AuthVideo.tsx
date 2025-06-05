import auth_girl from './../../videos/fb_smile_girl.mp4.json'
import BackgroundVideo from 'next-video/background-video';
// @ts-ignore
import {Asset} from "next-video/dist/assets";

export default function () {

    return <div className="overflow-auto">

        <BackgroundVideo
            disableTracking
            maxResolution="720p"
            style={{
                aspectRatio: 'auto',
                width: '100%',
                height: '100%',
                objectFit: 'fill',
            }} controls={false} src={auth_girl as Asset} autoPlay></BackgroundVideo>
    </div>
}