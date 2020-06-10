const e = React.createElement

function saveArrayCSV(csvArray, fname){
    const templateCSV = "data:text/csv;charset=utf-8," 
    + csvArray.map(e => e.join(",")).join("\n")

    let link = document.createElement("a")
    link.setAttribute("href", encodeURI(templateCSV))
    link.setAttribute("download", `${fname}.csv`)
    document.body.appendChild(link)
    link.click()
}

function ElementsTable() {
    const [elementsData, setElementsData] = React.useState([])
    
    React.useEffect(() => {
        handleRefreshElements()
    }, [])

    function handleElementsUpload(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (e) => {
            const data = $.csv.toArrays(e.target.result)
            if(data !== null && data !== "" && data.length > 1) { 
                //needs better validation here according to type
                data.shift() //removed header
                const elements = data.map(row => ({
                    name: row[0], 
                    abv: row[1],
                    type: row[2]
                })
                )
                addElements(elements)
                
                const newElements = elements.map((element, index) => ({
                    ...element,
                    elementId: "" //temporary for display
                }))

                setElementsData(elementsData.concat(newElements))
            }
            else{
                //error on validating
                console.log("Error validating the import.")
            }
        }
    }

    function handleRefreshElements(){
        fetchElements().then(elements => setElementsData(elements))
    }

    function handleDownloadElementsTemplate(){
        // download csv template to client pc locally stored
        const templateArr = [
            ["Name",  "Abbreviation", "Type(risk/cult)"], 
            ["Element 1", "E1", "risk"]
        ]
        saveArrayCSV(templateArr, "elements_template")
    }

    function handleDownloadElements(){
        // fetch and download elements
        const elementsArr = [["ID", "Name",  "Abbreviation", "Type(risk/cult)"]].concat(
            elementsData.map(elements => [
            elements.elementId, 
            elements.name,
            elements.abv,
            elements.type
        ])
        )
        saveArrayCSV(elementsArr, "elements_download")
    }

    function handleWipeElements(){
        wipeElements().then(wipeSuccessful => {
            if (wipeSuccessful) {
                setElementsData([])
            }
        })
    }


    return (
        <div>
            <table id="view">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Abbreviation</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {
                    elementsData.map((elementsObj, index) => (
                    <tr key={index}>
                        <td>{elementsObj.elementId}</td>
                        <td>{elementsObj.name}</td>
                        <td>{elementsObj.abv}</td>
                        <td>{elementsObj.type == "risk" ? "Risk" : "Culture"}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>

            <div>
                <button onClick={handleRefreshElements}>Refresh</button>
                <button onClick={handleDownloadElementsTemplate}>Download Elements Template</button>
                <br/>
                <div className="upload-btn-wrapper">
                    <button>Add Elements</button>
                    <input type="file" name="upload-elements" id="txtFileUpload" accept=".csv" onChange={handleElementsUpload}/>
                </div>
                <br/>
                <button onClick={handleDownloadElements}>Download Elements</button>
                <button onClick={handleWipeElements}>Wipe Elements</button>
            </div>
        </div>
    )
}

function QuestionsTable() {
    const [questionsData, setQuestionsData] = React.useState([])

    React.useEffect(() => {
        handleRefreshQuestions()
    }, [])

    function handleQuestionsUpload(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (e) => {
            const data = $.csv.toArrays(e.target.result)
            if(data !== null && data !== "" && data.length > 1) { 
                //needs better validation here according to type
                data.shift() //removed header
                const questions = data.map(row => {
                    let question = {
                        text: row[0], 
                        elementId: Number(row[1]),
                        correctOption: Number(row[2]),
                        options: []
                    }
                    const optionTexts = row.slice(3)
                    
                    optionTexts.map(optionText => {
                        if (optionText != "") {
                            question.options.push({text: optionText})
                        }
                    })

                    return question
                })

                console.log(questions)

                addQuestions(questions)
                
                const newQuestions = questions.map((element, index) => ({
                    ...element,
                    elementId: "" //temporary for display
                }))

                setQuestionsData(questionsData.concat(newQuestions))
            }
            else{
                //error on validating
                console.log("Error validating the import.")
            }
        }
    }

    function handleRefreshQuestions(){
        fetchQuestions().then(questions => setQuestionsData(questions))
    }

    function handleDownloadQuestionsTemplate(){
        // download csv template to client pc locally stored
        const templateArr = [
            ["Question Text", "Element ID", "Answer", "0", "1", "2", "3", "4"],
            ["Question1 Text", 33, 1, "True", "False"],
            ["Question2 Text", 34, 4, "Cat", "Dog", "Elephant", "Bird", "Lizard"]
        ]
        saveArrayCSV(templateArr, "questions_template")
    }

    function handleDownloadQuestions(){
        // fetch and download Questions
        let headerRow = ["Question Text", "Element ID", "Answer"]
        let maxNumOptions = -Number.MAX_VALUE
        questionsData.forEach(question => {
            if (question.options.length > maxNumOptions){
                maxNumOptions = question.options.length
            }
        });
        
        for (let i = 0; i < maxNumOptions; i++) {
            headerRow.push(i)
        }
        
        const QuestionsArr = [headerRow].concat(
            questionsData.map(question => {
                let questionArr = [
                    question.text, 
                    question.elementId,
                    question.correctOption,
                    ...question.options.map(o => o.text)
                ]
                return questionArr
            } 
        )
        )
        saveArrayCSV(QuestionsArr, "questions_download")
    }

    function handleWipeQuestions(){
        wipeQuestions().then(wipeSuccessful => {
            if (wipeSuccessful) {
                setQuestionsData([])
            }
        })
    }


    return (
        <div>
            <table id="view">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Text</th>
                    <th>Options</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                {
                    questionsData.map((questionsObj, index) => (
                        <tr key={index}>
                            <td>{questionsObj.questionId}</td>
                            <td>{questionsObj.text}</td>
                            <td>
                                <table>
                                    <tbody>
                                    {
                                        questionsObj.options.map((option, index) => 
                                        <tr key={index}>
                                                <td>{index}</td>
                                                <td>{option.text}</td>
                                            </tr>
                                        )
                                    }    
                                    </tbody>
                                </table>
                            </td>
                            <td>{questionsObj.correctOption}</td>
                        </tr>
                    ))
                }

                </tbody>
            </table>

            <div>
                <button onClick={handleRefreshQuestions}>Refresh</button>
                <button onClick={handleDownloadQuestionsTemplate}>Download Questions Template</button>
                <br/>
                <div className="upload-btn-wrapper">
                    <button>Add Questions</button>
                    <input type="file" name="upload-questions" id="txtFileUpload" accept=".csv" onChange={handleQuestionsUpload}/>
                </div>
                <br/>
                <button onClick={handleDownloadQuestions}>Download Questions</button>
                <button onClick={handleWipeQuestions}>Wipe Questions</button>
            </div>
        </div>
    )
}


function DashBoard() {
    const [tab, setTab] = React.useState('elements')

    return (
        <div>
            <div className="tab">
                <button className="tablinks" onClick={() => setTab('elements')}>Elements</button>
                <button className="tablinks" onClick={() => setTab('questions')}>Questions</button>
            </div>

            {
                tab == ('questions')
                ? <QuestionsTable/>
                : <ElementsTable/>
            }
        </div>
    )
}

const domContainer = document.querySelector('#dashboard')
ReactDOM.render(e(DashBoard), domContainer)