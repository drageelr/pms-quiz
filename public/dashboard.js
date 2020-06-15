var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var e = React.createElement;

function saveArrayCSV(csvArray, fname) {
    var templateCSV = "data:text/csv;charset=utf-8," + csvArray.map(function (e) {
        return e.join(",");
    }).join("\n");

    var link = document.createElement("a");
    link.setAttribute("href", encodeURI(templateCSV));
    link.setAttribute("download", fname + ".csv");
    document.body.appendChild(link);
    link.click();
}

function ElementsTable() {
    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        elementsData = _React$useState2[0],
        setElementsData = _React$useState2[1];

    React.useEffect(function () {
        handleRefreshElements();
    }, []);

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
                        name: row[0],
                        abv: row[1],
                        type: row[2]
                    };
                });
                addElements(elements);

                var newElements = elements.map(function (element, index) {
                    return Object.assign({}, element, {
                        elementId: "" //temporary for display
                    });
                });

                setElementsData(elementsData.concat(newElements));
            } else {
                //error on validating
                console.log("Error validating the import.");
            }
        };
    }

    function handleRefreshElements() {
        fetchElements().then(function (elements) {
            return setElementsData(elements);
        });
    }

    function handleDownloadElementsTemplate() {
        // download csv template to client pc locally stored
        var templateArr = [["Name", "Abbreviation", "Type(risk/cult)"], ["Element 1", "E1", "risk"]];
        saveArrayCSV(templateArr, "elements_template");
    }

    function handleDownloadElements() {
        // fetch and download elements
        var elementsArr = [["ID", "Name", "Abbreviation", "Type(risk/cult)"]].concat(elementsData.map(function (elements) {
            return [elements.elementId, elements.name, elements.abv, elements.type];
        }));
        saveArrayCSV(elementsArr, "elements_download");
    }

    function handleWipeElements() {
        wipeElements().then(function (wipeSuccessful) {
            if (wipeSuccessful) {
                setElementsData([]);
            }
        });
    }

    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { id: "view" },
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
                elementsData.map(function (elementsObj, index) {
                    return React.createElement(
                        "tr",
                        { key: index },
                        React.createElement(
                            "td",
                            null,
                            elementsObj.elementId
                        ),
                        React.createElement(
                            "td",
                            null,
                            elementsObj.name
                        ),
                        React.createElement(
                            "td",
                            null,
                            elementsObj.abv
                        ),
                        React.createElement(
                            "td",
                            null,
                            elementsObj.type == "risk" ? "Risk" : "Culture"
                        )
                    );
                })
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { onClick: handleRefreshElements },
                "Refresh"
            ),
            React.createElement(
                "button",
                { onClick: handleDownloadElementsTemplate },
                "Download Elements Template"
            ),
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "upload-btn-wrapper" },
                React.createElement(
                    "button",
                    null,
                    "Add Elements"
                ),
                React.createElement("input", { type: "file", name: "upload-elements", id: "txtFileUpload", accept: ".csv", onChange: handleElementsUpload })
            ),
            React.createElement("br", null),
            React.createElement(
                "button",
                { onClick: handleDownloadElements },
                "Download Elements"
            ),
            React.createElement(
                "button",
                { onClick: handleWipeElements },
                "Wipe Elements"
            )
        )
    );
}

