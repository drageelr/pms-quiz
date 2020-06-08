const e = React.createElement

function ElementsTable() {
    const [elementsData, setElementsData] = React.useState([])
    
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
                    name: row[1], 
                    abv: row[2],
                    type: row[3]
                })
                )
                console.log(elements)
                addElements(elements)
                // setElementsData(data)
            }
            else{
                //error on validating
                console.log("Error validating the import.")
            }
        }
        
    }

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
                <button>Refresh</button>
                <button>Download Elements Template</button>
                <br/>
                <input type="file" name="Upload Elements" id="txtFileUpload" accept=".csv" onChange={handleElementsUpload} />
                <button>Upload Elements</button>
                <br/>
                <button>Download Elements</button>
                <button>Wipe Elements</button>
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
                <button>Refresh</button>
                <button>Download Questions Template</button>
                <button>Upload Questions</button>
                <button>Download Questions</button>
                <button>Wipe Questions</button>
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