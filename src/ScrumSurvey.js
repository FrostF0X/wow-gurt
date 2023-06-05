import React from "react";
import {Model, StylesManager} from "survey-core";
import "survey-core/defaultV2.min.css";
import "./index.css";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {Survey} from "survey-react-ui";

export const json = {
    "id": "scrum-survey-form",
    "theme": "modern",
    "widthMode": "dynamic",
    "focusFirstQuestionAutomatic": false,
    "showQuestionNumbers": "off",
    "questions": [{
        "type": "rating",
        "name": "satisfaction-auto",
        "title": "Your organization is satisfied with your product’s return on investment",
        "rateMin": 0,
        "rateMax": 10,
        "displayMode": "buttons",
    }, {
        "type": "rating",
        "name": "satisfaction-buttons",
        "title": "You produce a “Done” (i.e., potentially releasable) Increment at least once every Sprint.",
        "rateMin": 0,
        "rateMax": 10,
        "displayMode": "buttons"
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
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.addNavigationItem({
        id: "pdf-export", title: "Save as PDF", action: () => createPDF()
    });

    var storageName = "scrum_survey";

    function saveSurveyData(survey) {
        var data = survey.data;
        data.pageNo = survey.currentPageNo;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }

    survey.onPartialSend.add(function (sender) {
        saveSurveyData(sender);
    });
    survey.onComplete.add(function (sender, options) {
        saveSurveyData(sender);
    });
    survey.sendResultOnPageNext = true;
    var prevData = window.localStorage.getItem(storageName) || null;
    if (prevData) {
        var data = JSON.parse(prevData);
        survey.data = data;
        if (data.pageNo) {
            survey.currentPageNo = data.pageNo;
        }
    }
    return (<Survey model={survey}/>);
}

export default ScrumSurvey;
