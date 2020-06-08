var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

function ElementsTable() {
    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        elementsData = _React$useState2[0],
        setElementsData = _React$useState2[1];

    function handleElementsUpload(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            var data = $.csv.toArrays(e.target.result);
            if (data !== null && data !== "" && data.length > 1) {
                //needs better validation here according to type
                data.shift(); //removed header
                var elements = data.map(function (row) {
                    return {
                        name: row[1],
                        abv: row[2],
                        type: row[3]
                    };
                });
                console.log(elements);
                addElements(elements);
                // setElementsData(data)
            } else {
                //error on validating
                console.log("Error validating the import.");
            }
        };
    }

    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { id: "view" },
            React.createElement(
                "caption",
                null,
                "Elements"
            ),
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "ID"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Name"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Abbreviation"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Type"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        "1"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "Element 1"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "E1"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "Risk"
                    )
                ),
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        "2"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "Element 2"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "E2"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "Cult"
                    )
                )
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                null,
                "Refresh"
            ),
            React.createElement(
                "button",
                null,
                "Download Elements Template"
            ),
            React.createElement("br", null),
            React.createElement("input", { type: "file", name: "Upload Elements", id: "txtFileUpload", accept: ".csv", onChange: handleElementsUpload }),
            React.createElement(
                "button",
                null,
                "Upload Elements"
            ),
            React.createElement("br", null),
            React.createElement(
                "button",
                null,
                "Download Elements"
            ),
            React.createElement(
                "button",
                null,
                "Wipe Elements"
            )
        )
    );
}

function QuestionsTable() {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { id: "view" },
            React.createElement(
                "caption",
                null,
                "Questions"
            ),
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "ID"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Text"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Options"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Answer"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        "1"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "Question 1"
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                "1"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Cat"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                "2"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Dog"
                            )
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        "2"
                    )
                )
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                null,
                "Refresh"
            ),
            React.createElement(
                "button",
                null,
                "Download Questions Template"
            ),
            React.createElement(
                "button",
                null,
                "Upload Questions"
            ),
            React.createElement(
                "button",
                null,
                "Download Questions"
            ),
            React.createElement(
                "button",
                null,
                "Wipe Questions"
            )
        )
    );
}

function DashBoard() {
    var _React$useState3 = React.useState('elements'),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        tab = _React$useState4[0],
        setTab = _React$useState4[1];

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "tab" },
            React.createElement(
                "button",
                { className: "tablinks", onClick: function onClick() {
                        return setTab('elements');
                    } },
                "Elements"
            ),
            React.createElement(
                "button",
                { className: "tablinks", onClick: function onClick() {
                        return setTab('questions');
                    } },
                "Questions"
            )
        ),
        tab == 'questions' ? React.createElement(QuestionsTable, null) : React.createElement(ElementsTable, null)
    );
}

var domContainer = document.querySelector('#dashboard');
ReactDOM.render(e(DashBoard), domContainer);