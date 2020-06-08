var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

function Question() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h3',
            null,
            'What fraction of a day is 6 hours?'
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'label',
                null,
                React.createElement('input', { type: 'radio', name: 'option', value: '6/24', id: 'option-1' }),
                '6/24'
            )
        ),
        React.createElement(
            'div',
            null,
            React.createElement(
                'label',
                null,
                React.createElement('input', { type: 'radio', name: 'option', value: '6', id: 'option-2' }),
                '6'
            )
        )
    );
}

function PreQuiz(_ref) {
    var setQuizActive = _ref.setQuizActive;

    var _React$useState = React.useState(''),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        name = _React$useState2[0],
        setName = _React$useState2[1];

    var _React$useState3 = React.useState(''),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        email = _React$useState4[0],
        setEmail = _React$useState4[1];

    return React.createElement(
        'div',
        { className: 'wrapper' },
        React.createElement(
            'form',
            { id: 'formContent', style: { padding: 10 } },
            React.createElement(
                'label',
                null,
                'Name:'
            ),
            React.createElement('input', { type: 'text', id: 'name', value: name, onChange: function onChange(e) {
                    return setName(e.target.value);
                } }),
            React.createElement('br', null),
            React.createElement(
                'label',
                null,
                'Email:'
            ),
            React.createElement('input', { type: 'text', id: 'email', value: email, onChange: function onChange(e) {
                    return setEmail(e.target.value);
                } }),
            React.createElement('br', null),
            React.createElement(
                'button',
                { type: 'submit', onClick: function onClick() {
                        return setQuizActive(true);
                    } },
                'Start Quiz'
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
                    React.createElement(
                        'p',
                        null,
                        'OneR'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'column' },
                    React.createElement(
                        'h3',
                        null,
                        'Culture'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'OneC'
                    )
                )
            )
        )
    );
}

function Quiz() {
    var _React$useState5 = React.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        quizActive = _React$useState6[0],
        setQuizActive = _React$useState6[1];

    return quizActive ? React.createElement(
        'div',
        { className: 'wrapper' },
        React.createElement(
            'div',
            { id: 'formContent' },
            React.createElement(Question, null),
            React.createElement(
                'div',
                { style: { padding: 10 } },
                React.createElement(
                    'button',
                    null,
                    'Previous'
                ),
                React.createElement(
                    'button',
                    { style: { marginLeft: 5 } },
                    'Next'
                ),
                React.createElement(
                    'button',
                    { style: { marginLeft: 5 } },
                    'Submit'
                )
            )
        )
    ) : React.createElement(PreQuiz, { setQuizActive: setQuizActive });
}

var domContainer = document.querySelector('#quiz');
ReactDOM.render(e(Quiz), domContainer);