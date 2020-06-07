var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

function ElementsTable() {
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
                "Download Elements Template"
            ),
            React.createElement(
                "button",
                null,
                "Upload Elements"
            ),
            React.createElement(
                "button",
                null,
                "Download Elements"
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
            )
        )
    );
}

function DashBoard() {
    var _React$useState = React.useState('elements'),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        tab = _React$useState2[0],
        setTab = _React$useState2[1];

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