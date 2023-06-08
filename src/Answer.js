export default function Answer (props) {
    return (<div className={"answer"}>
        <div className={"question"}>{props.question}</div>
        <div className={"mark"}>{props.mark}</div>
    </div>)
}