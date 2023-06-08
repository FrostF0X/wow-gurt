import React, {useState} from "react";
import {Model} from "survey-core";
import "survey-core/defaultV2.min.css";
import "./index.css";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {Survey} from "survey-react-ui";
import Summary from "./Summary";

export const json = {
    pages: [{
        elements: [{
            title: "Press Start"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "first-question",
            title: "Your organization is satisfied with your product’s return on investment.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "second-question",
            title: "You produce a “Done” (i.e., potentially releasable) Increment at least once every Sprint.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "third-question",
            title: "Your customers are happy with the frequency with which they receive releases.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }],
    }, {
        elements: [{
            type: "rating",
            name: "fourth-question",
            title: "Stakeholder and customer feedback are incorporated into the product to improve the value of the product.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "fifth-question",
            title: "You validate assumptions about the value of the work that you are doing based on market, customer, or user feedback.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "sixth-question",
            title: "You can deliver new product capabilities in an acceptable period of time.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "seventh-question",
            title: "You can respond to new opportunities or risks in an acceptable amount of time.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "eighth-question",
            title: "You understand, and have evidence to support, your customers’ needs.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "ninth-question",
            title: "You understand how your users or customers use the product, including which features they use.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "tenth-question",
            title: "You understand current and trending market conditions for your product. ",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "eleventh-question",
            title: "Your customers feel that the level of quality of your product is high. ",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "twelfth-question",
            title: "You spend an acceptable ratio of your product investment on maintaining the product or fixing defects (versus new product capabilities). ",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "thirteenth-question",
            title: "Your teams are very satisfied with their work.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }, {
        elements: [{
            type: "rating",
            name: "fourteenth-question",
            title: "Your teams are very satisfied with their learning and growth opportunities.",
            rateMin: 0,
            rateMax: 10,
            displayMode: "buttons"
        }]
    }]
};


const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#root"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("result.pdf");
};

function ScrumSurvey() {
    const survey = new Model(json);
    const [displaySummary, changeDisplaySummary] = useState(false);
    const [answersData, updateAnswersData] = useState({});
    survey.firstPageIsStarted = true;
    survey.start();
    let currentPage = 1;

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        updateAnswersData(sender.data);
        changeDisplaySummary(true);

    });
    survey.addNavigationItem({
        id: "pdf-export", title: "Save as PDF", action: () => createPDF()
    });


    let storageName = "scrum_survey";

    function saveSurveyData(survey) {
        let data = survey.data;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }

    survey.onPartialSend.add(function (sender) {
        saveSurveyData(sender);
    });

    survey.onComplete.add(function (sender, options) {
        saveSurveyData(sender);
    });
    survey.onValueChanged.add(function (sender) {
        survey.nextPage();
        currentPage++;
        if (currentPage  === survey.pageCount){

            survey.doComplete();
        }
    });

    if (displaySummary){
        return (<Summary answers={answersData}/>);
    } else return <Survey model={survey} />;
}

export default ScrumSurvey;
