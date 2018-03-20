(function() {
    document.addEventListener("DOMContentLoaded", () => {
        let center;
        let radius = [205, 155, 230, 140];
        let clock = document.querySelector('clock');

        let tick = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //minute hand
        let tack = document.createElementNS('http://www.w3.org/2000/svg', 'path'); //hour hand

        let now = new Date();

        let digital = document.querySelector('#time');
        let guies = document.querySelector('#guie');

        clock.appendChild(tick);
        clock.appendChild(tack);
        clock.appendChild(digital);

        go();

        function go() {
            now = new Date();

            setDigital(now);
            setAnalogic(now);
            reduceTask();

            setTimeout(go, 100);
        }

        function reduceTask() {

        }

        function loadTasks() {

        }

        function addTask(ti, tf) {
            let hours = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Hours task
            let minutes = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Minutes task

            let amins = anglesMinutes(ti, tf);
            let ahours = anglesHours(ti, tf);

            min.setAttribute('d', arc(radius[2], amins[0], amins[1]));
            hour.setAttribute('d', arc(radius[3], ahours[0], ahours[1]));

            clock.prepend(hours);
            clock.prepend(minutes);
        }

        function setDigital(t) {
            let text;
            let hours = t.getHours();
            let mins = t.getMinutes();

            if (t.getHours() < 10)
                hours = '0' + hours;

            if (t.getMinutes() < 10)
                mins = '0' + mins;

            text = hours + '-' + mins;

            digital.innerHTML = text;
        }

        function setAnalogic(ti, tf) {
            let atick = anglesMinutes(ti, tf);
            let atack = anglesHours(ti, tf);

            tick.setAttribute('d', arc(radius[0], atick[0], atick[1]));
            tack.setAttribute('d', arc(radius[1], atack[0], atack[1]));
        }

        function setAnalogic(t) {
            let ti = t;
            let tf = t;
            tf.setMinutes(t.getMinutes() + 1);

            let atick = anglesMinutes(ti, tf);
            let atack = anglesHours(ti, tf);

            tick.setAttribute('d', arc(radius[0], atick[0], atick[0] + 1));
            tack.setAttribute('d', arc(radius[1], atack[0], atack[0] + 1.5));
        }

        function anglesMinutes(ti, tf) {
            var angleIni, angleFin;

            if (tf.getHours() - ti.getHours() > 1 ||
                (ti.getHours() < tf.getHours() && ti.getMinutes() < tf.getMinutes() && tf.getHours() - ti.getHours() == 1))
                return [0, 359];


            angleIni = ti.getMinutes() * 6;
            angleFin = tf.getMinutes() * 6;

            return [angleIni, angleFin];
        }

        function anglesHours(ti, tf) {
            var angleIni, angleFin;

            angleIni = (ti.getHours() % 12) * 30 + (30 * ti.getMinutes() / 60);
            angleFin = (tf.getHours() % 12) * 30 + (30 * tf.getMinutes() / 60);

            return [angleIni, angleFin];
        }

        function arc(radius, ai, af) {
            let start = polarToCartesian(center.x, center.y, radius, ai);
            let end = polarToCartesian(center.x, center.y, radius, af);

            let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

            let d = [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
            ].join(" ");

            return d;
        }

        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }

    }, false)
})();