function QuestionsTable() {
    var _React$useState3 = React.useState([]),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        questionsData = _React$useState4[0],
        setQuestionsData = _React$useState4[1];

    React.useEffect(function () {
        handleRefreshQuestions();
    }, []);

    function handleQuestionsUpload(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (e) {
            var data = $.csv.toArrays(e.target.result);
            if (data !== null && data !== "" && data.length > 1) {
                //needs better validation here according to type
                data.shift(); //removed header
                var questions = data.map(function (row) {
                    var question = {
                        text: row[0],
                        elementId: Number(row[1]),
                        correctOption: Number(row[2]),
                        options: []
                    };
                    var optionTexts = row.slice(3);

                    optionTexts.map(function (optionText) {
                        if (optionText != "") {
                            question.options.push({ text: optionText });
                        }
                    });

                    return question;
                });


                addQuestions(questions);

                var newQuestions = questions.map(function (element, index) {
                    return Object.assign({}, element, {
                        elementId: "" //temporary for display
                    });
                });

                setQuestionsData(questionsData.concat(newQuestions));
            } else {
                //error on validating
                console.log("Error validating the import.");
            }
        };
    }

    function handleRefreshQuestions() {
        fetchQuestions().then(function (questions) {
            return setQuestionsData(questions);
        });
    }

    function handleDownloadQuestionsTemplate() {
        // download csv template to client pc locally stored
        var templateArr = [["Question Text", "Element ID", "Answer", "0", "1", "2", "3", "4"], ["Question1 Text", 33, 1, "True", "False"], ["Question2 Text", 34, 4, "Cat", "Dog", "Elephant", "Bird", "Lizard"]];
        saveArrayCSV(templateArr, "questions_template");
    }

    function handleDownloadQuestions() {
        // fetch and download Questions
        var headerRow = ["Question Text", "Element ID", "Answer"];
        var maxNumOptions = -Number.MAX_VALUE;
        questionsData.forEach(function (question) {
            if (question.options.length > maxNumOptions) {
                maxNumOptions = question.options.length;
            }
        });

        for (var i = 0; i < maxNumOptions; i++) {
            headerRow.push(i);
        }

        var QuestionsArr = [headerRow].concat(questionsData.map(function (question) {
            var questionArr = [question.text, question.elementId, question.correctOption].concat(_toConsumableArray(question.options.map(function (o) {
                return o.text;
            })));
            return questionArr;
        }));
        saveArrayCSV(QuestionsArr, "questions_download");
    }

    function handleWipeQuestions() {
        wipeQuestions().then(function (wipeSuccessful) {
            if (wipeSuccessful) {
                setQuestionsData([]);
            }
        });
    }

    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { id: "view" },
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
                questionsData !== undefined && questionsData.map(function (questionsObj, index) {
                    return React.createElement(
                        "tr",
                        { key: index },
                        React.createElement(
                            "td",
                            null,
                            questionsObj.questionId
                        ),
                        React.createElement(
                            "td",
                            null,
                            questionsObj.text
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "table",
                                null,
                                React.createElement(
                                    "tbody",
                                    null,
                                    questionsObj.options.map(function (option, index) {
                                        return React.createElement(
                                            "tr",
                                            { key: index },
                                            React.createElement(
                                                "td",
                                                null,
                                                index
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                option.text
                                            )
                                        );
                                    })
                                )
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            questionsObj.correctOption
                        )
                    );
                })
            )
        ),
        React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { onClick: handleRefreshQuestions },
                "Refresh"
            ),
            React.createElement(
                "button",
                { onClick: handleDownloadQuestionsTemplate },
                "Download Questions Template"
            ),
            React.createElement("br", null),
            React.createElement(
                "div",
                { className: "upload-btn-wrapper" },
                React.createElement(
                    "button",
                    null,
                    "Add Questions"
                ),
                React.createElement("input", { type: "file", name: "upload-questions", id: "txtFileUpload", accept: ".csv", onChange: handleQuestionsUpload })
            ),
            React.createElement("br", null),
            React.createElement(
                "button",
                { onClick: handleDownloadQuestions },
                "Download Questions"
            ),
            React.createElement(
                "button",
                { onClick: handleWipeQuestions },
                "Wipe Questions"
            )
        )
    );
}

function DashBoard() {
    var _React$useState5 = React.useState('elements'),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        tab = _React$useState6[0],
        setTab = _React$useState6[1];

    var tabStyle = {
        textDecoration: "none",
        color: "#222222",
        background: "white",
        border: "none",
        boxShadow: "",
        fontWeight: "normal"
    };

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "tab" },
            React.createElement(
                "button",
                { style: tabStyle, onClick: function onClick() {
                        return setTab('elements');
                    } },
                "Elements"
            ),
            React.createElement(
                "button",
                { style: tabStyle, onClick: function onClick() {
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