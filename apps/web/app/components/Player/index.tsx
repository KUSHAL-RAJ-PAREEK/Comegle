import ReactPlayer from "react-player";

const Player = (props: any) =>{
    const {url,muted, playing,isActive} = props;
    return (
        <div>
            <ReactPlayer url = {url} muted = {muted} playing = {playing}/>
        </div>
    )
}
export default Player;