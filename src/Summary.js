import React, {useState} from "react";
import Answer from "./Answer";
import "./styles/Summary.css";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {nanoid} from 'nanoid';

function analyseAnswers(answers){
    let summary = {};

    let sum = 0;
    let count = 0;

    let threeWorst = []
    let comfortAnswers = [];
    for (const answer of answers){
        //average
        count++;
        sum += answer.mark;

        //three worst
        if (threeWorst.length < 3){
            threeWorst.push({name: answer.name, title: answer.title, mark: answer.mark});
        }
        else{

            for (const oneWorst of threeWorst){
                if (oneWorst.mark > answer.mark){
                    threeWorst[threeWorst.indexOf(oneWorst)] = {name: answer.name, title: answer.title, mark: answer.mark};
                    break;
                }
            }
        }

        //answers in comfortable way
        comfortAnswers.push({name: answer.name, title: answer.title, mark: answer.mark});

    }
    threeWorst = threeWorst.sort((a, b) => a.mark - b.mark);

    summary.avg = (sum/count).toFixed(2);
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
                    <h3 className={"title"}>Three Least Marked Questions</h3>
                    {summary.threeWorst.map(answer => <Answer name={answer.name} title={answer.title} mark={answer.mark} key={nanoid()}/>) }
                </div>
                <div className={"overall"}>
                    <h3 className={"title"}>Overall results:</h3>
                    {summary.answers.map(answer => <Answer name={answer.name} title={answer.title} mark={answer.mark} key={nanoid()} />) }
                </div>
                <div className="box-3">
                    <div className="btn btn-three" onClick={createPDF}>
                        <span>Save PDF</span>
                    </div>
                </div>
            </div>

        </div>
)}



export default Summary;
