'use strict';

var subtypes = require('./subtypes');

module.exports = function selectPoints(searchInfo, selectionTester, isClicked) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];
    var trace = cd[0].trace;
    var i;
    var di;
    var x;
    var y;

    var selectedpoints = trace._input.selectedpoints || [];

    var hasOnlyLines = (!subtypes.hasMarkers(trace) && !subtypes.hasText(trace));
    if(hasOnlyLines) return [];

    if(selectionTester === false) { // clear selection
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            di = cd[i];
            x = xa.c2p(di.x);
            y = ya.c2p(di.y);

            var add = false;

            if((di.i !== null) && selectionTester.contains([x, y], false, i, searchInfo)) {
                add = true;

                if(isClicked) {
                    if(selectedpoints.indexOf(i) !== -1) {
                        add = false;

                        // drop from selected points
                        var newList = [];
                        for(var k = 0; k < selectedpoints.length; k++) {
                            if(selectedpoints[k] !== i) newList.push(selectedpoints[k]);
                        }
                        selectedpoints = newList;
                    } else {
                        // push to selected points
                        selectedpoints.push(i);
                    }
                }
            } else if(selectedpoints.indexOf(i) !== -1) {
                add = true;
            }

            if(add) {
                selection.push({
                    pointNumber: di.i,
                    x: xa.c2d(di.x),
                    y: ya.c2d(di.y)
                });
                di.selected = 1;
            } else {
                di.selected = 0;
            }
        }
    }

    trace._input.selectedpoints = selectedpoints.length ? selectedpoints : null;

    return selection;
};
