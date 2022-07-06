'use strict';

module.exports = function selectPoints(searchInfo, selectionTester, selection) {
    var hadSelection = !!selection;
    if(!selection) selection = [];

    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var i, j;

    if(selectionTester === false) {
        if(!hadSelection) {
            // clear selection
            for(i = 0; i < cd.length; i++) {
                for(j = 0; j < (cd[i].pts || []).length; j++) {
                    cd[i].pts[j].selected = 0;
                }
            }
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            for(j = 0; j < (cd[i].pts || []).length; j++) {
                var pt = cd[i].pts[j];
                var x = xa.c2p(pt.x);
                var y = ya.c2p(pt.y);

                if(selectionTester.contains([x, y], null, pt.i, searchInfo)) {
                    selection.push({
                        pointNumber: pt.i,
                        x: xa.c2d(pt.x),
                        y: ya.c2d(pt.y)
                    });
                    pt.selected = 1;
                } else {
                    if(!hadSelection) {
                        pt.selected = 0;
                    }
                }
            }
        }
    }

    return selection;
};
