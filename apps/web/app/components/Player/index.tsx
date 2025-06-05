import ReactPlayer from "react-player";

const Player = (props: any) => {
    const {url, muted, playing, isActive} = props;
    return (
        <div className="overflow-hidden">
            <ReactPlayer url={url}
                         muted={muted}
                         playing={playing}
                         width="100%"
                         height="100%"
                         style={
                             {transform: 'scaleX(-1)'}}/>
        </div>
    )
}
export default Player;