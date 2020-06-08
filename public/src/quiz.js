const e = React.createElement

function Question() {
    return (
        <div>
            <h3>What fraction of a day is 6 hours?</h3>        
            <div>
                <label>
                <input type='radio' name='option' value='6/24' id='option-1'/>
                6/24</label>
            </div>

            <div>
                <label>
                <input type='radio' name='option' value='6' id='option-2'/>
                6</label>
            </div>

        </div>
    )
}


function PreQuiz({setQuizActive}) {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    
    return (
        <div className="wrapper">
            <form id="formContent" style={{padding: 10}}>
                <label>Name:</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
                <br/>
                <label>Email:</label>
                <input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <br/>
                {/* <input type="submit" value="Submit"> */}
                <button type="submit" onClick={() => setQuizActive(true)}>
                Start Quiz
                </button>
                <div className="row">
                    <div className="column">
                        <h3>Risk</h3>
                        <p>OneR</p>
                    </div>
                    <div className="column">
                        <h3>Culture</h3>
                        <p>OneC</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

function Quiz() {
    const [quizActive, setQuizActive] = React.useState(false)

    return (
        quizActive ?
        <div className="wrapper">
            <div id="formContent">
                <Question/>
                <div style={{padding: 10}}>
                    <button >Previous</button>
                    <button style={{marginLeft: 5}} >Next</button>
                    <button style={{marginLeft: 5}} >Submit</button>
                </div>
            </div>
        </div>
        : <PreQuiz setQuizActive={setQuizActive}/>
    )
}


const domContainer = document.querySelector('#quiz')
ReactDOM.render(e(Quiz), domContainer)