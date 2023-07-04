export function getAnswersWithTitle(data, json){
    let neededData = [];
    for (const name in data){
        const element = json.pages.flatMap(page => page.elements).find(element => element.name === name);
        neededData.push({title: element.title, name: name, mark: data[name]});
    }
    return neededData;
}