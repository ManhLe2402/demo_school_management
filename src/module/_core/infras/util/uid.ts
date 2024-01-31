let originTime = new Date("2020-1-1").getTime();
let now = Date.now();
let sNow = now.toString(36);
let increaseVariable = 0;

function ir(originalString: string, turningTime = 0): string {
    if (turningTime == 0) return originalString;
    else return ir(originalString + Math.floor(Math.random() * 36).toString(36), turningTime - 1);
}

export function uid() {
    // value "zzzz" of base 36 = 1679615, take nearly = 1679600
    const newNow = Date.now();
    if (newNow - now >= 1) {
        now = newNow;
        sNow = (now - originTime).toString(36).substring(1);

        if (increaseVariable > 1679600) increaseVariable = 0;
        else increaseVariable++;
    } else {
        if (increaseVariable > 1679600) {
            increaseVariable = 0;
            now = now + 1;
            sNow = (now - originTime).toString(36).substring(1);
        } else increaseVariable = increaseVariable + 1;
    }

    return ir(sNow + increaseVariable.toString(36).padStart(4, "0"), 1);
}
