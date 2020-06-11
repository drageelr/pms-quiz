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
    }, [])

    
    function handleStart(){
        if (name == '' || email == '') {
            alert("Name and email fields must not be empty!")
            return false
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        {
            alert("You have entered an invalid email address!")
            return false
        }
        setQuizActive(true)
        const count = 10
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
            })
        })
    }

    function Question({currentQuestionId, questionIndex}) {
        const questionData = questionsData[questionIndex]

        function handleOptionSelect(e){
            const selectedOption = e.target.value
            
            setQuestionsData(questionsData.map(question => {
                if (question.questionId === currentQuestionId) {
                    question.selectedOption = selectedOption
                }
                return question
                })
            )
        }

        return (
            questionData !== undefined ?
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
            : null
        )
    }

    function PreQuiz() {
        const [localName, setLocalName] = React.useState(name)
        const [localEmail, setLocalEmail] = React.useState(email)
        
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
        : <PreQuiz/>
    )
}


const domContainer = document.querySelector('#quiz')
ReactDOM.render(e(Quiz), domContainer)