const e = React.createElement

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function Result() {
    const [quizResult, setQuizResult] = React.useState([])
    const token = getParameterByName("token")
    React.useEffect(() => { //get all elements and questions
        result(token).then(res => {
            console.log(res) //result, needs a page to display properly
            setQuizResult(res)
        })
    }, [])

    return (
        <div className="wrapper">
            {
            quizResult &&
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


const domContainer = document.querySelector('#result')
ReactDOM.render(e(Result), domContainer)