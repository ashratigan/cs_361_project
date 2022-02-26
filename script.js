// code for form on ready page
document.addEventListener('DOMContentLoaded', submitForm);

function submitForm(){
    document.getElementById('formSubmit') && document.getElementById('formSubmit').addEventListener('click', function(event){
        const convertFrom = document.getElementById("convertFrom").value
        const convertTo = document.getElementById("convertTo").value
        const grade = document.getElementById("grade").value
        const payload =  {convertFrom, convertTo, grade}

        console.log(convertFrom, convertTo, payload)
        if (convertFrom.includes("Select") || convertTo.includes("Select") || grade.includes("Select")) {
            event.preventDefault();
            document.getElementById('form-response').textContent = "Oops, you need to select a climbing grade to convert from, a grade, and a climbing grade to convert to!";
            document.getElementById('form-response').style.color = "red"
        } else {
            event.preventDefault();
            const req = new XMLHttpRequest();
            // TODO: post to actual endpoint
            req.open("POST", "https://httpbin.org/post");
            req.setRequestHeader('Content-Type', 'application/json');
            req.addEventListener('load',function(){
            if(req.status >= 200 && req.status < 400){
                // const response = JSON.parse(req.responseText);
                const respone = 12
                document.getElementById('form-response').innerHTML = `<p>Success! <a href="./info.html#${convertFrom}Info">${convertFrom}</a>: ${grade} is equivalent to <a href="./info.html#${convertTo}Info">${convertTo}</a>: ${respone}</p>`
                // document.getElementById('form-response').textContent = `Success! ${convertFrom}: ${grade} is equivalent to ${convertTo}: ${respone}`;
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
