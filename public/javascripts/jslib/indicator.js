var Indicator = function($) {
    var _SPACE_COLOR = "rgb(186,186,186)";
    var DefaultColor = [
        "rgb(157, 231, 119)",
        "rgb(255, 12 , 62 )",
        "rgb(164, 60 , 255)",
        "rgb(255, 121, 0  )",
        "rgb(231, 231, 10 )"
    ];

    var _drawSummaryGraph = function(segments) {
        // if (!this.summaryGraphElement)
        //     return;

        if (!segments || !segments.length) {
            segments = [{color: "white", value: 1}];
            // this._showingEmptySummaryGraph = true;
        }
        // else
        //     delete this._showingEmptySummaryGraph;

        // Calculate the total of all segments.
        var total = 0;
        for (var i = 0; i < segments.length; ++i) {
            total += segments[i].value;
        }
        var defaultTotal = 8 * 60 * 60 * 1000;
        if (total < defaultTotal) {
            total = defaultTotal;
        }

        // Calculate the percentage of each segment, rounded to the nearest percent.
        var percents = segments.map(function(s) { return Math.max(Math.round(100 * s.value / total), 1) });

        // Calculate the total percentage.
        var percentTotal = 0;
        for (var i = 0; i < percents.length; ++i)
            percentTotal += percents[i];

        // Make sure our percentage total is not greater-than 100, it can be greater
        // if we rounded up for a few segments.
        while (percentTotal > 100) {
            for (var i = 0; i < percents.length && percentTotal > 100; ++i) {
                if (percents[i] > 1) {
                    --percents[i];
                    --percentTotal;
                }
            }
        }

        // Make sure our percentage total is not less-than 100, it can be less
        // if we rounded down for a few segments.
        while (percentTotal < 100) {
            for (var i = 0; i < percents.length && percentTotal < 100; ++i) {
                ++percents[i];
                ++percentTotal;
            }
        }

        var ctx = document.getElementById("canvas").getContext("2d");

        var x = 0;
        var y = 0;
        var w = 800;
        var h = 19;
        var r = (h / 2);
        var c = 8;

        function drawPillShadow() {
            // This draws a line with a shadow that is offset away from the line. The line is stroked
            // twice with different X shadow offsets to give more feathered edges. Later we erase the
            // line with destination-out 100% transparent black, leaving only the shadow. This only
            // works if nothing has been drawn into the canvas yet.

            ctx.beginPath();
            ctx.moveTo(x + 4, y + h - 3 - 0.5);
            ctx.lineTo(x + w - 4, y + h - 3 - 0.5);
            ctx.closePath();

            ctx.save();

            ctx.shadowBlur = 2;
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 5;

            ctx.strokeStyle = "white";
            ctx.lineWidth = 1;

            ctx.stroke();

            ctx.shadowOffsetX = -3;

            ctx.stroke();

            ctx.restore();

            ctx.save();

            ctx.globalCompositeOperation = "destination-out";
            ctx.strokeStyle = "rgba(0, 0, 0, 1)";
            ctx.lineWidth = 1;

            ctx.stroke();

            ctx.restore();
        }

        function drawPill() {
            // Make a rounded rect path.
            ctx.beginPath();
            ctx.moveTo(x, y + r);
            ctx.lineTo(x, y + h - r);
            ctx.quadraticCurveTo(x, y + h, x + r, y + h);
            ctx.lineTo(x + w - r, y + h);
            ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
            ctx.lineTo(x + w, y + r);
            ctx.quadraticCurveTo(x + w, y, x + w - r, y);
            ctx.lineTo(x + r, y);
            ctx.quadraticCurveTo(x, y, x, y + r);
            ctx.closePath();

            // Clip to the rounded rect path.
            ctx.save();
            ctx.clip();

            // Fill the segments with the associated color.
            var previousSegmentsWidth = 0;
            for (var i = 0; i < segments.length; ++i) {
                var segmentWidth = Math.round(w * percents[i] / 100);
                ctx.fillStyle = segments[i].color;
                ctx.fillRect(x + previousSegmentsWidth, y, segmentWidth, h);
                previousSegmentsWidth += segmentWidth;
            }

            // Draw the segment divider lines.
            ctx.lineWidth = 1;
            for (var i = 1; i < c; ++i) {
                ctx.beginPath();
                ctx.moveTo(x + (i * Math.round(w / c)) + 0.5, y);
                ctx.lineTo(x + (i * Math.round(w / c)) + 0.5, y + h);
                ctx.closePath();

                ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x + (i * Math.round(w / c)) + 1.5, y);
                ctx.lineTo(x + (i * Math.round(w / c)) + 1.5, y + h);
                ctx.closePath();

                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.stroke();
            }

            // Draw the pill shading.
            var lightGradient = ctx.createLinearGradient(x, y, x, y + (h / 1.5));
            lightGradient.addColorStop(0.0, "rgba(220, 220, 220, 0.6)");
            lightGradient.addColorStop(0.4, "rgba(220, 220, 220, 0.2)");
            lightGradient.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

            var darkGradient = ctx.createLinearGradient(x, y + (h / 3), x, y + h);
            darkGradient.addColorStop(0.0, "rgba(0, 0, 0, 0.0)");
            darkGradient.addColorStop(0.8, "rgba(0, 0, 0, 0.2)");
            darkGradient.addColorStop(1.0, "rgba(0, 0, 0, 0.5)");

            ctx.fillStyle = darkGradient;
            ctx.fillRect(x, y, w, h);

            ctx.fillStyle = lightGradient;
            ctx.fillRect(x, y, w, h);

            ctx.restore();
        }

        ctx.clearRect(x, y, w, (h * 2));

        drawPillShadow();
        drawPill();

        ctx.save();

        ctx.translate(0, (h * 2) + 1);
        ctx.scale(1, -1);

        drawPill();

        ctx.restore();

        _fadeOutRect(ctx, x, y + h + 1, w, h, 0.5, 0.0);
    };

    var _fadeOutRect = function(ctx, x, y, w, h, a1, a2) {
        ctx.save();

        var gradient = ctx.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0.0, "rgba(0, 0, 0, " + (1.0 - a1) + ")");
        gradient.addColorStop(0.8, "rgba(0, 0, 0, " + (1.0 - a2) + ")");
        gradient.addColorStop(1.0, "rgba(0, 0, 0, 1.0)");

        ctx.globalCompositeOperation = "destination-out";

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, w, h);

        ctx.restore();
    };

    var _makeLegendElement = function(label, value, color,task_id) {
        var legendElement = document.createElement("label");
        legendElement.className = "resources-graph-legend-item";

        if (color) {
            var swatch = document.createElement("canvas");
            swatch.className = "resources-graph-legend-swatch";
            swatch.setAttribute("width", "13");
            swatch.setAttribute("height", "24");
            if (task_id) swatch.setAttribute("task_id", task_id);

            legendElement.appendChild(swatch);

            _drawSwatch(swatch, color);
        }

        var labelElement = document.createElement("div");
        labelElement.className = "resources-graph-legend-label";
        legendElement.appendChild(labelElement);

        var headerElement = document.createElement("div");
        var headerElement = document.createElement("div");
        headerElement.className = "resources-graph-legend-header";
        headerElement.setAttribute("width", "80");
        // headerElement.setAttribute("height", "24");
        headerElement.setAttribute("overflow", "hidden");
        headerElement.textContent = label;
        labelElement.appendChild(headerElement);

        var valueElement = document.createElement("div");
        valueElement.className = "resources-graph-legend-value";
        valueElement.textContent = value;
        labelElement.appendChild(valueElement);

        return legendElement;
    };

    var _drawSwatch = function(canvas, color) {
        var ctx = canvas.getContext("2d");

        function drawSwatchSquare() {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 13, 13);

            var gradient = ctx.createLinearGradient(0, 0, 13, 13);
            gradient.addColorStop(0.0, "rgba(255, 255, 255, 0.2)");
            gradient.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 13, 13);

            gradient = ctx.createLinearGradient(13, 13, 0, 0);
            gradient.addColorStop(0.0, "rgba(0, 0, 0, 0.2)");
            gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 13, 13);

            ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
            ctx.strokeRect(0.5, 0.5, 12, 12);
        }

        ctx.clearRect(0, 0, 13, 24);

        drawSwatchSquare();

        ctx.save();

        ctx.translate(0, 25);
        ctx.scale(1, -1);

        drawSwatchSquare();

        ctx.restore();

        _fadeOutRect(ctx, 0, 13, 13, 13, 0.5, 0.0);
    };
    
    var _second2hour = function(s) {
      return Math.round(s / 3600 * 10) / 10
    };

    var Indicator = {
      show: function(timelogs) {
        var fillSegments = [];
        var totalHours = 0;
        var logedTasks = {};
        
        for (var i=0; i < timelogs.length; i++) {
          var log = timelogs[i];
          var color = DefaultColor[log.task_id % DefaultColor.length];
          var fillSegment = {color: color, value: _second2hour(log.duration)};
          if (logedTasks[log.task_id]) {
            logedTasks[log.task_id].hours += log.duration;
          } else {
            logedTasks[log.task_id] = {"name":log.task_name, "hours":0, "color":color};
          }
          totalHours += log.duration;
          fillSegments.push(fillSegment);
        }
        var leftTime = 8 - _second2hour(totalHours);
        if (leftTime > 0) {
          fillSegments.push({color: _SPACE_COLOR, value: leftTime});
        };
        $('#legend').empty();
        for (var task_id in logedTasks){
            var task = logedTasks[task_id];
            $('#legend').append(_makeLegendElement(task.name, _second2hour(task.hours)+"h", task.color, task_id));
        }
        $('#legend').append(_makeLegendElement('Total hours', _second2hour(totalHours)+"h"));

        _drawSummaryGraph(fillSegments);
      }
    };

    return Indicator;
}(jQuery);
