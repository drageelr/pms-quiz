var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

function Quiz() {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        quizActive = _React$useState2[0],
        setQuizActive = _React$useState2[1];

    var _React$useState3 = React.useState(''),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        name = _React$useState4[0],
        setName = _React$useState4[1];

    var _React$useState5 = React.useState(''),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        email = _React$useState6[0],
        setEmail = _React$useState6[1];

    var _React$useState7 = React.useState([]),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        elementsData = _React$useState8[0],
        setElementsData = _React$useState8[1];

    var _React$useState9 = React.useState([]),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        questionsData = _React$useState10[0],
        setQuestionsData = _React$useState10[1];

    var _React$useState11 = React.useState(0),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        currentIndex = _React$useState12[0],
        setCurrentIndex = _React$useState12[1];

    React.useEffect(function () {
        //get all elements and questions
        fetchElements().then(function (elements) {
            elements.forEach(function (element) {
                element.checked = false;
            });
            setElementsData(elements);
        });
    }, []);

    function handleStart() {
        if (name == '' || email == '') {
            alert("Name and email fields must not be empty!");
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            alert("You have entered an invalid email address!");
            return false;
        }

        setQuizActive(true);
        var count = 10;
        var checkedElements = elementsData.filter(function (element) {
            return element.checked;
        });
        var elementIds = checkedElements.map(function (checkedElement) {
            return checkedElement.elementId;
        });

        start(elementIds, count).then(function (questions) {
            questions.forEach(function (questions) {
                questions.selectedOption = -1;
            });
            setQuestionsData(questions);
            //currentIndex = 0
        });
    }

    function handleNext() {
        if (currentIndex < questionsData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    function handlePrevious() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function handleSubmit() {
        var questions = questionsData.map(function (questionData) {
            return {
                questionId: questionData.questionId,
                selectedOption: questionData.selectedOption
            };
        });
        submit(name, email, questions).then(function (token) {
            result(token).then(function (res) {
                console.log(res); //result, needs a page to display properly
            });
        });
    }

    function Question(_ref) {
        var currentQuestionId = _ref.currentQuestionId,
            questionIndex = _ref.questionIndex;

        var questionData = questionsData[questionIndex];

        function handleOptionSelect(e) {
            var selectedOption = e.target.value;

            setQuestionsData(questionsData.map(function (question) {
                if (question.questionId === currentQuestionId) {
                    question.selectedOption = selectedOption;
                }
                return question;
            }));
        }

        return questionData !== undefined ? React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                questionData.text
            ),
            questionData.options.map(function (option, index) {
                return React.createElement(
                    'div',
                    { key: index },
                    React.createElement(
                        'label',
                        null,
                        React.createElement('input', {
                            type: 'radio',
                            value: index,
                            checked: Number(questionsData[questionIndex].selectedOption) === index,
                            onChange: handleOptionSelect }),
                        option
                    )
                );
            })
        ) : null;
    }

    function PreQuiz() {
        var _React$useState13 = React.useState(name),
            _React$useState14 = _slicedToArray(_React$useState13, 2),
            localName = _React$useState14[0],
            setLocalName = _React$useState14[1];

        var _React$useState15 = React.useState(email),
            _React$useState16 = _slicedToArray(_React$useState15, 2),
            localEmail = _React$useState16[0],
            setLocalEmail = _React$useState16[1];

        function handleElementCheck(e) {
            setElementsData(elementsData.map(function (element) {
                if (element.elementId == e.target.value) {
                    element.checked = !element.checked;
                }
                return element;
            }));
        }

        function ElementsCheckList(_ref2) {
            var type = _ref2.type;

            return elementsData.map(function (element, index) {
                return element.type == type ? React.createElement(
                    'div',
                    { key: index },
                    React.createElement('input', { type: 'checkbox', value: element.elementId,
                        checked: element.checked, onChange: handleElementCheck }),
                    React.createElement(
                        'label',
                        null,
                        ' ',
                        element.name
                    ),
                    React.createElement('br', null)
                ) : null;
            });
        }

        return React.createElement(
            'div',
            { className: 'wrapper' },
            React.createElement(
                'form',
                { id: 'formContent', style: { padding: 10 } },
                React.createElement(
                    'label',
                    null,
                    'Name: '
                ),
                React.createElement('input', { type: 'text', id: 'name',
                    value: localName,
                    onChange: function onChange(e) {
                        return setLocalName(e.target.value);
                    },
                    onBlur: function onBlur() {
                        return setName(localName);
                    } //set final name on blur for perf
                    , required: true
                }),
                React.createElement('br', null),
                React.createElement(
                    'label',
                    null,
                    'Email: '
                ),
                React.createElement('input', { type: 'text', id: 'email',
                    value: localEmail,
                    onChange: function onChange(e) {
                        return setLocalEmail(e.target.value);
                    },
                    onBlur: function onBlur() {
                        return setEmail(localEmail);
                    },
                    required: true
                }),
                React.createElement('br', null),
                React.createElement(
                    'button',
                    { onClick: handleStart },
                    ' Start Quiz '
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'column' },
                        React.createElement(
                            'h3',
                            null,
                            'Risk'
                        ),
                        React.createElement(ElementsCheckList, { type: 'risk' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'column' },
                        React.createElement(
                            'h3',
                            null,
                            'Culture'
                        ),
                        React.createElement(ElementsCheckList, { type: 'cult' })
                    )
                )
            )
        );
    }

    return quizActive ? React.createElement(
        'div',
        { className: 'wrapper' },
        React.createElement(
            'div',
            { id: 'formContent' },
            React.createElement(Question, {
                questionIndex: currentIndex,
                currentQuestionId: questionsData[currentIndex] !== undefined ? questionsData[currentIndex].questionId : -1
            }),
            React.createElement(
                'div',
                { style: { padding: 10 } },
                React.createElement(
                    'button',
                    { onClick: handlePrevious },
                    'Previous'
                ),
                React.createElement(
                    'button',
                    { style: { marginLeft: 5 }, onClick: handleNext },
                    'Next'
                ),
                React.createElement(
                    'button',
                    { style: { marginLeft: 5 }, onClick: handleSubmit },
                    'Submit'
                )
            )
        )
    ) : React.createElement(PreQuiz, null);
}

var domContainer = document.querySelector('#quiz');
ReactDOM.render(e(Quiz), domContainer);