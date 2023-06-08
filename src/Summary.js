import React, {useState} from "react";
import Answer from "./Answer";
import "./Summary.css";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

function analyseAnswers(answers){
    let summary = {};

    let sum = 0;
    let count = 0;

    let threeWorst = []
    let comfortAnswers = [];
    for (const question in answers){
        //average
        count++;
        sum += answers[question];

        //three worst
        if (threeWorst.length < 3){
            threeWorst.push({question: question, mark: answers[question]});
        }
        else{
            console.log(question);
            for (const oneWorst of threeWorst){
                if (oneWorst.mark > answers[question]){
                    threeWorst[threeWorst.indexOf(oneWorst)] = {question: question, mark: answers[question]};
                    break;
                }
            }
        }

        //answers in comfortable way
        comfortAnswers.push({question: question, mark: answers[question]});

    }
    threeWorst = threeWorst.sort((a, b) => a.mark - b.mark);

    summary.avg = sum/count;
    summary.threeWorst = threeWorst;
    summary.answers = comfortAnswers;


    return summary;
}



function Summary (props){
    const [summary] = useState(analyseAnswers(props.answers));

    console.log(summary.avg);


    console.log(summary.threeWorst);
    const createPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4");
        const data = await html2canvas(document.querySelector("#summary"));
        document.body.appendChild(data);
        const img = data.toDataURL("image/png");
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("result.pdf");
    };



    return (
        <div className={"summary"} id={"summary"}>
            <h1 className={"header"}>Thanks for taking a survey. Please review your submission.</h1>

            <div className="summary-form">
                <div className={"average"}>
                    <div className={"average-item"}>Your Average Score is</div>
                    <div className={"average-item"}>{summary.avg}</div>
                </div>
                <div className={"worst"}>
                    <h3>Three Least Marked Questions</h3>
                    {summary.threeWorst.map(answer => <Answer question={answer.question} mark={answer.mark} />) }
                </div>
                <div className={"overall"}>
                    <h3>Overall results:</h3>
                    {summary.answers.map(answer => <Answer question={answer.question} mark={answer.mark} />) }
                </div>
                <button onClick={createPDF}>Save PDF</button>
            </div>

        </div>
)}



export default Summary;
