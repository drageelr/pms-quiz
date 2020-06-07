const e = React.createElement

function Question() {
    return (
        <div >
            <div>
            <h3>What fraction of a day is 6 hours?</h3>
            <p>Choose 1 answer</p>
            <hr />
        
            <div id='block-11'>
                <label>
                <input type='radio' name='option' value='6/24' id='option-11'/>
                6/24</label>
                <span id='result-11'></span>
            </div>
            <hr />
        
            <div id='block-12'>
                <label>
                <input type='radio' name='option' value='6' id='option-12'/>
                6</label>
                <span id='result-12'></span>
            </div>
            <hr />  
            
            </div>
        </div>
    )
}


function PreQuiz({setQuizActive}) {
    return (
        <div>
            <button onClick={() => setQuizActive(true)} >Start Quiz</button>
        </div>
    )
}

function Quiz() {
    const [quizActive, setQuizActive] = React.useState(false)
    
    return (
        quizActive ?
        <div>
            <Question/>
            <div>
                <button >Previous</button>
                <button >Next</button>
                <button >Submit</button>
            </div>
        </div>
        : <PreQuiz setQuizActive={setQuizActive}/>
    )
}


const domContainer = document.querySelector('#quiz')
ReactDOM.render(e(Quiz), domContainer)