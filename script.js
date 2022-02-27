// // code for form on ready page
document.addEventListener('DOMContentLoaded', submitForm);

function submitForm(){
    document.getElementById('formSubmit') && document.getElementById('formSubmit').addEventListener('click', function(event){
        // console.log(document.getElementById("grade"))
        const convertFrom = document.getElementById("convertFrom").value
        const convertTo = document.getElementById("convertTo").value
        const grade = document.getElementById("grade").value
        const payload =  {convertFrom, convertTo, grade}

        // console.log(convertFrom, convertTo, payload)
        if (convertFrom.includes("Select") || convertTo.includes("Select") || grade.includes("Select")) {
            event.preventDefault();
            document.getElementById('form-response').textContent = "Oops, you need to select a climbing grade to convert from, a grade, and a climbing grade to convert to!";
            document.getElementById('form-response').style.color = "red"
        } else {
            event.preventDefault();
            const req = new XMLHttpRequest();
            req.open("GET", `http://localhost:3000/grades/${grade}`);
            req.setRequestHeader('Content-Type', 'application/json');
            req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                const response = JSON.parse(req.responseText);
                document.getElementById('form-response').innerHTML = `<p>Success! <a href="javascript:;" onclick=displayGradeInfo("${convertFrom}")>${convertFrom}</a>: ${response[convertFrom]} is equivalent to <a href="javascript:;" onclick=displayGradeInfo("${convertTo}")>${convertTo}</a>: ${response[convertTo]}</p>`
                document.getElementById('form-response').style.color = "green";
            } else {
                console.log("Error in network request: " + req.statusText);
                document.getElementById('form-response').textContent = "Oops, something went wrong!";
                document.getElementById('form-response').style.color = "red"
            }});
            req.send(JSON.stringify(payload));
        } 
    })
}
// code for form on ready page
document.addEventListener('DOMContentLoaded', clearForm);

function clearForm(){
    document.getElementById('formClear') && document.getElementById('formClear').addEventListener('click', function(event){
        document.getElementById('form-response').textContent = ""
    })
}

function displayGradeInfo(value) {
    let section = "Yosemite%20Decimal%20System"
    if (value === "french") {
        section = "French%20numerical%20grades"
    }

    if (value === "australian") {
        section = "Ewbank"
    }
    getSectionData(section)
}

async function getSectionData(section) {
    let response = await fetch(`http://localhost:2000/section/climbing_grade/${section}`);
    let data = await response.json()
    document.getElementById("grade-info").innerText = data
    return data;
}

async function fetchGrades() {
    const response = await fetch('http://localhost:3000/grades')
    return response.json()
}

fetchGrades().then(data => {
    const gradeOptions = document.getElementById("grade")
    let value = gradeOptions.options.length
    data.forEach((grade) => {
        gradeOptions.options[gradeOptions.options.length] = new Option(`${grade.yosemite}`, value)
        gradeOptions.options[gradeOptions.options.length] = new Option(`${grade.french}`, value);
        gradeOptions.options[gradeOptions.options.length] = new Option(`${grade.australian}`, value);
        value += 1
    })

    for (let i = 0; i < gradeOptions.options.length; i++) {
        if (i % 3 == 0) {
            gradeOptions.options[i].className = "australian-grade"
        } else if ((i + 1) % 3 == 0) {
            gradeOptions.options[i].className = "french-grade"
        } else if ((i + 2) % 3 == 0) {
            gradeOptions.options[i].className = "yosemite-grade"
        }
    }
})
