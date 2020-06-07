var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

function Question() {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                null,
                'What fraction of a day is 6 hours?'
            ),
            React.createElement(
                'p',
                null,
                'Choose 1 answer'
            ),
            React.createElement('hr', null),
            React.createElement(
                'div',
                { id: 'block-11' },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'radio', name: 'option', value: '6/24', id: 'option-11' }),
                    '6/24'
                ),
                React.createElement('span', { id: 'result-11' })
            ),
            React.createElement('hr', null),
            React.createElement(
                'div',
                { id: 'block-12' },
                React.createElement(
                    'label',
                    null,
                    React.createElement('input', { type: 'radio', name: 'option', value: '6', id: 'option-12' }),
                    '6'
                ),
                React.createElement('span', { id: 'result-12' })
            ),
            React.createElement('hr', null)
        )
    );
}

function PreQuiz(_ref) {
    var setQuizActive = _ref.setQuizActive;

    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: function onClick() {
                    return setQuizActive(true);
                } },
            'Start Quiz'
        )
    );
}

function Quiz() {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        quizActive = _React$useState2[0],
        setQuizActive = _React$useState2[1];

    return quizActive ? React.createElement(
        'div',
        null,
        React.createElement(Question, null),
        React.createElement(
            'div',
            null,
            React.createElement(
                'button',
                null,
                'Previous'
            ),
            React.createElement(
                'button',
                null,
                'Next'
            ),
            React.createElement(
                'button',
                null,
                'Submit'
            )
        )
    ) : React.createElement(PreQuiz, { setQuizActive: setQuizActive });
}

var domContainer = document.querySelector('#quiz');
ReactDOM.render(e(Quiz), domContainer);