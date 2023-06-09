export default function Answer (props) {
    return (<div className={"answer"}>
        <div className={"question"}>{props.title}</div>
        <div className={"mark"}>{props.mark}</div>
    </div>)
}