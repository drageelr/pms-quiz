const e = React.createElement

function Quiz() {
    const [quizActive, setQuizActive] = React.useState(false)
    const [quizComplete, setQuizComplete] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [count, setCount] = React.useState(10)
    const [elementsData, setElementsData] = React.useState([])
    const [questionsData, setQuestionsData] = React.useState([])
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [quizResult, setQuizResult] = React.useState([])

    React.useEffect(() => { //get all elements and questions
        fetchElements().then(elements => {
            elements.forEach(element => {
                element.checked = false
            })
            setElementsData(elements)
        })
    }, [])

    
    function handleStart(){
        if (name == '' || email == '' || count == '') {
            alert("Name, email or count fields must not be empty!")
            return false
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        {
            alert("You have entered an invalid email address!")
            return false
        }
        if (count < 10 || count > 30) {
            alert("Count should be between 10 and 30.")
            return false
        }

        setQuizActive(true)
        const checkedElements = elementsData.filter(element => element.checked)
        const elementIds = checkedElements.map(checkedElement => checkedElement.elementId)

        start(elementIds, count).then(questions => {
            questions.forEach(questions => {
                questions.selectedOption = -1
            })
            setQuestionsData(questions)
            //currentIndex = 0
        })
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
        let questions = questionsData.map(questionData => ({
            questionId: questionData.questionId,
            selectedOption: questionData.selectedOption
        })
        )
        submit(name, email, questions).then(token => {
            result(token).then(res => {
                console.log(res) //result, needs a page to display properly
                setQuizResult(res)
                setQuizComplete(true)
                setQuizActive(false)
            })
        })
    }

    function Question({currentQuestionId, questionIndex}) {
        const questionData = questionsData[questionIndex]

        function handleOptionSelect(e){
            const selectedOption = Number(e.target.value)
            console.log(selectedOption)
            setQuestionsData(questionsData.map(question => {
                if (question.questionId === currentQuestionId) {
                    question.selectedOption = selectedOption
                }
                return question
            })
            )
            console.log(questionsData)
        }

        return (
            questionData !== undefined &&
            <div>
                <h3>{questionData.text}</h3>        
                {
                questionData.options.map((option, index) => 
                    <div key={index}>
                        <label>
                        <input 
                        type='radio' 
                        value={index} 
                        checked={Number(questionsData[questionIndex].selectedOption) === index}
                        onChange={handleOptionSelect}/>
                        {option}</label>
                    </div>
                )
                }
            </div>
        )
    }

    function PreQuiz() {
        const [localName, setLocalName] = React.useState(name)
        const [localEmail, setLocalEmail] = React.useState(email)
        const [localCount, setLocalCount] = React.useState(count)

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
                && <div key={index}>
                        <input type="checkbox" value={element.elementId} 
                        checked={element.checked} onChange={handleElementCheck}/>
                        <label> {element.abv}</label>
                        <br/>
                </div>
            )
        }

        return (
            <div className="wrapper">
                <form id="formContent" style={{padding: 10}}>
                    <h3>Ready for the Quiz?</h3>
                    <label>Name: </label>
                    <input type="text" id="name" 
                    value={localName} 
                    onChange={e => setLocalName(e.target.value)}
                    onBlur={() => setName(localName)} //set final name on blur for perf
                    required
                    />
                    <br/>
                    <label>Email: </label>
                    <input type="text" id="email" 
                    value={localEmail} 
                    onChange={e => setLocalEmail(e.target.value)}
                    onBlur={() => setEmail(localEmail)} 
                    required
                    />
                    <br/>
                    <label>Count: </label>
                    <input type="number" id="count" 
                    value={localCount} 
                    onChange={e => setLocalCount(e.target.value)}
                    onBlur={() => setCount(localCount)} 
                    required
                    />
                    <br/>
                    <br/>
                    <div style={{fontSize: 14}}>Select topics under the given categories:</div>
                    <div className="row" style={{marginLeft: "4.5vw"}}>
                        <div className="column">
                            <h3>Risk</h3>
                            <ElementsCheckList type="risk"/>
                        </div>
                        <div className="column">
                            <h3>Culture</h3>
                            <ElementsCheckList type="cult"/>
                        </div>
                    </div>
                    <br/>
                    <a className="buttonblue" onClick={handleStart}> Start Quiz </a>
                    <br/>
                    <br/>
                    <div style={{fontSize: 12}}>Note: Before submitting please wait a few seconds for the system to register your last selected option.</div>
                    <br/>
                </form>
            </div>
        )
    }

    function QuizSession() {
        return (
        <div className="wrapper">
            <div id="formContent">
                <Question 
                questionIndex={currentIndex}
                currentQuestionId={questionsData[currentIndex] !== undefined ? questionsData[currentIndex].questionId : -1}
                />
                <div style={{padding: 10}}>
                    <button onClick={handlePrevious}>Previous</button>
                    <button style={{marginLeft: 5}} onClick={handleNext}>Next</button>
                    <button style={{marginLeft: 5}} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
        )
    }

    function PostQuiz(){
        return (
            <div className="wrapper">
                {
                quizResult.map((questionData,index) => (
                    <div key={index} id="formContent" style={{marginBottom: 10}}>
                        <h3>{questionData.text}</h3>        
                        {
                            questionData.options.map((option, index) => 
                                <div key={index}>
                                    <label>
                                    <input 
                                    type='radio' 
                                    value={index} 
                                    checked={Number(questionData.selectedOption) === index}
                                    onChange={()=>{}}/>
                                    {option}</label>
                                </div>
                            )
                        }
                        {
                            questionData.correct ?
                            <h6 style={{color: "green"}}> ✅ Correct</h6>
                            : <h6 style={{color: "red"}}> ❌ Wrong.</h6>

                        }
                    </div>
                ))
                }
            </div>
        )
    }

    return (
        quizActive ?
        <QuizSession/>
        : quizComplete ? 
        <PostQuiz/>
        : <PreQuiz/>
    )
}


const domContainer = document.querySelector('#quiz')
ReactDOM.render(e(Quiz), domContainer)