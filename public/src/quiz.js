const e = React.createElement

function Quiz() {
    const [quizActive, setQuizActive] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [elementsData, setElementsData] = React.useState([])
    const [questionsData, setQuestionsData] = React.useState([])
    const [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => { //get all elements and questions
        fetchElements().then(elements => {
            elements.forEach(element => {
                element.checked = false
            })
            setElementsData(elements)
        })
        
        fetchQuestions().then(questions => {
            questions.forEach(questions => {
                questions.selectedOption = -1
            })
            setQuestionsData(questions)
        })
    }, [])


    function handleStart(){
        const count = 10
        const checkedElements = elementsData.filter(element => element.checked)
        const elementIds = checkedElements.map(checkedElement => checkedElement.elementId)
        setQuizActive(true)
        // console.log("Selected elements: ", elementIds)
        
        // start(elementIds, count).then(questions => {
        //     questions.forEach(questions => {
        //         questions.selectedOption = -1
        //     })
        //     setQuestionsData(questions)
        //     setCurrentQuestionId(questions[0].questionId) //first question in fetched questions list
        // })
        
        
    }

    function handleNext(){
        if (currentIndex < questionsData.length-1) {
            setCurrentIndex(currentIndex+1)
        }
    }

    function handlePrevious(){
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex-1)
        }
    }

    function handleSubmit(){
        // submit(name, email, questionsData).then(token => {
        //     result(token).then(res => {
        //         console.log(res) //result, needs a page to display properly
        //     })
        // })
    }

    function Question({currentQuestionId}) {
        const questionData = questionsData.find(question => question.questionId === currentQuestionId)
        return (
            <div>
                <h3>{questionData.text}</h3>        
                {
                    questionData.options.map((option, index) => 
                        <div key={index}>
                            <label>
                            <input type='radio' value={index} id={index}/>
                            {option.text}</label>
                        </div>
                    )
                }
            </div>
        )
    }

    function PreQuiz() {
        
        function handleElementCheck(e) {
            setElementsData(elementsData.map(element => {
                if (element.elementId == e.target.value) {
                    element.checked = !element.checked 
                }
                return element
                })
            )
        }
    
        function ElementsCheckList({type}) {
            return elementsData.map((element, index) => 
                element.type == type 
                ? <div key={index}>
                        <input type="checkbox" value={element.elementId} 
                        checked={element.checked} onChange={handleElementCheck}/>
                        <label> {element.name}</label>
                        <br/>
                </div>
                : null
            )
        }

        return (
            <div className="wrapper">
                <form id="formContent" style={{padding: 10}}>
                    <label>Name: </label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
                    <br/>
                    <label>Email: </label>
                    <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <br/>
                    <button onClick={handleStart}> Start Quiz </button>
                    <div className="row">
                        <div className="column">
                            <h3>Risk</h3>
                            <ElementsCheckList type="risk"/>
                        </div>
                        <div className="column">
                            <h3>Culture</h3>
                            <ElementsCheckList type="cult"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        quizActive ?
        <div className="wrapper">
            <div id="formContent">
                <Question currentQuestionId={questionsData[currentIndex].questionId}/>
                <div style={{padding: 10}}>
                    <button onClick={handlePrevious}>Previous</button>
                    <button style={{marginLeft: 5}} onClick={handleNext}>Next</button>
                    <button style={{marginLeft: 5}} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
        : <PreQuiz/>
    )
}


const domContainer = document.querySelector('#quiz')
ReactDOM.render(e(Quiz), domContainer)