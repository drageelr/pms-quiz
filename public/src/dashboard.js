const e = React.createElement

function ElementsTable() {
    return (
        <div>
            <table id="view">
                <caption>Elements</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Abbreviation</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Element 1</td>
                    <td>E1</td>
                    <td>Risk</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Element 2</td>
                    <td>E2</td>
                    <td>Cult</td>
                </tr>
                </tbody>
            </table>

            <div>
                <button>Download Elements Template</button>
                <button>Upload Elements</button>
                <button>Download Elements</button>
            </div>
        </div>
    )
}

function QuestionsTable() {
    return (
        <div>
            <table id="view">
                <caption>Questions</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Text</th>
                    <th>Options</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Question 1</td>
                    <td>
                        <tr>
                            <td>1</td>
                            <td>Cat</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Dog</td>
                        </tr>
                    </td>
                    <td>2</td>
                </tr>
                </tbody>
            </table>

            <div>
                <button>Download Questions Template</button>
                <button>Upload Questions</button>
                <button>Download Questions</button>
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