import React, {useState} from "react";
import {Model} from "survey-core";
import "survey-core/defaultV2.min.css";
import {Survey} from "survey-react-ui";
import Summary from "./Summary";
import {getAnswersWithTitle} from "./getAnswersData";
import {questions} from "./questions";

function ScrumSurvey() {
        const survey = new Model(questions);
    const [displaySummary, changeDisplaySummary] = useState(false);
    const [answersData, updateAnswersData] = useState({});
    survey.firstPageIsStarted = true;
    survey.start();
    let currentPage = 1;

    survey.onComplete.add((sender, _) => {
        console.log(JSON.stringify(sender.data, null, 3));
            console.log(getAnswersWithTitle(sender.data, questions));
            updateAnswersData(getAnswersWithTitle(sender.data, questions));
        changeDisplaySummary(true);
    });


    let storageName = "scrum_survey";

    function saveSurveyData(survey) {
        let data = survey.data;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    }

    survey.onPartialSend.add(function (sender) {
        saveSurveyData(sender);
    });

    survey.onComplete.add(function (sender, _) {
        saveSurveyData(sender);
    });
    survey.onValueChanged.add(function (_) {
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
