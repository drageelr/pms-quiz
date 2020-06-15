var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var e = React.createElement;

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function Result() {
    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        quizResult = _React$useState2[0],
        setQuizResult = _React$useState2[1];

    var token = getParameterByName("token");
    React.useEffect(function () {
        //get all elements and questions
        result(token).then(function (res) {
            setQuizResult(res);
        });
    }, []);

    return React.createElement(
        'div',
        { className: 'wrapper' },
        quizResult && quizResult.map(function (questionData, index) {
            return React.createElement(
                'div',
                { key: index, id: 'formContent', style: { marginBottom: 10 } },
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
                                checked: Number(questionData.selectedOption) === index,
                                onChange: function onChange() {} }),
                            option
                        )
                    );
                }),
                questionData.correct ? React.createElement(
                    'h6',
                    { style: { color: "green" } },
                    ' \u2705 Correct'
                ) : React.createElement(
                    'h6',
                    { style: { color: "red" } },
                    ' \u274C Wrong.'
                )
            );
        })
    );
}

var domContainer = document.querySelector('#result');
ReactDOM.render(e(Result), domContainer);