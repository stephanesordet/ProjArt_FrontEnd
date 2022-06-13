const colorArray = [
'#C274AE', '#4D8066', '#412722', '#60A160', '#F230F2', 
'#A35B91', '#B33300', '#B34D4D', '#BD8471', '#F56231', 
'#009EC9', '#719E00','#33991A', '#679999', '#E64D66', 
'#377FB6', '#A24936', '#537D3E', '#2B4570', '#730071'
];
export function getColorMatters(matters){
    let colors = colorArray;
    if (matters.length > colorArray.length) {
        const difference = matters.length-colorArray.length-1;
        let extraColors = colors.slice(0, difference);
        let newColors = colors.concat(extraColors);
        colors = newColors;
    }
    const matieres = Array();
    matters.forEach(matiere => {
        matieres.push(matiere);
    });
    let colorMatters = {};
    for (let index = 0; index < matieres.length; index++) {
        colorMatters[matieres[index]] = colors[index];
    }
    console.log(colorMatters)
    return colorMatters;
}